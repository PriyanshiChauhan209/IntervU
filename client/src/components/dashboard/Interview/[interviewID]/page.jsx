import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; 
import { Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

const InterviewPage = () => {
  const { interviewId } = useParams();
  const [interview, setInterview] = useState(null);
  const [webCamEnable, setWebCamEnable] = useState(false);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/interviews/${interviewId}`
        );
        const data = await res.json();
        setInterview(data[0]);
      } catch (err) {
        console.error("Error fetching interview:", err);
      }
    };
    fetchInterview();
  }, [interviewId]);

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="font-bold text-3xl">Let's Get Started</h2>
        <p className="text-gray-500 mt-1">
          Prepare yourself before we begin the interview
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Left Side - Job Info */}
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-xl border shadow-sm min-h-[200px]">
              {interview ? (
                <div className="space-y-3">
                  <h2 className="text-lg">
                    <strong>Job Role/Job Position:</strong>{" "}
                    {interview.jobPosition}
                  </h2>
                  <h2 className="text-lg">
                    <strong>Job Description/Tech Stack:</strong>{" "}
                    {interview.jobDesc}
                  </h2>
                  <h2 className="text-lg">
                    <strong>Years of Experience:</strong>{" "}
                    {interview.jobExperience}
                  </h2>
                </div>
              ) : (
                <p>Loading interview details...</p>
              )}
            </div>

            <div className="p-6 border-2 border-dashed rounded-xl border-primaryDark bg-primary text-white shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb />
                <strong>Information</strong>
              </div>
              <p className="text-sm">
                {import.meta.env.VITE_PUBLIC_INFORMATION}
              </p>
            </div>
          </div>

          {/* Right Side - Webcam */}
          <div className="flex flex-col items-center justify-center gap-4">
            {webCamEnable ? (
              <Webcam
                audio={false}
                mirrored={true}
                onUserMedia={() => setWebCamEnable(true)}
                onUserMediaError={() => setWebCamEnable(false)}
                className="rounded-lg border w-full max-w-sm aspect-square object-cover" // 👈 reduced from max-w-md to max-w-sm
              />
            ) : (
              <>
                <div className="w-full max-w-sm aspect-square flex items-center justify-center border rounded-lg bg-gray-100 dark:bg-gray-800">
                  <WebcamIcon className="h-20 w-20 text-gray-500" /> {/* smaller icon */}
                </div>
                <Button
                  className="bg-primary text-white"
                  onClick={() => setWebCamEnable(true)}
                >
                  Enable Web Camera & Microphone
                </Button>
              </>
            )}

            {/* Start Interview button under webcam */}
            <Link to={'/dashboard/interview/' + interviewId + '/start'}>
  <Button
          size="lg"
          className="px-6 py-3 text-lg font-semibold bg-primary text-white hover:bg-primary/90"
        >
    Start Interview
  </Button>
</Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
