
import React from "react";
import SettingsHeader from "../_components/settings-header";
import ProfileSettingsForm from "../_components/form/profile-settings-form";

const SettingsProfilefPage = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-6">
      <SettingsHeader title={"Edit your profile"} />
      <ProfileSettingsForm />
    </div>
  );
};

export default SettingsProfilefPage;
