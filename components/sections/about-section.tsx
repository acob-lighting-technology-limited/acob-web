'use client'

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { MaskText } from "@/components/animations/MaskText" 

export function AboutSection() {
  return (
    <section className="py-24 bg-primary text-white">
      <Container className="px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <MaskText
            phrases={["Lighting Up Nigeria with Advanced Solar Solutions."]}
            className="text-3xl md:text-4xl font-bold text-center lg:text-left"
          />
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-black text-white hover:bg-black hover:text-primary bg-transparent px-8 py-5 text-lg font-medium whitespace-nowrap"
          >
            Explore Our Plans
          </Button>
        </div>
      </Container>
    </section>
  )
}
