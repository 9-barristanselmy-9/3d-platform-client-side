import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isOauth?: boolean;
      isTwoFactorEnabled?: boolean;
    } & NextAuth.DefaultSession["user"];
  }

  interface User {
    isTwoFactorEnabled?: boolean;
    isOauth?: boolean;
  }

  interface JWT {
    sub?: string;
    isOauth?: boolean;
    isTwoFactorEnabled?: boolean;
  }
}
