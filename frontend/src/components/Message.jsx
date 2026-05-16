import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, Copy, RotateCcw, Volume2, Check, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Message = ({ role, content, onRegenerate, isLast, isStreaming, onSpeak, isSpeaking }) => {
  const isAI = role === 'assistant';
  const [copiedCode, setCopiedCode] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full mb-8 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex max-w-[92%] gap-4 ${isAI ? 'flex-row' : 'flex-row-reverse text-right'}`}>
        <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/5 shadow-lg relative ${
          isAI ? 'bg-brand-primary/10 text-brand-primary' : 'bg-white/5 text-white/40'
        }`}>
           {isAI && isStreaming && <div className="absolute inset-0 rounded-xl animate-aura z-0"></div>}
           <div className="relative z-10">
               {isAI ? <Sparkles size={18} /> : <User size={18} />}
           </div>
        </div>

        <div className={`flex flex-col gap-2 ${isAI ? 'items-start' : 'items-end'}`}>
            <div className={`px-6 py-4 rounded-3xl text-sm font-medium leading-relaxed shadow-2xl glass-border ${
                isAI 
                ? 'glass-dark text-white/90 rounded-tl-none prose' 
                : 'bg-brand-primary text-white rounded-tr-none shadow-brand'
            }`}>
                {isAI ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <div className="rounded-xl overflow-hidden my-4 border border-white/10 shadow-lg">
                            <div className="bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white/40 border-b border-white/5 flex justify-between items-center">
                              <span>{match[1]}</span>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                                  setCopiedCode(match[1]);
                                  setTimeout(() => setCopiedCode(null), 2000);
                                }}
                                className="hover:text-white transition-colors flex items-center gap-1"
                              >
                                {copiedCode === match[1] ? <Check size={12} className="text-green-400"/> : <Copy size={12} />}
                                {copiedCode === match[1] ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                            <SyntaxHighlighter
                              style={atomDark}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                margin: 0,
                                background: 'transparent',
                                padding: '1rem',
                                fontSize: '0.85rem'
                              }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                ) : (
                  content
                )}
            </div>

            {isAI && (
                <div className={`flex items-center gap-4 mt-2 ml-1 transition-all ${isStreaming ? 'opacity-0' : 'opacity-20 hover:opacity-100'}`}>
                    <button 
                        onClick={() => navigator.clipboard.writeText(content)}
                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest hover:text-brand-primary active:scale-90 transition-all" 
                    >
                        <Copy size={12} />
                        Copy
                    </button>
                    <button 
                        onClick={onSpeak}
                        className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest active:scale-90 transition-all ${isSpeaking ? 'text-brand-primary animate-pulse' : 'hover:text-brand-primary'}`} 
                    >
                        <Volume2 size={12} className={isSpeaking ? 'fill-current' : ''} />
                        {isSpeaking ? 'Stop' : 'Read'}
                    </button>
                    {isLast && (
                        <button 
                          onClick={onRegenerate}
                          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest hover:text-brand-primary active:scale-90 transition-all" 
                        >
                            <RotateCcw size={12} />
                            Retry
                        </button>
                    )}
                </div>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default Message;
