import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Wand2 } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
    </g>
  </svg>
);

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { signup, loginWithGoogle, loading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await signup(formData.username, formData.email, formData.password);
        if (success) navigate('/chat');
    };

    const handleGoogle = async () => {
        const success = await loginWithGoogle();
        if (success) navigate('/chat');
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass rounded-3xl sm:rounded-[32px] p-6 sm:p-10 border border-white/5 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-50" />
                
                <div className="flex flex-col items-center mb-10">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/10">
                        <Wand2 size={24} className="text-purple-400" />
                    </div>
                    <h2 className="text-3xl font-black text-white/90 tracking-tighter">Enter the Verse</h2>
                    <p className="text-sm text-white/30 font-medium tracking-tight">Create your personal AI companion space</p>
                </div>

                {/* Google Sign Up */}
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 py-3.5 rounded-2xl text-sm font-bold transition-all mb-6 disabled:opacity-50"
                >
                    <GoogleIcon />
                    Continue with Google
                </motion.button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">or</span>
                    <div className="flex-1 h-px bg-white/5" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5 focus-within:text-purple-400 text-white/20 transition-colors">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">Username</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 p-0.5 group-focus-within:text-purple-400 transition-colors" size={18} />
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full bg-[#121215] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white/80 outline-none focus:border-purple-500/50 transition-all font-medium"
                                placeholder="coolguy777"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 focus-within:text-purple-400 text-white/20 transition-colors">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 p-0.5 group-focus-within:text-purple-400 transition-colors" size={18} />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-[#121215] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white/80 outline-none focus:border-purple-500/50 transition-all font-medium"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 focus-within:text-purple-400 text-white/20 transition-colors">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 p-0.5 group-focus-within:text-purple-400 transition-colors" size={18} />
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-[#121215] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white/80 outline-none focus:border-purple-500/50 transition-all font-medium"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-bold rounded-xl text-center">
                            {error}
                        </motion.div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-purple-500 hover:bg-purple-400 text-white py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-purple-500/20 mt-4 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Creating space...' : "Let's Go! 🚀"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-white/20 font-medium">
                        Already have an account? <Link to="/login" className="text-purple-400 font-black hover:underline underline-offset-4">Log in now</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
