const OpenAI = require("openai");
require('dotenv').config();

async function test() {
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "Hello" }],
        });
        console.log("Response:", response.choices[0].message.content);
        console.log("✅ OPENAI API KEY IS VALID");
    } catch (error) {
        console.error("❌ OPENAI API KEY ERROR:", error.message);
    }
}

test();
