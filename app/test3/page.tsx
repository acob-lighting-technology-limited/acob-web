'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const phrases = [
  "It is a long established fact",
  "that a reader will be distracted",
  "by the readable content of a page",
  "when looking at its layout."
]

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-[20vw] mt-[300px] mb-[300px]">
      <MaskText />
      <MaskText />
      <MaskText />
      <MaskText />
    </div>
  )
}

export function MaskText() {
  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className="text-[5vw] font-bold">
      {phrases.map((phrase, index) => (
        <div key={index} className="overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={
              inView
                ? {
                    y: "0",
                    transition: {
                      duration: 0.75,
                      ease: [0.33, 1, 0.68, 1],
                      delay: 0.075 * index,
                    },
                  }
                : {}
            }
            className="m-0"
          >
            {phrase}
          </motion.p>
        </div>
      ))}
    </div>
  )
}
