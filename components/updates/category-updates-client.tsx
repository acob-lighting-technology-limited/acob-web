'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useResponsiveLimit } from '@/hooks/use-responsive-limit';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ArrowRight, Search, X, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { UpdatePost, PaginationInfo } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';
import { FadeIn } from '@/components/animations/FadeIn';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface CategoryUpdatesClientProps {
  initialPosts: UpdatePost[];
  initialPagination: PaginationInfo;
  currentSearch: string;
  currentPage: number;
  breadcrumbItems: Array<{ label: string; href?: string }>;
  category: string;
}

export default function CategoryUpdatesClient({
  initialPosts,
  initialPagination,
  currentSearch,
  breadcrumbItems,
  category,
}: CategoryUpdatesClientProps) {
  const router = useRouter();

  const [posts, setPosts] = useState(initialPosts);
  const [pagination, setPagination] = useState(initialPagination);
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!currentSearch);
  const { limit: responsiveLimit, isReady: isResponsiveReady } =
    useResponsiveLimit();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state with props when they change (from server component refresh)
  useEffect(() => {
    setPosts(initialPosts);
    setPagination(initialPagination);
    setSearchQuery(currentSearch);
    setIsLoading(false);
  }, [initialPosts, initialPagination, currentSearch]);

  // Update URL and fetch new data when search changes
  const updateSearch = async (
    newSearch: string,
    newPage: number = 1,
    updateUrl: boolean = false,
  ) => {
    setIsLoading(true);

    // Only update URL if explicitly requested (e.g., on clear or after debounce completes)
    if (updateUrl) {
      const params = new URLSearchParams();
      if (newSearch.trim()) {
        params.set('search', newSearch);
      }
      if (newPage > 1) {
        params.set('page', newPage.toString());
      }

      const queryString = params.toString();
      const newUrl = queryString
        ? `/updates/category/${category}?${queryString}`
        : `/updates/category/${category}`;

      router.push(newUrl, { scroll: false });
    }

    try {
      const apiParams = new URLSearchParams();
      apiParams.set('category', category);
      if (newSearch.trim()) {
        apiParams.set('search', newSearch);
      }
      if (newPage > 1) {
        apiParams.set('page', newPage.toString());
      }
      apiParams.set('limit', responsiveLimit.toString());

      const response = await fetch(`/api/updates?${apiParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch updates');
      }
      const result = await response.json();
      setPosts(result.posts);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Error fetching updates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch with responsive limit only after client hydration is ready
  // Note: Dependencies intentionally limited to responsiveLimit and isResponsiveReady.
  // Other state values are omitted to avoid refetching on every state change -
  // this effect only handles viewport-based limit synchronization.
  useEffect(() => {
    if (
      isResponsiveReady &&
      responsiveLimit !== pagination.limit &&
      !isLoading &&
      posts.length > 0
    ) {
      updateSearch(searchQuery, pagination.currentPage, true);
    }
  }, [responsiveLimit, isResponsiveReady]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = () => {
    // Clear any pending timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setHasSearched(true);
    // Trigger search immediately without URL update (URL update happens on server component refresh)
    updateSearch(searchQuery, 1, false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handlePageChange = (page: number) => {
    // Scroll to top immediately before fetching
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateSearch(searchQuery, page, true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setHasSearched(false);
    updateSearch('', 1, true);
  };

  return (
    <>
      {/* Breadcrumb with Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="relative w-full sm:w-auto sm:min-w-[400px] flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Search updates..."
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-11 pl-10 pr-10 bg-background border-2 focus:border-primary transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <Button onClick={handleSearchSubmit} size="lg" className="h-11 px-6">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Search Results Info */}
      {searchQuery && hasSearched && !isLoading && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground bg-card border border-border rounded-md px-3 py-2">
            <p>
              <span className="font-medium text-foreground">
                {pagination.totalCount}
              </span>{' '}
              update{pagination.totalCount !== 1 ? 's' : ''} found for{' '}
              <span className="font-medium text-foreground">
                "{searchQuery}"
              </span>
            </p>
            <button
              onClick={handleClearSearch}
              className="text-xs hover:text-foreground transition-colors flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Updates Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="aspect-[16/9] bg-muted" />
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded mb-3 w-2/3" />
                <div className="h-6 bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded mb-4 w-5/6" />
                <div className="h-10 bg-muted rounded mt-6" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No updates found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or browse all updates.
            </p>
            <Button onClick={handleClearSearch}>
              <X className="mr-2 h-4 w-4" />
              View All Updates
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: UpdatePost, index: number) => (
              <FadeIn key={post._id} delay={index * 0.05} direction="up">
                <Link href={`/updates/${post.slug.current}`} className="group">
                  <Card className="h-full overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                    {/* Image */}
                    <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                      {post.featuredImage ? (
                        <Image
                          src={applySanityImagePreset(
                            post.featuredImage,
                            'card',
                          )}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">
                            No image
                          </span>
                        </div>
                      )}
                      {/* Gradient overlay - always visible for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                      {/* Category at bottom left */}
                      {post.category && (
                        <div className="absolute bottom-4 left-4 right-4 z-10 text-sm font-medium uppercase tracking-wide text-white/90">
                          {post.category}
                        </div>
                      )}
                    </div>

                    <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                      {/* Author & Date */}
                      <div className="flex items-center text-xs text-muted-foreground mb-3">
                        {post.author && (
                          <>
                            <User className="h-3.5 w-3.5 mr-1" />
                            <span>{post.author}</span>
                          </>
                        )}
                        {post.author && post.publishedAt && (
                          <span className="mx-2">•</span>
                        )}
                        {post.publishedAt && (
                          <>
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </>
                        )}
                      </div>

                      <div className="space-y-3 flex-1">
                        {/* Title */}
                        <h3 className="text-lg font-bold mb-3 text-foreground line-clamp-3 group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Read More Button */}
                      <div className="mt-auto pt-6">
                        <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-12">
              <div className="text-sm text-center text-muted-foreground mb-6">
                Showing{' '}
                <span className="font-medium text-foreground">
                  {(pagination.currentPage - 1) * pagination.limit + 1}
                </span>
                -
                <span className="font-medium text-foreground">
                  {Math.min(
                    pagination.currentPage * pagination.limit,
                    pagination.totalCount,
                  )}
                </span>{' '}
                of{' '}
                <span className="font-medium text-foreground">
                  {pagination.totalCount}
                </span>{' '}
                updates
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(
                          Math.max(1, pagination.currentPage - 1),
                        )
                      }
                      className={
                        pagination.currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                      size="default"
                    />
                  </PaginationItem>

                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  ).map(page => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === pagination.totalPages ||
                      (page >= pagination.currentPage - 1 &&
                        page <= pagination.currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={pagination.currentPage === page}
                            className="cursor-pointer"
                            size="default"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === pagination.currentPage - 2 ||
                      page === pagination.currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(
                          Math.min(
                            pagination.totalPages,
                            pagination.currentPage + 1,
                          ),
                        )
                      }
                      className={
                        pagination.currentPage === pagination.totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                      size="default"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </>
  );
}
