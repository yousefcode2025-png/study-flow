
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A check to ensure the API key is available. 
  // In a real deployed app, you might want to handle this more gracefully.
  console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getStudyTips = async (topic: string, subject: string): Promise<string> => {
  if (!API_KEY) {
    return "API key not configured. Please contact support.";
  }
  try {
    const prompt = `You are a helpful study assistant. Provide 3 concise, actionable, and encouraging study tips for the topic "${topic}" in the subject of "${subject}". Format the response as a markdown list.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching study tips from Gemini:", error);
    throw new Error("Could not fetch study tips. The API may be down or the key may be invalid.");
  }
};
