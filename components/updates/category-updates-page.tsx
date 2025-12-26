import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { UpdatesGridSkeleton } from '@/components/ui/updates-grid-skeleton';
import { getUpdatePostsPaginated } from '@/sanity/lib/client';
import type { UpdatePost } from '@/lib/types';
import CategoryUpdatesClient from './category-updates-client';

interface CategoryUpdatesPageProps {
  category: string;
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
}

export async function CategoryUpdatesPage({
  category,
  searchParams,
}: CategoryUpdatesPageProps) {
  const params = searchParams ? await searchParams : {};
  const page = parseInt(params.page || '1');
  const search = params.search || '';
  const limit = 12;

  // Format category name for display
  const categoryTitle = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Fetch all posts for this category
  const allCategoryPosts = await getUpdatePostsPaginated({
    page: 1,
    limit: 1000, // Get all posts to filter by category
    search: '',
  });

  // Filter posts by category
  const categoryPosts = allCategoryPosts.posts.filter(
    (post: UpdatePost) => post.category === category,
  );

  // Apply search filter if provided
  const searchFilteredPosts = search
    ? categoryPosts.filter(
        (post: UpdatePost) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(search.toLowerCase()),
      )
    : categoryPosts;

  // Calculate pagination for category posts
  const totalPosts = searchFilteredPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = searchFilteredPosts.slice(startIndex, endIndex);

  const pagination = {
    currentPage: page,
    totalPages,
    totalCount: totalPosts,
    limit,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: categoryTitle },
  ];

  // Get category post images for carousel (use all category posts, not just current page)
  const categoryImages = categoryPosts
    .filter((post: UpdatePost) => post.featuredImage)
    .slice(0, 5) // Limit to 5 images for carousel
    .map((post: UpdatePost) => ({
      src: post.featuredImage!,
      alt: post.title,
    }));

  // Fallback image if no posts with images
  if (categoryImages.length === 0) {
    categoryImages.push({
      src: '/images/services/header.webp',
      alt: categoryTitle,
    });
  }

  return (
    <>
      <Hero
        key={`category-${category}-hero`}
        image={categoryImages}
        title={categoryTitle}
        description={`Latest ${categoryTitle.toLowerCase()} updates and news from ACOB Lighting`}
      />

      <Container className="px-4 py-8">
        <Suspense fallback={<UpdatesGridSkeleton />}>
          <CategoryUpdatesClient
            initialPosts={paginatedPosts}
            initialPagination={pagination}
            currentSearch={search}
            currentPage={page}
            breadcrumbItems={breadcrumbItems}
            category={category}
          />
        </Suspense>
      </Container>
    </>
  );
}
