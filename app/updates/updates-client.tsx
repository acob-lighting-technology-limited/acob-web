'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { motion } from 'framer-motion';
import {
  StaggerChildren,
  staggerItem,
} from '@/components/animations/StaggerChildren';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface UpdatesClientProps {
  initialPosts: UpdatePost[];
  initialPagination: PaginationInfo;
  currentSearch: string;
  currentPage: number;
  breadcrumbItems: Array<{ label: string; href?: string }>;
}

export default function UpdatesClient({
  initialPosts,
  initialPagination,
  currentSearch,
  breadcrumbItems,
}: UpdatesClientProps) {
  const router = useRouter();

  const [posts, setPosts] = useState(initialPosts);
  const [pagination, setPagination] = useState(initialPagination);
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [isLoading, setIsLoading] = useState(false);

  // Update URL and fetch new data when search changes
  const updateSearch = async (newSearch: string, newPage: number = 1) => {
    setIsLoading(true);

    const params = new URLSearchParams();
    if (newSearch.trim()) {
      params.set('search', newSearch);
    }
    if (newPage > 1) {
      params.set('page', newPage.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/updates?${queryString}` : '/updates';

    router.push(newUrl);

    try {
      const response = await fetch(`/api/updates?${params.toString()}`);
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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Debounce search
    const timeoutId = setTimeout(() => {
      updateSearch(value, 1);
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handlePageChange = (page: number) => {
    // Scroll to top immediately before fetching
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateSearch(searchQuery, page);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateSearch('', 1);
  };

  return (
    <>
      {/* Breadcrumb with Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="relative w-full sm:w-96">
          <Input
            placeholder="Search updates..."
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
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
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  <span className="font-medium">{pagination.totalCount}</span>{' '}
                  update
                  {pagination.totalCount !== 1 ? 's' : ''} found for{' '}
                  <span className="font-medium">"{searchQuery}"</span>
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
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
          <StaggerChildren
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post: UpdatePost) => (
              <motion.div key={post._id} variants={staggerItem}>
                <Link href={`/updates/${post.slug.current}`} className="group">
                  <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border hover:border-primary/50">
                    {/* Image */}
                    <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                      {post.featuredImage ? (
                        <Image
                          src={applySanityImagePreset(
                            post.featuredImage,
                            'card'
                          )}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">
                            No image
                          </span>
                        </div>
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      {/* Category, Author & Date */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
                        {post.category && (
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded font-medium">
                            {post.category}
                          </span>
                        )}
                        {post.author && (
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            <span>{post.author}</span>
                          </div>
                        )}
                        {post.publishedAt && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Read More Link */}
                      <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </StaggerChildren>

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
                    pagination.totalCount
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
                          Math.max(1, pagination.currentPage - 1)
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
                    (_, i) => i + 1
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
                            pagination.currentPage + 1
                          )
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
