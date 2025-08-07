import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-6 shadow-inner transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-lg font-semibold text-primary dark:text-white">
          © {new Date().getFullYear()} IntervU
        </div>
        <div className="mt-2 sm:mt-0 text-sm text-center sm:text-left">
          Built with ❤️ for Mock Interviews & Learning
        </div>
      </div>
    </footer>
  );
};

export default Footer;
