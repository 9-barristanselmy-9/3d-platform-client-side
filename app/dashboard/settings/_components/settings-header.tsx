import React from "react";

interface SettingsHeadProp {
  title: string;
}

const SettingsHeader = ({ title }: SettingsHeadProp) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-4">
        {title}
      </h1>
      <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
        Manage your account settings and preferences with elegant simplicity
      </p>
    </div>
  );
};

export default SettingsHeader;
