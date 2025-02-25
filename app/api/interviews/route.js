import { NextResponse } from "next/server";
import connectToDatabase from "@/libs/mongodb";
import {MockInterview} from "@/models/User";

// Handle POST requests
export async function POST(req) {
    try {
        await connectToDatabase();

        const body = await req.json(); // Parse request body
        const { jobPosition, jobDescription, jobExperience, jsonMockResp, createdBy } = body;

        if (!jobPosition || !jobDescription || !jobExperience || !jsonMockResp) {
            return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
        }

        const newMockInterview = new MockInterview({
          jsonMockResp,
            jobPosition,
            jobDescription,
            jobExperience,
          
            createdBy,
            mockId: Date.now().toString(),
        });

        await newMockInterview.save();
        return NextResponse.json({ message: "Mock interview created successfully", mock: newMockInterview }, { status: 201 });

    } catch (error) {
        console.error("Error saving mock interview:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// Handle GET requests (Optional)
export async function GET() {
    try {
        await connectToDatabase();
        const interviews = await MockInterview.find({});
        return NextResponse.json(interviews, { status: 200 });
    } catch (error) {
        console.error("Error fetching interviews:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
