"use client";

import { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, desc } from "drizzle-orm";
import React from "react";
import Interviewcard from "./Interviewcard";
import { HashLoader } from "react-spinners";

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return; // ✅ Prevents unnecessary calls when user isn't loaded
    getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    setLoading(true);
    const startTime = performance.now();

    try {
      console.log("🔍 Fetching interviews for user:", user.id);

      const res = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id))
        .limit(5); // ✅ Fetch only the 5 most recent interviews

      console.log("✅ Received Data:", res);
      setInterviewList(res || []);
    } catch (error) {
      console.error("❌ Error fetching interviews:", error);
    } finally {
      setLoading(false);
      console.log(`⏳ Data fetch took: ${(performance.now() - startTime).toFixed(2)}ms`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 🏷️ Title */}
      <h2 className="text-2xl md:text-3xl font-semibold text-left text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-sky-400">
        Your Recent Mock Interviews
      </h2>

      {/* 🔄 Loader */}
      {loading ? (
        <div className="flex justify-center items-center mt-10 min-h-[150px]">
          <HashLoader color="#38bdf8" size={60} />
        </div>
      ) : (
        <div className="mt-6">
          {interviewList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewList.map((interview) => (
                <Interviewcard key={interview.id} interview={interview} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-5 text-lg">
              No interviews found. Start a new mock interview to see results here.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewList;
