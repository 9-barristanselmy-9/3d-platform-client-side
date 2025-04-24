import { prisma } from "@/prisma/prisma";

export const getUserById = (userId: string) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
