'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { UpdatePost, PaginationInfo } from '@/lib/types';
import { formatDate } from '@/lib/utils';
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
}

export default function UpdatesClient({
  initialPosts,
  initialPagination,
  currentSearch,
  currentPage,
}: UpdatesClientProps) {
  const router = useRouter();
  
  const [posts, setPosts] = useState(initialPosts);
  const [pagination, setPagination] = useState(initialPagination);
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update URL and fetch new data when filters change
  const updateFilters = async (newSearch: string, newPage: number = 1) => {
    setIsLoading(true);
    
    const params = new URLSearchParams();
    if (newSearch.trim()) params.set('search', newSearch);
    if (newPage > 1) params.set('page', newPage.toString());
    
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
      updateFilters(value, 1);
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handlePageChange = (page: number) => {
    updateFilters(searchQuery, page);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    updateFilters('', 1);
  };

  const activeFiltersCount = searchQuery ? 1 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* Mobile Search & Filter - Combined */}
        <div className="lg:hidden mb-2">
          <Card className="!border-t-2 !border-t-primary border border-border !py-0">
            <CardContent className="p-0">
              {/* Search and Filter Header */}
              <div className="flex items-center gap-2 p-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Input
                    placeholder="Search updates..."
                    value={searchQuery}
                    onChange={e => handleSearchChange(e.target.value)}
                    className="pr-10 h-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>

                {/* Filter Toggle Button */}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="flex items-center gap-2 px-3 py-2 h-10 bg-muted/30 hover:bg-muted/50 border border-border rounded-lg transition-colors duration-200"
                >
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filter</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs font-medium min-w-[18px] text-center">
                      {activeFiltersCount}
                    </span>
                  )}
                  <div className={`transition-transform duration-200 ${showMobileFilters ? 'rotate-180' : ''}`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Expandable Filter Content */}
              {showMobileFilters && (
                <div className="border-t border-border p-4 animate-in slide-in-from-top-5 duration-300">
                  {/* Clear button for mobile */}
                  <div className="mt-6 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={handleClearSearch}
                      className="w-full"
                      disabled={activeFiltersCount === 0}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Search Results Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            {searchQuery && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {pagination.totalCount} result
                  {pagination.totalCount !== 1 ? 's' : ''} found for "
                  {searchQuery}"
                </p>
              </div>
            )}
          </div>
          
          {/* Results count for mobile - always visible */}
          <div className="lg:hidden">
            <p className="text-sm text-muted-foreground text-right">
              {pagination.totalCount} updates
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden p-0 animate-pulse">
                <div className="aspect-[16/9] bg-muted" />
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-4" />
                  <div className="h-6 bg-muted rounded mb-4" />
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded mb-6" />
                  <div className="h-10 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post: UpdatePost) => (
                <Card
                  key={post._id}
                  className="overflow-hidden p-0 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="aspect-[16/9] overflow-hidden flex-shrink-0">
                    <Image
                      src={post.featuredImage || '/placeholder.svg'}
                      alt={post.title}
                      width={1200}
                      height={675}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="!pt-0 p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-4 text-foreground line-clamp-2 h-[50px]">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-[3]">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Link 
                        href={`/updates/${post.slug?.current || '#'}`}
                        aria-label={`Read more about ${post.title}`}
                      >
                        <Button className="w-full">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12">
                <div className="text-sm text-muted-foreground text-center mb-4">
                  Showing {((pagination.currentPage - 1) * pagination.limit) + 1}-{Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} of {pagination.totalCount} posts
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, pagination.currentPage - 1))}
                        className={pagination.currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        size="default"
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      if (
                        page === 1 ||
                        page === pagination.totalPages ||
                        (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1)
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
                        onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                        className={pagination.currentPage === pagination.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        size="default"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or browse all updates.
            </p>
            <Button variant="outline" onClick={handleClearSearch}>
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <div className="sticky top-20 self-start">
          <div className="space-y-6">
            {/* Search */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Search Updates</h3>
                <div className="relative">
                  <Input
                    placeholder="Search updates..."
                    className="pr-10"
                    value={searchQuery}
                    onChange={e => handleSearchChange(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Browse Categories</h3>
                <div className="space-y-2">
                  <Link
                    href="/updates/case-studies"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="/updates/press"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Press Releases
                  </Link>
                  <Link
                    href="/updates/latest"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Latest Updates
                  </Link>
                  <Link
                    href="/updates/gallery"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Gallery
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
