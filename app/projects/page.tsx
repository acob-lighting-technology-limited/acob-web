import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, MapPin } from "lucide-react"
import Link from "next/link"
import { getProjects } from "@/sanity/lib/client" // Import getProjects

export default async function ProjectsPage() {
  const projects = await getProjects()

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Projects" }]

  return (
    <>
      <PageHero title="Our Projects" backgroundImage="/images/services/header.jpg?height=400&width=1200" />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {projects.map((project: any) => (
              <Card
                key={project._id}
                className="overflow-hidden border-0 custom-shadow shadow-none p-0 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  {project.images && project.images.length > 0 && (
                    <img
                      src={project.images[0].asset.url || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">{project.title}</h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex items-center text-sm text-gray-600 mb-6">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{project.location}</span>
                  </div>
                  <Link href={`/projects/${project.slug.current}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      View Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Search */}
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Search Projects</h3>
                <div className="relative border-[0.5px] rounded-md border-primary">
                  <Input placeholder="Search projects..." className="pr-10" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* Categories (Example - you might want to fetch these from Sanity too) */}
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Project Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>Rural Electrification</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>Commercial Installations</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center justify-between"
                    >
                      <span>Street Lighting</span>
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
