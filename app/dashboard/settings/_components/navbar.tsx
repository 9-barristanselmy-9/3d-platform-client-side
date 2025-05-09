// components/Navbar.js
import React from "react";
import Logo from "./logo";
import ProfileDropdown from "./profile-dropdown";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
