import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function sendMessage(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return text;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
