import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { MaskText } from "@/components/animations/MaskText"
import { Target, Eye, Handshake, Sun, Zap, Lightbulb } from "lucide-react"

const missionVisionData = [
  {
    icon: Target,
    title: "Our Mission",
    content: "To provide innovative, sustainable, and reliable clean energy solutions that empower communities, drive economic growth, and enhance the quality of life across Nigeria. We are committed to delivering excellence in every project, fostering energy independence, and contributing to a greener future."
  },
  {
    icon: Eye,
    title: "Our Vision", 
    content: "To be the leading provider of integrated clean energy solutions in Nigeria and West Africa, recognized for our technological innovation, operational excellence, and unwavering commitment to customer satisfaction and environmental stewardship. We envision a future where every home and business has access to affordable, clean, and reliable power."
  }
];

const coreValues = [
  {
    icon: Handshake,
    title: "Integrity",
    description: "We operate with the highest ethical standards, ensuring transparency and honesty in all our dealings."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously seek and implement cutting-edge technologies to deliver superior energy solutions."
  },
  {
    icon: Zap,
    title: "Excellence",
    description: "We are committed to delivering exceptional quality in our products, services, and customer experience."
  },
  {
    icon: Sun,
    title: "Sustainability",
    description: "Our solutions are designed to protect the environment and promote long-term energy security."
  }
];

const aboutLinks = [
  { label: "Our Story", href: "/about/our-story" },
  { label: "Meet Our Team", href: "/about/team" },
  { label: "Certifications", href: "/about/certifications" }
];

export default function MissionVisionPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Mission & Vision" },
  ]

  return (
    <>
      <PageHero
        title="Our Mission & Vision"
        backgroundImage="/images/about/mission-vision-hero.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8 bg-gray-50">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border shadow-lg border-gray-200 text-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Our Driving Purpose: Illuminating Lives"]} />
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                  {missionVisionData.map(({ icon: Icon, title, content }) => (
                    <div key={title} className="flex items-start gap-4 border border-gray-200 p-2 bg-gray-50 rounded-lg">
                      <Icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
                        <p>{content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-lg border-gray-200 text-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Our Core Values"]} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 leading-relaxed">
                  {coreValues.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex items-start gap-3 border border-gray-200 p-2 bg-gray-50 rounded-lg">
                      <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{title}</h4>
                        <p className="text-sm">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Quick Links to other About sections */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="border shadow-lg border-gray-200 bg-primary text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">More About Us</h3>
                <ul className="space-y-2">
                  {aboutLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-gray-200 border-b pb-1 border-white hover:text-white transition-colors duration-200 flex items-center justify-between"
                      >
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  )
}