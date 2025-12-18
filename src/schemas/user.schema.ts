import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(1, "Missing full name field").optional(),
  profilePicture: z.string().url("Invalid URL format").optional(),
});
