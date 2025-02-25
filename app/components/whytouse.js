import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const WhyUse = () => {
    return (
        <section className="mt-20 text-center px-6">
            <h2 className="text-4xl font-extrabold mb-12 bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text">
                Why Use Our Platform?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 text-lg">
                {[
                    "🤖 AI-Powered Real-Time Interview Simulation",
                    "📈 Instant Feedback & Performance Insights",
                    "📝 Wide Range of Industry-Specific Questions",
                    "💡 Boost Confidence & Improve Responses",
                    "🎯 Personalized Interview Experience",
                    "🆓 Free & Premium Mock Interviews Available"
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-xl flex items-center space-x-4 transition-all"
                    >
                        <CheckCircle className="text-green-300 w-6 h-6" />
                        <span className="font-medium">{feature}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhyUse;
