"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { chatSession } from "@/libs/GeminiAIModel";
import Loader from "./loader";
import { motion } from "framer-motion";

const RecordAnsSection = ({ mockInterviewQuestions, activeQuestionIndex, interviewData }) => {
    const [userAnswer, setUserAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    const {
        error,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    useEffect(() => {
        setUserAnswer(results.map((res) => res.transcript).join(" "));
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer();
        }
        if (userAnswer.length > 0 && userAnswer.length < 10 && !isRecording) {
            setLoading(false);
            toast.error("Please speak at least 10 words.");
        }
    }, [isRecording, userAnswer]);

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    };

    const UpdateUserAnswer = async () => {
        if (userAnswer.length < 10) {
            toast.error("Your answer is too short. Please speak at least 10 words.");
            return;
        }

        setLoading(true);

        const feedbackPrompt = `Question: ${mockInterviewQuestions[activeQuestionIndex]?.question}\nUser Answer: ${userAnswer}\nPlease provide a rating out of 10 and constructive feedback (2-3 lines) in JSON format with \"rating\" and \"feedback\" fields.`;

        try {
            const result = await chatSession.sendMessage(feedbackPrompt);
            let mockJsonResp = await result.response.text();

            mockJsonResp = mockJsonResp.trim().replace(/^```json|```$/g, "").trim();
            mockJsonResp = mockJsonResp.replace(/[\r\n\t]/g, "");

            let JsonFeedbackResp;
            try {
                JsonFeedbackResp = JSON.parse(mockJsonResp);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                toast.error("Invalid AI response. Please try again.");
                setLoading(false);
                return;
            }

            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestions[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback || "No feedback available",
                rating: JsonFeedbackResp?.rating || "No rating available",
                createdAt: moment().format("YYYY-MM-DD"),
                updatedAt: new Date(),
            });

            if (resp) {
                toast.success("User Answer Recorded Successfully");
                setUserAnswer("");
                setResults([]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error saving answer:", error);
            toast.error("Failed to save answer. Please try again.");
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center flex-col mt-10"
        >
            {/* 🎥 Webcam Section */}
            <div className="relative flex flex-col justify-center items-center bg-black my-10 rounded-lg border p-5 shadow-md">
                <Image src={"/webcam.png"} width={200} height={200} alt="webcam" className="absolute z-0 opacity-30" />
                <Webcam 
                    mirrored 
                    style={{ height: 300, width: "100%", zIndex: 10 }} 
                    className="rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-3 py-1 rounded-full">
                    {isRecording ? "Recording..." : "Idle"}
                </div>
            </div>

            {/* 🗣️ Word Count Indicator */}
            <motion.div 
                className="mb-4 text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {userAnswer.length > 0 ? `Word Count: ${userAnswer.split(" ").length}` : "Start speaking to see your answer..."}
            </motion.div>

            {/* 🎤 Record Button */}
            {loading ? (
                <div className="flex items-center justify-center p-5">
                    <Loader />
                </div>
            ) : (
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                    onClick={StartStopRecording}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full text-white text-md font-medium transition-all duration-300 shadow-md
                        ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
                >
                    {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
                    {isRecording ? "Stop Recording" : "Record Answer"}
                </motion.button>
            )}
        </motion.div>
    );
};

export default RecordAnsSection;
