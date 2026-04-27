import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EntranceAnimation = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Total duration of the animation before transition
    const timer = setTimeout(() => {
      setIsFinished(true);
      setTimeout(() => {
        onComplete();
      }, 1000); // Wait for fade out
    }, 6000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Cinematic Light Sweep */}
          <motion.div
            initial={{ x: '-150%', skewX: -20 }}
            animate={{ x: '150%' }}
            transition={{ 
              duration: 4, 
              ease: [0.45, 0, 0.55, 1],
              delay: 0.5 
            }}
            className="absolute top-0 bottom-0 w-[60vw] bg-gradient-to-r from-transparent via-purple-600/40 to-transparent blur-[120px] pointer-events-none"
          />
          
          <motion.div
            initial={{ x: '-150%', skewX: -20 }}
            animate={{ x: '150%' }}
            transition={{ 
              duration: 3.5, 
              ease: [0.45, 0, 0.55, 1],
              delay: 0.8
            }}
            className="absolute top-0 bottom-0 w-[30vw] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent blur-[80px] pointer-events-none"
          />

          {/* Text Content */}
          <div className="relative z-10 text-center px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-purple-500 text-lg md:text-xl font-medium tracking-[0.2em] mb-4 uppercase"
            >
              Hi, I'm Sheik Abdullah
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 2 }}
              className="text-white text-4xl md:text-7xl font-bold tracking-tight mb-6"
            >
              Full Stack Developer
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-purple-600" />
              <p className="text-gray-400 text-sm md:text-base tracking-[0.1em]">
                Welcome to my portfolio
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-600" />
            </motion.div>
          </div>

          {/* Background Ambient Glow */}
          <motion.div 
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"
          />
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
            className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntranceAnimation;
