import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ArrowRight } from "lucide-react"

import Link from "next/link"
import { servicesData } from "@/lib/data/services"

export function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <Container className="px-4">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
              A Leading Supplier Of Solar Materials For Manufacturers Installers & Contractors, Mini-Grid Solutions.
            </h2>
          </div>
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Together with experienced technical team, ACOB Lighting provides emergency response to electricity outages
              for customers, standard technical O&M activities, design and installation of streetlighting
              infrastructure. We ensure quality control of indoor installations and safety training for customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-100 px-8 py-3 bg-transparent"
              >
                Find Your Solution
              </Button>
            </div>
          </div>
        </div>

        {/* Services Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full custom-shadow"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {servicesData.map((service, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 border-0 relative overflow-hidden h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6 w-fit transition-transform duration-500 hover:scale-x-[-1]">
                      <span>
                        <img
                          src={service.icon || "/placeholder.svg"}
                          alt={service.title}
                          className="w-20 h-20 object-contain"
                        />
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-8">{service.shortDescription}</p>
                    <div className="mt-auto">
                      <Link href={`/services/${service.slug}`}>
                        <Button className="bg-black hover:bg-primary duration-500 transition-colors text-white px-6 py-2 text-sm">
                          Read More
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>

                  {/* Green accent line at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-12 lg:-left-16" />
          <CarouselNext className="hidden sm:flex -right-12 lg:-right-16" />
        </Carousel>
      </Container>
    </section>
  )
}