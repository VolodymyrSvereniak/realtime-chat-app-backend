import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { generateToken } from "../utils/generateToken";
import { env } from "../lib/env";
import type { SignUpResponse } from "../types/auth.types";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const result: SignUpResponse = await registerUser(req.body);
  const token = generateToken({ userId: result.user.id });

  res.cookie("authToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: env.NODE_ENV === "production" ? true : false,
  });
  res.status(201).json(result);
};
 