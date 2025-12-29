import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProjectsByCategory } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import type { Project } from '@/lib/types';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';
import { extractTextFromPortableText } from '@/lib/utils';
import { CategorySearch } from './category-search';
import { FadeIn } from '@/components/animations/FadeIn';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    search?: string;
  }>;
}

// Category mapping for display names and descriptions
const categoryInfo: Record<
  string,
  { title: string; description: string; fallbackImage: string }
> = {
  'rural-electrification': {
    title: 'Rural Electrification',
    description: 'Bringing reliable power to remote communities across Nigeria',
    fallbackImage: '/images/adebayo-community.webp?height=400&width=1200',
  },
  'commercial-installations': {
    title: 'Commercial Installations',
    description: 'Solar solutions for businesses and commercial establishments',
    fallbackImage: '/images/airport-road-abuja.webp?height=400&width=1200',
  },
  'street-lighting': {
    title: 'Street Lighting',
    description:
      'Public lighting infrastructure projects for safer communities',
    fallbackImage:
      '/images/projects/installation-high-density-streetlight-1.webp?height=400&width=1200',
  },
  'healthcare-projects': {
    title: 'Healthcare Projects',
    description:
      'Powering hospitals and healthcare facilities with reliable energy',
    fallbackImage:
      '/images/projects/keffi-nassarawa-hospital-1.webp?height=400&width=1200',
  },
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { search = '' } = await searchParams;
  const info = categoryInfo[slug];

  if (!info) {
    notFound();
  }

  let projects = await getProjectsByCategory(slug);

  // Filter projects by search query
  if (search) {
    const searchLower = search.toLowerCase();
    projects = projects.filter(
      (project: Project) =>
        project.title.toLowerCase().includes(searchLower) ||
        project.location?.toLowerCase().includes(searchLower) ||
        project.state?.toLowerCase().includes(searchLower) ||
        extractTextFromPortableText(project.content || [])
          .toLowerCase()
          .includes(searchLower),
    );
  }

  // Map project images for carousel (like main projects page)
  const projectImages = projects
    .filter((p: Project) => p.projectImage) // Only include projects with images
    .map((p: Project) => ({
      src: p.projectImage!,
      alt: p.title,
      href: `/projects/${p.slug.current}`,
    }));

  // Use carousel if we have images, otherwise use fallback
  const heroImage =
    projectImages.length > 0 ? projectImages : info.fallbackImage;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: info.title },
  ];

  return (
    <>
      <Hero
        description={info.description}
        image={heroImage}
        title={info.title}
      />

      <Container className="px-4 py-8">
        {/* Breadcrumb with Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Breadcrumb items={breadcrumbItems} />
          <CategorySearch initialSearch={search} />
        </div>

        <div>
          {/* Main Content */}
          <div>
            {projects.length === 0 ? (
              <Card className="!border-t-2 !border-t-primary border border-border">
                <CardContent className="p-4 sm:p-6 xl:p-8 text-center">
                  <div className="text-muted-foreground mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      No projects found
                    </h3>
                    <p>No projects available in this category yet.</p>
                  </div>
                  <Link href="/projects">
                    <Button variant="outline">View All Projects</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects.map((project: Project, index: number) => (
                    <FadeIn
                      key={project._id}
                      delay={index * 0.05}
                      direction="up"
                    >
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
                                  'card',
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
                                    {project.state &&
                                      (project.state.toUpperCase() === 'FCT'
                                        ? 'FCT'
                                        : `${project.state} State`)}
                                  </span>
                                </div>
                              )}
                              {project.projectDate && (
                                <div className="flex items-center gap-1">
                                  <span>
                                    {new Date(
                                      project.projectDate,
                                    ).getFullYear()}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-3">
                              {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                              {project.excerpt ||
                                extractTextFromPortableText(
                                  project.content || [],
                                ) ||
                                'Project details coming soon...'}
                            </p>

                            {/* View Project Link */}
                            <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                              View Project
                              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
