import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EntranceAnimation from './components/EntranceAnimation';

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-purple-500/30">
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
