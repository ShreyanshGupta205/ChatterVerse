const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // The SDK doesn't have a direct listModels, but we can try a fetch if needed.
        // But let's try gemini-1.0-pro just in case.
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent("Hello");
        console.log("Response:", result.response.text());
        console.log("✅ GEMINI API KEY IS VALID with gemini-1.0-pro");
    } catch (error) {
        console.error("❌ GEMINI API KEY ERROR:", error.message);
    }
}

listModels();
