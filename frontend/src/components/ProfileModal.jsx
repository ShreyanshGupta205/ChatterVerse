import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Save, Check } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const AVATAR_EMOJIS = ['😎', '🤖', '🦊', '🐼', '🦄', '🐸', '👾', '🧠', '🔥', '⚡', '🌊', '🎯'];

const ProfileModal = ({ onClose }) => {
  const { user, updateProfile, loading } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');
  const [selectedEmoji, setSelectedEmoji] = useState(user?.avatar || '');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    const success = await updateProfile(username, selectedEmoji);
    if (success) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-[#0d0d0f] border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black tracking-tight">Profile Settings</h2>
              <p className="text-xs text-white/30 mt-1">Customize your ChatterVerse identity</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-white/30 hover:text-white hover:bg-white/5 transition-all">
              <X size={20} />
            </button>
          </div>

          {/* Current Avatar Preview */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-4xl shadow-lg border border-white/10">
              {selectedEmoji || user?.username?.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Emoji Picker */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Pick an Avatar</p>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-full aspect-square text-2xl rounded-xl flex items-center justify-center transition-all ${
                    selectedEmoji === emoji ? 'bg-indigo-500/20 border border-indigo-500/50 scale-110' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Username Input */}
          <div className="mb-8">
            <label className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2 block">Username</label>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-indigo-500/50 transition-all">
              <User size={16} className="text-white/30 flex-shrink-0" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20"
                placeholder="Your display name"
                maxLength={30}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 rounded-2xl bg-white/5 text-sm font-bold text-white/50 hover:bg-white/10 hover:text-white transition-all">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading || !username.trim()}
              className={`flex-1 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                saved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-indigo-500 hover:bg-indigo-400 text-white disabled:opacity-40 disabled:cursor-not-allowed'
              }`}
            >
              {saved ? <><Check size={16} /> Saved!</> : loading ? 'Saving...' : <><Save size={16} /> Save Changes</>}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;
