// lib/auth/signIn.ts
import { signIn as nextAuthSignIn } from "@/lib/auth";
import { toast } from "sonner";

export const signIn = async (provider: string, redirectTo: string) => {
  const res = await nextAuthSignIn(provider, {
    redirect: false,
    callbackUrl: redirectTo,
  });

  if (res?.error) {
    if (res.error.includes("OAuthAccountNotLinked")) {
      toast(
        "🚫 This email is already linked to another provider. Please use that provider to sign in."
      );
    } else {
      toast.error("An error occurred. Please try again.");
    }
  } else {
    // Check if we're in the browser before accessing window
    if (typeof window !== "undefined") {
      window.location.href = redirectTo; // Or custom logic
    }
  }
};
