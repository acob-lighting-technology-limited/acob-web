'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * ACOB Letter Reveal Loader
 *
 * Animated loader that reveals the ACOB brand name letter by letter.
 * Animation sequence:
 * 1. Logo (O) appears first (0s)
 * 2. Letter C slides from left (0.5s)
 * 3. Letter A slides from left behind C (0.8s)
 * 4. Letter B slides from right (1.1s)
 *
 * Note: This loader is designed for use cases where you control the display duration.
 * It does NOT work well with Next.js loading.tsx as Next.js unmounts it immediately
 * when the page is ready, cutting off the animation.
 *
 * Usage: Use this in custom loading states where you control when to hide it.
 */
export default function AcobLetterRevealLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* ACOB Letter Animation */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {/* Letter A - slides from left behind C */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="text-7xl sm:text-8xl md:text-9xl font-bold text-primary"
        >
          A
        </motion.div>

        {/* Letter C - slides from left behind O */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="text-7xl sm:text-8xl md:text-9xl font-bold text-primary"
        >
          C
        </motion.div>

        {/* Logo (O) - appears first */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
          className="relative rounded-full p-2"
        >
          <Image
            src="/images/acob-loader.webp"
            alt="O"
            width={150}
            height={150}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
            priority
          />
        </motion.div>

        {/* Letter B - slides from right behind O */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 1.1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="text-7xl sm:text-8xl md:text-9xl font-bold text-primary"
        >
          B
        </motion.div>
      </div>
    </div>
  );
}
