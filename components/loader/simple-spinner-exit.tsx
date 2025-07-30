"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface SimpleSpinnerExitProps {
  preview?: boolean
  children?: React.ReactNode
  loadingDuration?: number
}

export default function SimpleSpinnerExit({
  preview = false,
  children,
  loadingDuration = 3000,
}: SimpleSpinnerExitProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (preview) return

    // Auto exit after specified duration
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, loadingDuration)

    return () => clearTimeout(timer)
  }, [preview, loadingDuration])

  // Preview mode - just show the spinner
  if (preview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-8"></div>
          {/* <h2 className="text-2xl font-semibold text-slate-800 mb-2">Loading...</h2>
          <p className="text-slate-600">Please wait while we prepare your content</p> */}
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="min-h-screen bg-gradient-to-br from-green-50 to-indigo-100 flex items-center justify-center relative"
        >
          <Button onClick={() => window.location.reload()} variant="ghost" size="sm" className="absolute top-6 left-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-8"></div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">Loading...</h2>
            <p className="text-slate-600">Please wait while we prepare your content</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ y: "100vh" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
