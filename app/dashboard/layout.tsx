import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

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

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`${inter.className} antialiased`}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 p-2">{children}</main>
          </div>
        </div>
      </SidebarProvider>
      <Toaster richColors closeButton />
    </div>
  );
}
