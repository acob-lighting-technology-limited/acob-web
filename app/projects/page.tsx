import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProjectsGridSkeleton, ProjectsSidebarSkeleton } from '@/components/ui/projects-grid-skeleton';
import { getProjectsPaginated } from '@/sanity/lib/client';
import { extractTextFromPortableText } from '@/lib/utils';
import type { Project } from '@/lib/types';
import ProjectsClient from './projects-client';

interface ProjectsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    state?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
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
    state
  });

  const { projects, pagination } = result;

  // Get all projects for sidebar filters (we'll optimize this later)
  const allProjectsResult = await getProjectsPaginated({
    page: 1,
    limit: 1000, // Get all for filtering
    search: '',
    state: ''
  });

  const allProjects = allProjectsResult.projects;

  // Extract unique states for filtering
  const extractStateFromLocation = (location: string): string => {
    // Special handling for Abuja/FCT
    if (
      location.toLowerCase().includes('abuja') ||
      location.toLowerCase().includes('fct')
    ) {
      return 'Abuja';
    }

    // Special handling for Northern Region
    if (location.toLowerCase().includes('northern region')) {
      return 'Northern Region';
    }

    // Common patterns to extract state names
    const statePatterns = [
      /,\s*([^,]+)\s*State/i, // "City, State State"
      /,\s*([^,]+)\s*State\./i, // "City, State State."
      /,\s*([^,]+)\s*State$/i, // "City, State State" (end of string)
      /,\s*([^,]+)$/i, // "City, State" (end of string)
      /,\s*([^,]+)\.$/i, // "City, State." (end of string)
    ];

    for (const pattern of statePatterns) {
      const match = location.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    // If no pattern matches, return the original location
    return location;
  };

  const uniqueStates = Array.from(
    new Set(
      allProjects
        .map((p: Project) => p.location)
        .filter(Boolean)
        .map(extractStateFromLocation),
    ),
  ).sort() as string[];

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Projects' }];

  return (
    <>
      <PageHero
        title="Our Projects"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <Suspense fallback={<ProjectsGridSkeleton />}>
          <ProjectsClient
            initialProjects={projects}
            initialPagination={pagination}
            allProjects={allProjects}
            uniqueStates={uniqueStates}
            currentSearch={search}
            currentState={state}
            currentPage={page}
          />
        </Suspense>
      </Container>
    </>
  );
}