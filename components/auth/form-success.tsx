import { CheckCheckIcon } from "lucide-react";
import React from "react";

interface formSuccessProp {
  message?: string;
}
export const FormSuccess = ({ message }: formSuccessProp) => {
  if (!message) return null;
  return (
    <div className="flex space-x-4 items-center p-2 rounded-lg text-green-500 bg-green-500/30">
      <CheckCheckIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
