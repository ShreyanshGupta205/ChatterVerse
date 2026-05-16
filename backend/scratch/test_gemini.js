const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function test() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("Hello");
        console.log("Response:", result.response.text());
        console.log("✅ GEMINI API KEY IS VALID");
    } catch (error) {
        console.error("❌ GEMINI API KEY ERROR:", error.message);
    }
}

test();
