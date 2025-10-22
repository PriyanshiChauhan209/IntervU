import React from "react";
import { Lightbulb, Volume2 } from "lucide-react";

function QuestionsSection({ mockInterviewQuestions = [], activeQuestionIndex }) {
  const textToSpeach=(text)=>{
    if('speechSynthesis' in window){
      const speech= new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }
    else{
      alert('Sorry, Your browser does not support text to speech')
    }
  }
  
  
  
  return (
    <div className="p-5 border rounded-lg my-8 ml-[10%] w-[80%]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestions &&
          mockInterviewQuestions.map((question, index) => (
            <button
              key={index}
              type="button"
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer
                ${
                  activeQuestionIndex === index
                    ? "bg-primaryDark text-white"
                    : "bg-gray-200 text-black"
                }`}
            >
              Question #{index + 1}
            </button>
          ))}
      </div>

      <h2 className="my-5 text-sm mt-10 font-medium md:text-lg text-gray-800 dark:text-gray-100">
        {mockInterviewQuestions?.[activeQuestionIndex]?.question ?? ""}
      </h2>
      <Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestions?.[activeQuestionIndex]?.question)}/>

    <div className="border rounded-lg p-5 bg-primaryDark mt-20">
    <h2 className="flex gap-2 items-center text-white">
      <Lightbulb />
      <strong>Note:</strong>
    </h2>
    <p className="text-white text-sm my-2">
      {import.meta.env.VITE_PUBLIC_QUESTION_NOTE}
    </p>
</div>

    </div>
  );
}

export default QuestionsSection;
