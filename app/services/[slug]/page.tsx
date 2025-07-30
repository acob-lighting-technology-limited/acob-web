import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Settings, Leaf, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { getServiceBySlug, servicesData } from "@/lib/data/services";
import { ServiceHero } from "@/components/ui/service-hero";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title },
  ];

  // Create sidebar links with current service marked as active
  const sidebarLinks = servicesData.map((s) => ({
    label: s.title,
    href: `/services/${s.slug}`,
    isActive: s.slug === params.slug,
  }));

  return (
    <>
      <PageHero title={service.title} backgroundImage={service.image} />
      <Container className="px-4 py-8 relative">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="border shadow-md border-gray-200 bg-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {service.fullDescription}
                </p>
              </CardContent>
            </Card>

            {/* Gallery */}
            {service.gallery.length > 0 && (
              <Card className="border shadow-md border-gray-200 bg-white">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-[4/3] overflow-hidden rounded-lg"
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${service.title} project ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Features */}
            <Card className="border shadow-md border-gray-200 bg-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Applications */}
            <Card className="border shadow-md border-gray-200 bg-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.applications.map((application, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{application}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="border shadow-md border-gray-200 bg-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
                <div className="space-y-4">
                  {service.whyChooseUs.map((reason, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{reason}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Services Navigation */}
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-black mb-6">
                Our Services
              </h3>
              <div className="space-y-3">
                {sidebarLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className={`
                      block p-4 rounded-lg flex items-center justify-between transition-colors duration-200
                      ${link.isActive ? "bg-green-600 text-white" : "bg-white text-black hover:bg-gray-50"}
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
            <div className="bg-green-500 p-6 rounded-lg text-white">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Settings className="h-12 w-12 text-white" />
                  <Leaf className="h-6 w-6 text-white absolute top-3 left-3" />
                </div>
              </div>
              <p className="text-white text-center mb-6 leading-relaxed">
                As a world wide distributor of supplies we endeavor provide fast
                and knowledgeable service, we can get all the materials.
              </p>
              <Link href="/contact/get-quote">
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-green-500 bg-transparent mb-6"
                >
                  Schedule An Appointment
                </Button>
              </Link>
              <div className="flex items-center justify-center space-x-2 text-white">
                <Phone className="h-5 w-5" />
                <div className="text-center">
                  <div>0704 920 2634,</div>
                  <div>0803 290 2825</div>
                </div>
              </div>
            </div>

            {/* Service Benefits */}
            <Card className="border shadow-md border-gray-200 bg-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Service Benefits</h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
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
