import { PrismaClient } from "@prisma/client";

export async function CheckUserLinkExists(userId: string, url: string) {
  const prisma = new PrismaClient();
  const isExist = await prisma.link.findFirst({
    where: {
      authorId: userId,
      url: url,
    },
  });

  return !!isExist;
}
