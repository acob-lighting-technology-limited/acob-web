import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProjectsPaginated } from '@/sanity/lib/queries';
import Image from '@/components/ui/image';
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import type { Project } from '@/lib/types';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

interface StatePageProps {
  params: Promise<{
    state: string;
  }>;
}

const stateMapping: Record<string, string> = {
  abuja: 'FCT',
  edo: 'Edo',
  delta: 'Delta',
  rivers: 'Rivers',
  kogi: 'Kogi',
  nasarawa: 'Nasarawa',
  jigawa: 'Jigawa',
  kaduna: 'Kaduna',
  kano: 'Kano',
  ogun: 'Ogun',
  enugu: 'Enugu',
  borno: 'Borno',
  ondo: 'Ondo',
};

const stateDisplayMapping: Record<string, string> = {
  abuja: 'Abuja (FCT)',
  edo: 'Edo State',
  delta: 'Delta State',
  rivers: 'Rivers State',
  kogi: 'Kogi State',
  nasarawa: 'Nasarawa State',
  jigawa: 'Jigawa State',
  kaduna: 'Kaduna State',
  kano: 'Kano State',
  ogun: 'Ogun State',
  enugu: 'Enugu State',
  borno: 'Borno State',
  ondo: 'Ondo State',
};

export default async function StateProjectsPage({ params }: StatePageProps) {
  const { state: stateSlug } = await params;
  const sanityStateValue = stateMapping[stateSlug.toLowerCase()];
  const displayName = stateDisplayMapping[stateSlug.toLowerCase()] || stateSlug;

  if (!sanityStateValue) {
    notFound();
  }

  const { projects } = await getProjectsPaginated({
    state: sanityStateValue,
    limit: 100,
  });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: displayName },
  ];

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
        description={`Clean Energy in ${displayName}.`}
        image={
          projectImages.length > 0
            ? projectImages
            : '/images/projects-hero.webp'
        }
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb items={breadcrumbItems} />
          <Link href="/projects">
            <Button variant="outline" size="sm" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              All Projects
            </Button>
          </Link>
        </div>

        {/* Standfirst */}
        <div className="max-w-[62ch]">
          <SectionEyebrow>Regional footprint</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            Our impact and clean energy projects across {displayName}.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="mt-10 border border-dashed border-border p-12 text-center">
            <h3 className="mb-2 text-2xl font-bold tracking-tight">
              No projects found in {displayName}
            </h3>
            <p className="mb-6 text-muted-foreground">
              We are currently updating our database with projects from this
              region. Please check back soon.
            </p>
            <Link href="/projects">
              <Button variant="outline">View All Projects</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {projects.map((project: Project, index: number) => (
              <FadeIn
                key={project._id}
                delay={index * 0.06}
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
                        {project.location}
                        {project.lga ? `, ${project.lga}` : ''}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-4 md:p-5">
                      <h3 className="text-base font-extrabold tracking-tight text-foreground line-clamp-2 md:text-lg">
                        {project.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3 md:text-sm">
                        {project.excerpt ||
                          'Empowering communities through reliable clean energy solutions.'}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary md:text-sm">
                        View details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
