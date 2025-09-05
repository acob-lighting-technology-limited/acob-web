'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { MapPin, ArrowRight, Search, X, Filter } from 'lucide-react';
import Link from 'next/link';
import type { Project, PaginationInfo } from '@/lib/types';
import { extractTextFromPortableText } from '@/lib/utils';
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
  allProjects: Project[];
  uniqueStates: string[];
  currentSearch: string;
  currentState: string;
  currentPage: number;
}

export default function ProjectsClient({
  initialProjects,
  initialPagination,
  allProjects,
  uniqueStates,
  currentSearch,
  currentState,
  currentPage,
}: ProjectsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [projects, setProjects] = useState(initialProjects);
  const [pagination, setPagination] = useState(initialPagination);
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [selectedState, setSelectedState] = useState(currentState);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update URL and fetch new data when filters change
  const updateFilters = async (newSearch: string, newState: string, newPage: number = 1) => {
    setIsLoading(true);
    
    const params = new URLSearchParams();
    if (newSearch.trim()) params.set('search', newSearch);
    if (newState.trim()) params.set('state', newState);
    if (newPage > 1) params.set('page', newPage.toString());
    
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
      updateFilters(value, selectedState, 1);
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleStateChange = (state: string) => {
    const newState = selectedState === state ? '' : state;
    setSelectedState(newState);
    updateFilters(searchQuery, newState, 1);
  };

  const handlePageChange = (page: number) => {
    updateFilters(searchQuery, selectedState, page);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedState('');
    updateFilters('', '', 1);
  };

  const activeFiltersCount = (searchQuery ? 1 : 0) + (selectedState ? 1 : 0);

  // Mobile Filter components
  const MobileFilterContent = () => (
    <div className="space-y-6">
      {/* States */}
      <div>
        <h3 className="font-semibold mb-4">Filter by State</h3>
        <div className="space-y-2">
          {uniqueStates.map((state: string) => (
            <button
              key={state}
              onClick={() => handleStateChange(state)}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-sm font-medium border border-border ${
                selectedState === state
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/30 hover:bg-muted/50 text-foreground'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{state}</span>
                <span className="text-xs opacity-70">
                  (
                  {
                    allProjects.filter(p => {
                      if (!p.location) {return false;}
                      const projectState = extractStateFromLocation(p.location);
                      return projectState === state;
                    }).length
                  }
                  )
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Get unique states for filtering - extract state names from location strings.
  const extractStateFromLocation = (location: string): string => {
    // Special handling for Abuja/FCT
    if (
      location.toLowerCase().includes('abuja') ||
      location.toLowerCase().includes('fct')
    ) {
      return 'Abuja';
    }

    // Special handling for Northern Region
    if (location.toLowerCase().includes('northern region')) {
      return 'Northern Region';
    }

    // Common patterns to extract state names
    const statePatterns = [
      /,\s*([^,]+)\s*State/i, // "City, State State"
      /,\s*([^,]+)\s*State\./i, // "City, State State."
      /,\s*([^,]+)\s*State$/i, // "City, State State" (end of string)
      /,\s*([^,]+)$/i, // "City, State" (end of string)
      /,\s*([^,]+)\.$/i, // "City, State." (end of string)
    ];

    for (const pattern of statePatterns) {
      const match = location.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    // If no pattern matches, return the original location
    return location;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Mobile Search & Filter - Combined */}
        <div className="lg:hidden mb-2">
          <Card className="!border-t-2 !border-t-primary border border-border !py-0">
            <CardContent className="p-0">
              {/* Search and Filter Header */}
              <div className="flex items-center gap-2 p-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Input
                    placeholder="Search projects..."
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
                  <MobileFilterContent />
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
            {(searchQuery || selectedState) && (
              <Card className="!border-t-2 !border-t-primary border border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {pagination.totalCount} project(s) found
                      {searchQuery && ` for "${searchQuery}"`}
                      {selectedState && ` in "${selectedState}"`}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearSearch}
                      className="text-xs"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Results count for mobile - always visible */}
          <div className="lg:hidden">
            <p className="text-sm text-muted-foreground text-right">
              {pagination.totalCount} projects
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden p-0 animate-pulse">
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
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">
                  No projects found
                </h3>
                <p>
                  Try adjusting your search terms or browse all projects.
                </p>
              </div>
              <Button variant="outline" onClick={handleClearSearch}>
                View All Projects
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project: Project) => (
                <Card
                  key={project._id}
                  className="overflow-hidden p-0 hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="aspect-[16/9] overflow-hidden relative flex-shrink-0">
                    {project.images &&
                    project.images.length > 0 &&
                    project.images[0]?.asset?.url ? (
                      <Image
                        src={`${project.images[0].asset.url}?w=800&h=450&fit=crop&auto=format&q=75`}
                        alt={project.title}
                        fill
                        className="hover:scale-105 object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">
                          No image available
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="!pt-0 p-6 flex flex-col flex-1">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-4 text-foreground">
                        {project.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                        {project.excerpt || extractTextFromPortableText(project.content)}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mb-6">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Link href={`/projects/${project.slug.current}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          View Project
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
              <div className="mt-8">
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
        )}
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <div className="sticky top-20 self-start">
          <div className="space-y-6">
            {/* Search */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Search Projects</h3>
                <div className="relative">
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={e => handleSearchChange(e.target.value)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* States */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Filter by State</h3>
                <div className="space-y-2">
                  {uniqueStates.map((state: string) => (
                    <button
                      key={state}
                      onClick={() => handleStateChange(state)}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-sm font-medium border border-border ${
                        selectedState === state
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/30 hover:bg-muted/50 text-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{state}</span>
                        <span className="text-xs opacity-70">
                          (
                          {
                            allProjects.filter(p => {
                              if (!p.location) {return false;}
                              const projectState = extractStateFromLocation(p.location);
                              return projectState === state;
                            }).length
                          }
                          )
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Projects */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Recent Projects</h3>
                <div className="space-y-2">
                  {allProjects.slice(0, 5).map((project: Project) => (
                    <Link
                      key={project._id}
                      href={`/projects/${project.slug.current}`}
                      className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 border border-border group"
                    >
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary mb-1">
                        {project.title}
                      </h4>
                      {project.location && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{project.location}</span>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <Link
                    href="/projects"
                    className="text-sm text-primary hover:text-primary/80 flex items-center font-medium"
                  >
                    View All Projects
                    <ArrowRight className="ml-1 h-3 w-3" />
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
