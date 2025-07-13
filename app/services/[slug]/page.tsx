
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { notFound } from "next/navigation"
import { getServiceBySlug, servicesData } from "@/lib/data/services"
import { ServiceHero } from "@/components/ui/service-hero"


interface ServicePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }))
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title },
  ]

  return (
    <>
      <ServiceHero title={service.title} description={service.fullDescription} backgroundImage={service.image} />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{service.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Gallery */}
            {service.gallery.length > 0 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.gallery.map((image, index) => (
                      <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
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
            <Card>
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
            <Card>
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
            <Card>
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
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card className="bg-primary text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Get a Quote</h3>
                <p className="text-sm opacity-90 mb-4">Ready to get started? Contact us for a personalized quote.</p>
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  Request Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Service Benefits */}
            <Card>
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

            {/* Related Services */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Related Services</h3>
                <div className="space-y-3">
                  {servicesData
                    .filter((s) => s.id !== service.id)
                    .slice(0, 3)
                    .map((relatedService) => (
                      <div key={relatedService.id}>
                        <a
                          href={`/services/${relatedService.slug}`}
                          className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                        >
                          {relatedService.title}
                        </a>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  )
}
