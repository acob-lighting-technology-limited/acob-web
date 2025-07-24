import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb, Users, TrendingUp, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { MaskText } from "@/components/animations/MaskText"

export default function CareersPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers" },
  ]

  return (
    <>
      <PageHero
        title="Careers at ACOB Lighting"
        backgroundImage="/images/contact/careers-hero.jpg?height=400&width=1200"
      >
        <MaskText
          phrases={[
            "Join our team and power the future of clean energy in Nigeria.",
            "Innovate, grow, and make a real impact.",
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Shape the Future of Energy with Us"]} />
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                  <p>
                    At ACOB Lighting, we believe that our people are our greatest asset. We are a dynamic and growing
                    company at the forefront of Nigeria's clean energy revolution. Joining our team means becoming part
                    of a mission-driven organization dedicated to innovation, sustainability, and community empowerment.
                  </p>
                  <p>
                    We offer a collaborative work environment where creativity is encouraged, and professional growth is
                    prioritized. If you are passionate about making a tangible difference and contributing to a
                    brighter, more sustainable future, we invite you to explore career opportunities with us.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Why Work at ACOB Lighting?"]} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Impactful Work</h4>
                      <p className="text-sm">
                        Contribute directly to electrifying communities and driving sustainable development in Nigeria.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Collaborative Culture</h4>
                      <p className="text-sm">
                        Work alongside passionate experts in a supportive and innovative environment.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Growth Opportunities</h4>
                      <p className="text-sm">
                        Benefit from continuous learning, professional development, and career advancement.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Competitive Benefits</h4>
                      <p className="text-sm">
                        Enjoy a comprehensive benefits package designed to support your well-being.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Current Openings"]} />
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We are always looking for talented individuals to join our team. Check our current vacancies below.
                </p>
                <Link href="#" className="inline-block">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                    View All Vacancies
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-gray-600 text-sm mt-4">
                  Don't see a suitable role? Send your resume to{" "}
                  <Link href="mailto:careers@acoblighting.com" className="text-primary hover:underline">
                    careers@acoblighting.com
                  </Link>{" "}
                  for future consideration.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Quick Links to other Contact sections */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">More Contact Options</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/contact/get-quote"
                      className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>Get a Quote</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact/locations"
                      className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>Office Locations</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact/support"
                      className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>Support</span>
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
