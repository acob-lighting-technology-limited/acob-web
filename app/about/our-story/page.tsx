import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { MaskText } from "@/components/animations/MaskText";
import { Lightbulb, Zap, Sun, Phone, Settings, Leaf } from "lucide-react";

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
    { label: "Our Story", href: "/about/our-story", isActive: true },
    { label: "Mission & Vision", href: "/about/mission", isActive: false },
    { label: "Meet Our Team", href: "/about/team", isActive: false },
    { label: "Certifications", href: "/about/certifications", isActive: false },
  ];

  return (
    <>
      <PageHero
        title="Our Story"
        backgroundImage="/images/about/our-story-hero.jpg?height=400&width=1200"
      />

      <Container>
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
  );
}
