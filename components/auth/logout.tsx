"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export default function Logout() {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut({ callbackUrl: "/login" })} // Redirect after logout
      className="flex items-center gap-2"
    >
      <LogOut className="size-4" />
      Logout
    </Button>
  );
}
