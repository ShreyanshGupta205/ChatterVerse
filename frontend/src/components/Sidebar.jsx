import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Plus, Book, Code, Sparkles as SparkleIcon, Flame, Trash2, Search, X } from 'lucide-react';
import useChatStore from '../store/useChatStore';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    const { chats, currentChatId, setCurrentChat, createChat, mood, deleteChat } = useChatStore();
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const handleNewChat = async () => {
        await createChat(mood);
        onClose?.();
    };

    const getMoodIcon = (chatMood) => {
        const iconClass = "transition-all group-hover:scale-110";
        switch(chatMood) {
            case 'Teacher Mode': return <Book size={16} className={iconClass} />;
            case 'Sassy Friend': return <Flame size={16} className={iconClass} />;
            case 'Coder Bro': return <Code size={16} className={iconClass} />;
            case 'Chill Buddy':
            default: return <SparkleIcon size={16} className={iconClass} />;
        }
    };

    const filteredChats = chats.filter(chat => {
        const q = search.toLowerCase();
        const preview = chat.messages.length > 0 ? chat.messages[0].content.toLowerCase() : '';
        return (chat.title || chat.mood || '').toLowerCase().includes(q) || preview.includes(q);
    });

    const groupChats = (rawChats) => {
        const groups = { "Today": [], "Yesterday": [], "Previous 7 Days": [], "Older": [] };
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Normalize to start of today
        
        rawChats.forEach(chat => {
            const chatDate = new Date(chat.lastUpdated || Date.now());
            chatDate.setHours(0, 0, 0, 0);
            
            const diffTime = now - chatDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0) groups["Today"].push(chat);
            else if (diffDays === 1) groups["Yesterday"].push(chat);
            else if (diffDays <= 7) groups["Previous 7 Days"].push(chat);
            else groups["Older"].push(chat);
        });
        return groups;
    };

    const sidebarContent = (
        <div className="w-72 h-[100dvh] bg-[#0d0d0f] border-r border-white/5 flex flex-col z-30">
            {/* Header / New Chat */}
            <div className="p-4 flex items-center gap-2">
                <button
                    onClick={handleNewChat}
                    className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#18181b] hover:bg-[#202023] text-sm font-semibold rounded-xl border border-white/5 transition-all text-white/90"
                >
                    <Plus size={18} className="text-indigo-400" />
                    New Thread
                </button>
                {/* Close on mobile */}
                <button onClick={onClose} className="md:hidden p-2.5 rounded-xl text-white/30 hover:text-white hover:bg-white/5 transition-all">
                    <X size={18} />
                </button>
            </div>

            {/* Search Bar */}
            <div className="px-4 pb-3">
                <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl px-3 py-2 focus-within:border-indigo-500/30 transition-all">
                    <Search size={14} className="text-white/30 flex-shrink-0" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder:text-white/20"
                        placeholder="Search chats..."
                    />
                    {search && (
                        <button onClick={() => setSearch('')} className="text-white/20 hover:text-white transition-all">
                            <X size={12} />
                        </button>
                    )}
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                {filteredChats.length === 0 ? (
                    <div className="mt-8 text-center px-4">
                        <p className="text-[11px] uppercase tracking-widest text-white/20 font-bold">
                            {search ? 'No results found' : 'No history yet'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 pb-4">
                        {Object.entries(groupChats(filteredChats)).map(([groupName, gChats]) => gChats.length > 0 && (
                            <div key={groupName} className="space-y-1">
                                <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">{groupName}</h3>
                                {gChats.map((chat) => (
                                    <div key={chat._id} className="relative group w-full">
                                        <button
                                            onClick={() => { setCurrentChat(chat._id); onClose?.(); }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                                                currentChatId === chat._id
                                                ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                                                : 'text-white/40 hover:bg-white/5 hover:text-white/80'
                                            }`}
                                        >
                                            <div className={`p-2 rounded-lg ${currentChatId === chat._id ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/5 text-white/30 group-hover:text-white/60'} transition-all`}>
                                                {getMoodIcon(chat.mood)}
                                            </div>
                                            <div className="flex-1 overflow-hidden flex flex-col items-start gap-0.5 pr-6">
                                                <span className="text-xs font-bold truncate text-white/90 w-full text-left">
                                                    {chat.title || chat.mood || 'New Chat'}
                                                </span>
                                                <span className="text-[10px] truncate w-full text-left text-white/40 group-hover:text-white/60 transition-colors">
                                                    {chat.messages.length > 0 ? chat.messages[0].content : 'Empty Thread'}
                                                </span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); deleteChat(chat._id); }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/0 group-hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-all z-10"
                                            title="Delete Chat"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* User Profile / Footer */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <div className="flex items-center gap-3 px-2 py-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                        {user?.avatar || user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold text-white/90 truncate">{user?.username || 'User'}</p>
                        <p className="text-[10px] text-white/40 truncate">{user?.email}</p>
                    </div>
                </div>

                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-white/40 hover:text-rose-400 hover:bg-rose-500/5 rounded-lg transition-all"
                >
                    <LogOut size={16} />
                    Log Out
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar - always visible */}
            <div className="hidden md:flex h-full flex-shrink-0">
                {sidebarContent}
            </div>

            {/* Mobile Sidebar - animated overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: -288 }}
                            animate={{ x: 0 }}
                            exit={{ x: -288 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="md:hidden fixed top-0 left-0 z-50 h-[100dvh]"
                        >
                            {sidebarContent}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;


