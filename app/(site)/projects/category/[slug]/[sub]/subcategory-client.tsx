'use client';

import { useRef, useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Project, PaginationInfo } from '@/lib/types';
import { extractTextFromPortableText } from '@/lib/utils';
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
import { CardSkeleton, QueryError } from '@/components/ui/query-states';
import { CategorySearch } from '../category-search';

const PAGE_LIMIT = 9;

interface SubcategoryClientProps {
  categorySlug: string;
  subSlug: string;
  categoryTitle: string;
  subTitle: string;
  subDescription: string;
  fallbackImage: string;
  initialProjects: Project[];
  initialPagination: PaginationInfo;
  currentSearch: string;
  breadcrumbItems: Array<{ label: string; href?: string }>;
}

function projectLocation(project: Project) {
  const state =
    project.state &&
    (project.state.toUpperCase() === 'FCT' ? 'FCT' : `${project.state} State`);
  if (project.location && state) {
    return `${project.location}, ${state}`;
  }
  return project.location || state || 'Nigeria';
}

export default function SubcategoryClient({
  categorySlug,
  subSlug,
  categoryTitle,
  subTitle,
  subDescription,
  fallbackImage,
  initialProjects,
  initialPagination,
  currentSearch,
  breadcrumbItems,
}: SubcategoryClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [pagination, setPagination] =
    useState<PaginationInfo>(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const heroImages = useMemo(
    () =>
      projects
        .filter(p => p.projectImage)
        .map(p => ({
          src: p.projectImage!,
          alt: p.title,
          href: `/projects/${p.slug.current}`,
        })),
    [projects],
  );

  const fetchPage = useCallback(
    async (page: number) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      setError(null);
      window.scrollTo({ top: 0, behavior: 'instant' });

      const urlParams = new URLSearchParams();
      if (currentSearch.trim()) {
        urlParams.set('search', currentSearch);
      }
      if (page > 1) {
        urlParams.set('page', page.toString());
      }
      const qs = urlParams.toString();
      const basePath = `/projects/category/${categorySlug}/${subSlug}`;
      window.history.replaceState(
        null,
        '',
        qs ? `${basePath}?${qs}` : basePath,
      );

      try {
        const apiParams = new URLSearchParams();
        if (currentSearch.trim()) {
          apiParams.set('search', currentSearch);
        }
        if (page > 1) {
          apiParams.set('page', page.toString());
        }
        apiParams.set('limit', String(PAGE_LIMIT));

        const res = await fetch(
          `/api/projects/category/${categorySlug}/${subSlug}?${apiParams.toString()}`,
          { signal: controller.signal },
        );
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        const result = await res.json();

        setProjects(result.projects);
        setPagination(result.pagination);
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          return;
        }
        setError('Could not load projects.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [categorySlug, subSlug, currentSearch],
  );

  const handlePageChange = (page: number) => {
    fetchPage(page);
  };

  if (error) {
    return (
      <QueryError
        message={error}
        onRetry={() => fetchPage(pagination.currentPage)}
      />
    );
  }

  const heroImage = heroImages.length > 0 ? heroImages : fallbackImage;

  return (
    <>
      <Hero
        description={subTitle}
        image={heroImage}
        title={categoryTitle}
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb items={breadcrumbItems} />
          <CategorySearch initialSearch={currentSearch} />
        </div>

        {/* Standfirst */}
        <div className="max-w-[62ch]">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-primary">
            {categoryTitle} — {subTitle}
          </span>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            {subDescription}
          </p>
        </div>

        {isLoading ? (
          <div className="mt-10">
            <CardSkeleton count={PAGE_LIMIT} />
          </div>
        ) : projects.length === 0 ? (
          <div className="mt-10 border border-dashed border-border p-12 text-center">
            <h3 className="mb-2 text-2xl font-bold tracking-tight">
              No projects found
            </h3>
            <p className="mb-6 text-muted-foreground">
              No projects available in this sub-category yet.
            </p>
            <Link href={`/projects/category/${categorySlug}`}>
              <Button variant="outline">View All {categoryTitle}</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {projects.map((project: Project, index: number) => (
                <FadeIn
                  key={project._id}
                  delay={index * 0.05}
                  direction="up"
                  className="h-full"
                >
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg">
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                        {project.projectImage ? (
                          <Image
                            src={applySanityImagePreset(
                              project.projectImage,
                              'card',
                            )}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/90">
                          <MapPin className="h-3 w-3" />
                          {projectLocation(project)}
                        </span>
                        {project.projectDate && (
                          <span className="absolute right-3 top-3 text-[0.65rem] font-bold tabular-nums text-white/90">
                            {new Date(project.projectDate).getFullYear()}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-4 md:p-5">
                        <h3 className="text-base font-extrabold tracking-tight text-foreground line-clamp-2 md:text-lg">
                          {project.title}
                        </h3>
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3 md:text-sm">
                          {project.excerpt ||
                            extractTextFromPortableText(
                              project.content || [],
                            ) ||
                            'Project details coming soon...'}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary md:text-sm">
                          View project
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>

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
                  projects
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
