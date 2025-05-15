"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SettingsSidebarProps {
  className?: string;
}

export const SettingsSidebar = ({ className }: SettingsSidebarProps) => {
  const pathname = usePathname();

  console.log("cuurent path", pathname);
  const menuItems = [
    { name: "PROFILE", path: "/dashboard/settings/profile" },
    // { name: "EMAIL", path: "/settings/email" },
    // { name: "PASSWORD & API", path: "/settings/password" },
    // { name: "NOTIFICATIONS", path: "/settings/notifications" },
    // { name: "CONNECTED ACCOUNTS", path: "/settings/connected-accounts" },
    // { name: "ACCOUNT", path: "/settings/account" },
  ];

  return (
    <nav
      className={`flex flex-col space-y-1 px-4 sm:px-6 lg:px-8 mb-6 ${className}`}
    >
      {menuItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors rounded-md ${
              isActive
                ? "bg-primary-neon text-black font-semibold"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};
