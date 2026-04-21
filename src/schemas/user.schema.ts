import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(1, "Missing full name field").optional(),
  profilePicture: z
    .url({
      error: "Invalid URL format",
    })
    .optional(),
});
