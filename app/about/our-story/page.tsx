import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { MaskText } from "@/components/animations/MaskText";
import { Lightbulb, Zap, Sun } from "lucide-react";

export default function OurStoryPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Story" },
  ];

  const milestones = [
    {
      icon: Lightbulb,
      year: "2016: Company Founding",
      title: "Established with a vision for sustainable energy in Nigeria.",
      description:
        "Began operations with a focus on solar solutions and energy consulting.",
    },
    {
      icon: Zap,
      year: "2019: First Major Mini-Grid Project",
      title:
        "Successfully deployed our first large-scale mini-grid, electrifying a rural community.",
      description:
        "Marked a significant step in our commitment to rural electrification.",
    },
    {
      icon: Sun,
      year: "2020-Present: Expansion & Innovation",
      title:
        "Expanded services to include captive power, advanced energy audits, and smart solutions.",
      description:
        "Continuing to lead with cutting-edge technology and a growing impact across Nigeria.",
    },
  ];

  const sidebarLinks = [
    { label: "Mission & Vision", href: "/about/mission" },
    { label: "Meet Our Team", href: "/about/team" },
    { label: "Certifications", href: "/about/certifications" },
  ];

  return (
    <>
      <PageHero
        title="Our Story"
        backgroundImage="/images/about/our-story-hero.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8 bg-gray-50">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border shadow-md border-gray-200 bg-white">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  <MaskText
                    phrases={["From Vision to Illumination: Our Journey"]}
                  />
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                  <p>
                    ACOB Lighting Technology Limited was founded with a
                    singular, powerful vision...
                  </p>
                  <p>
                    In our early years, we focused on laying the groundwork...
                  </p>
                  <p>
                    Over the years, we've grown from a nascent startup into a
                    trusted leader...
                  </p>
                  <p>Today, ACOB Lighting continues to innovate...</p>
                </div>
              </CardContent>
            </Card>

            {/* Key Milestones */}
            <Card className="border shadow-md border-gray-200 bg-white">
              <CardContent className="p-8 space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  <MaskText phrases={["Key Milestones"]} />
                </h2>
                <ol className="relative border-l border-primary space-y-8 ml-4">
                  {milestones.map((milestone, idx) => (
                    <li key={idx} className="ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-8 ring-white dark:ring-gray-900">
                        <milestone.icon className="w-3 h-3 text-white" />
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {milestone.year}
                      </h3>
                      <time className="block mb-2 text-sm text-gray-500">
                        {milestone.title}
                      </time>
                      <p className="text-base text-gray-700">
                        {milestone.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="bg-primary text-white border shadow-md border-primary">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">More About Us</h3>
                <ul className="space-y-2">
                  {sidebarLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="flex justify-between items-center text-gray-50 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
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
  );
}
