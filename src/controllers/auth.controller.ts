import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { generateToken } from "../utils/generateToken";
import { setCookie } from "../utils/cookies";
import type { SignUpResponse } from "../types/auth.types";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const user: SignUpResponse = await registerUser(req.body);
  const token = generateToken({ userId: user.id });

  setCookie(res, "authToken", token);

  res.status(201).json({ user: user });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);
  const token = generateToken({ userId: user.id });

  setCookie(res, "authToken", token);

  res.status(200).json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  });
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  setCookie(res, "authToken", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {};
