"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  { number: 100, suffix: "+", label: "Mini-Grid Projects" },
  { number: 50, suffix: "MW+", label: "Total Capacity Installed" },
  { number: 200, suffix: "+", label: "Communities Served" },
  { number: 10, suffix: "+", label: "Years Experience" },
]

function CounterAnimation({ 
  end, 
  suffix, 
  duration = 2.5 
}: { 
  end: number; 
  suffix: string; 
  duration?: number 
}) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(countRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, end, duration])

  return (
    <div ref={countRef} className="text-2xl font-bold text-primary mb-2">
      {count}{suffix}
    </div>
  )
}

export function TransitionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="py-16" ref={ref}>
      <Container className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Feeling The Transition To Renewable Power, To deploy 100 micro-grids impacting the lives of over ten
              Nigerians by 2030.
            </motion.h2>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1 + 0.3,
                    ease: "easeOut" 
                  }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <CounterAnimation 
                        end={stat.number} 
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.img
              src="/placeholder.svg?height=250&width=300"
              alt="Solar Installation"
              className="rounded-lg shadow-lg w-full h-[250px] object-cover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.img
              src="/placeholder.svg?height=250&width=300"
              alt="Team at Work"
              className="rounded-lg shadow-lg w-full h-[250px] object-cover mt-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
            <motion.img
              src="/placeholder.svg?height=250&width=300"
              alt="Solar Panels"
              className="rounded-lg shadow-lg w-full h-[250px] object-cover -mt-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
            <motion.img
              src="/placeholder.svg?height=250&width=300"
              alt="Community Impact"
              className="rounded-lg shadow-lg w-full h-[250px] object-cover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}