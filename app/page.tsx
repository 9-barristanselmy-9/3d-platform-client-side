import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center  bg-[linear-gradient(180deg,_rgba(0,255,255,1)_0%,_rgba(128,128,188,1)_55%,_rgba(255,0,122,0.7)_100%)]">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">
          The Leading Platform for 3D & AR on the Web
        </h1>
        <p className="text-lg my-2">
          Build, explore, and share immersive 3D experiences.
        </p>
        <LoginButton mode="modal" asChild >
          <Button size="lg" className="uppercase">
            join for free 
          </Button>
        </LoginButton>
      </div>
    </div>
  );
};

export default LandingPage;
