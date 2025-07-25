"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Loader2 } from "lucide-react"

export function SpinnerLogoLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <Image
          src="/images/ACOB.png"
          alt="ACOB Lighting Logo"
          width={600}
          height={600}
          className="mb-6 animate-pulse-slow"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader2 className="h-10 w-10 text-primary" />
        </motion.div>
        <p className="mt-4 text-lg font-medium">Loading your content...</p>
      </motion.div>
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
