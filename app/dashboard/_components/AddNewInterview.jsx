"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/libs/GeminiAIModel";
import { Loader } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
    const [opendialog, setopendialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (!jobPosition || !jobDescription || !jobExperience) {
            toast.error("All fields are required!");
            return;
        }

        setLoading(true);
        try {
            console.log("🚀 Submitting Form:", { jobPosition, jobDescription, jobExperience });

            const questionCount = process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || "10";
            const InputPrompt = `Job position: ${jobPosition}, Job description: ${jobDescription}, Years of Experience: ${jobExperience}.
            Generate ${questionCount} mock interview questions and answers in **JSON array format**. Structure:
            [
              { "question": "...", "answer": "..." },
              { "question": "...", "answer": "..." }
            ]
            Ensure the JSON is valid and concise (2-3 lines per answer).`;

            const result = await chatSession.sendMessage(InputPrompt);
            let rawResponse = await result.response.text();

            // ✅ Remove unwanted Markdown-style formatting (```json ... ```)
            rawResponse = rawResponse.replace(/```json|```/g, "").trim();
            console.log("🔍 AI Response (Sanitized):", rawResponse);

            // ✅ Validate and parse JSON
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(rawResponse);
                if (!Array.isArray(parsedResponse)) throw new Error("Invalid AI response format");
            } catch (error) {
                console.error("❌ Error parsing AI response:", error);
                toast.error("Invalid AI response. Try again.");
                return;
            }

            // ✅ Save to database
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp: JSON.stringify(parsedResponse), // Store full response as JSON
                questions: parsedResponse, // Extracted questions stored separately
                jobPosition,
                jobDescription,
                jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
                createdAt: moment().format("YYYY-MM-DD"),
            }).returning({ mockId: MockInterview.mockId });

            if (resp.length > 0) {
                setopendialog(false);
                router.push(`/dashboard/interview/${resp[0]?.mockId}`);
                toast.success("Mock Interview Created Successfully!");
                setJobPosition("");
                setJobDescription("");
                setJobExperience("");
            } else {
                toast.error("❌ Failed to save mock interview.");
            }
        } catch (error) {
            console.error("❌ Error generating mock interview:", error);
            toast.error("AI service error. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            {/* Button to open the dialog */}
            <div
                className="p-10 border rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center font-semibold cursor-pointer transition-all transform hover:scale-105 hover:shadow-2xl"
                onClick={() => setopendialog(true)}
            >
                <h2 className="text-lg">+ Add New Interview</h2>
            </div>

            {/* Dialog Component */}
            <Dialog open={opendialog} onOpenChange={setopendialog}>
                <DialogContent className="max-w-2xl p-6 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl transition-all">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center text-gray-800">
                            Create a Mock Interview
                        </DialogTitle>
                        <p className="text-sm text-gray-500 text-center mt-2">
                            Enter details to generate AI-powered mock interview questions.
                        </p>
                    </DialogHeader>

                    <form onSubmit={onSubmitForm}>
                        <div className="space-y-5">
                            {/* Job Position Input */}
                            <div>
                                <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700">
                                    Job Position/Role
                                </label>
                                <Input
                                    id="jobPosition"
                                    placeholder="Ex. Software Engineer, Data Scientist"
                                    required
                                    className="mt-1 focus:ring-2 focus:ring-indigo-400"
                                    value={jobPosition}
                                    onChange={(e) => setJobPosition(e.target.value)}
                                />
                            </div>

                            {/* Job Description Input */}
                            <div>
                                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                                    Job Description/Tech Stack
                                </label>
                                <Textarea
                                    id="jobDescription"
                                    placeholder="Ex: React.js, Node.js, AWS..."
                                    required
                                    className="mt-1 focus:ring-2 focus:ring-indigo-400"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>

                            {/* Experience Input */}
                            <div>
                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                                    Years of Experience
                                </label>
                                <Input
                                    id="experience"
                                    placeholder="Ex: 5"
                                    type="number"
                                    max="50"
                                    required
                                    className="mt-1 focus:ring-2 focus:ring-indigo-400"
                                    value={jobExperience}
                                    onChange={(e) => setJobExperience(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 mt-6">
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={() => {
                                    if (loading) {
                                        toast.error("Please wait, generation in progress...");
                                        return;
                                    }
                                    setopendialog(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader className="animate-spin" /> Generating...
                                    </div>
                                ) : (
                                    "Start Interview"
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewInterview;
