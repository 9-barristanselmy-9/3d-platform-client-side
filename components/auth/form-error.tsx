import { TriangleAlert } from "lucide-react";

import React from "react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="flex space-x-2 items-center p-2 rounded-lg text-red-500 bg-red-500/30">
      <TriangleAlert className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};
