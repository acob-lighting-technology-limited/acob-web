"use client"

import { motion } from "framer-motion"

export function PulsingDotsLoader() {
  const dotVariants = {
    animate: {
      y: ["0%", "-50%", "0%"],
      transition: {
        duration: 0.8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center space-x-2"
      >
        <motion.span className="block w-4 h-4 rounded-full bg-primary" variants={dotVariants} animate="animate" />
        <motion.span
          className="block w-4 h-4 rounded-full bg-primary"
          variants={dotVariants}
          animate="animate"
          transition={{ delay: 0.2, ...dotVariants.animate.transition }}
        />
        <motion.span
          className="block w-4 h-4 rounded-full bg-primary"
          variants={dotVariants}
          animate="animate"
          transition={{ delay: 0.4, ...dotVariants.animate.transition }}
        />
      </motion.div>
      <p className="mt-6 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  )
}
