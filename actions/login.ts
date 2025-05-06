"use server";
import * as z from "zod";
import { LoginSchema } from "@/types/validation/loginSchema";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { GetTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateData = LoginSchema.parse(data);
  if (!validateData) {
    return { error: "invalid input data" };
  }

  const { email, password, code } = validateData;

  const userExists = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!userExists || !userExists.password || !userExists.email) {
    return { error: "User Not found" };
  }

  if (!userExists.emailVerified) {
    const verificationToken = await generateVerificationToken(userExists.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  }
  // send 2FA token to the user
  if (userExists.isTwoFactorEnabled && userExists.email) {
    if (code) {
      const twoFactorToken = await GetTwoFactorTokenByEmail(userExists.email);
      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }
      const hasExpired = new Date(twoFactorToken.expire) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        userExists.id
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }
      await prisma.twoFactorConfirmation.create({
        data: {
          userId: userExists.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(userExists.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email: userExists.email,
      password: password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalide credentials" };
        default:
          return { error: "Please confirm your email address" };
      }
    }
    throw error;
  }
  return { success: "User logged in successfully" };
};
