"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function discordAuthenticate() {
  try {
    await signIn("discord");
  } catch (error) {
    if (error instanceof AuthError) {
      return "discord log in failed";
    }
    throw error;
  }
}
