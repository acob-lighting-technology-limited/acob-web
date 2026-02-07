import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';
import {
  getProjects,
  getProject,
  getProjectsPaginated,
} from '@/sanity/lib/client';
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import type { Project } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ShareCopy } from '@/components/updates/share-copy';
import { ProjectContent } from './project-content';
import { ImpactMetrics } from '@/components/projects/impact-metrics';
import { StateProjectsView } from './state-projects-view';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Slug to Sanity state value mapping
const stateMapping: Record<string, string> = {
  abuja: 'FCT',
  edo: 'Edo',
  delta: 'Delta',
  rivers: 'Rivers',
  kogi: 'Kogi',
  nasarawa: 'Nasarawa',
  jigawa: 'Jigawa',
  kaduna: 'Kaduna',
  kano: 'Kano',
  ogun: 'Ogun',
  enugu: 'Enugu',
  borno: 'Borno',
  ondo: 'Ondo',
};

// Display name mapping
const stateDisplayMapping: Record<string, string> = {
  abuja: 'Abuja (FCT)',
  edo: 'Edo State',
  delta: 'Delta State',
  rivers: 'Rivers State',
  kogi: 'Kogi State',
  nasarawa: 'Nasarawa State',
  jigawa: 'Jigawa State',
  kaduna: 'Kaduna State',
  kano: 'Kano State',
  ogun: 'Ogun State',
  enugu: 'Enugu State',
  borno: 'Borno State',
  ondo: 'Ondo State',
};

export async function generateStaticParams() {
  const projects = await getProjects();
  const stateSlugs = Object.keys(stateMapping).map(state => ({ slug: state }));
  const projectSlugs = projects.map((project: Project) => ({
    slug: project.slug.current,
  }));
  return [...projectSlugs, ...stateSlugs];
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  // 1. Try to fetch a single project
  const project = await getProject(slug);

  // 2. If no project, check if it's a state slug
  if (!project) {
    const sanityStateValue = stateMapping[slug.toLowerCase()];
    const displayName = stateDisplayMapping[slug.toLowerCase()];

    if (sanityStateValue) {
      const { projects } = await getProjectsPaginated({
        state: sanityStateValue,
        limit: 100,
      });

      return (
        <StateProjectsView
          projects={projects}
          displayName={displayName || slug}
        />
      );
    }

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
      <Hero
        title="Our Projects"
        description={project.title}
        image={project.projectImage}
      />

      <Container className="px-4 py-8 relative">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* Overview */}
        <Card className="pt-2">
          <CardContent className="p-4 sm:p-6 xl:p-8 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                Project Overview
              </h2>
              <p className="text-muted-foreground dark:text-foreground/80 leading-relaxed text-lg">
                {project.description}
              </p>

              {/* Project Location */}
              {project.location && (
                <div className="flex flex-wrap items-center text-muted-foreground mt-6 gap-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg">
                      {project.location}
                      {project.state &&
                        `, ${project.state.toUpperCase() === 'FCT' ? 'FCT' : `${project.state} State.`}`}
                    </span>
                  </div>
                  <span className="hidden sm:inline mx-2">•</span>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg">
                      {new Date(
                        project.projectDate || project._createdAt,
                      ).getFullYear()}
                    </span>
                  </div>
                </div>
              )}
            </div>

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
          </div>
        )}

        {/* Back to Projects Button */}
        <div className="mt-12 mb-8 text-center">
          <Link href="/projects">
            <Button variant="outline" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
