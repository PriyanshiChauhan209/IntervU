import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionsSection from "./_component/QuestionsSection";
import RecordAnswerSection from "./_component/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function StartInterview() {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!interviewId) return;

    setInterviewData(null);
    setMockInterviewQuestions([]);
    fetchedRef.current = false;

    const controller = new AbortController();

    const fetchInterview = async () => {
      if (fetchedRef.current) return;
      fetchedRef.current = true;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/interviews/${interviewId}`,
          { signal: controller.signal },
        );

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const item = data[0];
          setInterviewData(item);

          const parsed =
            typeof item.jsonMockResp === "string"
              ? JSON.parse(item.jsonMockResp)
              : item.jsonMockResp || [];

          setMockInterviewQuestions(parsed);
        }
      } catch (err) {
        console.error("Error fetching interview:", err);
      }
    };

    fetchInterview();

    return () => controller.abort();
  }, [interviewId]);

  const isFirst = activeQuestionIndex === 0;
  const isLast = activeQuestionIndex === mockInterviewQuestions.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setActiveQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      setActiveQuestionIndex((prev) => prev - 1);
    }
  };

  const handleEndInterview = () => {
    toast.success("Interview Completed 🎉");
    if (interviewId) {
      navigate(`/dashboard/interview/${interviewId}/feedback`);
    }
  };

  return (
    <div className="p-4 pr-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
        />

        <div className="flex flex-col justify-between h-[550px]">
          <RecordAnswerSection
            mockInterviewQuestions={mockInterviewQuestions}
            activeQuestionIndex={activeQuestionIndex}
            interviewId={interviewId}
          />

          {/* Navigation Buttons */}
          <div className="flex mt-14 justify-end gap-4 ">
            {!isFirst && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="px-6 py-2 rounded-lg border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 active:scale-95"
              >
                Previous Question
              </Button>
            )}

            {!isLast ? (
              <Button
                onClick={handleNext}
                className="px-6 py-2 rounded-lg bg-primaryDark hover:bg-primary text-white transition-all duration-200 active:scale-95"
              >
                Next Question
              </Button>
            ) : (
              <Button
                onClick={handleEndInterview}
                className="px-6 py-2 rounded-lg bg-primaryDark hover:bg-primary text-white transition-all duration-200 active:scale-95"
              >
                End Interview
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
