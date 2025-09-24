import React from "react";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col space-y-4 items-center justify-center">
      <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mb-2">
        <span className="text-white font-bold text-lg">3D</span>
      </div>
      <h1 className="text-2xl font-light text-slate-800 tracking-wide">Welcome</h1>
      <p className="text-slate-600 text-sm leading-relaxed max-w-xs text-center">{label}</p>
    </div>
  );
};
