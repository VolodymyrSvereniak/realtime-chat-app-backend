import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(1, "Missing full name field"),
  email: z
    .string()
    .min(1, "Missing email field")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z
    .string()
    .min(1, "Missing password field")
    .min(6, "Password must be at least 6 characters long"),
});

export type SignUpData = z.infer<typeof signUpSchema>;
