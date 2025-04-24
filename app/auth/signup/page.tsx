import RegisterForm from "@/components/auth/register-form";
import React from "react";

function SignupPage() {
  return (
    <div>
      <div className="flex h-full items-center justify-center bg-background-secondary p-6 md:p-10">
        <div className="flex items-center w-full max-w-sm md:max-w-3xl">

            <RegisterForm/>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
