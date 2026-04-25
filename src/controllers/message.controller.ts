import { Request, Response } from "express";
import { getAllContacts } from "../services/message.service";

export const getContacts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = Number((req as any).user.id);

  const contacts = await getAllContacts(userId);

  res.status(200).json({ contacts });
};
