import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { MaskText } from "@/components/animations/MaskText"

const aboutSections = [
  {
    title: "Our Story",
    description: "Discover our journey, milestones, and how we became a leader in clean energy.",
    href: "/about/our-story",
    image: "/images/about/our-story.jpg?height=200&width=300",
  },
  {
    title: "Mission & Vision",
    description: "Explore our core values, commitment to sustainability, and future aspirations.",
    href: "/about/mission",
    image: "/images/about/mission-vision.jpg?height=200&width=300",
  },
  {
    title: "Meet Our Team",
    description: "Get to know the dedicated professionals driving innovation at ACOB Lighting.",
    href: "/about/team",
    image: "/images/about/our-team.jpg?height=200&width=300",
  },
  {
    title: "Certifications",
    description: "View our accreditations and commitment to global quality and safety standards.",
    href: "/about/certifications",
    image: "/images/about/certifications.jpg?height=200&width=300",
  },
]

export default function AboutPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "About Us" }]

  return (
    <>
      <PageHero title="About ACOB Lighting" backgroundImage="/images/about/about-hero.jpg?height=400&width=1200">
        <MaskText
          phrases={[
            "Lighting Up Nigeria with Advanced Solar Solutions.",
            "Committed to sustainable energy and community empowerment.",
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <MaskText phrases={["Our Commitment to a Brighter Future"]} />
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At ACOB Lighting, we are more than just an energy company; we are pioneers in sustainable development,
            dedicated to illuminating lives across Nigeria with innovative solar solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutSections.map((section, index) => (
            <Link key={section.href} href={section.href}>
              <Card className="overflow-hidden border-0 custom-shadow shadow-none p-0 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={section.image || "/placeholder.svg"}
                    alt={section.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{section.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{section.description}</p>
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0 h-auto justify-start mt-auto"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}
