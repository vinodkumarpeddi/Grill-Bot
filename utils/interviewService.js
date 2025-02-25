import { db } from "./db";
import { MockInterview } from "./schema";
import { eq } from "drizzle-orm";
export const getInterviewDetails = async (interviewId) => {
    try {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId));

        console.log("Database Fetch Result:", result);

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("Error fetching interview details:", error);
        return null;
    }
};
