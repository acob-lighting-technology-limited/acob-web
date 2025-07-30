import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { MaskText } from "@/components/animations/MaskText"
import { Target, Eye, Handshake, Sun, Zap, Lightbulb, Phone, Leaf, Settings } from "lucide-react"

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
  const sidebarLinks = [
    { label: "Our Story", href: "/about/our-story", isActive: false },
    { label: "Mission & Vision", href: "/about/mission", isActive: true },
    { label: "Meet Our Team", href: "/about/team", isActive: false },
    { label: "Certifications", href: "/about/certifications", isActive: false },
  ]
  return (
    <>
      <PageHero
        title="Our Mission & Vision"
        backgroundImage="/images/about/mission-vision-hero.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8 ">
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

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start ">
            <div className="bg-zinc-200 p-6 rounded-lg  border-t-4 border-t-primary">
              {/* <h3 className="text-2xl font-bold text-black mb-6">More About Us</h3> */}
              <div className="space-y-3">
                {sidebarLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className={`
                      block p-4 rounded-lg flex items-center justify-between transition-colors duration-200
                      ${link.isActive ? "bg-primary text-white" : "bg-white text-black hover:bg-gren-300 hover:text-foreground"}
                    `}
                  >
                    <span className="font-semibold text-lg">{link.label}</span>
                    {link.isActive && (
                      <div className="w-6 h-6 bg-white rounded-full flex-shrink-0"></div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            {/* Call to Action Widget */}
            <div className="bg-primary aspect-[3/4] p-8 rounded-lg text-white text-center">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <Settings
                    className="w-16 h-16 text-white"
                    strokeWidth={1.5}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Text */}
              <p className="text-lg mb-8 leading-relaxed">
                As a world wide distributor of supplies we endeavor provide fast
                and knowledgeable service, we can get all the materials.
              </p>

              {/* Button */}
              <Link
                href="/contact/get-quote"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-500 transition-colors duration-200 mb-8"
              >
                Schedule An Appointment
              </Link>

              {/* Phone Numbers */}
              <div className="flex items-center justify-center space-x-2 text-xl font-semibold">
                <Phone className="w-6 h-6" />
                <div>
                  <div>0704 920 2634,</div>
                  <div>0803 290 2825</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}