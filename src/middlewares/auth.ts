import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { env } from "../lib/env";

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.cookies.authToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - no token provided" });
  }

  const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized - invalid token" });
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    omit: { password: true },
  });

  if (!user) {
    return res.status(401).json({ message: "Unauthorized - user not found" });
  }

  req.user = user;

  next();
};
 