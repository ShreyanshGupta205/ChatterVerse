import React from 'react';
import { Link } from 'react-router-dom';

export const pageContent = {
    // 🔵 Essential (Legal & Trust)
    'privacy-policy': {
        title: "Privacy Policy",
        badge: "LEGAL",
        intro: "We've written this in plain English on purpose. If you have questions, [email us](mailto:shreyanshg2005online@gmail.com).",
        content: `
Last updated: April 2026

## 1. What We Collect

When you create an account, we collect your email address and a hashed password. We never store your password in plain text.

When you use ChatterVerse, we store your chat messages and conversation history in MongoDB so you can access them later. We also store which AI model and Vibe you used in each session.

We collect basic usage data to improve the product. We do not run advertising or sell this data.

## 2. How We Use It

Your data is used to operate ChatterVerse — to save your chats, keep you logged in, and make the product better. That's it.

We do not use your conversations to train AI models. We do not read your chats unless you report a specific issue and explicitly ask for our help.

## 3. Third-Party AI

When you send a message, your text is forwarded to either Google (Gemini) or OpenAI (GPT-4o). Their handling of that data is governed by their own privacy policies — [Google's Privacy Policy](https://policies.google.com/privacy) and [OpenAI's Privacy Policy](https://openai.com/privacy).

## 4. Data Security

Your data is stored on MongoDB Atlas with encryption at rest, protected by JWT-based authentication. Our backend runs on Render with HTTPS enforced on all endpoints.

## 5. Your Rights

You can delete your account and all associated data at any time by emailing [shreyanshg2005online@gmail.com](mailto:shreyanshg2005online@gmail.com). We will process deletion requests within 7 days.

You can also request a copy of all data we hold about you at any time.

## 6. Cookies

We use a single session cookie to keep you logged in via JWT. We do not use tracking, advertising, or third-party analytics cookies.

## 7. Changes

If we make significant changes, we'll notify you via email or an in-app notice. The "last updated" date at the top will always reflect the latest version.

---

Questions? Email [shreyanshg2005online@gmail.com](mailto:shreyanshg2005online@gmail.com)
        `
    },
    'terms-of-service': {
        title: "Terms of Service",
        badge: "LEGAL",
        intro: "By creating an account or using ChatterVerse, you agree to these terms.",
        content: `
Last updated: April 2026

## 1. The Service

ChatterVerse is a platform for conversational AI interactions. You may use it for personal, educational, or professional purposes. You must be at least 13 years old to create an account.

You are responsible for maintaining the security of your account credentials. If you suspect unauthorised access, contact us immediately at [shreyanshg2005online@gmail.com](mailto:shreyanshg2005online@gmail.com).

## 2. Content Restrictions

You agree not to use ChatterVerse to generate content that is illegal, harmful, threatening, abusive, harassing, defamatory, or discriminatory. This includes generating malware, spreading misinformation, producing content that sexualises minors, or impersonating other individuals.

You are also bound by the acceptable use policies of — [OpenAI's Usage Policies](https://openai.com/policies/usage-policies) and [Google Gemini Terms](https://ai.google.dev/terms).

## 3. Content Ownership

You own the messages you write and the AI responses you receive. We do not claim any rights over your conversations.

You are responsible for how you use AI-generated content. We do not guarantee the accuracy or reliability of any AI responses. Always verify important information independently.

## 4. Service Availability

We aim to keep ChatterVerse running reliably, but cannot guarantee 100% uptime. The service depends on third-party providers (Google, OpenAI, Render, MongoDB Atlas) whose availability is outside our control.

## 5. Account Termination

We reserve the right to suspend accounts that violate these terms. If you believe your account was suspended in error, contact us at [shreyanshg2005online@gmail.com](mailto:shreyanshg2005online@gmail.com).

## 6. Disclaimer

ChatterVerse is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform, reliance on AI-generated content, or service interruptions.

## 7. Changes

We may update these terms as the platform evolves. Continued use after changes take effect constitutes acceptance of the updated terms.

---

Questions? Email [shreyanshg2005online@gmail.com](mailto:shreyanshg2005online@gmail.com)
        `
    },
    'cookie-policy': {
        title: "Cookie Policy",
        badge: "LEGAL",
        content: `
## What are cookies?

Cookies are small text files placed on your device to store data that can be recalled by a web server in the domain that placed the cookie.

## How we use them

Currently, ChatterVerse relies heavily on local storage and JSON Web Tokens (JWT) rather than traditional tracking cookies. We only use essential local storage to keep you logged in and to remember your theme and model preferences.

We do not use third-party tracking or advertising cookies.
        `
    },
    'data-deletion': {
        title: "Data Deletion Request",
        badge: "LEGAL",
        content: `
## Your Right to be Forgotten

If you wish to permanently delete your ChatterVerse account and all associated chat history, you have the right to do so.

## How to request deletion

To request immediate deletion of your data:

1. Send an email to [shreyanshg2005online@gmail.com](mailto:shreyanshg2005online@gmail.com)
2. Use the subject: **"Delete my account"**
3. We will verify your identity and wipe your data from our MongoDB and Firebase servers within **7 days**.

Once deleted, your chat history cannot be recovered.
        `
    },

    // 🟢 Product/Discovery
    'about': {
        title: "Our Story",
        content: `
## The Problem With AI Today

Most AI chat platforms give you one thing: a box, a cursor, and a single model with a single tone.

Ask it a question. Get an answer. Repeat. It doesn't matter if you're trying to crack a complex coding problem at 2 AM, vent to someone who *gets* you, or just have a fun, casual conversation in your own language — you're stuck with the same robotic voice every time.

We think that's wrong.

---

## The ChatterVerse Solution

ChatterVerse was built on a single belief: **great AI should adapt to you, not the other way around.**

We built a platform that doesn't just give you access to one AI model — it gives you the world's best, side by side. Google Gemini 2.5 for speed and intelligence. OpenAI GPT-4o for depth and articulation. And a growing library of **Vibes** — custom AI personalities that change *how* the AI talks to you, not just *what* it says.

Want a Chill Buddy who replies in Hinglish slang? Done. Need a strict Teacher Mode to help you understand a concept? Done. Want someone to roast your code? Absolutely done.

---

## The Builder

ChatterVerse was designed and engineered by **Shreyansh Gupta** — a full-stack developer passionate about building products at the intersection of AI, design, and human connection.

> *"I built ChatterVerse because I wanted to talk to AI the way I talk to my friends — with personality, context, and a little bit of chaos. I hope you feel the same way."*
> — Shreyansh Gupta, Founder
        `
    },
    'features': {
        title: "Platform Features",
        content: `
## Everything You Need for the Perfect Conversation

---

### 🤖 AI MODELS
**Multi-Model Engine**

Stop being locked into a single AI. ChatterVerse routes your conversations to the world's leading models and lets you switch between them with one click. Test the same prompt on both. Pick your favourite. The power is yours.

---

### 🎭 PERSONALITY
**The Vibes System**

AI doesn't have to sound like a corporate email. ChatterVerse's Vibes are custom AI personalities that completely change *how* the model talks to you, not just *what* it says. Choose from:
- **Chill Buddy** — Gen-Z energy, Hinglish mix, zero corporate talk.
- **Sassy Friend** — Witty, sharp, and never boring.
- **Coder Bro** — Gets your stack, speaks your language.
- **Teacher Mode** — Patient, structured, and brilliant at explanations.

---

### ⚡ PERFORMANCE
**Real-Time Streaming**

No more staring at a loading spinner. ChatterVerse streams responses directly to your screen — word by word — the instant the AI starts thinking. Built on efficient server-side streaming for a zero-latency feel.

---

### 💾 PERSISTENCE
**Your Chats, Always There**

Every conversation is saved securely to your personal account in the cloud. Pick up exactly where you left off, on any device, at any time.

---

### 🔐 SECURITY
**Auth You Can Trust**

Sign in with Google (Firebase Auth) or create a dedicated account. Your sessions are secured with JWT tokens and all data is stored in an encrypted MongoDB Atlas database. We never sell or read your conversations.

---

### 🎨 DESIGN
**Built to Look Good**

Premium glassmorphism UI, smooth dark mode, and micro-animations throughout. ChatterVerse doesn't just *work* well — it *looks* the part.
        `
    },
    'changelog': {
        title: "Changelog",
        content: `
## What's New in ChatterVerse

---

### v1.0.0 — April 2026 🎉 *Current Release*

**The official global launch of ChatterVerse.**

**🚀 New Features**
- **Multi-Model Engine** — Switch between Gemini 2.5 Flash, Gemini 2.5 Pro, GPT-4o, and GPT-3.5 Turbo from within the chat interface.
- **Vibes System** — Custom AI personalities baked into the platform (Chill Buddy, Sassy Friend, Coder Bro, Teacher Mode).
- **Real-Time Streaming** — Responses now stream word-by-word for a fluid, ChatGPT-like experience.
- **Persistent Chat History** — All conversations are saved to your personal account in MongoDB.
- **Google Sign-In** — One-click authentication via Firebase.
- **Premium UI** — Full glassmorphism design, dark mode, and smooth animations throughout.
- **Information Hub** — Legal pages (Privacy, Terms), Product pages (Features, Roadmap), and Developer docs are now live.

**🐛 Bug Fixes**
- **Fixed:** Gemini model routing was using deprecated \`gemini-1.5-flash\` IDs, causing silent API 404 errors on every message. Updated to \`gemini-2.5-flash\` and \`gemini-2.5-pro\`.
- **Fixed:** Critical UX bug — when a message hit a network error, it would silently disappear from the chat UI. Messages now remain visible even on failure, so you never lose what you typed.

---

### v0.9.0 — March 2026 🔬 *Beta*

- Initial private prototype.
- Single-model chat interface (Gemini 1.5 Flash only).
- Basic authentication and UI framework.

---

*See what's coming next on the [Roadmap](/info/roadmap).*
        `
    },
    'roadmap': {
        title: "Product Roadmap",
        content: `
## What We're Building Next

ChatterVerse is constantly evolving. Here's a transparent look at where we're headed — and we'd love your input on what matters most to you.

---

## 🚧 Coming Soon

These features are either in active development or planned for the immediate future.

**🖼️ Vision Mode**
Upload an image — a screenshot, a diagram, a photo — and ask any AI model to analyze, describe, or reason about it. Powered by Gemini's native multimodal capabilities.

**🎙️ Voice Mode**
Speak to your Vibe and hear it respond. Real-time voice input with text-to-speech output. Finally, AI you don't have to type to.

**🗑️ 1-Click Account Deletion**
Delete your account and all associated data instantly from the Settings page — no email required.

**🌙 Custom System Prompts**
Write your own Vibe from scratch. Give it a name, a personality, a tone. Your AI, your rules.

---

## 🔭 Further Ahead

Bigger ideas we're excited about for the future.

**📱 Mobile App**
Native iOS and Android apps with push notifications, offline mode, and a mobile-optimized Vibe selector.

**🤖 Claude by Anthropic**
Anthropic's Claude is one of the most thoughtful and nuanced AI models in existence — known for its careful reasoning and long-context ability. We're planning to add it as a third routing option alongside Gemini and OpenAI. Stay tuned.

**👥 Shared Vibes**
Create a Vibe and publish it to the ChatterVerse community. Browse, rate, and remix personalities built by other users.

**📊 Usage Dashboard**
See how many tokens you've used, which models you prefer, and how your conversation patterns have evolved over time.

---

## 💬 Have an Idea?

The roadmap is shaped by the community. If there's a feature you're desperate for — a new model, a Vibe idea, or a workflow you wish ChatterVerse supported — we genuinely want to hear it.

📩 **[Send us your feedback](mailto:support@chatterverse.com)**
        `
    },

    // 🟡 Developer / Power User
    'api-docs': {
        title: "Build with ChatterVerse",
        badge: "API DOCS",
        intro: "The ChatterVerse API lets you send messages to any supported AI model with any Vibe, and stream responses back — all from your own app.",
        component: (
            <div className="flex flex-col gap-12 mt-8 w-full max-w-none not-prose">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-yellow-500/90 text-sm font-medium">
                    API access is currently in private beta. <a href="mailto:shreyanshg2005online@gmail.com?subject=API Access Request" className="text-yellow-400 underline hover:text-yellow-300">Request access</a> to get your key.
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white/90 mb-4">Base URL</h3>
                    <div className="bg-[#1c1c1f] border border-white/10 rounded-xl p-4 font-mono text-sm text-white/80 overflow-x-auto">
                        https://chatterverse-api.onrender.com/api
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white/90 mb-4">Authentication</h3>
                    <p className="text-white/70 text-sm mb-4">All requests must include your API key in the Authorization header.</p>
                    <div className="bg-[#1c1c1f] border border-white/10 rounded-xl p-4 font-mono text-sm text-white/80 overflow-x-auto">
                        Authorization: Bearer YOUR_API_KEY
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white/90 mb-4">Endpoints</h3>
                    <div className="space-y-6">
                        {/* Chat Endpoint */}
                        <div className="bg-[#1c1c1f] border border-white/10 rounded-2xl overflow-hidden">
                            <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-white/[0.02]">
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">POST</span>
                                <code className="text-white/90 font-bold text-sm">/chat</code>
                            </div>
                            <div className="p-6">
                                <p className="text-white/70 text-sm mb-4">Send a message and receive a streamed AI response. Specify the model and vibe in the request body.</p>
                                <pre className="bg-black/50 border border-white/5 rounded-xl p-4 overflow-x-auto text-xs font-mono text-white/80 leading-relaxed">
{`{
  "message": "Explain async/await in JS",
  "model": "gemini-2.5-flash",
  "vibe": "coder-bro",
  "history": []
}`}
                                </pre>
                            </div>
                        </div>

                        {/* Models Endpoint */}
                        <div className="bg-[#1c1c1f] border border-white/10 rounded-2xl overflow-hidden">
                            <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-white/[0.02]">
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded">GET</span>
                                <code className="text-white/90 font-bold text-sm">/models</code>
                            </div>
                            <div className="p-4">
                                <p className="text-white/70 text-sm">Returns a list of all currently supported AI models and their availability status.</p>
                            </div>
                        </div>

                        {/* Vibes Endpoint */}
                        <div className="bg-[#1c1c1f] border border-white/10 rounded-2xl overflow-hidden">
                            <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-white/[0.02]">
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded">GET</span>
                                <code className="text-white/90 font-bold text-sm">/vibes</code>
                            </div>
                            <div className="p-4">
                                <p className="text-white/70 text-sm">Returns all available Vibes with their IDs and descriptions. Use the vibe ID in your <code className="bg-white/10 px-1 rounded">/chat</code> requests.</p>
                            </div>
                        </div>

                        {/* Status Endpoint */}
                        <div className="bg-[#1c1c1f] border border-white/10 rounded-2xl overflow-hidden">
                            <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-white/[0.02]">
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded">GET</span>
                                <code className="text-white/90 font-bold text-sm">/status</code>
                            </div>
                            <div className="p-4">
                                <p className="text-white/70 text-sm">Returns the current health of the ChatterVerse backend and each connected AI provider.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white/90 mb-4">Example — fetch with streaming</h3>
                    <pre className="bg-[#1c1c1f] border border-white/10 rounded-xl p-6 overflow-x-auto text-xs font-mono text-white/80 leading-relaxed">
{`const res = await fetch('https://chatterverse-api.onrender.com/api/chat', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: "What is recursion?",
    model: "gpt-4o",
    vibe: "coder-bro",
    history: []
  })
});

// Read the stream
const reader = res.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(decoder.decode(value));
}`}
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white/90 mb-4">Error codes</h3>
                    <div className="bg-[#1c1c1f] border border-white/10 rounded-xl overflow-hidden">
                        <div className="flex text-xs font-bold text-white/50 bg-white/[0.02] p-4 border-b border-white/5">
                            <div className="w-24">Code</div>
                            <div className="flex-1">Meaning</div>
                        </div>
                        <div className="flex text-sm p-4 border-b border-white/5">
                            <div className="w-24 text-red-400 font-mono">401</div>
                            <div className="flex-1 text-white/70">Missing or invalid API key</div>
                        </div>
                        <div className="flex text-sm p-4 border-b border-white/5">
                            <div className="w-24 text-yellow-400 font-mono">400</div>
                            <div className="flex-1 text-white/70">Bad request — missing required fields</div>
                        </div>
                        <div className="flex text-sm p-4 border-b border-white/5">
                            <div className="w-24 text-orange-400 font-mono">429</div>
                            <div className="flex-1 text-white/70">Rate limit exceeded — slow down requests</div>
                        </div>
                        <div className="flex text-sm p-4">
                            <div className="w-24 text-red-500 font-mono">500</div>
                            <div className="flex-1 text-white/70">Internal server error — check /status for provider issues</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    'supported-models': {
        title: "The world's best AI, in one place",
        badge: "SUPPORTED MODELS",
        intro: "ChatterVerse connects to multiple AI providers. Each model has different strengths — here's how to pick the right one.",
        component: (
            <div className="flex flex-col gap-12 mt-8 w-full max-w-none not-prose">
                {/* Google Gemini */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">G</div>
                        <h2 className="text-2xl font-bold text-white/90">Google Gemini</h2>
                    </div>
                    
                    {/* Model Card */}
                    <div className="bg-[#1c1c1f] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Gemini 2.5 Flash</h3>
                                <code className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">gemini-2.5-flash</code>
                            </div>
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">Live</span>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Google's fastest model. Best for quick answers, casual conversations, and everyday tasks where speed matters more than depth.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">Very fast</span>
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">Text + Vision</span>
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">1M token context</span>
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">Streaming</span>
                        </div>
                    </div>

                    <div className="bg-[#1c1c1f] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Gemini 2.5 Pro</h3>
                                <code className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">gemini-2.5-pro</code>
                            </div>
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">Live</span>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Google's most capable model. Stronger reasoning, better at long documents, complex coding, and multi-step problems.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">Deep reasoning</span>
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">Text + Vision</span>
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">1M token context</span>
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">Streaming</span>
                        </div>
                    </div>
                </div>

                {/* OpenAI */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white text-sm">O</div>
                        <h2 className="text-2xl font-bold text-white/90">OpenAI</h2>
                    </div>

                    <div className="bg-[#1c1c1f] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">GPT-4o</h3>
                                <code className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">gpt-4o</code>
                            </div>
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">Live</span>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">
                            OpenAI's flagship multimodal model. Excellent for writing, analysis, creative tasks, and nuanced conversations. The gold standard for natural language.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">Best for writing</span>
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">Text + Vision</span>
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">128K context</span>
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full border border-white/5">Streaming</span>
                        </div>
                    </div>
                </div>

                {/* Coming Soon */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white/50 text-sm">+</div>
                        <h2 className="text-2xl font-bold text-white/50">Coming soon</h2>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex justify-between items-center opacity-70">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Claude (Anthropic)</h3>
                            <code className="text-xs font-mono text-white/40">claude-sonnet-4, claude-opus-4</code>
                        </div>
                        <span className="px-3 py-1 border border-white/10 text-white/50 text-xs font-bold rounded-full">Planned</span>
                    </div>
                </div>

                {/* Tip Card */}
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 mt-4">
                    <p className="text-white/80 text-sm">
                        <strong className="text-white block mb-1">Not sure which model to use?</strong>
                        Start with Gemini 2.5 Flash for speed. Switch to GPT-4o when you need more nuance. Use Gemini 2.5 Pro for anything that requires deep reasoning or long documents.
                    </p>
                </div>
            </div>
        )
    },
    'status': {
        title: "All systems operational",
        badge: "SYSTEM STATUS",
        intro: "Last checked: a few seconds ago — auto-refreshes every 60 seconds.",
        component: (
            <div className="flex flex-col gap-12 mt-8 w-full max-w-none not-prose">
                {/* Core Services */}
                <div>
                    <h3 className="text-lg font-bold text-white/90 mb-4 border-b border-white/10 pb-2">Core services</h3>
                    <div className="flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                        <div className="flex justify-between items-center p-4 border-b border-white/5">
                            <div>
                                <p className="font-bold text-white text-sm">ChatterVerse API (Render)</p>
                                <p className="text-xs text-white/50">chatterverse-api.onrender.com</p>
                            </div>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">Operational</span>
                        </div>
                        <div className="flex justify-between items-center p-4 border-b border-white/5">
                            <div>
                                <p className="font-bold text-white text-sm">Frontend (Vercel)</p>
                                <p className="text-xs text-white/50">chatterverse-gilt.vercel.app</p>
                            </div>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">Operational</span>
                        </div>
                        <div className="flex justify-between items-center p-4">
                            <div>
                                <p className="font-bold text-white text-sm">Database (MongoDB Atlas)</p>
                                <p className="text-xs text-white/50">Chat history, users, sessions</p>
                            </div>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">Operational</span>
                        </div>
                    </div>
                </div>

                {/* AI Providers */}
                <div>
                    <h3 className="text-lg font-bold text-white/90 mb-4 border-b border-white/10 pb-2">AI providers</h3>
                    <div className="flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                        <div className="flex justify-between items-center p-4 border-b border-white/5">
                            <div>
                                <p className="font-bold text-white text-sm">Google Gemini API</p>
                                <p className="text-xs text-white/50">Gemini 2.5 Flash · Gemini 2.5 Pro</p>
                            </div>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">Operational</span>
                        </div>
                        <div className="flex justify-between items-center p-4">
                            <div>
                                <p className="font-bold text-white text-sm">OpenAI API</p>
                                <p className="text-xs text-white/50">GPT-4o</p>
                            </div>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">Operational</span>
                        </div>
                    </div>
                </div>

                {/* Uptime */}
                <div>
                    <h3 className="text-lg font-bold text-white/90 mb-4 border-b border-white/10 pb-2">Uptime — last 30 days</h3>
                    
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-white/80">ChatterVerse API</span>
                                <span className="text-green-400 font-bold">99.9%</span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '99.9%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-white/80">Gemini API</span>
                                <span className="text-green-400 font-bold">99.7%</span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden flex">
                                <div className="bg-green-500 h-1.5 rounded-l-full" style={{ width: '45%' }}></div>
                                <div className="bg-yellow-500 h-1.5" style={{ width: '1%' }}></div>
                                <div className="bg-green-500 h-1.5 rounded-r-full" style={{ width: '54%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-white/80">OpenAI API</span>
                                <span className="text-green-400 font-bold">99.5%</span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden flex">
                                <div className="bg-green-500 h-1.5 rounded-l-full" style={{ width: '80%' }}></div>
                                <div className="bg-yellow-500 h-1.5" style={{ width: '2%' }}></div>
                                <div className="bg-green-500 h-1.5 rounded-r-full" style={{ width: '18%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Incidents */}
                <div>
                    <h3 className="text-lg font-bold text-white/90 mb-4 border-b border-white/10 pb-2">Recent incidents</h3>
                    <div className="bg-[#1c1c1f] border border-white/10 rounded-xl p-6 text-center">
                        <p className="text-white/70 text-sm">No incidents reported in the last 30 days.</p>
                    </div>
                </div>

                {/* Footer Tip */}
                <div className="bg-[#1c1c1f] border border-white/10 rounded-xl p-6">
                    <h4 className="text-white font-bold mb-2">Experiencing an issue?</h4>
                    <p className="text-white/70 text-sm">
                        If something feels broken, <Link to="/info/contact" className="text-indigo-400 hover:text-indigo-300">contact us</Link> and we'll investigate. For third-party provider outages, check <a href="https://status.openai.com" className="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noreferrer">OpenAI's status page</a> or <a href="https://status.cloud.google.com" className="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noreferrer">Google Cloud status</a> directly.
                    </p>
                </div>
            </div>
        )
    },

    // 🟠 Community & Support
    'faq': {
        title: "Frequently Asked Questions",
        badge: "SUPPORT",
        intro: "Can't find your answer? [Email us](mailto:shreyanshg2005online@gmail.com) and we'll get back to you.",
        component: (
            <div className="flex flex-col gap-12 mt-8 w-full max-w-none not-prose">
                
                {/* Getting Started */}
                <div>
                    <h3 className="text-xs font-bold text-white/50 tracking-widest uppercase mb-4">GETTING STARTED</h3>
                    <div className="flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-[#1c1c1f]">
                        <div className="p-6 border-b border-white/5">
                            <h4 className="text-white font-bold mb-2">Is ChatterVerse free to use?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">Yes. ChatterVerse is currently free. Create an account, pick any model, choose any Vibe, and start chatting — no credit card required.</p>
                        </div>
                        <div className="p-6 border-b border-white/5">
                            <h4 className="text-white font-bold mb-2">Do I need to sign up to use it?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">Yes. An account is required so your chat history can be saved and kept private. Signup takes under 30 seconds — just an email and password.</p>
                        </div>
                        <div className="p-6">
                            <h4 className="text-white font-bold mb-2">What is a Vibe?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">A Vibe is a personality setting that changes how the AI talks to you. The Chill Gen-Z Buddy mixes in Hinglish and keeps things casual, while the Coder Bro stays technical and to the point. You can switch Vibes at any time.</p>
                        </div>
                    </div>
                </div>

                {/* Models & AI */}
                <div>
                    <h3 className="text-xs font-bold text-white/50 tracking-widest uppercase mb-4">MODELS & AI</h3>
                    <div className="flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-[#1c1c1f]">
                        <div className="p-6 border-b border-white/5">
                            <h4 className="text-white font-bold mb-2">Which AI model should I use?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">Start with Gemini 2.5 Flash for speed. Switch to GPT-4o for writing or nuanced conversations. Use Gemini 2.5 Pro for deep reasoning or long documents. You can swap mid-conversation anytime.</p>
                        </div>
                        <div className="p-6 border-b border-white/5">
                            <h4 className="text-white font-bold mb-2">Are the AI responses always accurate?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">No AI is always accurate. Both Gemini and GPT-4o can occasionally produce incorrect or misleading information. Always verify important information independently, especially for medical, legal, or financial decisions.</p>
                        </div>
                        <div className="p-6">
                            <h4 className="text-white font-bold mb-2">Does ChatterVerse use my chats to train AI?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">No. We do not use your chats to train any AI model. Your chats are stored privately and are not shared with anyone for training purposes.</p>
                        </div>
                    </div>
                </div>

                {/* Account & Data */}
                <div>
                    <h3 className="text-xs font-bold text-white/50 tracking-widest uppercase mb-4">ACCOUNT & DATA</h3>
                    <div className="flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-[#1c1c1f]">
                        <div className="p-6 border-b border-white/5">
                            <h4 className="text-white font-bold mb-2">Are my chats private?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">Yes. Your conversations are protected by JWT authentication — only you can access them. We do not read your chats unless you contact us with a specific issue.</p>
                        </div>
                        <div className="p-6 border-b border-white/5">
                            <h4 className="text-white font-bold mb-2">Can I delete my account and all my data?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">Yes. Email <a href="mailto:shreyanshg2005online@gmail.com" className="text-indigo-400 hover:underline">shreyanshg2005online@gmail.com</a> with the subject "Delete my account" and we'll permanently remove everything within 7 days.</p>
                        </div>
                        <div className="p-6">
                            <h4 className="text-white font-bold mb-2">I forgot my password. What do I do?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">Use the "Forgot password" link on the login page. Still stuck? Email <a href="mailto:shreyanshg2005online@gmail.com" className="text-indigo-400 hover:underline">shreyanshg2005online@gmail.com</a> and we'll help you regain access.</p>
                        </div>
                    </div>
                </div>

                {/* Technical */}
                <div>
                    <h3 className="text-xs font-bold text-white/50 tracking-widest uppercase mb-4">TECHNICAL</h3>
                    <div className="flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-[#1c1c1f]">
                        <div className="p-6 border-b border-white/5">
                            <h4 className="text-white font-bold mb-2">Why is the first response slow sometimes?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">Our backend is hosted on Render's free tier, which sleeps after inactivity. The first request of the day can take 30–60 seconds to wake the server. Once awake, responses are fast.</p>
                        </div>
                        <div className="p-6 border-b border-white/5">
                            <h4 className="text-white font-bold mb-2">The AI stopped mid-response. What happened?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">This can happen due to a brief network interruption. Your message is saved — try sending it again. Check our <Link to="/info/status" className="text-indigo-400 hover:underline">Status page</Link> for any known issues.</p>
                        </div>
                        <div className="p-6">
                            <h4 className="text-white font-bold mb-2">Is there a mobile app?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">Not yet, but the web app is fully responsive on mobile browsers. A native app is on our <Link to="/info/roadmap" className="text-indigo-400 hover:underline">Roadmap</Link>.</p>
                        </div>
                    </div>
                </div>

                {/* Footer Tip */}
                <div className="bg-[#1c1c1f] border border-white/10 rounded-xl p-6">
                    <h4 className="text-white font-bold mb-2">Still have a question?</h4>
                    <p className="text-white/70 text-sm">
                        Email <a href="mailto:shreyanshg2005online@gmail.com" className="text-indigo-400 hover:underline">shreyanshg2005online@gmail.com</a> — we usually reply within 24 hours.
                    </p>
                </div>
            </div>
        )
    },
    'contact': {
        title: "Get in touch",
        badge: "SUPPORT",
        intro: "I built ChatterVerse solo and I read every message. Expect a reply within 24 hours on weekdays.",
        component: (
            <div className="flex flex-col gap-12 mt-8 w-full max-w-none not-prose">
                
                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a href="mailto:shreyanshg2005online@gmail.com?subject=General%20Support" className="group bg-[#1c1c1f] hover:bg-[#252529] border border-white/10 hover:border-white/20 transition-all rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/50 group-hover:bg-indigo-500 transition-colors"></div>
                        <h3 className="text-xs font-bold text-white/50 tracking-widest uppercase">General Support</h3>
                        <p className="text-white font-medium text-lg leading-snug">Bugs, account help, questions</p>
                        <span className="text-indigo-400 text-sm mt-auto">shreyanshg2005online@gmail.com</span>
                    </a>

                    <a href="mailto:shreyanshg2005online@gmail.com?subject=Data%20%26%20Privacy%20Request" className="group bg-[#1c1c1f] hover:bg-[#252529] border border-white/10 hover:border-white/20 transition-all rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors"></div>
                        <h3 className="text-xs font-bold text-white/50 tracking-widest uppercase">Data & Privacy</h3>
                        <p className="text-white font-medium text-lg leading-snug">Deletion requests, data export</p>
                        <span className="text-emerald-400 text-sm mt-auto">shreyanshg2005online@gmail.com</span>
                    </a>

                    <a href="mailto:shreyanshg2005online@gmail.com?subject=Feedback%20%26%20Ideas" className="group bg-[#1c1c1f] hover:bg-[#252529] border border-white/10 hover:border-white/20 transition-all rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/50 group-hover:bg-amber-500 transition-colors"></div>
                        <h3 className="text-xs font-bold text-white/50 tracking-widest uppercase">Feedback & Ideas</h3>
                        <p className="text-white font-medium text-lg leading-snug">Feature requests, suggestions</p>
                        <span className="text-amber-400 text-sm mt-auto">shreyanshg2005online@gmail.com</span>
                    </a>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold text-white/90 mb-4 border-b border-white/10 pb-2">Before you write</h3>
                    <div className="flex flex-col border border-white/10 rounded-2xl overflow-hidden bg-[#1c1c1f]">
                        <Link to="/info/faq" className="flex justify-between items-center p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                            <span className="font-medium text-white/90">Browse the FAQ</span>
                            <span className="text-white/30 group-hover:text-white/70 transition-colors">→</span>
                        </Link>
                        <Link to="/info/status" className="flex justify-between items-center p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                            <span className="font-medium text-white/90">Check system status — is something down?</span>
                            <span className="text-white/30 group-hover:text-white/70 transition-colors">→</span>
                        </Link>
                        <Link to="/info/roadmap" className="flex justify-between items-center p-4 hover:bg-white/[0.02] transition-colors group">
                            <span className="font-medium text-white/90">See what's already on the roadmap</span>
                            <span className="text-white/30 group-hover:text-white/70 transition-colors">→</span>
                        </Link>
                    </div>
                </div>

                {/* Response Time Tip */}
                <div className="bg-[#1c1c1f] border border-white/10 rounded-2xl p-6">
                    <h4 className="text-white font-bold mb-2">Response time</h4>
                    <p className="text-white/70 text-sm">
                        I aim to reply within 24 hours on weekdays. For urgent issues, mark your subject line with <code className="bg-black/30 px-2 py-1 rounded text-white/90">[URGENT]</code> and I'll prioritise it.
                    </p>
                </div>
            </div>
        )
    }
};

