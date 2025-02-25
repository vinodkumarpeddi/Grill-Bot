"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";

const Page = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const { interviewId } = useParams();
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (interviewId) {
      GetFeedback();
    }
  }, [interviewId]);

  useEffect(() => {
    setShowConfetti(true); // Start Confetti after component mounts
    setTimeout(() => setShowConfetti(false), 5000); // Auto-stop after 5s
  }, []);

  const GetFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(desc(UserAnswer.id));

      console.log("✅ Raw Feedback Data:", result);
      setFeedbackList(result);
    } catch (error) {
      console.error("❌ Error fetching feedback:", error);
    }
  };

  const rate = () => {
    if (feedbackList.length === 0) return "N/A";

    const sum = feedbackList.reduce((acc, item) => acc + (parseFloat(item.rating) || 0), 0);
    return (sum / feedbackList.length).toFixed(1);
  };

  const parseJSONSafe = (jsonString) => {
    try {
      if (typeof jsonString !== "string") return jsonString;
      if (!jsonString.trim().startsWith("{") && !jsonString.trim().startsWith("[")) {
        return jsonString;
      }
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("❌ JSON Parse Error:", error, "Invalid JSON:", jsonString);
      return jsonString;
    }
  };

  return (
    <div className="p-10">
      {/* 🎉 Confetti Effect - Runs for 5s */}
      {showConfetti && <Confetti width={width} height={height} />}

      <motion.h2
        className="text-3xl font-bold text-green-500"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        🎉 Congratulations!
      </motion.h2>

      <motion.h2
        className="font-bold text-2xl mt-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Here is your interview feedback
      </motion.h2>

      {feedbackList.length === 0 ? (
        <motion.h2
          className="text-gray-500 text-xl mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No feedback found for this interview.
        </motion.h2>
      ) : (
        <>
          <motion.h2
            className="text-primary text-lg my-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Your Overall interview rating: <strong>{rate()}/10</strong>
          </motion.h2>
          <h2 className="text-sm text-gray-500">
            Below are the interview questions, your answers, and feedback for improvement.
          </h2>

          {feedbackList.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Collapsible className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 flex justify-between gap-7 text-left w-full">
                  {item.question}
                  <ChevronsUpDownIcon className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating:</strong> {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer:</strong> {item.userAns}
                    </h2>

                    {/* Correct Answer Handling */}
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer:</strong>{" "}
                      {(() => {
                        const parsedAns = parseJSONSafe(item.correctAns);
                        return typeof parsedAns === "object" ? (
                          <div className="mt-2">
                            {Object.entries(parsedAns).map(([key, value]) => (
                              <p key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <span>{parsedAns}</span>
                        );
                      })()}
                    </h2>

                    {/* Feedback Handling */}
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                      <strong>Feedback:</strong>{" "}
                      {(() => {
                        const parsedFeedback = parseJSONSafe(item.feedback);
                        return typeof parsedFeedback === "object" ? (
                          <div className="mt-2">
                            {Object.entries(parsedFeedback).map(([key, value]) => (
                              <p key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <span>{parsedFeedback}</span>
                        );
                      })()}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </>
      )}

      <div className="flex justify-center mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
