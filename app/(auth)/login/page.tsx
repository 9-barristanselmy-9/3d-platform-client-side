import { LoginForm } from "@/components/auth/login-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full items-center justify-center bg-background-secondary p-6 md:p-10">
      <div className="flex items-center w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
