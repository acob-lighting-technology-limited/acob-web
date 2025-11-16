import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProjectsByCategory } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import type { Project } from '@/lib/types';
import { Metadata } from 'next';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Category mapping for display names and descriptions
const categoryInfo: Record<
  string,
  { title: string; description: string; image: string }
> = {
  'rural-electrification': {
    title: 'Rural Electrification',
    description: 'Bringing reliable power to remote communities across Nigeria',
    image: '/images/adebayo-community.webp?height=400&width=1200',
  },
  'commercial-installations': {
    title: 'Commercial Installations',
    description: 'Solar solutions for businesses and commercial establishments',
    image: '/images/airport-road-abuja.webp?height=400&width=1200',
  },
  'street-lighting': {
    title: 'Street Lighting',
    description:
      'Public lighting infrastructure projects for safer communities',
    image:
      '/images/projects/installation-high-density-streetlight-1.webp?height=400&width=1200',
  },
  'healthcare-projects': {
    title: 'Healthcare Projects',
    description:
      'Powering hospitals and healthcare facilities with reliable energy',
    image:
      '/images/projects/keffi-nassarawa-hospital-1.webp?height=400&width=1200',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
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

  const projects = await getProjectsByCategory(category);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: info.title },
  ];

  return (
    <>
      <PageHero
        description={info.title}
        backgroundImage={info.image}
        title={info.title}
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

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
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">
                    {info.title} Projects
                  </h2>
                  <p className="text-muted-foreground">
                    {projects.length} project{projects.length !== 1 ? 's' : ''}{' '}
                    found
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project: Project) => (
                    <Card
                      key={project._id}
                      className="overflow-hidden  hover:shadow-lg transition-shadow flex flex-col"
                    >
                      <div className="aspect-[16/9] overflow-hidden relative flex-shrink-0">
                        {project.projectImage ? (
                          <Image
                            src={applySanityImagePreset(
                              project.projectImage,
                              'card',
                            )}
                            alt={project.title}
                            fill
                            className="hover:scale-105 object-cover transition-transform duration-500"
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
                            {project.excerpt ||
                              'Project details coming soon...'}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground mb-6">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>
                              {project.location}
                              {project.state &&
                                `, ${project.state.toUpperCase() === 'FCT' ? 'FCT' : `${project.state} State.`}`}
                            </span>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <Link href={`/projects/${project.slug.current}`}>
                            <Button variant="default" className="w-full">
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
        </div>
      </Container>
    </>
  );
}
