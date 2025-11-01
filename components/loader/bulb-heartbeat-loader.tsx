'use client';

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

/**
 * Bulb Heartbeat Loader
 * A bulb that pulses like a heartbeat
 */
export default function BulbHeartbeatLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="relative">
        {/* Heartbeat glow */}
        <motion.div
          className="absolute -inset-8"
          animate={{
            opacity: [0.2, 0.8, 0.6, 0.9, 0.2],
            scale: [1, 1.3, 1.1, 1.4, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            times: [0, 0.3, 0.4, 0.6, 1],
            ease: 'easeInOut',
          }}
        >
          <div className="w-32 h-32 bg-primary/40 rounded-full blur-2xl" />
        </motion.div>

        {/* Bulb with heartbeat */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.8, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            times: [0, 0.3, 0.4, 0.6, 1],
            ease: 'easeInOut',
          }}
        >
          <Lightbulb className="w-16 h-16 text-primary fill-primary/70" />
        </motion.div>

        {/* Pulse rings */}
        {[0, 1].map(index => (
          <motion.div
            key={index}
            className="absolute inset-0 -m-4 border-2 border-primary rounded-full"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.3,
              times: [0, 0.6, 1],
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
