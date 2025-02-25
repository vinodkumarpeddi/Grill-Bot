"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lightbulb, PlayCircle, UserCheck, Video } from "lucide-react";

const HowItWorks = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="my-10 px-6 lg:px-16 text-gray-900"
        >
            <motion.h2 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5, delay: 0.2 }} 
                className="font-extrabold text-4xl text-center mb-8"
            >
                🚀 How It Works
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Step 1: Sign Up */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.3 }} 
                    className="flex flex-col items-center text-center p-6 rounded-2xl border shadow-lg bg-white"
                >
                    <UserCheck className="h-14 w-14 text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold">Step 1: Sign Up</h3>
                    <p className="text-gray-600 mt-2">Create an account to access AI-powered mock interviews.</p>
                </motion.div>

                {/* Step 2: Select Interview Type */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.4 }} 
                    className="flex flex-col items-center text-center p-6 rounded-2xl border shadow-lg bg-white"
                >
                    <Lightbulb className="h-14 w-14 text-yellow-500 mb-4" />
                    <h3 className="text-xl font-semibold">Step 2: Choose a Role</h3>
                    <p className="text-gray-600 mt-2">Select a job role, tech stack, and experience level.</p>
                </motion.div>

                {/* Step 3: Start Interview */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.5 }} 
                    className="flex flex-col items-center text-center p-6 rounded-2xl border shadow-lg bg-white"
                >
                    <Video className="h-14 w-14 text-green-500 mb-4" />
                    <h3 className="text-xl font-semibold">Step 3: Start Interview</h3>
                    <p className="text-gray-600 mt-2">Enable your webcam and begin your AI-powered mock interview.</p>
                </motion.div>

                {/* Step 4: Get Feedback */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.6 }} 
                    className="flex flex-col items-center text-center p-6 rounded-2xl border shadow-lg bg-white"
                >
                    <PlayCircle className="h-14 w-14 text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold">Step 4: Receive Feedback</h3>
                    <p className="text-gray-600 mt-2">Get instant AI-driven feedback on your performance.</p>
                </motion.div>
            </div>

            {/* Start Now Button */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.7 }} 
                className="flex justify-center mt-10"
            >
                <Link href="/dashboard" passHref>
                    <Button className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-transform hover:scale-105">
                        🚀 Start Your Interview
                    </Button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default HowItWorks;