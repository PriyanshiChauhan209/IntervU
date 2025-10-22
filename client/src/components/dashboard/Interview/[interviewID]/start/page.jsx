import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionsSection from "./_component/QuestionsSection";
import RecordAnswerSection from "./_component/RecordAnswerSection";

function StartInterview() {
  const { interviewId } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const fetchedRef = useRef(false); // prevents double-call in StrictMode (dev)

  useEffect(() => {
    if (!interviewId) return;

    // Reset when interviewId changes
    setInterviewData(null);
    setMockInterviewQuestions([]);
    fetchedRef.current = false; // allow fetch for new id

    const controller = new AbortController();
    let aborted = false;

    const fetchInterview = async () => {
      if (fetchedRef.current) return;
      fetchedRef.current = true;

      try {
        const res = await fetch(
          `http://localhost:4000/api/interviews/${interviewId}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();

        if (aborted) return;

        if (Array.isArray(data) && data.length > 0) {
          const item = data[0];
          setInterviewData(item);

          // handle both stringified JSON and already-parsed object
          let parsed = [];
          try {
            parsed =
              typeof item.jsonMockResp === "string"
                ? JSON.parse(item.jsonMockResp)
                : item.jsonMockResp || [];
          } catch (parseErr) {
            console.error("Failed to parse jsonMockResp:", parseErr);
            parsed = [];
          }

          setMockInterviewQuestions(parsed);
          console.log("questions:", parsed);
        } else {
          console.warn("No interview data returned for id:", interviewId);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          // fetch was aborted — ignore
          return;
        }
        console.error("Error fetching interview:", err);
      }
    };

    fetchInterview();

    return () => {
      aborted = true;
      controller.abort();
    };
  }, [interviewId]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection 
        mockInterviewQuestions={mockInterviewQuestions}
        activeQuestionIndex={activeQuestionIndex}
         />
          <RecordAnswerSection
          
           mockInterviewQuestions={mockInterviewQuestions}
        activeQuestionIndex={activeQuestionIndex}
         />
          
         
      </div>

    </div>
  );
}

export default StartInterview;
