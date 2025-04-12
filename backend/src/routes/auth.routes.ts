import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { OAuth2Client } from "google-auth-library";
import { generateTokens } from "../utils/jwtHelper";

const router = Router();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, "postmessage");
const prisma = new PrismaClient();

interface googleUser {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

router.post("/google", async (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    res.status(400).json({ message: "authorization code is required" });
    return;
  }

  try {
    const { tokens } = await client.getToken(code);
    const { id_token: token } = tokens;

    if (!token) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).json({ message: "Invalid token payload" });
      return;
    }

    const { sub, email, name, picture } = payload as googleUser;

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ googleId: sub }, { email }],
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: sub,
          email: email,
          name: name,
          avatar: picture || "",
        },
      });
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "User authenticated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
});

router.get("/logout", async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
