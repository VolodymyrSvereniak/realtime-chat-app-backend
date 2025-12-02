import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { generateToken } from "../utils/generateToken";
import type { User } from "../generated/prisma/client";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const result: { user: Omit<User, "password"> } = await registerUser(req.body);
  const token = generateToken({ userId: result.user.id });

  res.cookie("authToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
  res.status(201).json(result);
};
