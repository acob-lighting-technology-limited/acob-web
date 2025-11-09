import { motion } from 'framer-motion';

/**
 * WhatsApp-style typing indicator with animated dots
 */
export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start mb-2"
    >
      <div className="bg-surface rounded-t-2xl rounded-br-2xl rounded-bl-md shadow-sm px-4 py-3 relative">
        <div className="flex items-center gap-1">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0,
            }}
            className="w-2 h-2 bg-primary rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.2,
            }}
            className="w-2 h-2 bg-primary rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.4,
            }}
            className="w-2 h-2 bg-primary rounded-full"
          />
        </div>
        <div className="absolute top-0 -left-1 w-3 h-3 transform rotate-45 bg-surface" />
      </div>
    </motion.div>
  );
}
