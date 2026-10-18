'use client';

import { useRef, useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { ArrowRight, Search, X, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import type { UpdatePost, PaginationInfo } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { CardSkeleton, QueryError } from '@/components/ui/query-states';

const PAGE_LIMIT = 9;

interface UpdatesClientProps {
  initialPosts: UpdatePost[];
  initialPagination: PaginationInfo;
  currentSearch: string;
  currentCategory: string;
  breadcrumbItems: Array<{ label: string; href?: string }>;
}

// Same order as the Updates & Media nav menu.
const UPDATE_CATEGORY_LABELS: Record<string, string> = {
  announcements: 'Announcements',
  'case-studies': 'Case Studies',
  'press-releases': 'Press Releases',
  events: 'Events',
  celebrations: 'Celebrations',
};

function categoryLabel(slug: string) {
  return (
    UPDATE_CATEGORY_LABELS[slug] ||
    slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
}

export default function UpdatesClient({
  initialPosts,
  initialPagination,
  currentSearch,
  currentCategory,
  breadcrumbItems,
}: UpdatesClientProps) {
  const [posts, setPosts] = useState<UpdatePost[]>(initialPosts);
  const [pagination, setPagination] =
    useState<PaginationInfo>(initialPagination);
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [category, setCategory] = useState(currentCategory);
  const [hasSearched, setHasSearched] = useState(!!currentSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const gridTopRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // From the first load only, so filtering doesn't swap the hero slides.
  const heroImages = useMemo(
    () =>
      initialPosts
        .filter(p => p.featuredImage)
        .map(p => ({
          src: p.featuredImage!,
          alt: p.title,
          href: `/updates/${p.slug.current}`,
        })),
    [initialPosts],
  );

  const fetchPage = useCallback(
    async (search: string, page: number, categorySlug: string) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      setError(null);
      // Keep the filters in view rather than jumping back above the hero.
      gridTopRef.current?.scrollIntoView({
        block: 'start',
        behavior: 'instant',
      });

      const urlParams = new URLSearchParams();
      if (search.trim()) {
        urlParams.set('search', search);
      }
      if (categorySlug) {
        urlParams.set('category', categorySlug);
      }
      if (page > 1) {
        urlParams.set('page', page.toString());
      }
      const qs = urlParams.toString();
      window.history.replaceState(null, '', qs ? `/updates?${qs}` : '/updates');

      try {
        const apiParams = new URLSearchParams();
        if (search.trim()) {
          apiParams.set('search', search);
        }
        if (categorySlug) {
          apiParams.set('category', categorySlug);
        }
        if (page > 1) {
          apiParams.set('page', page.toString());
        }
        apiParams.set('limit', String(PAGE_LIMIT));

        const res = await fetch(`/api/updates?${apiParams.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error('Failed to fetch updates');
        }
        const result = await res.json();

        setPosts(result.posts);
        setPagination(result.pagination);
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          return;
        }
        setError('Could not load updates.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  const handleSearchSubmit = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setHasSearched(true);
    fetchPage(searchQuery, 1, category);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handlePageChange = (page: number) => {
    fetchPage(searchQuery, page, category);
  };

  const handleCategoryChange = (slug: string) => {
    if (slug === category) {
      return;
    }
    setCategory(slug);
    fetchPage(searchQuery, 1, slug);
  };

  const handleShowAll = () => {
    setSearchQuery('');
    setHasSearched(false);
    setCategory('');
    fetchPage('', 1, '');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setHasSearched(false);
    fetchPage('', 1, category);
  };

  if (error) {
    return (
      <QueryError
        message={error}
        onRetry={() => fetchPage(searchQuery, pagination.currentPage, category)}
      />
    );
  }

  return (
    <>
      <Hero
        image={heroImages}
        title="Updates & News"
        description="The ACOB Wire."
        titleSize="display"
      />

      <Container className="px-4 py-8">
        {/* Breadcrumb + Search */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb items={breadcrumbItems} />
          <div className="relative flex w-full gap-2 sm:w-auto sm:min-w-[400px]">
            <div className="relative flex-1">
              <Input
                placeholder="Search updates..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-11 border-2 bg-background pl-10 pr-10 transition-all duration-300 focus:border-primary"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-muted"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <Button
              onClick={handleSearchSubmit}
              size="lg"
              className="h-11 px-6"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        {/* Standfirst */}
        <div className="max-w-[62ch]">
          <SectionEyebrow>News &amp; Announcements</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            Project milestones, press releases, and stories from the field —
            straight from the ACOB team.
          </p>
        </div>

        {/* Category filters — refilter the grid in place */}
        <div
          ref={gridTopRef}
          role="group"
          aria-label="Filter updates by category"
          className="-mx-4 mt-8 flex scroll-mt-24 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]"
        >
          {[
            ['', 'All updates'] as const,
            ...Object.entries(UPDATE_CATEGORY_LABELS),
          ].map(([slug, label]) => {
            const active = category === slug;
            return (
              <button
                key={slug || 'all'}
                type="button"
                aria-pressed={active}
                onClick={() => handleCategoryChange(slug)}
                className={
                  active
                    ? 'shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground'
                    : 'shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search result count */}
        {searchQuery && hasSearched && !isLoading && (
          <div className="mt-8 flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">
                {pagination.totalCount}
              </span>{' '}
              update{pagination.totalCount !== 1 ? 's' : ''} found for{' '}
              <span className="font-semibold text-foreground">
                &ldquo;{searchQuery}&rdquo;
              </span>
            </p>
            <button
              onClick={handleClearSearch}
              className="flex items-center gap-1 text-xs font-semibold transition-colors hover:text-primary"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="mt-10">
            <CardSkeleton count={PAGE_LIMIT} />
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 text-2xl font-bold tracking-tight">
              No updates found
            </h3>
            <p className="mb-6 text-muted-foreground">
              Try adjusting your search or filter, or browse all updates.
            </p>
            <Button onClick={handleShowAll}>
              <X className="mr-2 h-4 w-4" />
              View All Updates
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {posts.map((post: UpdatePost, index: number) => (
                <FadeIn
                  key={post._id}
                  delay={index * 0.05}
                  direction="up"
                  className="h-full"
                >
                  <Link
                    href={`/updates/${post.slug.current}`}
                    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg">
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                        {post.featuredImage ? (
                          <Image
                            src={applySanityImagePreset(
                              post.featuredImage,
                              'card',
                            )}
                            alt={post.title}
                            fill
                            // Flyers carry their headline at the top.
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <span className="text-sm text-muted-foreground">
                              No image
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {post.category && (
                          <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                            {categoryLabel(post.category)}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-4 md:p-5">
                        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] text-muted-foreground">
                          {post.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.publishedAt)}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-extrabold tracking-tight text-foreground line-clamp-2 md:text-lg">
                          {post.title}
                        </h3>
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3 md:text-sm">
                          {post.excerpt}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary md:text-sm">
                          Read more
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12">
                <div className="mb-6 text-center text-sm text-muted-foreground">
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
                        disabled={pagination.currentPage === 1}
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
                        disabled={
                          pagination.currentPage === pagination.totalPages
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
      </Container>
    </>
  );
}
