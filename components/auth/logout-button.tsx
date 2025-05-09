"use client";

import { Button } from "../ui/button";
import { logout } from "@/actions/logout";

export const LogoutButton = () => {
  const onClick = () => {
    logout();
  };

  return (
    <Button onClick={onClick} className="text-white w-full">
      Logout
    </Button>
  );
};
