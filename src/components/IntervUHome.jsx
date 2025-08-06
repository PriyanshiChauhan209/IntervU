import React from "react";
import { motion } from "framer-motion";
import { Briefcase, UserCheck, FileText, Mic, BookOpen, Globe } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Basic Card component

const Card = ({ children }) => (
  <div className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 transition-colors duration-300">

    {children}
  </div>
);

// Basic CardContent wrapper
const CardContent = ({ children }) => (
  <div className="flex flex-col items-start space-y-4">
    {children}
  </div>
);

// Basic Button component
const Button = ({ children, className }) => (
  <button className={`px-6 py-3 text-lg font-semibold rounded-2xl shadow-md ${className}`}>
    {children}
  </button>
);

const features = [
  {
    title: "Mock Interviews",
    description: "Practice unlimited mock interviews tailored to your domain (Tech, HR, etc.)",
    icon: <UserCheck className="h-8 w-8 text-primary" />,
  },
  {
    title: "AI Resume Feedback",
    description: "Upload your resume and get AI-generated suggestions based on job profiles.",
    icon: <FileText className="h-8 w-8 text-primary" />,
  },
  {
    title: "Voice Interaction",
    description: "Talk to IntervU like a real interviewer using natural language voice input.",
    icon: <Mic className="h-8 w-8 text-primary" />,
  },
  {
    title: "Question Bank",
    description: "Access a curated set of domain-specific questions and model answers.",
    icon: <BookOpen className="h-8 w-8 text-primary" />,
  },
  {
    title: "Global Access",
    description: "Built for accessibility with multilingual support and responsive design.",
    icon: <Globe className="h-8 w-8 text-primary" />,
  },
  {
    title: "Career Insights",
    description: "Get analytics on performance, keyword match, and readiness score.",
    icon: <Briefcase className="h-8 w-8 text-primary" />,
  },
];

export default function IntervUHome() {
  return (
      
 <div className="min-h-screen bg-white text-primary dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar /> 
    
   <main className="min-h-screen bg-white dark:bg-gray-900 px-6 py-12 transition-colors duration-300">
  <div className="max-w-7xl mx-auto text-center">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
      Prep, Practice & Ace Interviews with <span className="text-primary">IntervU</span>
    </h1>
    <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      AI-powered mock interviews, resume insights, and real-time feedback — everything you need to crack your dream job.
    </p>
    <Button className="mt-6 bg-primary text-white hover:bg-primaryDark">
      Get Started
    </Button>
  </div>

  <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {features.map((item, idx) => (
      <motion.div
        key={idx}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card>
          <CardContent>
            {item.icon}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
</main>

       <Footer />
     </div> 
  );
}
