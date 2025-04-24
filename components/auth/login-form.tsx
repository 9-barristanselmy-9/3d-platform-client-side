"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/types/validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/actions/login";
import { FormError } from "./form-error";
import GoogleLogIn from "./google-button";
import DiscordLogIn from "./discord-button";
import GitHubLogIn from "./github-button";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    login(data).then((res) => {
      if (res.error) {
        setLoading(false);
        setError(res.error);
      }
      if (res.success) {
        setLoading(false);
        setError("");
      }
      setLoading(false);
    });
  };
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
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold">Login</h1>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="pt-5 pb-2 md:p-6"
                >
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Email"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="*******"
                                type="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormError message={error} />
                    <Button
                      type="submit"
                      className="w-full text-white"
                      disabled={loading}
                    >
                      {loading ? "Loading...." : "Login"}
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="flex justify-center items-center">
                <div className="grid grid-cols-3 gap-3">
                  <GoogleLogIn />
                  <DiscordLogIn />
                  <GitHubLogIn />
                </div>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="underline underline-offset-4"
                >
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
