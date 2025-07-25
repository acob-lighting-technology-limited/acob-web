import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { MaskText } from "@/components/animations/MaskText"
import { Lightbulb, Zap, Sun } from "lucide-react"

export default function OurStoryPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }, { label: "Our Story" }]

  return (
    <>
      <PageHero title="Our Story" backgroundImage="/images/about/our-story-hero.jpg?height=400&width=1200" />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["From Vision to Illumination: Our Journey"]} />
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                  <p>
                    ACOB Lighting Technology Limited was founded with a singular, powerful vision: to revolutionize
                    Nigeria's energy landscape by providing sustainable, reliable, and accessible power solutions. Our
                    journey began over a decade ago, driven by a deep understanding of the energy challenges facing
                    communities and businesses across the nation.
                  </p>
                  <p>
                    In our early years, we focused on laying the groundwork, building a team of passionate experts, and
                    forging strategic partnerships. We quickly realized that true impact would come from innovative
                    approaches, leading us to specialize in mini-grid solutions and captive power systems that could
                    bring light and opportunity to even the most remote areas.
                  </p>
                  <p>
                    Over the years, we've grown from a nascent startup into a trusted leader in the renewable energy
                    sector. Our portfolio now includes over 100 successful mini-grid projects, delivering more than 50MW
                    of installed capacity and serving over 200 communities. Each project is a testament to our
                    unwavering commitment to quality, safety, and community empowerment.
                  </p>
                  <p>
                    Today, ACOB Lighting continues to innovate, embracing cutting-edge technologies and expanding our
                    reach. We are proud of the positive change we've brought to countless lives, fostering economic
                    growth, improving healthcare, and enhancing educational opportunities through sustainable energy.
                    Our story is one of dedication, resilience, and a relentless pursuit of a brighter, more electrified
                    Nigeria.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Key Milestones (Optional: could be a separate component) */}
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Key Milestones"]} />
                </h2>
                <ol className="relative border-l border-primary space-y-8 ml-4">
                  <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary">
                      <Lightbulb className="w-3 h-3 text-white" />
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                      2016: Company Founding
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-500">
                      Established with a vision for sustainable energy in Nigeria.
                    </time>
                    <p className="text-base font-normal text-gray-700">
                      Began operations with a focus on solar solutions and energy consulting.
                    </p>
                  </li>
                  <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary">
                      <Zap className="w-3 h-3 text-white" />
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                      2019: First Major Mini-Grid Project
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-500">
                      Successfully deployed our first large-scale mini-grid, electrifying a rural community.
                    </time>
                    <p className="text-base font-normal text-gray-700">
                      Marked a significant step in our commitment to rural electrification.
                    </p>
                  </li>
                  <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-primary">
                      <Sun className="w-3 h-3 text-white" />
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                      2020-Present: Expansion & Innovation
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-500">
                      Expanded services to include captive power, advanced energy audits, and smart solutions.
                    </time>
                    <p className="text-base font-normal text-gray-700">
                      Continuing to lead with cutting-edge technology and a growing impact across Nigeria.
                    </p>
                  </li>
                </ol>
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
                      href="/about/mission"
                      className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>Mission & Vision</span>
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
