import { Suspense } from "react";  // Import Suspense
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { generateQuestionsAndAnswers } from "@/utils/generateQuestionsAndAnswers";
import { HiOutlineArrowNarrowRight } from "react-icons/hi"; // Arrow icon

const RoleQuestionsPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const role = searchParams.get("role");
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedQuestion, setExpandedQuestion] = useState(null); // Track which question is expanded

    useEffect(() => {
        if (!role) return;

        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const result = await generateQuestionsAndAnswers(role);
                setQuestions(Array.isArray(result) ? result : []);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setQuestions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [role]);

    const toggleAnswer = (index) => {
        setExpandedQuestion(expandedQuestion === index ? null : index); // Toggle answer visibility
    };

    if (!role) {
        return <h1 className="text-2xl font-bold text-center text-gray-800 mt-8">No role selected</h1>;
    }

    return (
        <div className="p-8 bg-gradient-to-r from-purple-300 via-indigo-100 to-blue-200 min-h-screen rounded-xl shadow-lg">
            <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-12">
                Interview Questions for {role}
            </h1>

            {loading ? (
                <div className="flex justify-center items-center space-x-4">
                    <div className="animate-spin border-t-4 border-indigo-600 h-12 w-12 rounded-full" />
                    <p className="text-lg text-gray-600">Loading questions...</p>
                </div>
            ) : (
                <ul className="space-y-6">
                    {questions.map((item, index) => (
                        <li
                            key={index}
                            className="bg-white p-6 border-2 border-transparent rounded-lg shadow-xl transform transition-all duration-300"
                        >
                            <div className="flex justify-between cursor-pointer" onClick={() => toggleAnswer(index)}>
                                <strong className="text-xl text-indigo-600">Q{index + 1}: {item.question}</strong>
                                <HiOutlineArrowNarrowRight
                                    className={`text-xl transform transition-all duration-300 ${
                                        expandedQuestion === index ? "rotate-90" : ""
                                    }`}
                                />
                            </div>  

                            {expandedQuestion === index && (
                                <div className="mt-4 text-gray-700">
                                    <strong className="text-indigo-600">Answer:</strong> {item.answer}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <Button
                className="mt-8 px-8 py-4 w-full text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-md hover:bg-indigo-700 transform transition-all duration-300 ease-in-out hover:scale-105"
                onClick={() => router.push("/questions")}
            >
                <span>Back to Roles</span>
                <HiOutlineArrowNarrowRight className="ml-2 text-xl" />
            </Button>
        </div>
    );
};

const RoleQuestionsPageWithSuspense = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <RoleQuestionsPage />
    </Suspense>
);

export default RoleQuestionsPageWithSuspense;
