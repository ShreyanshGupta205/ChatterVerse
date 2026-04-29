import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Plus, Mic, RotateCcw, ChevronDown, Sparkles, Square, Download, Cpu } from 'lucide-react';
import useChatStore from '../store/useChatStore';
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

const BotAvatar = ({ isThinking }) => (
  <div className="flex flex-col items-center justify-center py-10">
    <motion.div 
      animate={{ 
        scale: isThinking ? [1, 1.05, 1] : 1,
        rotate: isThinking ? [0, 360] : 0 
      }}
      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      className={`w-16 h-16 rounded-full glass flex items-center justify-center border border-white/5 shadow-2xl ${isThinking ? 'border-indigo-500/50' : ''}`}
    >
      <Sparkles size={24} className={isThinking ? 'text-indigo-400' : 'text-white/20'} />
    </motion.div>
    {isThinking && (
      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400/80 animate-pulse">
        Processing...
      </p>
    )}
  </div>
);

const ChatPage = () => {
    const { chats, currentChatId, sendMessage, regenerateMessage, createChat, fetchChats, loading, error, mood, setMood, selectedModel, setModel, stopGeneration } = useChatStore();
    const [input, setInput] = useState('');
    const [showMoods, setShowMoods] = useState(false);
    const [showModels, setShowModels] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const scrollRef = useRef(null);
    const recognitionRef = useRef(null);

    const activeChat = chats.find(c => c._id === currentChatId);

    useEffect(() => {
        fetchChats();

        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput((prev) => prev ? `${prev} ${transcript}` : transcript);
            };

            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
            
            recognitionRef.current = recognition;
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activeChat?.messages, loading]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;
        
        // Stop listening if sending
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        }

        let chatId = currentChatId;
        const text = input;
        setInput('');

        if (!chatId) {
            chatId = await createChat(mood);
        }
        await sendMessage(text, mood);
    };

    const handleRegenerate = async () => {
        if (loading) return;
        await regenerateMessage(mood);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else if (recognitionRef.current) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleExport = () => {
        if (!activeChat || activeChat.messages.length === 0) return;
        let md = `# ${activeChat.title || 'Chat Export'}\n\n`;
        activeChat.messages.forEach(m => {
            md += `**${m.role === 'user' ? 'You' : 'AI'}**:\n${m.content}\n\n---\n\n`;
        });
        const blob = new Blob([md], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(activeChat.title || 'chat-export').replace(/\s+/g, '-').toLowerCase()}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div data-theme={mood} className="flex h-screen w-screen bg-[#09090b] text-[#fafafa] overflow-hidden transition-colors duration-500">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 flex flex-col items-center relative overflow-hidden h-full bg-[#09090b]">
                <TopNav onMenuToggle={() => setSidebarOpen(true)} />
                
                {/* Top Actions (Mood & Model Dropdowns) */}
                <div className="absolute top-16 right-8 z-40 flex gap-4">
                  {/* Model Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowModels(!showModels)}
                      className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-xs font-bold border border-white/5 hover:border-white/20 transition-all text-white/60"
                    >
                      <Cpu size={14} className="text-emerald-400" />
                      Model: <span className="text-white">
                        {selectedModel === 'gemini-1.5-flash' ? 'Gemini Flash' : 
                         selectedModel === 'gemini-1.5-pro' ? 'Gemini Pro' : 
                         selectedModel === 'gpt-4o' ? 'GPT-4o' : 
                         selectedModel === 'gpt-3.5-turbo' ? 'GPT-3.5' : selectedModel}
                      </span>
                      <ChevronDown size={14} className={`transition-transform ${showModels ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence mode="wait">
                      {showModels && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute top-full right-0 mt-2 w-48 glass-dark rounded-2xl p-2 border border-white/10 shadow-2xl flex flex-col gap-1"
                        >
                          {[
                              { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
                              { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
                              { id: 'gpt-4o', name: 'GPT-4o' },
                              { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
                          ].map((m) => (
                            <button
                              key={m.id}
                              onClick={() => { setModel(m.id); setShowModels(false); }}
                              className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all ${selectedModel === m.id ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-white/5 text-white/40 hover:text-white/80'}`}
                            >
                              {m.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mood Dropdown (Professional Refinement) */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowMoods(!showMoods)}
                      className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-xs font-bold border border-white/5 hover:border-white/20 transition-all text-white/60"
                    >
                      Vibe: <span className="text-indigo-400">{mood}</span>
                      <ChevronDown size={14} className={`transition-transform ${showMoods ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence mode="wait">
                      {showMoods && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute top-full right-0 mt-2 w-48 glass-dark rounded-2xl p-2 border border-white/10 shadow-2xl flex flex-col gap-1"
                        >
                          {['Chill Buddy', 'Teacher Mode', 'Sassy Friend', 'Coder Bro'].map((m) => (
                            <button
                              key={m}
                              onClick={() => { setMood(m); setShowMoods(false); }}
                              className={`w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all ${mood === m ? 'bg-brand-primary/20 text-brand-primary' : 'hover:bg-white/5 text-white/40 hover:text-white/80'}`}
                            >
                              {m}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Export Button */}
                  {activeChat && (
                    <button 
                      onClick={handleExport}
                      className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-xs font-bold border border-white/5 hover:border-white/20 transition-all text-white/60 hover:text-white"
                    >
                      <Download size={14} />
                      Export .md
                    </button>
                  )}
                </div>

                {/* Chat Area (Absolute Positioning for Stability) */}
                <div className="flex-1 w-full max-w-3xl flex flex-col relative h-full min-h-0">
                    {!activeChat ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                            {error ? (
                                <div className="glass-dark border border-red-500/20 p-6 rounded-3xl max-w-sm">
                                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <RotateCcw size={20} className="text-red-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
                                    <p className="text-white/40 text-sm mb-6">{error}</p>
                                    <button 
                                        onClick={fetchChats}
                                        className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold transition-all"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <BotAvatar isThinking={false} />
                                    <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-none mt-4">
                                        Deep <span className="text-indigo-400">Insight</span>,<br />
                                        Tailored for You.
                                    </h2>
                                    <p className="text-white/20 text-sm font-medium max-w-sm mx-auto leading-relaxed">Select a personality and start typing to begin a session.</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto px-4 md:px-8 pt-20 custom-scrollbar space-y-6 pb-40"
                        >
                            <AnimatePresence mode="popLayout">
                                {activeChat.messages.map((msg, i) => (
                                    <Message 
                                        key={msg._id || i} 
                                        role={msg.role} 
                                        content={msg.content} 
                                        isLast={i === activeChat.messages.length - 1}
                                        isStreaming={loading && i === activeChat.messages.length - 1}
                                        onRegenerate={handleRegenerate}
                                    />
                                ))}
                            </AnimatePresence>
                            {loading && <BotAvatar isThinking={true} />}
                        </div>
                    )}

                    {/* Floating Pill Input Bar */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 pointer-events-none">
                        <div className="max-w-2xl mx-auto pointer-events-auto">
                            <form 
                                onSubmit={handleSend}
                                className="glass-dark rounded-full p-2 flex items-center gap-2 border border-white/10 shadow-2xl transition-all focus-within:border-indigo-500/50"
                            >
                                <button type="button" className="p-3 text-white/20 hover:text-white/60 transition-all"><Plus size={20} /></button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none py-3 text-sm text-white placeholder:text-white/30 px-2"
                                    placeholder={isListening ? "Listening..." : "Ask anything..."}
                                />
                                <div className="flex items-center gap-1 p-1">
                                    <button 
                                        type="button" 
                                        onClick={toggleListening}
                                        className={`p-3 rounded-full transition-all ${
                                            isListening ? 'bg-indigo-500/20 text-indigo-400 animate-pulse' : 'text-white/20 hover:text-indigo-400'
                                        }`}
                                    >
                                        <Mic size={18} />
                                    </button>
                                    {loading ? (
                                        <button 
                                            type="button" 
                                            onClick={stopGeneration}
                                            className="p-3 rounded-full transition-all bg-white/10 text-white hover:bg-red-500/80 shadow-lg"
                                        >
                                            <Square size={18} fill="currentColor" strokeWidth={0} className="rounded-sm" />
                                        </button>
                                    ) : (
                                        <button 
                                            type="submit" 
                                            disabled={!input.trim()}
                                            className={`p-3 rounded-full transition-all ${
                                                input.trim() ? 'bg-brand-primary text-white shadow-brand' : 'bg-white/5 text-white/10'
                                            }`}
                                        >
                                            <Send size={18} strokeWidth={3} />
                                        </button>
                                    )}
                                </div>
                            </form>
                            <p className="text-[9px] text-center mt-3 text-white/10 font-bold uppercase tracking-[0.2em] transition-colors hover:text-white/30">
                                Powered by {selectedModel.includes('gpt') ? 'OpenAI' : 'Gemini'} • Built for ChatterVerse
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChatPage;

