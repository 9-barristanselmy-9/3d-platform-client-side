import { Toaster } from "@/components/ui/sonner";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-background-secondary h-screen flex justify-center items-center">
      {children}
      <Toaster />
    </div>
  );
};

export default layout;
