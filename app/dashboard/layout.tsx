import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "3D Platform",
  description: "A 3D platform showcasing the art of 3D design.",
};

export default function SettingLayout({ children }: { children: ReactNode }) {
  return (
    <body className={` ${inter.className} antialiased `}>
      {children}
    </body>
  );
}
