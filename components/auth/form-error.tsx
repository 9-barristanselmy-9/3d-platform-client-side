import { Ban } from "lucide-react";
import React from "react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="flex space-x-4 items-center p-2 rounded-lg text-red-500 bg-red-500/30">
      <Ban className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
