import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { PageHeroCarousel } from '@/components/ui/page-hero-carousel';
import { ProjectsGridSkeleton } from '@/components/ui/projects-grid-skeleton';
import {
  getProjectsPaginated,
  getRecentProjectImages,
} from '@/sanity/lib/client';
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

  // Fetch recent images efficiently (no need to fetch all projects)
  const recentProjects = await getRecentProjectImages(5);

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Projects' }];

  // Map recent project images for carousel
  const projectImages = recentProjects.map(
    (p: { title: string; projectImage: string }) => ({
      src: p.projectImage,
      alt: p.title,
    })
  );

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
