"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RingLoader } from 'react-spinners';
import { motion } from "framer-motion";  // Framer Motion for animations

const Start = () => {
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const { interviewId } = useParams();

  useEffect(() => {
    if (!interviewId) return;

    const fetchInterviewDetails = async () => {
      setLoading(true);
      const startTime = Date.now();

      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, interviewId));

        if (result.length > 0) {
          let jsonMockResp = [];

          try {
            jsonMockResp = JSON.parse(result[0]?.jsonMockResp || "[]");
          } catch (error) {
            console.error("❌ JSON Parsing Failed:", error);
          }

          setMockInterviewQuestions(jsonMockResp);
          setInterviewData(result[0]);
        } else {
          console.warn("⚠️ No interview data found for ID:", interviewId);
        }
      } catch (error) {
        console.error("❌ Error fetching interview details:", error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const minLoadTime = 1500;
        const remainingTime = minLoadTime - elapsedTime;

        setTimeout(() => {
          setLoading(false);
        }, remainingTime > 0 ? remainingTime : 0);
      }
    };

    fetchInterviewDetails();
  }, [interviewId]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 min-h-screen"
    >
      {loading ? (
        <div className="flex justify-center items-center mt-20 h-64">
          <RingLoader color="#2563eb" size={80} />
        </div>
      ) : (
        <>
          {mockInterviewQuestions.length > 0 ? (
            <>
              {/* 🔹 Responsive Grid for Question & Answer Sections */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5, delay: 0.2 }} 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10"
              >
                <QuestionsSection
                  mockInterviewQuestions={mockInterviewQuestions}
                  activeQuestionIndex={activeQuestionIndex}
                />
                <RecordAnsSection
                  mockInterviewQuestions={mockInterviewQuestions}
                  activeQuestionIndex={activeQuestionIndex}
                  interviewData={interviewData}
                />
              </motion.div>

              {/* 🔹 Navigation Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.4 }} 
                className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4 mt-6"
              >
                {/* Previous Button */}
                <Button
                  className="w-full sm:w-auto transition-transform duration-300 hover:scale-105"
                  onClick={() => setActiveQuestionIndex(Math.max(0, activeQuestionIndex - 1))}
                  disabled={activeQuestionIndex === 0}
                >
                  Previous
                </Button>

                {/* Next Button */}
                {activeQuestionIndex < mockInterviewQuestions.length - 1 && (
                  <Button
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                  >
                    Next
                  </Button>
                )}

                {/* End Interview Button */}
                {activeQuestionIndex === mockInterviewQuestions.length - 1 && (
                  <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`} className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-red-600 text-white transition-transform duration-300 hover:scale-105 hover:bg-red-700">
                      End the Interview
                    </Button>
                  </Link>
                )}
              </motion.div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5 }} 
              className="text-center text-gray-500 text-lg px-4 sm:px-0"
            >
              No questions available for this interview.
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Start;
