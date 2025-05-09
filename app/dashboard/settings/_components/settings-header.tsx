import React from "react";

interface SettingsHeadProp {
  title: string;
}

const SettingsHeader = ({ title }: SettingsHeadProp) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-6">
      <h1 className=" lg:text-3xl sm:text-2xl font-normal">{title}</h1>
    </div>
  );
};

export default SettingsHeader;
