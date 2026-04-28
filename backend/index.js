const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

console.log('--- CHATTERVERSE BACKEND STARTING ---');
console.log('ENV CHECK:', process.env.GEMINI_API_KEY ? 'GEMINI OK' : 'GEMINI MISSING');

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat'); // Placeholder for now

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected ✅');
        app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀`));
    })
    .catch(err => {
        console.error('MongoDB Connection Error ❌', err.message);
        console.log('Check your MONGO_URI in .env!');
    });
