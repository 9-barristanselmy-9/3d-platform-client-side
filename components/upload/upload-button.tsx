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
      className={`bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded-full flex items-center space-x-2 text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-slate-900/25 ${className}`}
    >
      <Upload className="w-4 h-4" />
      <span>Upload</span>
    </Link>
  );
};
