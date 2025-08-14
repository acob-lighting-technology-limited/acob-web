'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

import Card from '../ui/stack-cards';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { MaskText } from '../animations/MaskText';
import type { Project } from '@/lib/types';

export function ProjectsSection() {
  // The container ref is still used for the <main> element, but useScroll will now target the window.
  const container = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const fetchedProjects = await response.json();

        // Log all projects and their images
        console.log('Fetched projects:', fetchedProjects);
        console.log(
          'Projects with images:',
          fetchedProjects.map((project: any) => ({
            title: project.title,
            images: project.images,
            imageCount: project.images?.length || 0,
            hasValidImages:
              project.images?.some((img: any) => img?.asset?.url) || false,
          }))
        );

        setProjects(fetchedProjects);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsData();

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up Lenis instance on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  // Use useScroll to track scroll progress of the window (default behavior when target is not specified)
  // This is appropriate when Lenis is managing the global scroll.
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  });

  if (loading) {
    return (
      <section className="py-16 bg-zinc-50 dark:bg-zinc-950 text-center transition-colors duration-700">
        <p>Loading projects...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-zinc-50 dark:bg-zinc-950 text-center transition-colors duration-700">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <main
      ref={container}
      className="relative py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-700"
    >
      <div className="text-center mb-12">
        <MaskText
          phrases={[
            'Latest 3 Rural Electrification Projects,',
            'Mini-Grid Solutions & Energizing Supplies',
          ]}
          className="text-3xl md:text-4xl font-bold text-foreground transition-colors duration-700"
        />
      </div>
      {projects.slice(0, 3).map((project, i) => {
        const targetScale = 1 - (3 - i) * 0.05;

        // Alternating gradient configuration: gray, green, gray, green, etc.
        const gradients = [
          { from: '#616161', to: '#000000' }, // 1st card - Gray
          { from: '#08913F', to: '#003808' }, // 2nd card - Green
          { from: '#616161', to: '#000000' }, // 3rd card - Gray
        ];

        const gradientConfig = gradients[i];

        // Add fallback image if no valid images
        const projectImages =
          project.images?.length > 0
            ? project.images
            : [
                {
                  asset: {
                    url: '/images/olooji-community.jpg?height=800&width=1400',
                  },
                },
              ];

        return (
          <Card
            key={`p_${project._id}`}
            i={i}
            title={project.title}
            description={project.description}
            images={projectImages}
            location={project.location}
            gradientFrom={gradientConfig.from}
            gradientTo={gradientConfig.to}
            url={`/projects/${project.slug.current}`}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
      <div className="text-center mt-8">
        <Link href="/projects">
          <Button className="bg-primary hover:bg-primary/90">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
