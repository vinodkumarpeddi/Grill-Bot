"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "../dashboard/_components/Header";
import { HiOutlineArrowNarrowRight } from "react-icons/hi"; // Importing an arrow icon

const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "UX/UI Designer",
    "Cloud Architect",
    "Product Manager",
    "Software Engineer",
    "AI Specialist",
    "Blockchain Developer"
];

const QuestionsPage = () => {
    const router = useRouter();

    const handleRoleClick = (role) => {
        router.push(`/questions/role?role=${encodeURIComponent(role)}`);
    };

    return (
        <>
            <Header />
            <div className="p-8 max-w-7xl mx-auto">
                {/* Heading */}
                <h1 className="text-center font-extrabold text-3xl mb-12 text-gray-900">
                    Explore Top Tech Roles and Boost Your Career
                </h1>

                {/* Cards container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {roles.map((role) => (
                        <Card
                            key={role}
                            className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                            onClick={() => handleRoleClick(role)}
                        >
                            <CardContent className="text-center p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">{role}</h2>
                                <button
                                    className="flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:bg-indigo-700"
                                    onClick={() => handleRoleClick(role)}
                                >
                                    <span>Explore Questions</span>
                                    <HiOutlineArrowNarrowRight className="text-lg" />
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default QuestionsPage;
