import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        const res = await fetch(`http://localhost:4000/api/interviews/${interviewId}`);
        const data = await res.json();
        setInterview(data[0]);
      } catch (err) {
        console.error("Error fetching interview:", err);
      }
    };
    fetchInterview();
  }, [interviewId]);

  return (
    <div className="min-h-screen flex flex-col justify-between p-6">
      {/* Heading */}
      <div className="text-center">
        <h2 className="font-bold text-3xl">Let's Get Started</h2>
        <p className="text-gray-500 mt-1">Prepare yourself before we begin the interview</p>
      </div>

      {/* Content */}
      <div className="flex justify-center flex-1 items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
          
          {/* Left Side - Job Info */}
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-xl border shadow-sm">
              {interview ? (
                <>
                  <h2 className="text-lg"><strong>Job Role:</strong> {interview.jobPosition}</h2>
                  <h2 className="text-lg"><strong>Tech Stack:</strong> {interview.jobDesc}</h2>
                  <h2 className="text-lg"><strong>Experience:</strong> {interview.jobExp}</h2>
                </>
              ) : (
                <p>Loading interview details...</p>
              )}
            </div>

            <div className="p-6 border-2 border-dashed rounded-xl border-primaryDark bg-primary text-white shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb />
                <strong>Information</strong>
              </div>
              <p className="text-sm">{import.meta.env.VITE_PUBLIC_INFORMATION}</p>
            </div>
          </div>

         
          <div className="flex flex-col items-center justify-center  ">
            {webCamEnable ? (
              <Webcam
                audio={false}
                mirrored={true}
                onUserMedia={() => setWebCamEnable(true)}
                onUserMediaError={() => setWebCamEnable(false)}
                className="rounded-lg border"
                style={{ height: 300, width: 300 }}
              />
            ) : (
              <>
                <WebcamIcon className="h-72 w-full my-4 p-20 rounded-lg border" />
                <Button className="text-white" onClick={() => setWebCamEnable(true)}>
                  Enable Web Camera & Microphone
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
<div className="flex justify-end">
  <Button size="lg" className="px-2 py-4 text-lg font-semibold ml-10">
    Start Interview
  </Button>
</div>
      
    </div>
  );
};

export default InterviewPage;
