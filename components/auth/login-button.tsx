"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LoginForm } from "./login-form";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
  variant = "primary",
  className = "",
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl hover:shadow-slate-900/25";
      case "secondary":
        return "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 shadow-sm hover:shadow-md";
      case "ghost":
        return "text-slate-600 hover:text-slate-800 hover:bg-slate-50";
      default:
        return "bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl hover:shadow-slate-900/25";
    }
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {asChild ? (
            <div className={`cursor-pointer ${className}`}>
              {children}
            </div>
          ) : (
            <button 
              className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${getVariantClasses()} ${className}`}
            >
              {children}
            </button>
          )}
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none max-w-md">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${getVariantClasses()} ${className}`}
    >
      {children}
    </button>
  );
};

export default LoginButton;
