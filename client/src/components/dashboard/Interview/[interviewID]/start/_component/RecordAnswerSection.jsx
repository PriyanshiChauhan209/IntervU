import React from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button"; // from shadcn-ui

function RecordAnswerSection() {
  return (
    <div className="flex items-center justify-center flex-col">
      {/* Webcam container */}
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded p-5 mr-20 relative w-full max-w-3xl h-[400px] px-6">
        {/* Optional placeholder image */}
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

      {/* Shadcn Button */}
      <Button
        variant="outline"
        className="mt-6 bg-primary text-white hover:bg-primaryDark"
      >
        Record Answer
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
