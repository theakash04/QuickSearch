import { Readability } from "@mozilla/readability";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { Request, Response, Router } from "express";
import { JSDOM } from "jsdom";
import summarizeContent from "../utils/summerize";
import cleanContent from "../utils/cleanText";
import { addDocument, searchDocument } from "../utils/ElasticSearch";
import { CheckUserLinkExists } from "../utils/prismaHelper";
import isUrlReachable from "../utils/UrlValidator";

const router = Router();

interface dataType {
  data: string | Buffer<ArrayBuffer>;
}

const prisma = new PrismaClient();

router.post("/save", async (req: Request, res: Response) => {
  const { link } = req.body;
  const isUrlValid = await isUrlReachable(link);

  if (!isUrlValid) {
    res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "The given link is not reachable!",
    });
    return;
  }

  if (!link) {
    res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Link is required",
    });
    return;
  }

  //   const userId = (req as Request & { userId?: string }).userId; // remove this if you are in production
  const userId = req.userId;

  const existingLink = await CheckUserLinkExists(userId as string, link);

  if (!existingLink) {
    try {
      const { data }: dataType = await axios.get(link, { timeout: 10000 });

      const dom = new JSDOM(data, { url: link });

      const reader = new Readability(dom.window.document);
      const article = reader.parse();

      if (!article) {
        res.status(400).json({
          status: "error",
          statusCode: 400,
          message: "The given link does not contain any Article!",
        });
        return;
      }

      const { title, textContent } = article;

      const summery = await summarizeContent(textContent || "");

      const newWebLinkData = await prisma.link.create({
        data: {
          title: title,
          url: link,
          authorId: userId as string,
          content: cleanContent(textContent as string),
          summery: cleanContent(summery as string),
        },
      });
      await addDocument(newWebLinkData.id, {
        user_id: userId as string,
        title: title ?? "untitled",
        content: cleanContent(textContent as string),
        url: link,
        summery: cleanContent(summery as string),
      });

      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Link saved successfully",
      });

      return;
    } catch (error) {
      res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Something went wrong",
      });
      return;
    }
  } else {
    res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Link already exists",
    });
  }
});

router.get("/search", async (req: Request, res: Response) => {
  const { query } = req.query;
  //   const user_id = (req as Request & { userId?: string }).userId; // remove this if you are in production
  const user_id = req.userId;

  if (!query) {
    res.status(400).json({ error: "Query is required" });
    return;
  }

  try {
    // search in elasticsearch
    const data = await searchDocument(query as string, user_id as string);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Search completed successfully",
      results: [data],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Something went wrong",
      results: [],
    });
  }
});

router.get("/user", async (req: Request, res: Response) => {
  //   const userId = (req as Request & { userId?: string }).userId; // remove this if you are in production
  const userId = req.userId;

  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "User found successfully",
      result: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Something went wrong",
      result: [],
    });
  }
});

router.get("/links", async (req: Request, res: Response) => {
  //   const userId = (req as Request & { userId?: string }).userId; // remove this if you are in production
  const userId = req.userId;

  if (!userId) {
    res.status(400).json({ error: "User ID is required" });
    return;
  }

  try {
    const links = await prisma.link.findMany({
      where: {
        authorId: userId as string,
      },
    });

    const linkData: {
      id: string;
      title: string;
      url: string;
      createdAt: Date;
    }[] = links.map((link) => ({
      id: link.id,
      title: link.title ?? "untitled",
      url: link.url,
      createdAt: link.createdAt,
    }));

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Links found successfully",
      results: linkData,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Something went wrong",
      results: [],
    });
  }
});

export default router;
