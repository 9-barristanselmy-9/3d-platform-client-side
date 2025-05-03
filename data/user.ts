import { prisma } from "@/prisma/prisma";

export const getUserById = (userId: string) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch  {
    
    return null;
  }
};
export const getUserByEmail = (email: string) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch  {
    return null;
  }
};
