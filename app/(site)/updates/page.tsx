import { getUpdatePostsPaginated } from '@/sanity/lib/queries';
import UpdatesClient from './updates-client';

interface UpdatesPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}

export default async function UpdatesPage({ searchParams }: UpdatesPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const search = params.search || '';
  const category = params.category || '';
  const limit = 9;

  // Fetch posts with pagination
  const result = await getUpdatePostsPaginated({
    page,
    limit,
    search,
    category,
  });

  const { posts, pagination } = result;

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Updates' }];

  return (
    <UpdatesClient
      initialPosts={posts}
      initialPagination={pagination}
      currentSearch={search}
      currentCategory={category}
      breadcrumbItems={breadcrumbItems}
    />
  );
}
