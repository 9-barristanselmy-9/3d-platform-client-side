"use client";
import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { LogoutButton } from "../auth/logout-button";
import Link from "next/link";
import { UploadButton } from "../upload/upload-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";

const Header = () => {
  const user = useCurrentUser();

  return (
    <header className="w-full shadow-sm bg-white px-4 py-2 flex items-center justify-between">
      <Link href="/dashboard">
        <Image
          src="/assets/images/logo.jpg"
          alt="MyLogo"
          width={40}
          height={40}
          priority
        />
      </Link>
      <div className="flex-1 max-w-md px-4 hidden sm:block">
        <Input placeholder="Search..." />
      </div>
      <div className="flex items-center gap-4">
        <Button className="hover:bg-gray-100 p-2 rounded-full bg-white">
          <Bell className="w-5 h-5" />
        </Button>
        <UploadButton />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.image} alt="User" />
              <AvatarFallback>MO</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
