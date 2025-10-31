'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { MaskText } from '@/components/animations/MaskText';
import { FadeIn } from '@/components/animations/FadeIn';
import {
  StaggerChildren,
  staggerItem,
} from '@/components/animations/StaggerChildren';
import { ArrowRight, MapPin, Clock3 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/types';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const displayProjects = projects.slice(0, 3);
  const hasProjects = displayProjects.length > 0;

  if (!hasProjects) {
    return (
      <section className="border-b border-border-[0.5px] bg-background py-16 sm:py-20">
        <Container className="px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Featured Deployments
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our project portfolio is being refreshed. Check back soon or
              explore our full project stories.
            </p>
            <Link href="/projects" className="mt-8">
              <Button size="lg">View Projects Archive</Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="border-b border-border-[0.5px] bg-background py-16 sm:py-20">
      <Container className="px-4">
        <div className="mb-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end">
          <FadeIn delay={0.2}>
            <div className="space-y-4">
              <MaskText
                phrases={['Selected Energy Deployments']}
                className="text-3xl font-semibold md:text-4xl lg:text-5xl"
              />
              <MaskText
                phrases={[
                  'Each project is engineered to deliver bankable returns, resilient operations, and measurable socio-economic impact for communities across Nigeria.',
                ]}
                className="max-w-xl text-base md:text-lg text-muted-foreground"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 uppercase tracking-wide">
                <MapPin className="h-4 w-4" /> Nationwide coverage
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 uppercase tracking-wide">
                <Clock3 className="h-4 w-4" /> Active operations
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 uppercase tracking-wide">
                Impact-driven delivery
              </span>
            </div>
          </FadeIn>
        </div>

        <StaggerChildren
          staggerDelay={0.3}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {displayProjects.map(project => {
            const projectImage = project.projectImage
              ? applySanityImagePreset(project.projectImage, 'card')
              : '/images/olooji-community.webp?height=600&width=900';

            return (
              <motion.div key={project._id} variants={staggerItem}>
                <Card className="group h-full overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500 p-0">
                  {/* Project Image */}
                  <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                    <Image
                      src={projectImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                    <div className="absolute bottom-4 left-4 right-4 text-sm font-medium uppercase tracking-wide text-white/70">
                      {project.location || 'Nigeria'}
                    </div>
                  </div>

                  {/* Project Content */}
                  <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                    <div className="space-y-3">
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground line-clamp-4">
                        {project.excerpt ||
                          project.description ||
                          'Project details coming soon.'}
                      </p>
                    </div>

                    <div className="mt-auto pt-6">
                      <Link href={`/projects/${project.slug?.current}`}>
                        <Button
                          variant="outline"
                          className="w-full justify-center gap-2 border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          View project
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </StaggerChildren>

        <FadeIn delay={0.5}>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-muted/30 p-4 sm:p-6 xl:p-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Need a tailored clean energy deployment?
              </h3>
              <p className="text-sm text-muted-foreground">
                Our engineers can scope micro-grid, hybrid, or utility-grade
                systems suited to your load profile and budget.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full">
              <Link href="/contact/quote" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-6">
                  Request a feasibility study
                </Button>
              </Link>
              <Link href="/projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-6"
                >
                  See full project portfolio
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
