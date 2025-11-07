import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { PageHeroCarousel } from '@/components/ui/page-hero-carousel';
import { ProjectsGridSkeleton } from '@/components/ui/projects-grid-skeleton';
import { getProjectsPaginated } from '@/sanity/lib/client';
import type { Project } from '@/lib/types';
import ProjectsClient from './projects-client';

interface ProjectsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    state?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const search = params.search || '';
  const state = params.state || '';
  const limit = 6;

  // Fetch projects with pagination
  const result = await getProjectsPaginated({
    page,
    limit,
    search,
    state,
  });

  const { projects, pagination } = result;

  // Get all projects for sidebar filters (we'll optimize this later)
  const allProjectsResult = await getProjectsPaginated({
    page: 1,
    limit: 1000, // Get all for filtering
    search: '',
    state: '',
  });

  const allProjects = allProjectsResult.projects;

  // Extract unique states for filtering - now using the state field directly
  const uniqueStates = Array.from(
    new Set(allProjects.map((p: Project) => p.state).filter(Boolean))
  ).sort() as string[];

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Projects' }];

  // Get first 5 project images for carousel
  const projectImages = allProjects
    .slice(0, 5)
    .filter((p: Project) => p.projectImage)
    .map((p: Project) => ({
      src: p.projectImage,
      alt: p.title,
    }));

  return (
    <>
      <PageHeroCarousel
        images={projectImages}
        title="Our Projects"
        description="Delivering Reliable Solar Energy Infrastructure Across Nigeria"
      />

      <Container className="px-4 py-8">
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <ProjectsClient
            initialProjects={projects}
            initialPagination={pagination}
            allProjects={allProjects}
            uniqueStates={uniqueStates}
            currentSearch={search}
            currentState={state}
            currentPage={page}
            breadcrumbItems={breadcrumbItems}
          />
        </Suspense>
      </Container>
    </>
  );
}
