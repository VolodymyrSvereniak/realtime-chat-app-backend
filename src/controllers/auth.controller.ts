import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const result = await registerUser(req.body);
  res.status(201).json(result);
};
