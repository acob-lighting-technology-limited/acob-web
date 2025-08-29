'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { MapPin, ArrowRight, Search, X } from 'lucide-react';
import Link from 'next/link';
// Remove direct Sanity import - use API route instead
import type { Project } from '@/lib/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const fetchedProjects = await response.json();
        setProjects(fetchedProjects);
        setFilteredProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        project =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (project.location &&
            project.location.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }

    // Filter by state
    if (selectedState) {
      filtered = filtered.filter(project => {
        if (!project.location) {return false;}
        const projectState = extractStateFromLocation(project.location);
        return projectState.toLowerCase().includes(selectedState.toLowerCase());
      });
    }

    setFilteredProjects(filtered);
  }, [searchQuery, selectedState, projects]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedState(null);
  };

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

  const uniqueStates = Array.from(
    new Set(
      projects
        .map(p => p.location)
        .filter(Boolean)
        .map(extractStateFromLocation),
    ),
  ).sort();

  if (isLoading) {
    return (
      <>
        <PageHero
          title="Our Projects"
          backgroundImage="/images/services/header.jpg?height=400&width=1200"
        />
        <Container className="px-4 py-8">
          <div className="text-center">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mx-auto max-w-md mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="h-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                  />
                ))}
              </div>
              <div className="space-y-6">
                {[1, 2].map(i => (
                  <div
                    key={i}
                    className="h-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Projects' }];

  return (
    <>
      <PageHero
        title="Our Projects"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search Results Info */}
            {(searchQuery || selectedState) && (
              <Card className="!border-t-2 !border-t-primary border border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {filteredProjects.length} project(s) found
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
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {filteredProjects.length === 0 ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project: Project) => (
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
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold mb-4 text-foreground">
                          {project.title}
                        </h2>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {project.description}
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
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Search */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Search Projects</h3>
                <div className="relative">
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
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
                      onClick={() =>
                        setSelectedState(selectedState === state ? null : state)
                      }
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
                            projects.filter(p => {
                              if (!p.location) {return false;}
                              const projectState = extractStateFromLocation(
                                p.location,
                              );
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
                  {projects.slice(0, 5).map((project: Project) => (
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
      </Container>
    </>
  );
}
