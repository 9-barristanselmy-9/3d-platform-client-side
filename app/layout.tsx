import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";

const SpaceGrotesk = localFont({
  src: [
    { path: "/fonts/SpaceGrotesk-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/SpaceGrotesk-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "/fonts/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    { path: "/fonts/SpaceGrotesk-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "3D Platform",
  description: "A 3D platform showcasing the art of 3D design.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${SpaceGrotesk.className} ${inter.className} antialiased`}
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
