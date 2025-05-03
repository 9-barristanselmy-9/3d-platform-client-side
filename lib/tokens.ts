import { prisma } from "@/prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const now = new Date();
  const ONE_HOUR = 3600 * 1000; // 1h in milliseconds
  const THIRTY_MINUTES = 30 * 60 * 1000; // 30min in milliseconds
  const expire = new Date(now.getTime() + ONE_HOUR + THIRTY_MINUTES);
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expire,
    },
  });
  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const now = new Date();
  const ONE_HOUR = 3600 * 1000; // 1h in milliseconds
  const THIRTY_MINUTES = 30 * 60 * 1000; // 30min in milliseconds

  const expire = new Date(now.getTime() + ONE_HOUR + THIRTY_MINUTES); //EXPIRE IN 1h30min


  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expire,
    },
  });

  return verificationToken;
};
