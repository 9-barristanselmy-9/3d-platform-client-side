import React from "react";
import NavBar from "./_components/navbar";
import SettingsHeader from "./_components/settings-header";
import { SettingsSidebar } from "./_components/setting-side-bar";

interface SettingLayoutProps {
  children: React.ReactNode;
}

const SettingLayout = ({ children }: SettingLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#f2f2f2] flex flex-col">
      <NavBar />
      
      <div className="flex-1 flex flex-col mx-24">
        <div className="container p-4 sm:p-6">
          <SettingsHeader title={"My Settings"} />
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - fixed width */}
          <div className="hidden md:block w-56 lg:w-64 p-4 border-r border-gray-200 overflow-y-auto">
            <SettingsSidebar />
          </div>
          
          {/* Main content area - flexible width */}
          <div className="flex-1 p-4 sm:p-6 bg-white overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;