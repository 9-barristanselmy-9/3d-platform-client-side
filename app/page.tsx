import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Navigation */}
      <nav className="w-full px-8 py-6 flex justify-between items-center">
        <div className="text-2xl font-light tracking-wide text-slate-800">
          3D Platform
        </div>
        <LoginButton mode="modal" asChild>
          <Button
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-2 font-medium tracking-wide"
          >
            Sign In
          </Button>
        </LoginButton>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-extralight text-slate-900 leading-tight tracking-tight">
              The Future of
              <span className="block font-light text-slate-600">
                3D Creation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
              Build, explore, and share immersive 3D experiences with precision
              and elegance.
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-8">
            <LoginButton mode="modal" asChild>
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white px-12 py-4 text-lg font-medium tracking-wide rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Creating
              </Button>
            </LoginButton>

            <p className="text-sm text-slate-500 font-light">
              Join thousands of creators • Free to start
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-8 text-center">
        <p className="text-sm text-slate-400 font-light">
          Crafted for professionals who demand excellence
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
