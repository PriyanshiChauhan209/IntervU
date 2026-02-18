"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Mic, StopCircle } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendMessage } from "@/lib/GeminiAiModel";
import { useUser } from "@clerk/clerk-react";

function RecordAnswerSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewId,
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
      setUserAnswer((prev) => prev + " " + latestResult.transcript);
    }
  }, [results]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer?.length < 10) {
        toast.error("Answer too short. Please try again.");
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
        setLoading(true);

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
              question:
                mockInterviewQuestions[activeQuestionIndex]?.question,
              correctAns:
                mockInterviewQuestions[activeQuestionIndex]?.answer,
              userAns: userAnswer,
              feedback: mockJsonResp.feedback,
              rating: String(mockJsonResp.rating),
              userEmail: user?.primaryEmailAddress?.emailAddress,
            }),
          }
        );

        toast.success("Answer saved successfully ✅");
        setUserAnswer("");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Webcam */}
      <div className="flex flex-col mt-16 items-center bg-black rounded p-6 relative w-full max-w-3xl h-[380px]">
        <img
          src="/webcam.png"
          width={200}
          height={200}
          alt="Webcam placeholder"
          className="absolute z-0"
        />

        <Webcam
          audio={false}
          mirrored
          className="rounded-lg object-cover z-10 w-full h-full"
        />
      </div>

      {/* Record Button */}
      <div className="mt-8 w-full max-w-3xl flex justify-center">
        <Button
  disabled={loading}
  onClick={SaveUserAnswer}
  className="w-1/3 bg-primaryDark hover:bg-primary text-white flex items-center justify-center gap-1 py-3 rounded-lg transition-all duration-200 active:scale-95"
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
      </div>
    </div>
  );
}

export default RecordAnswerSection;
