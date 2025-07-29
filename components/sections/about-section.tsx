'use client'

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { MaskText } from "@/components/animations/MaskText" 

export function AboutSection() {
  return (
    <section className="py-24 bg-primary text-white dark:bg-primary-dark dark:text-white transition-colors duration-700">
      <Container className="px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <MaskText
            phrases={["Lighting Up Nigeria with Advanced Solar Solutions."]}
            className="text-3xl md:text-4xl font-bold text-center lg:text-left"
          />
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-white bg-white text-primary hover:bg-primary hover:text-white dark:bg-primary-dark dark:text-white dark:hover:bg-white dark:hover:text-primary duration-700 transition-colors px-8 py-5 text-lg font-medium whitespace-nowrap"
          >
            Explore Our Plans
          </Button>
        </div>
      </Container>
    </section>
  )
}
