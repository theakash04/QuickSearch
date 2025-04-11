import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

async function summarizeContent(content: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Summarize the following content in 2-3 sentences, keeping it clear and concise:

  """${content}"""
  
  Keep it brief, informative, and easy to understand.`,
  });

  return response.text;
}

export default summarizeContent;
