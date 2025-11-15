'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import Image from 'next/image';
import { MapPin, ArrowRight, Search, X } from 'lucide-react';
import Link from 'next/link';
import type { Project, PaginationInfo } from '@/lib/types';
import { extractTextFromPortableText } from '@/lib/utils';
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

interface ProjectsClientProps {
  initialProjects: Project[];
  initialPagination: PaginationInfo;
  currentSearch: string;
  breadcrumbItems: Array<{ label: string; href?: string }>;
}

export default function ProjectsClient({
  initialProjects,
  initialPagination,
  currentSearch,
  breadcrumbItems,
}: ProjectsClientProps) {
  const router = useRouter();

  const [projects, setProjects] = useState(initialProjects);
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
    const newUrl = queryString ? `/projects?${queryString}` : '/projects';

    router.push(newUrl);

    try {
      const response = await fetch(`/api/projects?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const result = await response.json();
      setProjects(result.projects);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Error fetching projects:', error);
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
            placeholder="Search projects..."
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
                  project
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

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="aspect-[16/9] bg-muted" />
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded mb-6" />
                <div className="h-10 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="!border-t-2 !border-t-primary border border-border">
          <CardContent className="p-4 sm:p-6 xl:p-8 text-center">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p>Try adjusting your search terms or browse all projects.</p>
            </div>
            <Button variant="outline" onClick={handleClearSearch}>
              View All Projects
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* First card - visible immediately on mobile */}
            {projects.length > 0 && (
              <div className="block md:hidden">
                <Link
                  href={`/projects/${projects[0].slug.current}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border hover:border-primary/50">
                    {/* Image */}
                    <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                      {projects[0].projectImage ? (
                        <Image
                          src={applySanityImagePreset(
                            projects[0].projectImage,
                            'card'
                          )}
                          alt={projects[0].title}
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
                      {/* Location & Date */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 flex-wrap">
                        {(projects[0].location || projects[0].state) && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                            <span>
                              {projects[0].location}
                              {projects[0].location &&
                                projects[0].state &&
                                ', '}
                              {projects[0].state}
                            </span>
                          </div>
                        )}
                        {projects[0].projectDate && (
                          <div className="flex items-center gap-1">
                            <span>
                              {new Date(projects[0].projectDate).getFullYear()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {projects[0].title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                        {projects[0].excerpt ||
                          extractTextFromPortableText(projects[0].content)}
                      </p>

                      {/* View Project Link */}
                      <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                        View Project
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            )}

            {/* All cards on desktop with animation */}
            <StaggerChildren
              staggerDelay={0.1}
              className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 col-span-full"
            >
              {projects.map((project: Project) => (
                <motion.div key={project._id} variants={staggerItem}>
                  <Link
                    href={`/projects/${project.slug.current}`}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border hover:border-primary/50">
                      {/* Image */}
                      <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                        {project.projectImage ? (
                          <Image
                            src={applySanityImagePreset(
                              project.projectImage,
                              'card'
                            )}
                            alt={project.title}
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
                        {/* Location & Date */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 flex-wrap">
                          {(project.location || project.state) && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-primary" />
                              <span>
                                {project.location}
                                {project.location && project.state && ', '}
                                {project.state}
                              </span>
                            </div>
                          )}
                          {project.projectDate && (
                            <div className="flex items-center gap-1">
                              <span>
                                {new Date(project.projectDate).getFullYear()}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                          {project.excerpt ||
                            extractTextFromPortableText(project.content)}
                        </p>

                        {/* View Project Link */}
                        <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                          View Project
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </StaggerChildren>

            {/* Rest of the cards on mobile (without first card) */}
            {projects.length > 1 && (
              <StaggerChildren
                staggerDelay={0.1}
                className="block md:hidden grid grid-cols-1 gap-6"
              >
                {projects.slice(1).map((project: Project) => (
                  <motion.div key={project._id} variants={staggerItem}>
                    <Link
                      href={`/projects/${project.slug.current}`}
                      className="group"
                    >
                      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border hover:border-primary/50">
                        {/* Image */}
                        <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                          {project.projectImage ? (
                            <Image
                              src={applySanityImagePreset(
                                project.projectImage,
                                'card'
                              )}
                              alt={project.title}
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
                          {/* Location & Date */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 flex-wrap">
                            {(project.location || project.state) && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-primary" />
                                <span>
                                  {project.location}
                                  {project.location && project.state && ', '}
                                  {project.state}
                                </span>
                              </div>
                            )}
                            {project.projectDate && (
                              <div className="flex items-center gap-1">
                                <span>
                                  {new Date(project.projectDate).getFullYear()}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                            {project.excerpt ||
                              extractTextFromPortableText(project.content)}
                          </p>

                          {/* View Project Link */}
                          <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                            View Project
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </StaggerChildren>
            )}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8">
              <div className="text-sm text-muted-foreground text-center mb-4">
                Showing {(pagination.currentPage - 1) * pagination.limit + 1}-
                {Math.min(
                  pagination.currentPage * pagination.limit,
                  pagination.totalCount
                )}{' '}
                of {pagination.totalCount} projects
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
