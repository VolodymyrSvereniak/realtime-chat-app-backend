import { prisma } from "../lib/prisma";
import { SignUpData } from "../types/auth.types";
import bcrypt from "bcryptjs";

export const registerUser = async ({
  fullName,
  email,
  password,
}: SignUpData) => {
  const existedUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existedUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
    omit: { password: true },
  });

  return {
    user: { newUser },
  };
};
