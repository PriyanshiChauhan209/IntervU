import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from './components/SignUp';
import Home from './components/IntervUHome';
import Dashboard from './components/Dashboard';
import InterviewPage from "./components/dashboard/Interview/[interviewID]/page";
import StartInterview from "./components/dashboard/Interview/[interviewID]/start/page"; // ✅ import StartInterview
import FeedbackPage from "./components/dashboard/Interview/[interviewID]/feedback/page";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-primary dark:text-white transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/interview/:interviewId" element={<InterviewPage />} /> {/* interview info page */}
        <Route path="/dashboard/interview/:interviewId/start" element={<StartInterview />} /> {/* ✅ start interview page */}
        <Route path="/dashboard/interview/:interviewId/feedback" element={<FeedbackPage />} />
      </Routes>
    </div>
  );
}

export default App;
