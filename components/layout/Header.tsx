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


const Header = () => {
  const user = useCurrentUser();

  return (
    <header className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-md px-8 py-6 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">3D</span>
        </div>
        <span className="text-xl font-light tracking-wide text-slate-800 hidden sm:block">
          Platform
        </span>
      </Link>

      {/* Search Bar */}
      <div className="flex-1 max-w-lg mx-8 hidden md:block">
        <Input 
          placeholder="Search models, creators..." 
          className="border-slate-200 bg-slate-50/50 focus:bg-white transition-colors duration-200 rounded-full px-6 py-3 text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="sm"
          className="relative p-3 hover:bg-slate-50 rounded-full text-slate-600 hover:text-slate-800 transition-colors duration-200"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* Upload Button */}
        <UploadButton />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center space-x-3 hover:bg-slate-50 rounded-full p-2 transition-colors duration-200">
              <Avatar className="w-9 h-9 border-2 border-slate-200">
                <AvatarImage src={user?.image || ""} alt="User" />
                <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-500">Creator</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 border-slate-200 shadow-lg">
            <DropdownMenuLabel className="text-slate-700">
              <div className="flex flex-col space-y-1">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-slate-500 font-normal">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="text-slate-700 hover:bg-slate-50 cursor-pointer py-3">
              <Link href="/dashboard/profile" className="flex items-center space-x-2 w-full">
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-700 hover:bg-slate-50 cursor-pointer py-3">
              <Link href="/dashboard/settings" className="flex items-center space-x-2 w-full">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="text-red-600 hover:bg-red-50 cursor-pointer py-3">
              <LogoutButton/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
