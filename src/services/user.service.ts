import { cloudinary } from "../lib/cloudinary";
import { prisma } from "../lib/prisma";

export const updateUserProfilePicture = async (
  userId: number | undefined,
  profilePicture: string | null
) => {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!profilePicture) {
    throw new Error("Profile picture is required");
  }

  const uploadResponse = await cloudinary.uploader.upload(profilePicture);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { profilePicture: uploadResponse.secure_url },
  });

  return updatedUser;
};
