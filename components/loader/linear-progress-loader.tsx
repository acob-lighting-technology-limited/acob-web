"use client"

import { motion } from "framer-motion"

export function LinearProgressLoader() {
  return (
          <div className="flex flex-col items-center justify-center h-screen bg-muted text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md px-4"
      >
        <div className="text-center mb-4 text-xl font-semibold text-primary">Loading...</div>
        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="bg-primary h-2.5 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground text-center">Preparing your energy solutions.</p>
      </motion.div>
    </div>
  )
}
