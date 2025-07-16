"use client"
import type React from "react"
import { Container } from "@/components/ui/container"
import { MaskText } from "../animations/MaskText"

interface PageHeroProps {
  title: string
  backgroundImage: string
  className?: string
  children?: React.ReactNode
}

export function PageHero({ title, backgroundImage, className = "", children }: PageHeroProps) {
  return (
    <section className={`relative h-[400px] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Image with Animation */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slow-zoom"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <Container className="relative z-10 px-4">
        <div className="text-left text-white">
          <MaskText
            phrases={[title]} // or split into lines if desired
            className="text-4xl md:text-7xl font-bold mb-4"
          />
          {children}
        </div>
      </Container>
    </section>
  )
}
