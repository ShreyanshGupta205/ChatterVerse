const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testAll() {
    const key = process.env.GEMINI_API_KEY;
    console.log(`Testing key: ${key}`);
    const genAI = new GoogleGenerativeAI(key);
    const models = ["gemini-flash-latest", "gemini-2.5-pro", "gemini-pro", "models/gemini-flash-latest"];

    for (const modelName of models) {
        console.log(`\n--- Testing ${modelName} ---`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            console.log(`✅ ${modelName} Success!`);
            console.log("Response:", result.response.text());
            return; // Stop if any works
        } catch (e) {
            console.error(`❌ ${modelName} Failed: ${e.message}`);
        }
    }
}

testAll();
