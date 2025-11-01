'use client';

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

/**
 * Bulb Pulse Loader
 * Multiple light bulbs that light up in sequence
 */
export default function BulbPulseLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex gap-6">
        {[0, 1, 2, 3].map(index => (
          <motion.div
            key={index}
            className="relative"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut',
            }}
          >
            {/* Glow */}
            <motion.div
              className="absolute -inset-2"
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            >
              <div className="w-12 h-12 bg-primary/40 rounded-full blur-xl" />
            </motion.div>

            {/* Bulb */}
            <motion.div
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            >
              <Lightbulb className="w-8 h-8 text-primary fill-primary/50" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
