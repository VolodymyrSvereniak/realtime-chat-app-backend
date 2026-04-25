import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { env } from "../lib/env";

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;

    if (!decoded?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      omit: { password: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    (req as any).user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
