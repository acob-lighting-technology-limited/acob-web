import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const services = [
  {
    icon: (
      <svg className="w-16 h-16 text-primary" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="12" y="20" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="22" y="20" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="32" y="20" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="42" y="20" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="12" y="28" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="22" y="28" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="32" y="28" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="42" y="28" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="12" y="36" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="22" y="36" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="32" y="36" width="8" height="6" rx="1" fill="currentColor" />
        <rect x="42" y="36" width="8" height="6" rx="1" fill="currentColor" />
        <path d="M20 8 L24 12 L28 8 L32 12 L36 8" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
    title: "Mini-Grid Solutions",
    description:
      "ACOB provides minigrid solutions that serve a wide range of customers which include private households, commercial businesses such as shops, ice makers and mobile phone chargers, agricultural loads.",
  },
  {
    icon: (
      <svg className="w-16 h-16 text-primary" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="16" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
        <path
          d="M32 10 L32 4 M38 16 L44 16 M32 22 L32 28 M26 16 L20 16 M36.5 11.5 L40.5 7.5 M36.5 20.5 L40.5 24.5 M27.5 20.5 L23.5 24.5 M27.5 11.5 L23.5 7.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect x="16" y="32" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="20" y="36" width="6" height="4" rx="1" fill="currentColor" />
        <rect x="28" y="36" width="6" height="4" rx="1" fill="currentColor" />
        <rect x="36" y="36" width="6" height="4" rx="1" fill="currentColor" />
        <rect x="20" y="42" width="6" height="4" rx="1" fill="currentColor" />
        <rect x="28" y="42" width="6" height="4" rx="1" fill="currentColor" />
        <rect x="36" y="42" width="6" height="4" rx="1" fill="currentColor" />
        <line x1="32" y1="28" x2="32" y2="32" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Captive Power Solutions",
    description:
      "ACOB provides Solar and Inverter system to residential customers, commercial customers and for public driven projects. For example, gas stations, banks, schools, business offices and other type of facilities/buildings that require reliable power.",
  },
  {
    icon: (
      <svg className="w-16 h-16 text-primary" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="12" y="20" width="40" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
        <path
          d="M16 36 L20 28 L24 32 L28 24 L32 30 L36 22 L40 28 L44 20 L48 26"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path d="M8 52 L56 52" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 52 L12 56 M20 52 L20 56 M28 52 L28 56 M36 52 L36 56 M44 52 L44 56 M52 52 L52 56"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    ),
    title: "Professional Energy Audit",
    description:
      "Over the years, ACOB has built competence in Energy Audit for industries, residential buildings, offices and public lighting facilities.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <Container className="px-4">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
              A Leading Supplier Of Solar Materials For Manufacturers Installers & Contractors, Mini-Grid Solutions.
            </h2>
          </div>
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Together with experienced technical team, ACOB Lighting provides emergency response to electricity outages
              for customers, standard technical O&M activities, design and installation of streetlighting
              infrastructure. We ensure quality control of indoor installations and safety training for customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-100 px-8 py-3 bg-transparent"
              >
                Find Your Solution
              </Button>
            </div>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 relative overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">{service.description}</p>
                <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm">
                  Read More
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
              {/* Green accent line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
