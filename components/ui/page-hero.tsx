import type React from "react"
import { Container } from "@/components/ui/container"

interface PageHeroProps {
  title: string
  backgroundImage: string
  className?: string
  children?: React.ReactNode
}

export function PageHero({ title, backgroundImage, className = "", children }: PageHeroProps) {
  return (
    <section className={`relative h-[400px] flex items-center justify-center ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <Container className="relative z-10 px-4">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {children}
        </div>
      </Container>
    </section>
  )
}
