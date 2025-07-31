"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Home, ArrowLeft, Lightbulb, Zap, Sun } from "lucide-react"

const floatingElements = [
  { icon: Sun, delay: 0, duration: 3 },
  { icon: Zap, delay: 1, duration: 4 },
  { icon: Lightbulb, delay: 2, duration: 3.5 },
]

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, index) => {
          const Icon = element.icon
          return (
            <div
              key={index}
              className="absolute animate-float opacity-10"
              style={{
                left: `${20 + index * 25}%`,
                top: `${30 + index * 15}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`,
              }}
            >
              <Icon className="w-16 h-16 text-primary" />
            </div>
          )
        })}
      </div>

      {/* Solar Panel Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
        <div className="grid grid-cols-4 gap-2 w-full h-full p-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="bg-primary rounded-sm" />
          ))}
        </div>
      </div>

      <Container className="px-4 h-full flex items-center justify-center relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main 404 Display */}
          <div className="mb-12">
            <div className="relative inline-block">
              <h1 className="text-[12rem] md:text-[16rem] font-bold text-primary leading-none select-none">404</h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-8 shadow-2xl">
                  <Lightbulb className="w-16 h-16 text-primary animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Oops! Page Not Found</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              It seems like the page you're looking for has gone off-grid! Don't worry, we'll help you find your way
              back to the light.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                <Home className="mr-2 w-5 h-5" />
                Go Home
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => router.back()} className="px-8 py-3">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </Button>
          </div>

          {/* Fun Fact */}
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-muted-foreground italic">
              💡 <strong>Did you know?</strong> Solar panels can still generate electricity on cloudy days, just like
              how we're still here to help even when things don't go as planned!
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
