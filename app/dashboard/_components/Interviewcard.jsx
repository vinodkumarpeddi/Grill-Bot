import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewCard = ({ interview }) => {
  const router = useRouter();
  
  if (!interview) return null; // Handle case when interview is undefined

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  return (
    <div className="relative border rounded-2xl p-6 bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl transition-all transform hover:scale-[1.05]">
      {/* Job Position Title */}
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
        {interview.jobPosition}
      </h2>

      {/* Experience & Date Info */}
      <p className="text-sm text-gray-600 mt-2">Experience: 
        <span className="font-medium text-gray-900"> {interview.jobExperience} years</span>
      </p>
      <p className="text-xs text-gray-400 mt-1">📅 Created: {interview.createdAt}</p>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6 gap-4">
        <Button
          size="sm"
          className="w-full text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 shadow-md hover:shadow-lg transition-all py-2 rounded-lg"
          onClick={onFeedback}
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="w-full text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-teal-600 hover:to-green-500 shadow-md hover:shadow-lg transition-all py-2 rounded-lg"
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewCard;
