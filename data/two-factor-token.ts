import { prisma } from "@/prisma/prisma";

export const GetTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: {
        token: token,
      },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const GetTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: {
        email: email,
      },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};
