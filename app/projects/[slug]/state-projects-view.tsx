import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import type { Project } from '@/lib/types';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';
import { FadeIn } from '@/components/animations/FadeIn';

interface StateProjectsViewProps {
  projects: Project[];
  displayName: string;
}

export function StateProjectsView({
  projects,
  displayName,
}: StateProjectsViewProps) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: displayName },
  ];

  // Map project images for carousel
  const projectImages = projects
    .filter((p: Project) => p.projectImage)
    .map((p: Project) => ({
      src: p.projectImage!,
      alt: p.title,
      href: `/projects/${p.slug.current}`,
    }));

  return (
    <>
      <Hero
        title={displayName}
        description={`Our impact and clean energy projects across ${displayName}`}
        image={
          projectImages.length > 0
            ? projectImages
            : '/images/projects-hero.webp'
        }
      />

      <Container className="px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Breadcrumb items={breadcrumbItems} />
          <Link href="/projects">
            <Button variant="outline" size="sm" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              All Projects
            </Button>
          </Link>
        </div>

        {projects.length === 0 ? (
          <Card className="!border-t-2 !border-t-primary border border-border">
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  No projects found in {displayName}
                </h3>
                <p>
                  We are currently updating our database with projects from this
                  region. Please check back soon.
                </p>
              </div>
              <Link href="/projects">
                <Button variant="outline">View All Projects</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Project, index: number) => (
              <FadeIn key={project._id} delay={index * 0.1} direction="up">
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="group h-full block"
                >
                  <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border hover:border-primary/50">
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
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        <span>
                          {project.location}, {project.lga}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                        {project.excerpt ||
                          'Empowering communities through reliable clean energy solutions.'}
                      </p>

                      <div className="flex items-center text-sm font-semibold text-primary">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
