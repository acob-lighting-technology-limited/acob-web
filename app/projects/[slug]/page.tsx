import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProjects, getProject } from '@/sanity/lib/client';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import type { Project } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ShareCopy } from '@/components/updates/share-copy';
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
    .slice(0, 3); // Show only 3 related projects
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
                  {project.state &&
                    `, ${project.state.toUpperCase() === 'FCT' ? 'FCT' : `${project.state} State.`}`}
                </span>
                <span className="mx-2">•</span>
                <Calendar className="w-4 h-4 mx-2" />
                <span className="text-lg">
                  {new Date(
                    project.projectDate || project._createdAt,
                  ).getFullYear()}
                </span>
              </div>
            )}

            {/* Project Content */}
            {(project.projectContent || project.content) && (
              <div className="mt-6 prose prose-lg max-w-none">
                <ProjectContent
                  content={project.content}
                  projectContent={project.projectContent}
                  project={project}
                />
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
            <ul className="space-y-2">
              {relatedProjects.map((relatedProject: Project) => (
                <li key={relatedProject._id}>
                  <Link
                    href={`/projects/${relatedProject.slug.current}`}
                    className="group flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-muted/50 border border-border hover:border-primary/50"
                  >
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {relatedProject.title}
                      </h4>
                      {relatedProject.location && (
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {relatedProject.location}
                            {relatedProject.state &&
                              `, ${relatedProject.state.toUpperCase() === 'FCT' ? 'FCT' : `${relatedProject.state} State.`}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
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
