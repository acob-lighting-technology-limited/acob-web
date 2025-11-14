import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProjects, getProject } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import type { Project } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ShareCopy } from '@/components/updates/share-copy';
import { Metadata } from 'next';
import { ProjectContent } from './project-content';
import { ImpactMetrics } from '@/components/projects/impact-metrics';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found - ACOB Lighting Technology Limited',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} - ACOB Lighting Technology Limited`,
    description:
      project.description ||
      `Explore ${project.title} project by ACOB Lighting Technology Limited. We provide comprehensive solar energy solutions and mini-grid installations across Nigeria.`,
    keywords: `${project.title}, solar energy project, mini-grid installation, renewable energy, ACOB Lighting, Nigeria solar projects`,
    openGraph: {
      title: `${project.title} - ACOB Lighting Technology Limited`,
      description:
        project.description ||
        `Explore ${project.title} project by ACOB Lighting.`,
      type: 'website',
      url: `https://acoblighting.com/projects/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - ACOB Lighting Technology Limited`,
      description:
        project.description ||
        `Explore ${project.title} project by ACOB Lighting.`,
    },
  };
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
        title="Our Projects"
        description={project.title}
        backgroundImage={project.projectImage || '/placeholder.svg'}
      />

      <Container className="px-4 py-8 relative">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* Overview */}
        <Card>
          <CardContent className="p-4 sm:p-6 xl:p-8">
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
                <span className="text-lg">
                  {project.location}
                  {project.state && `, ${project.state}`}
                </span>
              </div>
            )}

            {/* Project Content */}
            {project.content && (
              <div className="mt-6 prose prose-lg max-w-none flex flex-wrap -mx-2">
                <ProjectContent content={project.content} />
              </div>
            )}

            {/* Impact Metrics */}
            {project.impactMetrics && (
              <ImpactMetrics metrics={project.impactMetrics} />
            )}

            {/* Share Buttons */}
            <div className="flex items-center gap-4 pt-8 border-t mt-6">
              <ShareCopy className="rounded-full bg-transparent" />
            </div>
          </CardContent>
        </Card>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Related Projects</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedProjects.map((relatedProject: Project) => (
                <Link
                  key={relatedProject._id}
                  href={`/projects/${relatedProject.slug.current}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border hover:border-primary/50">
                    <div className="aspect-square overflow-hidden relative bg-muted">
                      {relatedProject.projectImage && (
                        <Image
                          src={relatedProject.projectImage}
                          alt={relatedProject.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary mb-1 line-clamp-2 transition-colors duration-300">
                        {relatedProject.title}
                      </h4>
                      {relatedProject.location && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="line-clamp-1">
                            {relatedProject.location}
                            {relatedProject.state &&
                              `, ${relatedProject.state}`}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/projects">
                <Button variant="outline">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
