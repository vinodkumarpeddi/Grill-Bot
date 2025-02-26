"use client"; // For Next.js (client-side rendering)

import React from "react";
import { motion } from "framer-motion";

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col items-center justify-center text-white p-8">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-6xl md:text-8xl font-bold text-center mb-8"
      >
        Coming Soon
      </motion.h1>

      {/* Animated Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-xl md:text-2xl text-center mb-12"
      >
        We're working hard to bring you something amazing. Stay tuned!
      </motion.p>
    </div>
  );
};

export default ComingSoonPage;