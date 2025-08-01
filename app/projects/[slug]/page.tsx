import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';

import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProject, getProjects } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project: any) => ({
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
    .filter((p: any) => p.slug.current !== slug)
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
        backgroundImage={project.images[0]?.asset.url || '/placeholder.svg'}
      />

      <Container className="px-4 py-8 relative">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main  */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="border-0 custom-shadow shadow-none">
              <div className="p-8">
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
              </div>
            </div>

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
              <div className="border-0 custom-shadow shadow-none">
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((img: any, index: number) => (
                      <div
                        key={index}
                        className="aspect-[4/3] overflow-hidden rounded-lg"
                      >
                        <Image
                          src={img.asset.url || '/placeholder.svg'}
                          alt={`${project.title} image ${index + 1}`}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover hover:scale-105 "
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Quick Contact */}
            <div className="!bg-muted text-foreground border-t-2 border-t-primary rounded-lg">
              <div className="p-6">
                <h3 className="font-semibold mb-4">
                  Interested in a similar project?
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Contact us to discuss your energy needs.
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary-foreground hover:bg-primary hover:text-primary bg-surface"
                  >
                    Request Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="!bg-muted text-foreground border-t-2 border-t-primary rounded-lg">
                <div className="p-6">
                  <h3 className="font-semibold mb-4">More Projects</h3>
                  <div className="space-y-3">
                    {relatedProjects.map((relatedProject: any) => (
                      <div
                        key={relatedProject._id}
                        className="border border-primary p-2 bg-surface rounded-lg "
                      >
                        <Link
                          href={`/projects/${relatedProject.slug.current}`}
                          className="block group"
                        >
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary  mb-1">
                            {relatedProject.title}
                          </h4>
                          {/* {relatedProject.location && (
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{relatedProject.location}</span>
                            </div>
                          )} */}
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* View All Projects Link */}
                  <div className="pt-4">
                    <Link
                      href="/projects"
                      className="text-sm text-primary hover:text-primary/80  flex items-center"
                    >
                      View All Projects
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
