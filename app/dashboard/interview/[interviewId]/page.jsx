"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getInterviewDetails } from "@/utils/interviewService";
import Webcam from "react-webcam";
import { WebcamIcon, Lightbulb, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Interview = () => {
    const { interviewId } = useParams();
    const [interviewDetails, setInterviewDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [webcamEnabled, setWebcamEnabled] = useState(false);

    useEffect(() => {
        if (interviewId) {
            console.log("Params:", interviewId);
            (async () => {
                setLoading(true);
                const details = await getInterviewDetails(interviewId);
                setInterviewDetails(details);
                setLoading(false);
            })();
        }
    }, [interviewId]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="my-10 px-6 lg:px-16"
        >
            <motion.h2 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5, delay: 0.2 }} 
                className="font-extrabold text-3xl text-center mb-8 text-gray-900"
            >
                 Let's Get Started
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* ✅ Interview Details Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.6, delay: 0.3 }} 
                    className="flex flex-col gap-6 p-6 rounded-2xl border shadow-lg bg-white"
                >
                    {loading ? (
                        <div className="animate-pulse flex flex-col space-y-4">
                            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-300 rounded w-2/4"></div>
                            <div className="h-6 bg-gray-300 rounded w-5/6"></div>
                        </div>
                    ) : interviewDetails ? (
                        <>
                            <div className="flex flex-col p-6 gap-5 rounded-xl border bg-gray-50 shadow-md">
                                <h2 className="text-lg font-semibold">
                                    🎯 Job Role/Position: 
                                    <span className="font-medium text-gray-700"> {interviewDetails.jobPosition}</span>
                                </h2>
                                <h2 className="text-lg font-semibold">
                                    💡 Tech Stack/Description: 
                                    <span className="font-medium text-gray-700"> {interviewDetails.jobDescription}</span>
                                </h2>
                                <h2 className="text-lg font-semibold">
                                    📅 Years of Experience: 
                                    <span className="font-medium text-gray-700"> {interviewDetails.jobExperience}</span>
                                </h2>
                            </div>

                            {/* 🔹 Information Section (Restored) */}
                            <div className="p-6 border rounded-xl border-yellow-400 bg-yellow-100 shadow-md">
                                <h2 className="flex gap-2 items-center text-yellow-700 font-semibold">
                                    <Lightbulb className="h-5 w-5 animate-bounce" /> Important Information
                                </h2>
                                <p className="mt-3 text-yellow-700">{process.env.NEXT_PUBLIC_INFORMATION}</p>
                                <p className="mt-3 text-red-500 font-medium animate-pulse">
                                    ⚠️ Note: We do not record your video. You can disable webcam access at any time.
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-600">No interview details found.</p>
                    )}
                </motion.div>

                {/* ✅ Webcam Section */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.6, delay: 0.5 }} 
                    className="mt-6 flex flex-col items-center gap-10"
                >
                    {webcamEnabled ? (
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            transition={{ duration: 0.4 }} 
                            className="relative"
                        >
                            <Webcam
                                mirrored
                                className="border-4 border-blue-500 shadow-xl rounded-xl transition-transform duration-500 hover:scale-105"
                                style={{ height: 320, width: 320 }}
                            />
                            <Button
                                variant="destructive"
                                className="mt-4 w-full px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                                onClick={() => setWebcamEnabled(false)}
                            >
                                Disable Webcam & Microphone
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            transition={{ duration: 0.4 }} 
                            className="flex flex-col items-center"
                        >
                            <WebcamIcon className="h-72 w-full my-7 p-10 bg-gray-200 rounded-2xl border border-gray-300 shadow-md animate-pulse" />
                            <Button
                                variant="ghost"
                                className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                                onClick={() => setWebcamEnabled(true)}
                            >
                                Enable Webcam & Microphone
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* ✅ Start Button */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.6 }} 
                className="flex justify-end mt-8"
            >
                <Link href={`/dashboard/interview/${interviewId}/start`} passHref>
                    <Button className="px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-transform hover:scale-105">
                         Start Interview
                    </Button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default Interview;
