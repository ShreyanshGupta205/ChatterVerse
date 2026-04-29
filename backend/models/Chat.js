const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'New Chat' },
    mood: { type: String, default: 'Chill Buddy' }, // Bot mood
    model: { type: String, default: 'gemini-1.5-flash' }, // Selected AI Model
    messages: [messageSchema],
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
