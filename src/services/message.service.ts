import { prisma } from "../lib/prisma";

export const getAllContacts = async (userId: number) => {
  const contacts = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      profilePicture: true,
    },
  });

  return contacts;
};
