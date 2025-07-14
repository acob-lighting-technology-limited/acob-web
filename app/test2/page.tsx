"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const projects = [
  {
    title: "Rural Electrification Project",
    location: "Kaduna State",
    image: "/placeholder.svg?height=300&width=400",
    description: "Bringing reliable electricity to rural communities through innovative solar solutions and grid infrastructure development."
  },
  {
    title: "Mini-Grid Installation",
    location: "Kano State",
    image: "/placeholder.svg?height=300&width=400",
    description: "Implementing localized power generation systems to serve remote areas with sustainable energy solutions."
  },
  {
    title: "Solar Farm Development",
    location: "Abuja FCT",
    image: "/placeholder.svg?height=300&width=400",
    description: "Large-scale solar energy production facility contributing to Nigeria's renewable energy goals."
  },
  {
    title: "Commercial Solar System",
    location: "Lagos State",
    image: "/placeholder.svg?height=300&width=400",
    description: "Powering businesses with clean, cost-effective solar energy solutions for commercial enterprises."
  },
  {
    title: "Community Solar Hub",
    location: "Ogun State",
    image: "/placeholder.svg?height=300&width=400",
    description: "Centralized solar power system serving multiple households and community facilities."
  },
  {
    title: "Industrial Power Solution",
    location: "Rivers State",
    image: "/placeholder.svg?height=300&width=400",
    description: "Heavy-duty power systems designed for industrial operations and manufacturing facilities."
  },
  {
    title: "School Solar Project",
    location: "Plateau State",
    image: "/placeholder.svg?height=300&width=400",
    description: "Educational infrastructure powered by renewable energy to support learning environments."
  },
  {
    title: "Healthcare Facility Power",
    location: "Benue State",
    image: "/placeholder.svg?height=300&width=400",
    description: "Critical power systems for hospitals and clinics ensuring uninterrupted healthcare services."
  },
  {
    title: "Agricultural Solar System",
    location: "Kwara State",
    image: "/placeholder.svg?height=300&width=400",
    description: "Supporting farmers with solar-powered irrigation and processing equipment for increased productivity."
  },
  {
    title: "Market Solar Installation",
    location: "Enugu State",
    image: "/placeholder.svg?height=300&width=400",
    description: "Empowering local markets with reliable electricity for extended trading hours and cold storage."
  },
  {
    title: "Residential Solar Complex",
    location: "Delta State",
    image: "/placeholder.svg?height=300&width=400",
    description: "Comprehensive solar solutions for residential developments and housing complexes."
  },
  {
    title: "Government Building Solar",
    location: "Bauchi State",
    image: "/placeholder.svg?height=300&width=400",
    description: "Sustainable power solutions for government facilities and administrative buildings."
  },
]

export default function ProjectsSection() {
  return (
    <section className="py-16 bg-gray-50 relative">
      <Container className="px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 sticky top-20">
            Latest Rural Electrification Projects,
            <br />
            Mini-Grid Solutions & Energizing Supplies
          </h2>
        </div>

        {/* Sticky Cards Container */}
        <div className="relative" style={{ height: `${100 + projects.length * 50}vh` }}>
          {projects.map((project, index) => (
            <div
              key={index}
              className="sticky w-full"
              style={{
                top: `${30 + index * 5}vh`,
                zIndex: projects.length - index,
                marginBottom: index === projects.length - 1 ? '0' : '50vh'
              }}
            >
              <Card className="mx-auto max-w-4xl mb-4 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section - Larger on desktop, full width on mobile */}
                    <div className="md:w-2/3 w-full">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                    </div>
                    
                    {/* Content Section - Smaller space for title and description */}
                    <div className="md:w-1/3 w-full p-6 flex flex-col justify-center bg-white">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-primary font-medium mb-3">
                            📍 {project.location}
                          </p>
                        </div>
                        
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          {project.description}
                        </p>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-4 w-fit hover:bg-primary hover:text-white transition-colors"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button className="bg-primary hover:bg-primary/90">View All Projects</Button>
        </div>
      </Container>
    </section>
  )
}