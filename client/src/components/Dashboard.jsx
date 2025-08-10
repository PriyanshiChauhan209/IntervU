"use client";
import React from "react";
import Navbar from "./Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";

const Dashboard = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [jobPosition, setJobPosition] = React.useState("");
  const [jobDesc, setJobDesc] = React.useState("");
  const [jobExp, setJobExp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [jsonResponse, setJsonResponse] = React.useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setJsonResponse([]);

    const prompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Year of experience: ${jobExp}, Depend on this Information please give 5 Interview Questions with answer in JSON format with question and answer fields.`;

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API error: ${response.status} - ${errText}`);
      }

      const data = await response.json();
      console.log("Full API response:", data);

      const responseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      let MockResponse = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      MockResponse = MockResponse.replace(/[\u0000-\u0019]+/g, "");

      const jsonMatch = MockResponse.match(/\[.*\]/s);

      if (!jsonMatch) throw new Error("Could not parse JSON from response");

      let parsedQuestions = null;
      try {
        parsedQuestions = JSON.parse(jsonMatch[0]);
        if (
          !parsedQuestions ||
          !Array.isArray(parsedQuestions) ||
          parsedQuestions.length === 0
        ) {
          setError("No valid interview questions generated. Please try again.");
          setLoading(false);
          return;
        }
        setJsonResponse(parsedQuestions);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        console.log("JSON string:", jsonMatch[0]);
        setError("Failed to parse interview questions JSON. Please try again.");
        setLoading(false);
        return;
      }

      const saveResponse = await fetch(
        "http://localhost:4000/api/saveInterview",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jobPosition,
            jobDesc,
            jobExp,
            questions: parsedQuestions,
            createdBy: user?.primaryEmailAddress?.emailAddress,
          }),
        }
      );

      if (!saveResponse.ok) {
        const errData = await saveResponse.json();
        throw new Error(errData.message || "Failed to save interview data");
      }

      const saveData = await saveResponse.json();
      console.log("Data saved to database successfully!", saveData.mockId);

      if (saveData?.mockId) {
        setOpenDialog(false);
        navigate("/components/dashboard/Interview/" + saveData.mockId);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-primary dark:text-white transition-colors duration-300">
      {/* <Navbar /> */}

      <div className="p-8 space-y-6 ">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-700 dark:text-gray-300">
          This is where your mock interviews and features will appear.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          <div 
            onClick={() => setOpenDialog(true)}
            className="border-2 border-dashed border-primary rounded-xl p-10 bg-white dark:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center"
          >
            <h2 className="font-bold text-xl text-primary dark:text-white ">
              + Add New
            </h2>
          </div>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <DialogHeader>
    <DialogTitle className="text-2xl">
      Tell us more about job interviewing
    </DialogTitle>
    <DialogDescription>
      Add details for your new mock interview session here.
    </DialogDescription>
  </DialogHeader>

  <form onSubmit={onSubmit} className="mt-6 space-y-4">
    <div>
      <label>Job Role/Job Position</label>
      <Input
        placeholder="Ex. Full Stack Developer"
        required
        value={jobPosition}
        onChange={(event) => setJobPosition(event.target.value)}
      />
    </div>

    <div>
      <label>Job Description/Tech Stack</label>
      <Textarea
        placeholder="Ex. React , Machine Learning"
        required
        value={jobDesc}
        onChange={(event) => setJobDesc(event.target.value)}
      />
    </div>

    <div>
      <label>Years of Experience</label>
      <Input
        placeholder="Ex. 5"
        type="number"
        max={50}
        value={jobExp}
        onChange={(event) => setJobExp(event.target.value)}
      />
    </div>

    <div className="flex gap-5 justify-end">
      <button
        type="button"
        onClick={() => setOpenDialog(false)}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <LoaderCircle className="animate-spin" />
            Generating
          </span>
        ) : (
          "Start Interview"
        )}
      </button>
    </div>
  </form>
</DialogContent>

          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;