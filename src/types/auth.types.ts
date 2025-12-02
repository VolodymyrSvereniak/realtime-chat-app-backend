import { z } from "zod";
import { signUpSchema } from "../schemas/auth.schema";

export type SignUpData = z.infer<typeof signUpSchema>;
