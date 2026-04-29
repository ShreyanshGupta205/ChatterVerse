import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Cpu, Layers, Lock, X } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const Landing = () => {
    const navigate = useNavigate();
    const { token } = useAuthStore();

    const handleStart = () => {
        if (token) navigate('/chat');
        else navigate('/signup');
    };

    const scrollToFeatures = () => {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
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
            <main className="flex-1 flex flex-col items-center justify-center p-8 z-10 text-center min-h-[80vh]">
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
                        <button 
                            onClick={scrollToFeatures}
                            className="w-full md:w-auto px-10 py-5 glass border border-white/5 text-lg font-bold rounded-2xl hover:bg-white/5 transition-all text-white/60"
                        >
                            Explore Features
                        </button>
                    </div>
                </motion.div>

                {/* Social Proof / Stats (Minimal) */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 opacity-20 border-t border-white/5 pt-12 w-full max-w-5xl"
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

            {/* Features Section */}
            <section id="features" className="w-full max-w-7xl mx-auto px-8 py-32 z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">Powered by the Best</h2>
                    <p className="text-xl text-white/40">Everything you need for the perfect conversation.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Cpu className="text-indigo-400" size={32} />, title: "Multi-Model Engine", desc: "Switch instantly between Google Gemini 2.5 and OpenAI GPT-4o depending on your needs. The choice is yours." },
                        { icon: <Layers className="text-purple-400" size={32} />, title: "Custom Vibes", desc: "From 'Chill Buddy' to 'Teacher Mode', talk to AI with the personality that fits your exact mood and task." },
                        { icon: <Lock className="text-emerald-400" size={32} />, title: "Privacy First", desc: "Your chats are encrypted and securely stored. We respect your data privacy and keep your history safe." }
                    ].map((feat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/10 transition-colors"
                        >
                            <div className="mb-6 p-4 bg-black/50 rounded-2xl inline-block">{feat.icon}</div>
                            <h3 className="text-2xl font-bold mb-3">{feat.title}</h3>
                            <p className="text-white/50 leading-relaxed">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="w-full max-w-7xl mx-auto px-8 py-32 z-10 border-t border-white/5">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">How It Works</h2>
                    <p className="text-xl text-white/40">Three simple steps to AI enlightenment.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-8 justify-center max-w-5xl mx-auto">
                    {[
                        { step: "01", title: "Create Account", desc: "Sign up securely in seconds. Your data is synced and ready." },
                        { step: "02", title: "Select Your Vibe", desc: "Pick the AI personality and underlying model that you want to talk to." },
                        { step: "03", title: "Start Chatting", desc: "Experience real-time, fluid conversations with instant streaming responses." }
                    ].map((item, i) => (
                        <div key={i} className="flex-1 relative p-8 text-center md:text-left">
                            <div className="text-6xl font-black text-white/5 mb-4">{item.step}</div>
                            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                            <p className="text-white/50 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="w-full max-w-5xl mx-auto px-8 py-32 z-10 text-center">
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 relative z-10 tracking-tight">Ready to chat?</h2>
                    <p className="text-xl md:text-2xl text-white/60 mb-10 relative z-10 max-w-2xl mx-auto">Join thousands of users experiencing the future of AI conversation today.</p>
                    <button 
                        onClick={handleStart}
                        className="relative z-10 px-12 py-6 bg-white text-black text-xl font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto"
                    >
                        Launch ChatterVerse
                        <ArrowRight size={24} />
                    </button>
                </div>
            </section>

            {/* Mega Footer */}
            <footer className="w-full bg-black/50 border-t border-white/5 pt-20 pb-10 mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="col-span-2 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <span className="text-xl font-black tracking-tighter">ChatterVerse</span>
                            </div>
                            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
                                Experience the most articulate AI companion. Switch between the world's best models and customize their vibe.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://github.com/ShreyanshGupta205" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all p-2 bg-white/5 hover:bg-white/10 rounded-full" aria-label="GitHub">
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                </a>
                                <a href="https://linkedin.com/in/shreyanshgupta205" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-blue-400 transition-all p-2 bg-white/5 hover:bg-white/10 rounded-full" aria-label="LinkedIn">
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </a>
                            </div>
                        </div>

                        {/* Product Column */}
                        <div>
                            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Product</h4>
                            <ul className="space-y-3">
                                <li><Link to="/info/about" className="text-sm text-white/50 hover:text-white transition-colors">Our Story</Link></li>
                                <li><Link to="/info/features" className="text-sm text-white/50 hover:text-white transition-colors">Features</Link></li>
                                <li><Link to="/info/changelog" className="text-sm text-white/50 hover:text-white transition-colors">Changelog</Link></li>
                                <li><Link to="/info/roadmap" className="text-sm text-white/50 hover:text-white transition-colors">Roadmap</Link></li>
                            </ul>
                        </div>

                        {/* Developer Column */}
                        <div>
                            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Developer</h4>
                            <ul className="space-y-3">
                                <li><Link to="/info/api-docs" className="text-sm text-white/50 hover:text-white transition-colors">API Docs</Link></li>
                                <li><Link to="/info/supported-models" className="text-sm text-white/50 hover:text-white transition-colors">Supported Models</Link></li>
                                <li><Link to="/info/status" className="text-sm text-white/50 hover:text-emerald-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> System Status</Link></li>
                            </ul>
                        </div>

                        {/* Legal & Support Column */}
                        <div>
                            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Legal & Support</h4>
                            <ul className="space-y-3">
                                <li><Link to="/info/privacy-policy" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/info/terms-of-service" className="text-sm text-white/50 hover:text-white transition-colors">Terms of Service</Link></li>
                                <li><Link to="/info/faq" className="text-sm text-white/50 hover:text-white transition-colors">FAQ</Link></li>
                                <li><Link to="/info/contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
                        <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
                            © 2026 ChatterVerse Platform. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <p className="text-xs text-white/40">Built by <span className="text-white/60 font-bold">Shreyansh Gupta</span></p>
                            <div className="w-1 h-1 bg-white/20 rounded-full hidden md:block"></div>
                            <Link to="/info/data-deletion" className="text-xs text-red-400/50 hover:text-red-400 transition-colors">Data Deletion</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
