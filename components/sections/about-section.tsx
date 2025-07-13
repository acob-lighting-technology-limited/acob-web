import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export function AboutSection() {
  return (
    <section className="py-16 bg-primary text-white">
      <Container className="px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:text-left">
            Lighting Up Nigeria with Advanced Solar Solutions.
          </h2>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent px-8 py-3 text-lg font-medium whitespace-nowrap"
          >
            Explore Our Plans
          </Button>
        </div>
      </Container>
    </section>
  )
}
