import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { UpdatesGridSkeleton } from '@/components/ui/updates-grid-skeleton';
import { getUpdatePostsPaginated } from '@/sanity/lib/client';
import type { UpdatePost } from '@/lib/types';
import UpdatesClient from './updates-client';

interface UpdatesPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function UpdatesPage({ searchParams }: UpdatesPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const search = params.search || '';
  const limit = 8;

  // Fetch posts with pagination
  const result = await getUpdatePostsPaginated({
    page,
    limit,
    search
  });

  const { posts, pagination } = result;

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Updates' }];

  return (
    <>
      <PageHero
        title="Updates & News"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <Suspense fallback={<UpdatesGridSkeleton />}>
          <UpdatesClient
            initialPosts={posts}
            initialPagination={pagination}
            currentSearch={search}
            currentPage={page}
          />
        </Suspense>
      </Container>
    </>
  );
}