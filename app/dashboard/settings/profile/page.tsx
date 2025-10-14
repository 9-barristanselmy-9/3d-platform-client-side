import React from "react";
import SettingsHeader from "../_components/settings-header";
import ProfileSettingsForm from "../_components/form/profile-settings-form";

const SettingsProfilefPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Premium Container */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <SettingsHeader title="Edit your profile" />
          <div className="h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 mt-8"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden">
          <div className="p-8 md:p-12">
            <ProfileSettingsForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfilefPage;
