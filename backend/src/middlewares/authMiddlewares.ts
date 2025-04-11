import { NextFunction, Request, Response } from "express";
import {
  generateAccessToken,
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/jwtHelper";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    // check the accessToken
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) throw new Error("Invalid token");
    if (typeof decoded === "object" && "userId" in decoded) {
      (req as any).userId = decoded.userId as string;
      next();
      return;
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (err) {
    if (!refreshToken) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    try {
      const decodedRefresh = verifyRefreshToken(refreshToken);
      if (!decodedRefresh) throw new Error("Invalid refresh token");

      if (typeof decodedRefresh === "object" && "userId" in decodedRefresh) {
        const newAccessToken = generateAccessToken(
          decodedRefresh.userId as string
        );
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
        });
        req.query = { ...req.query, userId: decodedRefresh.userId as string };
        next();
      } else {
        throw new Error("Invalid token payload");
      }
    } catch (err) {
      res.status(401).json({ error: err });
      return;
    }
  }
};

export default authenticate;
