/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { PageHeroCarousel } from '@/components/ui/page-hero-carousel';
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
    search,
  });

  const { posts, pagination } = result;

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Updates' }];

  // Get first 5 update post images for carousel
  const updateImages = posts
    .slice(0, 5)
    .filter((post: UpdatePost) => post.featuredImage)
    .map((post: UpdatePost) => ({
      src: post.featuredImage!,
      alt: post.title,
    }));

  return (
    <>
      <PageHeroCarousel
        images={updateImages}
        title="Updates & News"
        description="Latest News, Projects, and Insights from ACOB Lighting"
      />

      <Container className="px-4 py-8">
        <Suspense fallback={<UpdatesGridSkeleton />}>
          <UpdatesClient
            initialPosts={posts}
            initialPagination={pagination}
            currentSearch={search}
            currentPage={page}
            breadcrumbItems={breadcrumbItems}
          />
        </Suspense>
      </Container>
    </>
  );
}
