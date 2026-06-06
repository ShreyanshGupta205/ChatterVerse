import React, { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { Sparkles, Bell, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import ProfileModal from './ProfileModal';

import logo from '../assets/logo.png';

const TopNav = ({ onMenuToggle }) => {
  const { user } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header className="h-20 w-full flex items-center justify-between px-4 sm:px-6 md:px-8 z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
          {/* Hamburger for mobile */}
          <button
            onClick={onMenuToggle}
            className="p-2.5 rounded-xl text-white/30 hover:text-white hover:bg-white/5 transition-all md:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2">
            <img src={logo} alt="ChatterVerse Logo" className="w-8 h-8 object-contain md:hidden" />
            <span className="text-lg font-black tracking-tighter md:hidden">ChatterVerse</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {['Home', 'Dashboard', 'Explore'].map((text, i) => (
              <button
                key={text}
                className={`text-xs font-bold transition-all px-4 py-2 rounded-xl border border-transparent ${
                  i === 0 ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/10' : 'text-white/30 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2.5 bg-white/5 rounded-xl text-white/30 hover:text-indigo-400 border border-transparent hover:border-white/5 transition-all"
          >
            <Bell size={18} />
          </motion.button>

          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white/90">{user?.username}</p>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest opacity-60">Prime User</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowProfile(true)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-lg overflow-hidden border border-white/10 cursor-pointer hover:ring-2 hover:ring-indigo-500/50 transition-all"
              title="Edit Profile"
            >
              {user?.avatar ? (
                <span className="text-xl">{user.avatar}</span>
              ) : (
                user?.username?.charAt(0).toUpperCase()
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default TopNav;

