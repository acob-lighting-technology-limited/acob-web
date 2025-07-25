import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Phone, MapPin, LifeBuoy, Briefcase } from "lucide-react"
import Link from "next/link"
import { MaskText } from "@/components/animations/MaskText"

const contactSections = [
  {
    title: "Get a Quote",
    description: "Request a personalized energy audit or project quotation for your needs.",
    href: "/contact/get-quote",
    image: "/images/contact/get-quote.png?height=200&width=300",
    icon: Phone,
  },
  {
    title: "Office Locations",
    description: "Find our head office and branch locations, and get directions.",
    href: "/contact/locations",
    image: "/images/contact/office-location.jpg?height=200&width=300",
    icon: MapPin,
  },
  {
    title: "Support",
    description: "Access our support resources or get assistance with your ACOB Lighting products and services.",
    href: "/contact/support",
    image: "/images/contact/support.png?height=200&width=300",
    icon: LifeBuoy,
  },
  {
    title: "Careers",
    description: "Explore career opportunities and join our growing team of energy innovators.",
    href: "/contact/careers",
    image: "/images/contact/careers.png?height=200&width=300",
    icon: Briefcase,
  },
]

export default function ContactPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Contact Us" }]

  return (
    <>
      <PageHero title="Contact Us" backgroundImage="/images/contact/contact-hero.png?height=400&width=1200">
        <MaskText
          phrases={[
            "We're here to help you with all your clean energy needs.",
            "Reach out to us through our various channels.",
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <MaskText phrases={["How Can We Assist You?"]} />
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Whether you have a question, need support, or are looking for a career opportunity, we're ready to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactSections.map((section, index) => {
            const Icon = section.icon
            return (
              <Link key={section.href} href={section.href}>
                <Card className="overflow-hidden border-0 custom-shadow shadow-none p-0 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden flex items-center justify-center bg-primary/5">
                    <img
                      src={section.image || "/placeholder.svg"}
                      alt={section.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="mb-3 text-primary">
                      <Icon className="h-8 w-8" />
                    </div>
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
            )
          })}
        </div>
      </Container>
    </>
  )
}
