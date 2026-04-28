import React, { useState, useEffect, useMemo } from 'react';
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
    // Set theme without causing layout shifts
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);

    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        setTheme(e.newValue || 'dark');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [theme]);

  // Memoize iframe to prevent reloads during theme changes or re-renders
  const memoizedPortfolio = useMemo(() => (
    <iframe 
      src="/portfolio.html" 
      className="w-full h-full border-none" 
      title="Sheik Abdullah Portfolio"
      loading="eager"
    />
  ), []);

  return (
    <div className="min-h-[100dvh] bg-white dark:bg-[#0c0a14] font-sans selection:bg-purple-500/30 transition-colors duration-300 ease-in-out">
      <AnimatePresence mode="wait">
        {showAnimation ? (
          <EntranceAnimation key="entrance" onComplete={() => setShowAnimation(false)} />
        ) : (
          <motion.div
            key="portfolio-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-[100dvh] overflow-hidden"
          >
            {memoizedPortfolio}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
