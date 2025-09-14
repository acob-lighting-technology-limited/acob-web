import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProjectsByCategory, getProjects } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import type { Project } from '@/lib/types';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Category mapping for display names and descriptions
const categoryInfo: Record<string, { title: string; description: string; image: string }> = {
  'rural-electrification': {
    title: 'Rural Electrification',
    description: 'Bringing reliable power to remote communities across Nigeria',
    image: '/images/projects/rural-electrification.jpg?height=400&width=1200'
  },
  'commercial-installations': {
    title: 'Commercial Installations',
    description: 'Solar solutions for businesses and commercial establishments',
    image: '/images/projects/commercial-installations.jpg?height=400&width=1200'
  },
  'street-lighting': {
    title: 'Street Lighting',
    description: 'Public lighting infrastructure projects for safer communities',
    image: '/images/projects/street-lighting.jpg?height=400&width=1200'
  },
  'healthcare-projects': {
    title: 'Healthcare Projects',
    description: 'Powering hospitals and healthcare facilities with reliable energy',
    image: '/images/projects/healthcare-projects.jpg?height=400&width=1200'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const info = categoryInfo[category];
  
  if (!info) {
    return {
      title: 'Category Not Found - ACOB Lighting Technology Limited',
      description: 'The requested project category could not be found.',
    };
  }

  return {
    title: `${info.title} Projects - ACOB Lighting Technology Limited`,
    description: `Explore ${info.title.toLowerCase()} projects by ACOB Lighting Technology Limited. ${info.description}`,
    keywords: `${info.title}, solar energy projects, renewable energy, ACOB Lighting, Nigeria solar projects`,
    openGraph: {
      title: `${info.title} Projects - ACOB Lighting Technology Limited`,
      description: info.description,
      type: 'website',
      url: `https://acoblighting.com/projects/category/${category}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${info.title} Projects - ACOB Lighting Technology Limited`,
      description: info.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const info = categoryInfo[category];
  
  if (!info) {
    notFound();
  }

  const [projects, allProjects] = await Promise.all([
    getProjectsByCategory(category),
    getProjects()
  ]);

  // Get unique states for filtering
  const extractStateFromLocation = (location: string): string => {
    if (
      location.toLowerCase().includes('abuja') ||
      location.toLowerCase().includes('fct')
    ) {
      return 'Abuja';
    }

    if (location.toLowerCase().includes('northern region')) {
      return 'Northern Region';
    }

    const statePatterns = [
      /,\s*([^,]+)\s*State/i,
      /,\s*([^,]+)\s*State\./i,
      /,\s*([^,]+)\s*State$/i,
      /,\s*([^,]+)$/i,
      /,\s*([^,]+)\.$/i,
    ];

    for (const pattern of statePatterns) {
      const match = location.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return location;
  };

  const uniqueStates = Array.from(
    new Set(
      allProjects
        .map((p: Project) => p.location)
        .filter(Boolean)
        .map(extractStateFromLocation),
    ),
  ).sort() as string[];
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: info.title },
  ];

  return (
    <>
      <PageHero
        title={info.title}
        backgroundImage={info.image}
      >
        <p className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed">
          {info.description}
        </p>
      </PageHero>

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {projects.length === 0 ? (
              <Card className="!border-t-2 !border-t-primary border border-border">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground mb-4">
                    <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                    <p>No projects available in this category yet.</p>
                  </div>
                  <Link href="/projects">
                    <Button variant="outline">
                      View All Projects
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">{info.title} Projects</h2>
                  <p className="text-muted-foreground">
                    {projects.length} project{projects.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project: Project) => (
                    <Card
                      key={project._id}
                      className="overflow-hidden p-0 hover:shadow-lg transition-shadow flex flex-col"
                    >
                      <div className="aspect-[16/9] overflow-hidden relative flex-shrink-0">
                        {project.projectImage ? (
                          <Image
                            src={project.projectImage}
                            alt={project.title}
                            fill
                            className="hover:scale-105 object-cover transition-transform duration-300"
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
                          <h3 className="text-xl font-bold mb-4 text-foreground">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                            {project.excerpt || 'Project details coming soon...'}
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
                        <Link
                          key={state}
                          href={`/projects?state=${encodeURIComponent(state)}`}
                          className="block w-full text-left p-3 rounded-lg transition-colors duration-200 text-sm font-medium border border-border bg-muted/30 hover:bg-muted/50 text-foreground"
                        >
                          <div className="flex items-center justify-between">
                            <span>{state}</span>
                            <span className="text-xs opacity-70">
                              (
                              {
                                allProjects.filter((p: Project) => {
                                  if (!p.location) {return false;}
                                  const projectState = extractStateFromLocation(p.location);
                                  return projectState === state;
                                }).length
                              }
                              )
                            </span>
                          </div>
                        </Link>
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
      </Container>
    </>
  );
}
