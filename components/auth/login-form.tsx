import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import DiscordSignIn from "./discord-signin";
import GithubSignIn from "./github-signin";

import GoogleSignIn from "./google-signin";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full h-full max-w-5xl mx-auto",
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden w-full h-full mx-auto">
        <CardContent className="grid p-0 md:grid-cols-2 h-full">
          <div className="p-6 md:p-12 flex flex-col justify-center items-center h-full">
            <div className="flex flex-col gap-6 justify-center items-center">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Log in with your Google account
                </p>
              </div>
              <div className="flex flex-col justify-center items-center  gap-2">
                <DiscordSignIn />
                <GithubSignIn />
                <GoogleSignIn />
              </div>
            </div>
          </div>
          <div className="relative hidden bg-muted md:block ">
            <Image
              src="/assets/log-in.png"
              alt="Image"
              width={1000}
              height={1000}
              priority
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary mt-6">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
