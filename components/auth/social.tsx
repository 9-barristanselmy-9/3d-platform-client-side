"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github" | "discord") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-slate-500 font-medium">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button
          size="lg"
          variant="outline"
          className="w-full h-12 bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
          onClick={() => onClick("google")}
        >
          <FcGoogle className="w-5 h-5 mr-3" />
          Continue with Google
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full h-12 bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
          onClick={() => onClick("github")}
        >
          <FaGithub className="w-5 h-5 mr-3" />
          Continue with GitHub
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full h-12 bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-all duration-200 hover:shadow-md"
          onClick={() => onClick("discord")}
        >
          <FaDiscord className="w-5 h-5 mr-3 text-indigo-500" />
          Continue with Discord
        </Button>
      </div>
    </div>
  );
};
