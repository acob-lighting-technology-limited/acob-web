import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"
import { notFound } from "next/navigation"
import { getProject, getProjects } from "@/sanity/lib/client"
import Image from "next/image"
import Link from "next/link"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project: any) => ({
    slug: project.slug.current,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: project.title },
  ]

  return (
    <>
      <div
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${project.images[0]?.asset.url || "/placeholder.svg"}')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <Container className="relative z-10 px-4 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{project.title}</h1>
          <p className="text-lg md:text-xl opacity-90 flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5" /> {project.location}
          </p>
        </Container>
      </div>

      <Container className="px-4 py-8 relative">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
              </CardContent>
            </Card>

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
              <Card className="border-0 custom-shadow shadow-none">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((img: any, index: number) => (
                      <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
                        <Image
                          src={img.asset.url || "/placeholder.svg"}
                          alt={`${project.title} image ${index + 1}`}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Quick Contact */}
            <Card className="bg-primary text-white border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Interested in a similar project?</h3>
                <p className="text-sm opacity-90 mb-4">Contact us to discuss your energy needs.</p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-primary bg-transparent"
                  >
                    Request Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related Projects (Example) */}
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">More Projects</h3>
                <div className="space-y-3">
                  {/* You might fetch related projects from Sanity based on category or tags */}
                  <Link
                    href="/projects/another-project-slug"
                    className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    Another Project Title
                  </Link>
                  <Link
                    href="/projects/yet-another-project-slug"
                    className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    Yet Another Project
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  )
}
