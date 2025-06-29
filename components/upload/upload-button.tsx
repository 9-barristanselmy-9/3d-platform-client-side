"use client";

import { Upload } from "lucide-react";
import Link from "next/link";

interface UploadButtonProps {
  className?: string;
}

export const UploadButton = ({ className = "" }: UploadButtonProps) => {
  return (
    <Link
      href="/dashboard/upload"
      className={`hover:bg-[#00ffcc] p-2 rounded-sm flex flex-row gap-1 items-center text-sm font-medium ${className}`}
    >
      <Upload className="w-5 h-5" />
      <span>Upload</span>
    </Link>
  );
};
