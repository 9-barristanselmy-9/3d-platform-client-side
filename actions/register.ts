"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/types/validation/registerSchema";
import { prisma } from "@/prisma/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (data: z.infer<typeof registerSchema>) => {
  try {
    const validateData = registerSchema.parse(data);
    if (!validateData) {
      return { error: "invalid  input data" };
    }
    const { email, name, password, confirmPassword } = validateData;

    if (password !== confirmPassword) {
      return { error: "Passwords do not much" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Check to see if user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return { error: "User  already exists" };
    }
    const lowerCaseEmail = email.toLowerCase();

    // Create the user

    await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        name,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(lowerCaseEmail);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "User created successfully" };
  } catch (error) {
    console.error(error);
    return { error: " An error occured" };
  }
};
