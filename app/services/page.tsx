import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { servicesData } from "@/lib/data/services"


const categories = ["All Services", "Power Solutions", "Consulting", "Construction", "Infrastructure"]

const tags = [
  "Solar Energy",
  "Mini-Grid",
  "Energy Audit",
  "Installation",
  "Maintenance",
  "Consulting",
  "EPC",
  "Streetlighting",
]

export default function ServicesPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Services" }]

  return (
    <>
      <PageHero title="Services" backgroundImage="/placeholder.svg?height=400&width=1200" />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {servicesData.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.shortDescription}</p>
                  <Link href={`/services/${service.slug}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Search</h3>
                <div className="relative">
                  <Input placeholder="Search services..." className="pr-10" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                      >
                        <span>{category}</span>
                        <span className="text-sm text-gray-400">(5)</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href="#"
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      {tag}
                    </Link>
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
