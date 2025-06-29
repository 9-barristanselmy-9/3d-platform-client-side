import UploadCard from "@/components/upload/upload-card";
import { currentUser } from "@/lib/server";
import React from "react";

const UploadPage = async () => {
  const user = await currentUser();
  if (!user) return null;
  return (
    <div className="py-10 px-4">
      <UploadCard />
    </div>
  );
};

export default UploadPage;
