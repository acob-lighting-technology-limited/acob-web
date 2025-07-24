import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { MaskText } from "@/components/animations/MaskText"
import { Target, Eye, Handshake, Sun, Zap, Lightbulb } from "lucide-react"

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

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Our Driving Purpose: Illuminating Lives"]} />
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                  <div className="flex items-start gap-4">
                    <Target className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Our Mission</h3>
                      <p>
                        To provide innovative, sustainable, and reliable clean energy solutions that empower
                        communities, drive economic growth, and enhance the quality of life across Nigeria. We are
                        committed to delivering excellence in every project, fostering energy independence, and
                        contributing to a greener future.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Eye className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Our Vision</h3>
                      <p>
                        To be the leading provider of integrated clean energy solutions in Nigeria and West Africa,
                        recognized for our technological innovation, operational excellence, and unwavering commitment
                        to customer satisfaction and environmental stewardship. We envision a future where every home
                        and business has access to affordable, clean, and reliable power.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Our Core Values"]} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <Handshake className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Integrity</h4>
                      <p className="text-sm">
                        We operate with the highest ethical standards, ensuring transparency and honesty in all our
                        dealings.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Innovation</h4>
                      <p className="text-sm">
                        We continuously seek and implement cutting-edge technologies to deliver superior energy
                        solutions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Excellence</h4>
                      <p className="text-sm">
                        We are committed to delivering exceptional quality in our products, services, and customer
                        experience.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sun className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Sustainability</h4>
                      <p className="text-sm">
                        Our solutions are designed to protect the environment and promote long-term energy security.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Quick Links to other About sections */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">More About Us</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about/our-story"
                      className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>Our Story</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/team"
                      className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>Meet Our Team</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/certifications"
                      className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>Certifications</span>
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  )
}
