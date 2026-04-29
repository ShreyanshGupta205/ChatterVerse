const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const { protect } = require('../middleware/auth');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const OpenAI = require('openai');

// Lazy init genAI for safe startup
const getGenAI = () => {
    const key = (process.env.GEMINI_API_KEY || '').trim();
    if (!key) {
        console.error("❌ GEMINI AI ERROR: GEMINI_API_KEY is missing!");
        throw new Error("AI Configuration Error: Missing API Key");
    }
    return new GoogleGenerativeAI(key);
};

// Diagnostic route to test API key
router.get('/test-ai', async (req, res) => {
    try {
        const genAI = getGenAI();
        
        // List models
        // Note: The SDK might not expose listModels directly on the genAI object depending on version
        // We'll try to use generateContent with a safe model first
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        // If it fails, we'll catch it below
        const result = await model.generateContent("Hello");
        const text = result.response.text();
        
        res.json({ status: "success", response: text, keyLength: (process.env.GEMINI_API_KEY || '').length });
    } catch (error) {
        console.error("❌ AI DIAGNOSIS FAILED:", error);
        
        // Try to get more info by listing models if possible
        let availableModels = "Could not list models";
        try {
            // Using the REST API fallback to list models
            const https = require('https');
            const listModels = await new Promise((resolve, reject) => {
                const key = (process.env.GEMINI_API_KEY || '').trim();
                https.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`, (res) => {
                    let data = '';
                    res.on('data', d => data += d);
                    res.on('end', () => resolve(JSON.parse(data)));
                }).on('error', reject);
            });
            availableModels = listModels;
        } catch (e) {
            availableModels = "Failed to fetch model list: " + e.message;
        }

        res.status(500).json({ 
            status: "error", 
            message: error.message, 
            availableModels: availableModels,
            keyLength: (process.env.GEMINI_API_KEY || '').length
        });
    }
});

// Lazy init OpenAI
const getOpenAI = () => {
    if (!process.env.OPENAI_API_KEY) {
        console.error("❌ OPENAI ERROR: OPENAI_API_KEY is missing from .env!");
        throw new Error("AI Configuration Error: Missing OpenAI API Key");
    }
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
};

const getSystemPrompt = (mood) => {
    const moods = {
        'Chill Buddy': 'You are a chill Gen-Z AI buddy. You talk in Hinglish (mix of Hindi + English). Vibe: Best friend + late night talks + meme energy. Rules:\n- Keep responses short, use short sentences.\n- Tone: Chill 😌, thoda funny, thoda savage (but not rude), Supportive 🤝, Real (not motivational speaker type).\n- Use slang sometimes but not cringe. Sound like a friend, not a teacher.\n- Humor: Light sarcasm, meme references, relatable lines (e.g., "Life = bug, fix = unknown", "Ye toh main bhi nahi samjha 💀").\n- Emotional support: Keep it real, don\'t be overly formal (e.g., "Dekh… sabka phase aata hai, tu alone nahi hai isme").\n- Motivation: Gen-Z style (e.g., "Dekh simple hai… Ya toh tu karega… ya koi aur karega").\n- Smart Conversation: Ask follow-up questions to keep convo flowing.\n- Add human typing styles: "hmm...", "okay listen 👀", "wait wait—", "bro 💀".\n- Use Markdown for structure and emojis for flair! ✨',
        'Teacher Mode': 'You are a structured, helpful educator. Use Markdown headings (###), bold key terms, and bulleted lists to make your explanations extremely clear and easy to read. Use emojis like 🎓📖 sparingly but effectively.',
        'Sassy Friend': 'You are a witty, playful friend with attitude. Be bold and opinionated. Use Markdown italics and bold for emphasis, and spicy emojis like 💅🔥✨. Structure your sassy advice with bullet points.',
        'Coder Bro': 'You are a technical expert. ALWAYS use Markdown code blocks with language identifiers (e.g., ```javascript). Use bolding for technical terms and structure your logic with numbered lists. Add tech emojis like 🚀💻⚡.'
    };
    return moods[mood] || moods['Chill Buddy'];
};

// Get single chat
router.get('/:id', protect, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) return res.status(404).json({ message: 'Chat not found' });
        if (!chat.userId) return res.status(500).json({ message: 'Internal data error: Chat has no owner' });
        if (chat.userId.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Unauthorized' });
        res.json(chat);
    } catch (error) {
        if (error.name === 'CastError') return res.status(404).json({ message: 'Invalid Chat ID format' });
        res.status(500).json({ message: error.message });
    }
});

// Create new chat
router.post('/', protect, async (req, res) => {
    try {
        const { mood, model } = req.body;
        const newChat = new Chat({
            userId: req.user._id,
            mood: mood || 'Chill Buddy',
            model: model || 'gemini-2.5-flash',
            messages: []
        });
        await newChat.save();
        res.json(newChat);
    } catch (error) {
        console.error("POST / ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

// Get user chats
router.get('/', protect, async (req, res) => {
    try {
        const chats = await Chat.find({ userId: req.user._id }).sort({ lastUpdated: -1 });
        res.json(chats);
    } catch (error) {
        console.error("GET / ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

// Send message to chat
router.post('/:id', protect, async (req, res) => {
    try {
        const { message, mood, model } = req.body;
        const chat = await Chat.findById(req.params.id);

        if (!chat) return res.status(404).json({ message: 'Chat not found' });
        if (chat.userId.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Unauthorized' });

        const systemPrompt = getSystemPrompt(mood || chat.mood);
        let activeModel = model || chat.model || 'gemini-2.5-flash';

        // FORCE MIGRATION: If the database or request has any '1.5' reference, upgrade it to '2.5'
        if (activeModel.includes('1.5')) {
            console.log(`🚀 UPGRADING deprecated model ID: ${activeModel} -> gemini-2.5-flash`);
            activeModel = 'gemini-2.5-flash';
        }

        // Update chat properties
        if (mood) chat.mood = mood;
        chat.model = activeModel; // Sync back the upgraded ID to the DB

        chat.messages.push({ role: 'user', content: message });

        // Mock AI
        if (process.env.DEBUG_MOCK_AI === 'true') {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            const mockResponse = `Mock response in ${chat.mood} mode using ${activeModel}. ✨`;
            const chunks = mockResponse.split(' ');
            let fullAiMessage = "";

            for (const chunk of chunks) {
                const chunkText = chunk + " ";
                fullAiMessage += chunkText;
                res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
                await new Promise(r => setTimeout(r, 50));
            }

            chat.messages.push({ role: 'assistant', content: fullAiMessage });
            chat.lastUpdated = Date.now();
            await chat.save();
            res.write(`data: [DONE]\n\n`);
            return res.end();
        }

        // Real AI
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        
        let fullAiMessage = "";

        if (activeModel.startsWith('gpt')) {
            const openai = getOpenAI();
            const history = chat.messages.slice(0, -1).map(m => ({
                role: m.role,
                content: m.content
            }));
            
            const stream = await openai.chat.completions.create({
                model: activeModel,
                messages: [{ role: 'system', content: systemPrompt }, ...history, { role: 'user', content: message }],
                stream: true,
            });
            
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || "";
                if (content) {
                    fullAiMessage += content;
                    res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
                }
            }
        } else {
            const genAI = getGenAI();
            const genModel = genAI.getGenerativeModel({ 
                model: activeModel,
                systemInstruction: systemPrompt
            });

            const history = chat.messages.slice(0, -1).map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));

            const chatSession = genModel.startChat({ history });
            const result = await chatSession.sendMessageStream(message);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullAiMessage += chunkText;
                res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
            }
        }

        chat.messages.push({ role: 'assistant', content: fullAiMessage });
        chat.lastUpdated = Date.now();
        await chat.save();
        res.write(`data: [DONE]\n\n`);
        res.end();

    } catch (error) {
        console.error("🔥 CHAT ERROR:", error);
        const errorMessage = error.message || 'An unexpected error occurred in the AI engine';
        
        if (!res.headersSent) {
            res.status(500).json({ message: errorMessage });
        } else {
            res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
            res.end();
        }
    }
});

// Regenerate last AI response
router.post('/:id/regenerate', protect, async (req, res) => {
    try {
        const { mood, model } = req.body;
        const chat = await Chat.findById(req.params.id);

        if (!chat) return res.status(404).json({ message: 'Chat not found' });
        if (chat.userId.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Unauthorized' });

        if (chat.messages.length > 0 && chat.messages[chat.messages.length - 1].role === 'assistant') {
            chat.messages.pop();
        }

        if (chat.messages.length === 0) return res.status(400).json({ message: 'No messages to regenerate' });

        const systemPrompt = getSystemPrompt(mood || chat.mood);
        let activeModel = model || chat.model || 'gemini-2.5-flash';

        if (activeModel.includes('1.5')) activeModel = 'gemini-2.5-flash';

        if (mood) chat.mood = mood;
        chat.model = activeModel;

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        let fullAiMessage = "";
        const lastUserMessage = chat.messages[chat.messages.length - 1].content;

        if (activeModel.startsWith('gpt')) {
            const openai = getOpenAI();
            const history = chat.messages.slice(0, -1).map(m => ({
                role: m.role,
                content: m.content
            }));
            
            const stream = await openai.chat.completions.create({
                model: activeModel,
                messages: [{ role: 'system', content: systemPrompt }, ...history, { role: 'user', content: lastUserMessage }],
                stream: true,
            });
            
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || "";
                if (content) {
                    fullAiMessage += content;
                    res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
                }
            }
        } else {
            const genAI = getGenAI();
            const genModel = genAI.getGenerativeModel({ 
                model: activeModel,
                systemInstruction: systemPrompt
            });

            const history = chat.messages.slice(0, -1).map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));

            const chatSession = genModel.startChat({ history });
            const result = await chatSession.sendMessageStream(lastUserMessage);

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullAiMessage += chunkText;
                res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
            }
        }

        chat.messages.push({ role: 'assistant', content: fullAiMessage });
        chat.lastUpdated = Date.now();
        await chat.save();
        res.write(`data: [DONE]\n\n`);
        res.end();
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ message: error.message });
        } else {
            res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
            res.end();
        }
    }
});

// Auto-generate title for chat
router.post('/:id/title', protect, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) return res.status(404).json({ message: 'Chat not found' });
        if (chat.userId.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Unauthorized' });

        if (chat.messages.length === 0 || chat.title !== 'New Chat') {
            return res.json({ title: chat.title });
        }

        const firstUserMessage = chat.messages.find(m => m.role === 'user')?.content;
        if (!firstUserMessage) return res.json({ title: chat.title });

        const genAI = getGenAI();
        const genModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Generate a very short, maximum 4-word catchy title for a chat that starts with this user message: "${firstUserMessage}". The title must represent the topic. Do not use quotes around the output.`;
        
        const result = await genModel.generateContent(prompt);
        const newTitle = result.response.text().trim();
        
        chat.title = newTitle;
        await chat.save();
        
        res.json({ title: newTitle });
    } catch (error) {
        console.error("Auto-title error:", error);
        res.status(500).json({ message: "Failed to generate title" });
    }
});

// Delete a chat session
router.delete('/:id', protect, async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);

        if (!chat) return res.status(404).json({ message: 'Chat not found' });
        if (chat.userId.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Unauthorized' });

        await Chat.findByIdAndDelete(req.params.id);
        res.json({ message: 'Chat deleted successfully', id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
