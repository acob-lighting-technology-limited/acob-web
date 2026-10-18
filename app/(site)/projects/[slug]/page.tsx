import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';
import {
  getProjects,
  getProject,
  getProjectsPaginated,
} from '@/sanity/lib/queries';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { Hero } from '@/components/ui/hero';
import type { Project } from '@/lib/types';
import { ShareCopy } from '@/components/updates/share-copy';
import { ProjectContent } from './project-content';
import { ImpactMetrics } from '@/components/projects/impact-metrics';
import { StateProjectsView } from './state-projects-view';
import { CATEGORY_INFO } from '@/lib/constants/project-categories';
import { getCalculatedImpactMetrics } from '@/lib/utils';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Slug to Sanity state value mapping
const stateMapping: Record<string, string> = {
  jigawa: 'Jigawa',
  borno: 'Borno',
  nasarawa: 'Nasarawa',
  kaduna: 'Kaduna',
  kano: 'Kano',
  kogi: 'Kogi',
  rivers: 'Rivers',
  enugu: 'Enugu',
  delta: 'Delta',
};

// Display name mapping
const stateDisplayMapping: Record<string, string> = {
  jigawa: 'Jigawa State',
  borno: 'Borno State',
  nasarawa: 'Nasarawa State',
  kaduna: 'Kaduna State',
  kano: 'Kano State',
  kogi: 'Kogi State',
  rivers: 'Rivers State',
  enugu: 'Enugu State',
  delta: 'Delta State',
  abuja: 'Abuja (FCT)',
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

  if (project) {
    project.impactMetrics = getCalculatedImpactMetrics(
      project,
      project.impactMetrics,
    );
  }

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

  // Fetch all projects and calculate relevance score to filter related projects
  const allProjects = await getProjects();
  const currentCategories =
    project.categories || (project.category ? [project.category] : []);
  const currentSubcategory = project.subcategory;

  const relatedProjects = allProjects
    .filter((p: Project) => p.slug.current !== slug)
    .map((p: Project) => {
      let score = 0;
      const pCategories = p.categories || (p.category ? [p.category] : []);

      const sharedCategories = pCategories.filter(cat =>
        currentCategories.includes(cat),
      );
      score += sharedCategories.length * 10;

      if (p.subcategory && p.subcategory === currentSubcategory) {
        score += 5;
      }

      return { project: p, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      const dateA = a.project.projectDate
        ? new Date(a.project.projectDate).getTime()
        : 0;
      const dateB = b.project.projectDate
        ? new Date(b.project.projectDate).getTime()
        : 0;
      return dateB - dateA;
    })
    .map(item => item.project)
    .slice(0, 3);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title },
  ];

  const hasContent = Boolean(
    project.projectContent ||
    project.content ||
    project.descriptionTemplate ||
    (project.gallery && project.gallery.length > 0) ||
    project.coverImage ||
    project.projectImage,
  );

  return (
    <>
      <Hero
        title="Our Projects"
        description={project.title}
        image={project.projectImage}
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Overview */}
        <div className="max-w-[70ch]">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
            Project Overview
          </span>
          <p className="mt-4 text-xl leading-relaxed text-foreground/90 md:text-2xl">
            {project.description || project.excerpt}
          </p>

          {project.location && (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  {project.location}
                  {project.state &&
                    `, ${project.state.toUpperCase() === 'FCT' ? 'FCT' : `${project.state} State`}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  {new Date(
                    project.projectDate || project._createdAt,
                  ).getFullYear()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Project content (gallery, narrative, template) */}
        {hasContent && (
          <div className="mt-8 md:mt-10">
            <div className="prose prose-lg max-w-none">
              <ProjectContent
                content={project.content}
                projectContent={project.projectContent}
                descriptionTemplate={project.descriptionTemplate}
                gallery={project.gallery}
                project={project}
              />
            </div>
          </div>
        )}

        {/* Impact metrics */}
        {project.impactMetrics && (
          <div className="mt-12 md:mt-16">
            <ImpactMetrics metrics={project.impactMetrics} />
          </div>
        )}

        {/* Share */}
        <div className="mt-14 flex items-center gap-4 border-y border-border py-8">
          <span className="text-sm font-semibold text-muted-foreground">
            Share this Project:
          </span>
          <ShareCopy className="rounded-full bg-transparent" />
        </div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-16 md:mt-20">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <SectionEyebrow>Keep exploring</SectionEyebrow>
                <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
                  Related projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2 sm:flex"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {relatedProjects.map((relatedProject: Project) => (
                <Link
                  key={relatedProject._id}
                  href={`/projects/${relatedProject.slug.current}`}
                  className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                      {relatedProject.projectImage ? (
                        <Image
                          src={relatedProject.projectImage}
                          alt={relatedProject.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                          <span className="select-none text-4xl font-bold text-primary/20">
                            ACOB
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {relatedProject.categories?.[0] && (
                        <span className="absolute left-3 top-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/90">
                          {CATEGORY_INFO[relatedProject.categories[0]]?.title ??
                            relatedProject.categories[0]}
                        </span>
                      )}
                      {relatedProject.projectDate && (
                        <span className="absolute bottom-3 left-3 text-[0.65rem] font-bold tabular-nums text-white/90">
                          {new Date(relatedProject.projectDate).getFullYear()}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-4 md:p-5">
                      <h3 className="text-base font-extrabold tracking-tight text-foreground line-clamp-2">
                        {relatedProject.title}
                      </h3>
                      {relatedProject.description && (
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2 md:text-sm">
                          {relatedProject.description}
                        </p>
                      )}
                      {relatedProject.location && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="truncate">
                            {relatedProject.location}
                            {relatedProject.state &&
                              `, ${relatedProject.state.toUpperCase() === 'FCT' ? 'FCT' : `${relatedProject.state} State`}`}
                          </span>
                        </div>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary md:text-sm">
                        View project
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back */}
        <div className="mb-8 mt-16 text-center">
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
