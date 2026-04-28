import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Zap, Globe, MessageSquare } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const Landing = () => {
    const navigate = useNavigate();
    const { token } = useAuthStore();

    const handleStart = () => {
        if (token) navigate('/chat');
        else navigate('/signup');
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col relative overflow-hidden font-sans">
            {/* Background Soft Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Navbar (Minimal) */}
            <nav className="w-full max-w-7xl mx-auto px-8 py-8 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <Sparkles size={18} className="text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter">ChatterVerse</span>
                </div>
                <button 
                  onClick={() => navigate('/login')}
                  className="text-sm font-bold text-white/40 hover:text-white transition-all"
                >
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center p-8 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400"
                    >
                        <Sparkles size={12} /> Next-Gen AI Platform
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                        Intelligent. <br />
                        <span className="text-[#818cf8]">Articulate.</span> <br />
                        Yours.
                    </h1>

                    <p className="text-xl md:text-2xl text-white/40 font-medium mb-12 max-w-2xl mx-auto tracking-tight">
                        Experience the most articulate AI companion. <br className="hidden md:block" />
                        Designed for clarity, built for connection.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <button 
                            onClick={handleStart}
                            className="w-full md:w-auto px-10 py-5 bg-indigo-500 hover:bg-white hover:text-indigo-500 text-white text-lg font-black rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 group"
                        >
                            Get Started 
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="w-full md:w-auto px-10 py-5 glass border border-white/5 text-lg font-bold rounded-2xl hover:bg-white/5 transition-all text-white/60">
                            Explore Features
                        </button>
                    </div>
                </motion.div>

                {/* Social Proof / Stats (Minimal) */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 opacity-20 border-t border-white/5 pt-12"
                >
                    {[
                        { label: "Active Threads", val: "2.4M" },
                        { label: "AI Moods", val: "Custom" },
                        { label: "Response Time", val: "0.2s" },
                        { label: "Built With", val: "Gemini" },
                    ].map((s, i) => (
                        <div key={i} className="text-center">
                            <p className="text-2xl font-black mb-1">{s.val}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest">{s.label}</p>
                        </div>
                    ))}
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="w-full max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 z-20">
                <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.3em]">
                    © 2026 ChatterVerse Platform. All rights reserved.
                </p>
                <div className="flex gap-8">
                    {['Terms', 'Privacy', 'Twitter', 'Github'].map(t => (
                        <button key={t} className="text-[10px] font-bold text-white/10 hover:text-white/40 uppercase tracking-widest transition-all">
                            {t}
                        </button>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default Landing;
