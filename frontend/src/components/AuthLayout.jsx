import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-dark-bg">
      {/* Background glowing particles - decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple rounded-full filter blur-[120px] opacity-20 animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan rounded-full filter blur-[120px] opacity-20 animate-pulse pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 glass-dark rounded-3xl shadow-2xl z-10 mx-4 border-white border-opacity-10"
      >
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-white mb-2 leading-tight">
                Chatter<span className="text-gradient-purple">Verse</span>
            </h1>
            <p className="text-secondary opacity-70 text-sm font-medium">{title}</p>
        </div>
        
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
