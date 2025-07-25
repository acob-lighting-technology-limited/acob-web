import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, HelpCircle } from "lucide-react"
import Link from "next/link"
import { MaskText } from "@/components/animations/MaskText"

export default function SupportPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: "/contact" },
    { label: "Support" },
  ]

  return (
    <>
      <PageHero title="Customer Support" backgroundImage="/images/contact/support.jpg?height=400&width=1200">
        <MaskText
          phrases={[
            "Our dedicated support team is here to assist you.",
            "Find answers to your questions or get in touch directly.",
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
                  <MaskText phrases={["How Can We Help You?"]} />
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                  <p>
                    At ACOB Lighting, we are committed to providing excellent support for all our products and services.
                    Whether you have a technical question, need assistance with an installation, or require maintenance,
                    our team is ready to help.
                  </p>
                  <p>
                    We strive to ensure your experience with our clean energy solutions is seamless and satisfactory.
                    Please explore the options below to find the support you need.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Contact Our Support Team"]} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                      <p className="text-gray-700">
                        For immediate assistance, please call our support lines during business hours.
                      </p>
                      <p className="text-lg font-bold text-primary mt-2">0704 920 2634</p>
                      <p className="text-lg font-bold text-primary">0803 290 2825</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                      <p className="text-gray-700">
                        Send us an email with your detailed query, and we'll get back to you within 24-48 hours.
                      </p>
                      <Link href="mailto:support@acoblighting.com" className="text-primary hover:underline mt-2 block">
                        support@acoblighting.com
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Frequently Asked Questions"]} />
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span>
                      <strong>How long do solar panels last?</strong> Solar panels typically last between 25 to 30
                      years, often with a performance warranty guaranteeing a certain output percentage after that
                      period.
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span>
                      <strong>What is a mini-grid?</strong> A mini-grid is an independent electricity distribution
                      network, typically powered by renewable energy, serving a localized group of consumers.
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span>
                      <strong>Do you offer installation services?</strong> Yes, we provide comprehensive installation
                      services for all our solar and energy solutions.
                    </span>
                  </p>
                </div>
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    View All FAQs
                  </Button>
                </div>
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
                      href="/contact/careers"
                      className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>Careers</span>
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
