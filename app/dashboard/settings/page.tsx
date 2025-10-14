import { redirect } from "next/navigation";

const SettingsPage = () => {
  // Redirect to the profile settings page as the default
  redirect("/dashboard/settings/profile");
};

export default SettingsPage;
