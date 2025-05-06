import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/prisma/prisma";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { GetTwoFactorTokenByEmail } from "@/data/two-factor-token";

//for the 2F authentication

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString(); //  generates 6 digits number
  const now = new Date();
  //const ONE_HOUR = 3600 * 1000; // 1h in milliseconds
  const FIFTEEN_MINUTES = 15 * 60 * 1000; // 15min in milliseconds
  const expire = new Date(now.getTime() + FIFTEEN_MINUTES);

  const existingToken = await GetTwoFactorTokenByEmail(email);
  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expire,
    },
  });
  return twoFactorToken;
};

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
