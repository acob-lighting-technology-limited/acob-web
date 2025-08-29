import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';

import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProject, getProjects } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import type { Project, SanityImageUrl } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project: Project) => ({
    slug: project.slug.current,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  // Fetch all projects and filter out the current one to show related projects
  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((p: Project) => p.slug.current !== slug)
    .slice(0, 5); // Show only 5 related projects

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title },
  ];

  return (
    <>
      <PageHero
        title={project.title}
        backgroundImage={project.images[0]?.asset?.url || '/placeholder.svg'}
      />

      <Container className="px-4 py-8 relative">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main  */}
          <div className="lg:col-span-2 space-y-8 ">
            {/* Overview */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Project Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.description}
                </p>

                {/* Project Location */}
                {project.location && (
                  <div className="flex items-center text-muted-foreground mt-6">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{project.location}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map(
                      (img: SanityImageUrl, index: number) => (
                        <div
                          key={index}
                          className="aspect-[4/3] overflow-hidden rounded-lg"
                        >
                          <Image
                            src={img.asset?.url || '/placeholder.svg'}
                            alt={`${project.title} image ${index + 1}`}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover hover:scale-105 "
                          />
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Project Info */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6 ">
                <h3 className="font-semibold mb-4">Project Details</h3>
                <div className="space-y-3">
                  {project.location && (
                    <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">{project.location}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="h-4 w-4 bg-primary rounded-sm mt-0.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Project Type</p>
                      <p className="text-sm font-medium">Solar Energy Solution</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="border-t-2 border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">
                  Need a Similar Project?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a customized solution for your energy needs.
                </p>
                <Link href="/contact/quote">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-2">
                    Get Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <Card className="!border-t-2 !border-t-primary border border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Related Projects</h3>
                  <div className="space-y-2">
                    {relatedProjects.map((relatedProject: Project) => (
                      <Link
                        key={relatedProject._id}
                        href={`/projects/${relatedProject.slug.current}`}
                        className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 group border border-border"
                      >
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary mb-1">
                          {relatedProject.title}
                        </h4>
                        {relatedProject.location && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{relatedProject.location}</span>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* View All Projects Link */}
                  <div className="pt-4 border-t">
                    <Link
                      href="/projects"
                      className="text-sm text-primary hover:text-primary/80 flex items-center font-medium"
                    >
                      View All Projects
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
