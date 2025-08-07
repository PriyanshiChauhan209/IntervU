import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from './components/SignUp';
import Home from './components/IntervUHome';
import Dashboard from './components/Dashboard'; // ✅ Add this

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-primary dark:text-white transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ New Route */}
      </Routes>
    </div>
  );
}

export default App;
