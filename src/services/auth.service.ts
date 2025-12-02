import { prisma } from "../lib/prisma";
import { SignUpData } from "../schemas/auth.schema";

export const registerUser = async ({
  fullName,
  email,
  password,
}: SignUpData) => {};
