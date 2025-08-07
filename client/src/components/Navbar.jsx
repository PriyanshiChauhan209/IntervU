import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white text-primary dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Brand */}
      <div className="text-2xl font-bold">IntervU</div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">

        {/* Auth Buttons */}
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primaryDark">
              Login
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primaryDark">
              Register
            </button>
          </SignUpButton>
        </SignedOut>

        {/* User Avatar when signed in */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-primary text-white hover:bg-primaryDark"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
