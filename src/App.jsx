import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
import SignUpPage from './components/SignUp';
import Home from './components/IntervUHome';
// import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-primary dark:text-white transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
