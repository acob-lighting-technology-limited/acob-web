import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { PageHeroCarousel } from '@/components/ui/page-hero-carousel';
import { ProjectsGridSkeleton } from '@/components/ui/projects-grid-skeleton';
import { getProjectsPaginated } from '@/sanity/lib/client';
import type { Project } from '@/lib/types';
import ProjectsClient from './projects-client';

// Revalidate every 10 minutes (600 seconds)
export const revalidate = 600;

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

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Projects' }];

  // Map current page's project images for carousel
  const projectImages = projects
    .filter((p: Project) => p.projectImage) // Only include projects with images
    .map((p: Project) => ({
      src: p.projectImage!,
      alt: p.title,
      href: `/projects/${p.slug.current}`,
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
            currentSearch={search}
            breadcrumbItems={breadcrumbItems}
          />
        </Suspense>
      </Container>
    </>
  );
}
