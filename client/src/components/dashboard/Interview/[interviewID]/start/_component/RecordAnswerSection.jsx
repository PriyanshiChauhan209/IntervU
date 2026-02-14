"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Mic, StopCircle } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "@/components/ui/button"; // from shadcn-ui
import { toast } from "sonner";
import { sendMessage } from "@/lib/GeminiAiModel";
import { useUser } from "@clerk/clerk-react"; 


function RecordAnswerSection({ 
  mockInterviewQuestions, 
  activeQuestionIndex,
  setActiveQuestionIndex,
  interviewId
}) {
  const { user } = useUser();  
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);


  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const latestResult = results[results.length - 1];
      setUserAnswer((prevAns) => prevAns + " " + latestResult.transcript);
    }
  }, [results]);

const SaveUserAnswer = async () => {
  if (isRecording) {
    stopSpeechToText();

    if (userAnswer?.length < 10) {
      toast("Error while recording your message, Please try again");
      return;
    }

    const feedbackPrompt = `
Question: ${mockInterviewQuestions[activeQuestionIndex]?.question}

User Answer: ${userAnswer}

Return strictly valid JSON only:
{
  "rating": number (1-10),
  "feedback": "3-5 lines constructive feedback"
}
`;

    try {
      setLoading(true); // 🔥 start loading

      const responseText = await sendMessage(feedbackPrompt);

      const cleanedText = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const mockJsonResp = JSON.parse(cleanedText);

      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/interviews/save-answer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mockIdRef: interviewId,
            question: mockInterviewQuestions[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: mockJsonResp.feedback,
            rating: String(mockJsonResp.rating),
            userEmail: user?.primaryEmailAddress?.emailAddress,
          }),
        }
      );

      toast.success("Answer recorded successfully ✅");
      if (activeQuestionIndex < mockInterviewQuestions.length - 1) {
  setActiveQuestionIndex(prev => prev + 1);
}


      setUserAnswer("");

    } catch (err) {
      console.error("Save Error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false); // 🔥 stop loading
    }

  } else {
    startSpeechToText();
  }
};

const handleNext = () => {
  if (activeQuestionIndex < mockInterviewQuestions.length - 1) {
    setActiveQuestionIndex(prev => prev + 1);
  }
};

const handlePrevious = () => {
  if (activeQuestionIndex > 0) {
    setActiveQuestionIndex(prev => prev - 1);
  }
};

const handleEndInterview = () => {
  toast.success("Interview Completed 🎉");
  // later you can navigate to result page
};


  return (
    <div className="flex flex-col items-center justify-center">
      {/* Webcam container */}
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded p-5 relative w-full max-w-3xl h-[400px] px-6">
        {/* Placeholder image */}
        <img
          src="/webcam.png"
          width={200}
          height={200}
          alt="Webcam placeholder"
          className="absolute z-0"
        />

        {/* Live webcam feed */}
        <Webcam
          audio={false}
          mirrored={true}
          className="rounded-lg object-cover z-10 w-full h-full"
        />
      </div>

      {/* Buttons Section */}
      {/* Buttons Section */}
<div className="flex flex-col items-center mt-8 w-full">

  {/* Inner wrapper SAME width as webcam */}
  <div className="w-full max-w-3xl flex flex-col items-center gap-6">

    {/* Record Button */}
    <Button
      disabled={loading}
      onClick={SaveUserAnswer}
      className="w-3/4 bg-primary text-white hover:bg-primaryDark flex items-center justify-center gap-2 py-3 text-base font-semibold rounded-lg transition-all"
    >
      {loading ? (
        "Saving..."
      ) : isRecording ? (
        <>
          <StopCircle className="animate-pulse" />
          Stop Recording
        </>
      ) : (
        <>
          <Mic />
          Record Answer
        </>
      )}
    </Button>

    {/* Navigation Buttons */}
    <div className="flex gap-4 w-3/4 justify-center">

      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={activeQuestionIndex === 0 || loading}
        className="flex-1 border-primary text-primary hover:bg-primary hover:text-white transition-all"
      >
        Previous
      </Button>

      <Button
        variant="outline"
        onClick={handleNext}
        disabled={
          activeQuestionIndex === mockInterviewQuestions.length - 1 || loading
        }
        className="flex-1 border-primary text-primary hover:bg-primary hover:text-white transition-all"
      >
        Next
      </Button>

      <Button
        onClick={handleEndInterview}
        disabled={loading}
        className="flex-1 bg-primary text-white hover:bg-primaryDark transition-all"
      >
        End Interview
      </Button>

    </div>

  </div>
</div>


    </div>
  );
}

export default RecordAnswerSection;
