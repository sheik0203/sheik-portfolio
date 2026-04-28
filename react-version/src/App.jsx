import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EntranceAnimation from './components/EntranceAnimation';

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  // Memoize iframe to prevent reloads during re-renders
  const memoizedPortfolio = useMemo(() => (
    <iframe 
      src="/portfolio.html" 
      className="w-full h-full border-none" 
      title="Sheik Abdullah Portfolio"
      loading="eager"
    />
  ), []);

  return (
    <div className="min-h-[100dvh] font-sans selection:bg-purple-500/30">
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
