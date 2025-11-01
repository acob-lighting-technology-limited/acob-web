'use client';

import { motion } from 'framer-motion';

/**
 * ACOB Fade Cycle Loader
 * Letters fade in and out in sequence, creating a cycling effect
 */
export default function AcobFadeCycleLoader() {
  const letters = ['A', 'C', 'O', 'B'];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex gap-2">
        {letters.map((letter, index) => (
          <div key={letter} className="relative">
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-4"
              animate={{
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.4,
                ease: 'easeInOut',
              }}
            >
              <div className="w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
            </motion.div>

            {/* Letter */}
            <motion.div
              className="text-6xl sm:text-7xl md:text-8xl font-bold text-primary"
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.4,
                ease: 'easeInOut',
              }}
            >
              {letter}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
