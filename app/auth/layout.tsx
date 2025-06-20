import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-[linear-gradient(180deg,_rgba(0,255,255,1)_0%,_rgba(128,128,188,1)_55%,_rgba(255,0,122,0.7)_100%)] h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default layout;
