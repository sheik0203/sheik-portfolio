import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EntranceAnimation from './components/EntranceAnimation';

function App() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);

    // Sync theme if changed from elsewhere (like iframe or other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        setTheme(e.newValue || 'dark');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-purple-500/30 transition-colors duration-300">
      <AnimatePresence mode="wait">
        {showAnimation ? (
          <EntranceAnimation key="entrance" onComplete={() => setShowAnimation(false)} />
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-screen overflow-hidden"
          >
            <iframe 
              src="/portfolio.html" 
              className="w-full h-full border-none" 
              title="Sheik Abdullah Portfolio"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
