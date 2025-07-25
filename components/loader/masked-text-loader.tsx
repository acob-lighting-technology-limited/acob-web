"use client"

import { motion } from "framer-motion"
import { MaskText } from "@/components/animations/MaskText"

export function MaskedTextLoader() {
  const phrases = ["ACOB Lighting", "Technology Limited", "Loading Your Future..."]

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-900">
      <div className="text-center">
        <MaskText phrases={phrases} className="text-5xl md:text-7xl font-extrabold leading-tight" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: phrases.length * 0.15 + 0.5,
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="mt-8 text-lg text-gray-600"
      >
        Please wait...
      </motion.div>
    </div>
  )
}
