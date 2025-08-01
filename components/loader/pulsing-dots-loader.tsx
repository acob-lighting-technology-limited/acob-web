'use client';

import { motion } from 'framer-motion';

export function PulsingDotsLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-2"
      >
        <motion.span
          className="block w-4 h-4 rounded-full bg-primary"
          animate={{ y: ['0%', '-50%', '0%'] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.span
          className="block w-4 h-4 rounded-full bg-primary"
          animate={{ y: ['0%', '-50%', '0%'] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
        />
        <motion.span
          className="block w-4 h-4 rounded-full bg-primary"
          animate={{ y: ['0%', '-50%', '0%'] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4,
          }}
        />
      </motion.div>
      <p className="mt-6 text-lg font-medium text-muted-foreground">
        Loading...
      </p>
    </div>
  );
}
