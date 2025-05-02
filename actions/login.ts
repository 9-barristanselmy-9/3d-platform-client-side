"use server";
import * as z from "zod";
import { LoginSchema } from "@/types/validation/loginSchema";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateData = LoginSchema.parse(data);
  if (!validateData) {
    return { error: "invalid input data" };
  }

  const { email, password } = validateData;

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
