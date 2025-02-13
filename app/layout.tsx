import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${SpaceGrotesk.className} ${inter.className} antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
