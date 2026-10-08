import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EntranceAnimation = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true);
      setTimeout(() => {
        onComplete();
      }, 1200);
    }, 3600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
        >
          <motion.div
            initial={{ x: '-120%', opacity: 0 }}
            animate={{ x: '120%', opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute top-0 bottom-0 w-[45vw] bg-white/10"
          />

          <div className="relative z-10 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mb-6 h-px w-20 origin-center bg-white/35"
            />

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-4xl font-bold uppercase tracking-[0.18em] text-white md:text-6xl lg:text-7xl"
            >
              SHEIK ABDULLAH S
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mx-auto mt-6 h-px w-20 origin-center bg-white/35"
            />
          </div>

          <motion.div
            animate={{ opacity: [0.18, 0.38, 0.18], scale: [1, 1.12, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 1.6 }}
            className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntranceAnimation;
