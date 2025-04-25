"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/types/validation/registerSchema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { register } from "@/actions/register";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true);
    try {
      const res = await register(data);

      if (res.error) {
        setError(res.error);
        setSuccess("");
        return;
      }

      if (res.success) {
        setSuccess(res.success);
        router.push("/auth/login");
        setError("");
      }
    } catch (err) {
      setError(`Something went wrong. Please try again ${err}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-6 w-full  sm:min-w-[400px] h-full  mx-auto">
      <Card className="overflow-hidden w-full h-full mx-auto">
        <div className="relative flex justify-center items-center w-full">
          <button
            onClick={() => router.push("/auth/login")}
            className="absolute left-0 ml-4 p-2 hover:opacity-80 transition"
            aria-label="Go back to login"
          >
            <ArrowLeft className="ml-5" />
          </button>

          <CardHeader className="flex justify-center items-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
          </CardHeader>
        </div>
        <CardContent className="flex flex-col h-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=" johndoe@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ConfirmPassword</FormLabel>
                    <FormControl>
                      <Input placeholder="*******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSuccess message={success} />
              <FormError message={error} />
              <Button
                type="submit"
                className="w-full text-white"
                disabled={loading}
              >
                {loading ? "Loading..." : "Resister"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;
