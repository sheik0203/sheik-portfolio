import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EntranceAnimation from './components/EntranceAnimation';

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  const memoizedPortfolio = useMemo(() => (
    <iframe
      src="/portfolio.html"
      className="h-full w-full border-none"
      title="Sheik Abdullah Portfolio"
      loading="eager"
    />
  ), []);

  return (
    <div className="min-h-[100dvh] font-sans selection:bg-neutral-500/30">
      <AnimatePresence mode="wait">
        {showAnimation ? (
          <EntranceAnimation key="entrance" onComplete={() => setShowAnimation(false)} />
        ) : (
          <motion.div
            key="portfolio-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-[100dvh] w-full overflow-hidden"
          >
            {memoizedPortfolio}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
