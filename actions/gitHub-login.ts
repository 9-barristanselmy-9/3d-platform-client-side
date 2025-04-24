"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function githubAuthenticate() {
  try {
    await signIn("github");
  } catch (error) {
    if (error instanceof AuthError) {
      return "github log in failed";
    }
    throw error;
  }
}
