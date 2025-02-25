'use client'; // Add this line to enable client-side rendering

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { generateQuestionsAndAnswers } from "@/utils/generateQuestionsAndAnswers";
import { HiOutlineArrowNarrowRight } from "react-icons/hi"; // Arrow icon

export default function Page() {
    const searchParams = useSearchParams();  // Client-side hook
    const router = useRouter(); // Client-side hook

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Assuming generateQuestionsAndAnswers is a function that fetches questions
        const fetchQuestions = async () => {
            const data = await generateQuestionsAndAnswers();
            setQuestions(data);
            setLoading(false);
        };

        fetchQuestions();
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-xl font-semibold">Role-based Interview Questions</h1>
                {loading ? (
                    <div>Loading questions...</div>
                ) : (
                    <div>
                        <ul>
                            {questions.map((question, index) => (
                                <li key={index} className="mb-4">
                                    <div className="text-lg">{question}</div>
                                </li>
                            ))}
                        </ul>
                        <Button
                            onClick={() => router.push("/next-step")}
                            className="mt-6 flex items-center"
                        >
                            Start Interview <HiOutlineArrowNarrowRight className="ml-2" />
                        </Button>
                    </div>
                )}
            </div>
        </Suspense>
    );
}
