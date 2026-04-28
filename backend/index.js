const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

process.on('uncaughtException', (err) => {
    console.error('💥 UNCAUGHT EXCEPTION:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 UNHANDLED REJECTION:', reason);
    process.exit(1);
});

console.log('--- CHATTERVERSE BACKEND STARTING ---');
console.log('ENV CHECK:', process.env.GEMINI_API_KEY ? 'GEMINI OK' : 'GEMINI MISSING');

console.log('Loading routes...');
const authRoutes = require('./routes/auth');
console.log('Auth routes loaded ✅');
const chatRoutes = require('./routes/chat');
console.log('Chat routes loaded ✅');

const app = express();
console.log('Express app initialized ✅');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
console.log('Middleware applied ✅');

// Startup Checks
if (!process.env.GEMINI_API_KEY) console.warn('⚠️ GEMINI_API_KEY is missing from .env!');
if (!process.env.MONGO_URI) console.error('❌ MONGO_URI is missing from .env!');

// Main App Middleware
app.use((req, res, next) => {
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Global Error Handler (Definitive Debugging)
app.use((err, req, res, next) => {
    console.error('🔥 GLOBAL BACKEND ERROR:', err.stack);
    res.status(500).json({ 
        message: 'Something went wrong on the server',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Health check
app.get('/', (req, res) => res.send('Welcome to ChatterVerse Backend API 🚀'));

// Database connection
console.log('Attempting MongoDB connection...');
if (!process.env.MONGO_URI) {
    console.error('❌ CRITICAL: MONGO_URI is missing from environment variables!');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected ✅');
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT} 🚀`);
            console.log('Backend is ready for requests.');
        });
    })
    .catch(err => {
        console.error('MongoDB Connection Error ❌', err.message);
        process.exit(1);
    });
