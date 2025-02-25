import { chatSession } from "@/libs/GeminiAIModel";

export const generateQuestionsAndAnswers = async (role) => {
    const prompt = `
    Generate the top 10 most commonly asked interview questions and answers for the role of ${role}.
    Ensure the answers are clear, concise, and role-specific.

    Strictly return the response in **valid JSON format**, with **no additional text, explanations, or code block formatting**.
    
    The JSON structure must be:
    [
        {"question": "What is X?", "answer": "X is ..."},
        {"question": "How does Y work?", "answer": "Y works by ..."},
        ...
    ]
    `;

    try {
        const result = await chatSession.sendMessage(prompt);
        if (!result) throw new Error("No response from AI model.");

        let responseText = await result.response.text();

        // 🔹 Remove Markdown Code Blocks (` ```json ... ``` `)
        responseText = responseText.replace(/```json|```/g, "").trim();

        // 🔹 Ensure valid JSON parsing
        const parsedData = JSON.parse(responseText);

        return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
        console.error("Error fetching AI questions:", error);
        return [];
    }
};
