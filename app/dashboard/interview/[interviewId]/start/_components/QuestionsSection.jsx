"use client";

import { Lightbulb, Volume2 } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

const QuestionsSection = ({ mockInterviewQuestions, activeQuestionIndex }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const speech = new SpeechSynthesisUtterance(text);
        speech.onstart = () => setIsSpeaking(true);
        speech.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(speech);
      }
    } else {
      alert("Sorry, your browser does not support speech synthesis.");
    }
  };

  return (
    mockInterviewQuestions && (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="p-6 border rounded-lg my-10 shadow-lg bg-white"
      >
        {/* 🔢 Question Number List */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {mockInterviewQuestions.map((question, index) => (
            <motion.h2
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-200 
                ${activeQuestionIndex === index ? "bg-sky-500 text-white font-bold shadow-md" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              Question #{index + 1}
            </motion.h2>
          ))}
        </motion.div>

        {/* ❓ Active Question */}
        <motion.h2 
          className="my-6 text-lg md:text-xl font-medium text-gray-800 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {mockInterviewQuestions[activeQuestionIndex]?.question}
        </motion.h2>

        {/* 🔊 Speech Button */}
        <motion.div 
          whileTap={{ scale: 0.9 }}
          className="flex justify-center mt-4"
        >
          <button
            onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}
            className={`p-3 rounded-full transition-all duration-300 shadow-md 
              ${isSpeaking ? "bg-red-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            <Volume2 size={24} />
          </button>
        </motion.div>

        {/* 💡 Note Section */}
        <motion.div 
          className="border rounded-lg p-5 bg-blue-50 mt-10 shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="flex items-center gap-2 text-blue-700">
            <Lightbulb size={20} />
            <strong>Tip:</strong>
          </h2>
          <p className="text-sm text-blue-700 mt-2">
            {process.env.NEXT_PUBLIC_QUESTION || "Prepare well and answer confidently!"}
          </p>
        </motion.div>
      </motion.div>
    )
  );
};

export default QuestionsSection;
