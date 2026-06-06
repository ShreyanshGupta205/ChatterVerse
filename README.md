# ChatterVerse 🚀

ChatterVerse is a modern, full-stack AI Chat Application that allows users to interact with advanced language models like Google's Gemini and OpenAI. It features multiple dynamic AI personas, real-time message streaming, and a sleek user interface built with React and Vite.

## 🌟 Key Features

*   **🤖 Multi-Model Support:** Seamlessly switch between Google Gemini and OpenAI models.
*   **🎭 Dynamic Personas:** Chat with different AI personalities tailored to your mood:
    *   **Chill Buddy:** Gen-Z Hinglish buddy for late-night talks.
    *   **Teacher Mode:** Structured, helpful educator.
    *   **Sassy Friend:** Witty, playful friend with attitude.
    *   **Coder Bro:** Technical expert for your programming queries.
*   **⚡ Real-Time Streaming:** Watch the AI generate responses in real-time, just like ChatGPT.
*   **🔊 Text-to-Speech (TTS):** Have the AI read its responses aloud using Web Speech API.
*   **🔐 Firebase Authentication:** Secure Google Sign-In and user authentication.
*   **💾 Cloud Sync:** All your chats and histories are securely saved to MongoDB.
*   **✏️ Auto-Generated Titles:** Chat titles are automatically generated based on your first message.

## 🛠️ Tech Stack

*   **Frontend:** React 19, Vite, Tailwind CSS, Zustand (State Management), Framer Motion
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **Authentication:** Firebase
*   **AI Integration:** Google Generative AI SDK, OpenAI API

## 🚀 Running Locally

### Prerequisites
*   Node.js installed
*   MongoDB Cluster / local URI
*   Firebase Project configured
*   Google Gemini API Key
*   OpenAI API Key (optional)

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `backend` folder with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   OPENAI_API_KEY=your_openai_api_key
   DEBUG_MOCK_AI=false
   ```
4. Start the backend server: `npm start`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. The application will be accessible at `http://localhost:5173/`

## 👨‍💻 Author

Created by **[Shreyansh Gupta](https://github.com/ShreyanshGupta205)**.
