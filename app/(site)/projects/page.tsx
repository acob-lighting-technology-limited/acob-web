import { getProjectsPaginated } from '@/sanity/lib/queries';
import ProjectsClient from './projects-client';

// Revalidate every 10 minutes (600 seconds)
export const revalidate = 600;

interface ProjectsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    state?: string;
    category?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const search = params.search || '';
  const state = params.state || '';
  const category = params.category || '';
  const limit = 9;

  // Fetch projects with pagination
  const result = await getProjectsPaginated({
    page,
    limit,
    search,
    state,
    category,
  });

  const { projects, pagination } = result;

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Projects' }];

  return (
    <ProjectsClient
      initialProjects={projects}
      initialPagination={pagination}
      currentSearch={search}
      currentCategory={category}
      breadcrumbItems={breadcrumbItems}
    />
  );
}
