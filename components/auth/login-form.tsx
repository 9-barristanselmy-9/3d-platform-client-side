import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import DiscordSignIn from "./discord-signin";
import GithubSignIn from "./github-signin";

import GoogleSignIn from "./google-signin";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
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
              </div>
              <form className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full text-white">
                    Login
                  </Button>
                </div>
              </form>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <DiscordSignIn />
                <GithubSignIn />
                <GoogleSignIn />
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
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
