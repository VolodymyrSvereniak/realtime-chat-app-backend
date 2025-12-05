import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import type { SignUpData } from "../types/auth.types";

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

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
    omit: { password: true },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  return user;
};
