import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { MaskText } from "../animations/MaskText"

export function CompanySection() {
  return (
    <section className="py-16">
      <Container className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
      <MaskText
        phrases={["ACOB LIGHTING TECHNOLOGY LIMITED"]}
        className="text-3xl md:text-4xl font-bold mb-6"
      />

      <MaskText
        phrases={[
          "We are committed to providing sustainable energy solutions",
          "that transform communities across Nigeria.",
          "Our expertise in solar technology and mini-grid systems",
          "has made us a trusted partner for rural electrification projects",
          "and commercial solar installations."
        ]}
        className="text-gray-600 mb-6 leading-relaxed"
      />

      <MaskText
        phrases={[
          "With years of experience in the renewable energy sector,",
          "we continue to innovate and deliver cutting-edge solutions",
          "that meet the growing energy demands of our clients."
        ]}
        className="text-gray-600 mb-8 leading-relaxed"
      />

      <Button className="bg-primary hover:bg-primary/90 text-lg py-5">
        Learn More About Us
      </Button>
    </div>
          <div className="relative w-full h-[400px] rounded-lg shadow-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/izxpZMcdWsg"
              title="ACOB Lighting Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  )
}
