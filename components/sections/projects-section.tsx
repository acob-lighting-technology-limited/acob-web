"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const projectsww = [
  {
    title: "Rural Electrification Project",
    location: "Kaduna State",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Mini-Grid Installation",
    location: "Kano State",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Solar Farm Development",
    location: "Abuja FCT",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Commercial Solar System",
    location: "Lagos State",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Community Solar Hub",
    location: "Ogun State",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Industrial Power Solution",
    location: "Rivers State",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "School Solar Project",
    location: "Plateau State",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Healthcare Facility Power",
    location: "Benue State",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Agricultural Solar System",
    location: "Kwara State",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Market Solar Installation",
    location: "Enugu State",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Residential Solar Complex",
    location: "Delta State",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Government Building Solar",
    location: "Bauchi State",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export function ProjectsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <Container className="px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Rural Electrification Projects,
            <br />
            Mini-Grid Solutions & Energizing Supplies
          </h2>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projectsww.map((project, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{project.location}</p>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Project
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <Button className="bg-primary hover:bg-primary/90">View All Projects</Button>
        </div>
      </Container>
    </section>
  )
}
