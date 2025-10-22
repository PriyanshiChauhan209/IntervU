"use client"
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Mic, StopCircle } from "lucide-react";
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from "@/components/ui/button"; // from shadcn-ui
import { toast } from "sonner";

function RecordAnswerSection({mockInterviewQuestions,activeQuestionIndex}) {
  const [userAnswer, setUserAnswer] = useState('');
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (results.length > 0) {
      const latestResult = results[results.length - 1];
      setUserAnswer(prevAns => prevAns + " " + latestResult.transcript);
    }
  }, [results]);

  const SaveUserAnswer = async() => {
    if (isRecording) {
      stopSpeechToText()
      if (userAnswer?.length<10){
        toast('Error while recording your message, Please try again')
        return ;
      }

      const feedbackPrompt = "Question:"+mockInterviewQuestions[activeQuestionIndex]?.question+ ", User Answer:" + userAnswer+",Depends on question and user answer for given interview question " + " please give us rating for answer and feedback for area of improvement if any" + " injust 3 to 5 lines to improve it in JSON format with rating field and feedback field ";
      const result= await chatSession.sendMessage(feedbackPrompt);

       // 👇 Clean the AI’s response text
      const cleanedText = (await result.response.text())
        .replace("```json", "")
        .replace("```", "")
        .trim();

        const mockJsonResp = JSON.parse(cleanedText);
        console.log("Parsed Feedback JSON:", mockJsonResp);

    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Webcam container */}
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded p-5 mr-20 relative w-full max-w-3xl h-[400px] px-6">
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
      <div className="flex flex-col items-center space-y-4 mt-6">
        {/* Record Button */}
        <Button
          variant="default"
          className="bg-primary text-white hover:bg-primaryDark flex items-center gap-2"
          onClick={SaveUserAnswer}
        >
          {isRecording ? (
            <>
              <StopCircle className="animate-pulse" /> Stop Recording...
            </>
          ) : (
            <>
              <Mic /> Record Answer
            </>
          )}
        </Button>

        {/* Show Answer Button */}
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white transition-all"
          onClick={() => console.log(userAnswer)}
        >
          Show User Answer
        </Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
