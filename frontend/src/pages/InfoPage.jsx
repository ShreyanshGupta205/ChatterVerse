import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { pageContent } from '../data/pageContent';

import logo from '../assets/logo.png';

const InfoPage = () => {
    const { pageId } = useParams();
    const navigate = useNavigate();
    
    const pageData = pageContent[pageId];

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageId]);

    if (!pageData) {
        return (
            <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col items-center justify-center font-sans">
                <h1 className="text-4xl font-black mb-4">404 - Page Not Found</h1>
                <p className="text-white/40 mb-8">The page you are looking for does not exist.</p>
                <button onClick={() => navigate('/')} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans flex flex-col relative selection:bg-indigo-500/30">
            {/* Soft Glow */}
            <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Navbar Minimal */}
            <nav className="w-full max-w-4xl mx-auto px-8 py-8 flex items-center justify-between z-20 relative border-b border-white/5">
                <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                    <img src={logo} alt="ChatterVerse Logo" className="w-8 h-8 object-contain" />
                    <span className="text-xl font-black tracking-tighter">ChatterVerse</span>
                </Link>
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-all"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>
            </nav>

            {/* Content Area */}
            <main className="flex-1 w-full max-w-3xl mx-auto px-8 py-16 z-10 relative">
                <div className="mb-12">
                    {pageData.badge && (
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400 mb-4">{pageData.badge}</p>
                    )}
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{pageData.title}</h1>
                    <div className="h-1 w-20 bg-indigo-500 rounded-full mb-6"></div>
                    {pageData.intro && (
                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-5 py-4 text-white/80 text-sm leading-relaxed">
                            <ReactMarkdown>{pageData.intro}</ReactMarkdown>
                        </div>
                    )}
                </div>

                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-p:leading-relaxed prose-p:text-white/70 prose-strong:text-white prose-li:text-white/70">
                    {pageData.component ? (
                        pageData.component
                    ) : (
                        <ReactMarkdown>
                            {pageData.content}
                        </ReactMarkdown>
                    )}
                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="w-full max-w-4xl mx-auto px-8 py-8 border-t border-white/5 z-20 text-center relative mt-auto">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                    © 2026 ChatterVerse Platform.
                </p>
            </footer>
        </div>
    );
};

export default InfoPage;
