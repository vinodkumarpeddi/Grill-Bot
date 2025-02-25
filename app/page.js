"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, CheckCircle } from "lucide-react";
import WhyUse from "./components/whytouse";
import Contact from "./components/contact";

const GetStarted = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2500); // Extended for a more elegant intro
    }, []);

    return (
        <>
            {loading ? (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"
    >
        <motion.img
            src="/logo.svg"
            alt="Logo"
            className="w-44 h-44 object-contain drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        
        {/* Brand Name Animation */}
        <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
        >
             <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">Grill</span>
             <span className="text-gray-900">Bot</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-2 text-lg text-white opacity-80"
        >
           Powering up your AI-driven mock interview...
        </motion.p>
    </motion.div>
) : (
                <>
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-16 text-center bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50e text-gray-900"
                    >
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-5xl font-extrabold mb-6 drop-shadow-lg leading-tight bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text"
                        >
                            Elevate Your Career with AI Mock Interviews
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-lg max-w-2xl opacity-80 leading-relaxed"
                        >
                            Simulate real interview experiences with AI-powered feedback, boost your confidence, and land your dream job with ease.
                        </motion.p>

                        <div className="mt-8 space-y-4">
                            {[
                                "🎯 AI-Powered Real-Time Interview Simulation",
                                "🚀 Instant Feedback to Improve Responses",
                                "💡 Boost Confidence & Communication Skills",
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                    className="flex items-center space-x-3 text-lg font-medium drop-shadow-md"
                                >
                                    <CheckCircle className="text-green-500" />
                                    <span>{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="mt-10"
                        >
                            <Link href="/dashboard" passHref>
                                <Button className="px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center space-x-2">
                                    <Rocket className="h-5 w-5" />
                                    <span>Start Your Mock Interview</span>
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.section>

                    {/* Why Use Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-16 text-gray-900 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50"
                    >
                        <WhyUse />
                    </motion.section>

                    {/* Contact Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-16 text-gray-900 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50"
                    >
                        <Contact />
                    </motion.section>

                    {/* Footer */}
                    <motion.footer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="py-6 text-center bg-zinc-900 text-white w-full"
                    >
                        <p className="text-lg opacity-80">
                            &copy; {new Date().getFullYear()} Mock Interview AI. All Rights Reserved by Vinod Kumar.
                        </p>
                        <div className="mt-3 flex justify-center space-x-4">
                            <Link href="#" className="text-indigo-400 hover:underline">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-indigo-400 hover:underline">
                                Terms of Service
                            </Link>
                        </div>
                    </motion.footer>
                </>
            )}
        </>
    );
};

export default GetStarted;
