import { Request, Response } from "express";
import { updateUserProfilePicture } from "../services/user.service";

export const updateProfilePicture = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { profilePicture } = req.body;
  const userId = req.user?.id;

  try {
    await updateUserProfilePicture(userId, profilePicture);
    res.status(200).json({ message: "Profile picture updated successfully" });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Profile picture is required"
    ) {
      res.status(400).json({ message: "Profile picture is required" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
