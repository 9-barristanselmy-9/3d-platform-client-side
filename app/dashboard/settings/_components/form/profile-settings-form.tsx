"use client";

import * as z from "zod";
import { SettingsSchema } from "@/types/validation/settingSchema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Lock, Shield, Save } from "lucide-react";

const ProfileSettingsForm = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data?.error) setError(data.error);
          if (data?.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Profile Section Header */}
      <div className="mb-10 animate-in fade-in-0 slide-in-from-top-4 duration-500 delay-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center transition-all duration-300 hover:bg-slate-200 hover:scale-105">
            <User className="w-6 h-6 text-slate-600 transition-colors duration-200" />
          </div>
          <div>
            <h2 className="text-2xl font-light text-slate-800 tracking-tight">
              Profile Information
            </h2>
            <p className="text-slate-600 font-light">
              Update your personal details and security settings
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-left-4 duration-600 delay-200">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-slate-200 hover:scale-105">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="text-lg font-medium text-slate-800">
                Basic Information
              </h3>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3 group">
                  <FormLabel className="text-sm font-medium text-slate-700 tracking-wide transition-colors duration-200 group-focus-within:text-slate-900">
                    Display Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your full name"
                      disabled={isPending}
                      className="h-12 px-4 bg-slate-50/50 border-slate-200 rounded-xl focus:bg-white focus:border-slate-400 transition-all duration-200 text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:shadow-lg focus:shadow-slate-200/50"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm animate-in fade-in-0 slide-in-from-top-2 duration-300" />
                </FormItem>
              )}
            />
          </div>

          {/* Security Section */}
          {user?.isOauth === false && (
            <div className="space-y-6 pt-8 border-t border-slate-200 animate-in fade-in-0 slide-in-from-right-4 duration-600 delay-300">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-slate-200 hover:scale-105">
                  <Shield className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-800">
                  Security Settings
                </h3>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-3 group">
                    <FormLabel className="text-sm font-medium text-slate-700 tracking-wide flex items-center space-x-2 transition-colors duration-200 group-focus-within:text-slate-900">
                      <Mail className="w-4 h-4 transition-transform duration-200 group-focus-within:scale-110" />
                      <span>Email Address</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="your.email@example.com"
                        type="email"
                        disabled={isPending}
                        className="h-12 px-4 bg-slate-50/50 border-slate-200 rounded-xl focus:bg-white focus:border-slate-400 transition-all duration-200 text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:shadow-lg focus:shadow-slate-200/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm animate-in fade-in-0 slide-in-from-top-2 duration-300" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-3 group">
                      <FormLabel className="text-sm font-medium text-slate-700 tracking-wide flex items-center space-x-2 transition-colors duration-200 group-focus-within:text-slate-900">
                        <Lock className="w-4 h-4 transition-transform duration-200 group-focus-within:scale-110" />
                        <span>Current Password</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter current password"
                          type="password"
                          disabled={isPending}
                          className="h-12 px-4 bg-slate-50/50 border-slate-200 rounded-xl focus:bg-white focus:border-slate-400 transition-all duration-200 text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:shadow-lg focus:shadow-slate-200/50"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm animate-in fade-in-0 slide-in-from-top-2 duration-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-3 group">
                      <FormLabel className="text-sm font-medium text-slate-700 tracking-wide flex items-center space-x-2 transition-colors duration-200 group-focus-within:text-slate-900">
                        <Lock className="w-4 h-4 transition-transform duration-200 group-focus-within:scale-110" />
                        <span>New Password</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter new password"
                          type="password"
                          disabled={isPending}
                          className="h-12 px-4 bg-slate-50/50 border-slate-200 rounded-xl focus:bg-white focus:border-slate-400 transition-all duration-200 text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:shadow-lg focus:shadow-slate-200/50"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm animate-in fade-in-0 slide-in-from-top-2 duration-300" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Two-Factor Authentication */}
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md group">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <FormLabel className="text-base font-medium text-slate-800 flex items-center space-x-2 transition-colors duration-200 group-hover:text-slate-900">
                          <Shield className="w-5 h-5 text-slate-600 transition-all duration-200 group-hover:text-slate-700 group-hover:scale-105" />
                          <span>Two-Factor Authentication</span>
                        </FormLabel>
                        <FormDescription className="text-slate-600 font-light leading-relaxed transition-colors duration-200 group-hover:text-slate-700">
                          Add an extra layer of security to your account with
                          two-factor authentication
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-slate-800 transition-all duration-300 hover:scale-105"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Messages */}
          <div className="space-y-4">
            {error && (
              <div className="animate-in fade-in-0 slide-in-from-top-4 duration-400">
                <FormError message={error} />
              </div>
            )}
            {success && (
              <div className="animate-in fade-in-0 slide-in-from-top-4 duration-400">
                <FormSuccess message={success} />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-8 border-t border-slate-200 animate-in fade-in-0 slide-in-from-bottom-4 duration-600 delay-400">
            <Button
              type="submit"
              disabled={isPending}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-slate-900/25 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 group"
            >
              <div className="flex items-center space-x-2">
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>Save Changes</span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSettingsForm;
