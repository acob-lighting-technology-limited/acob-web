'use client';

import { useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Card from '@/components/ui/stack-cards';
import { getProjects } from '@/sanity/lib/client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export function ProjectsSection() {
  // The container ref is still used for the <main> element, but useScroll will now target the window.
  const container = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const fetchedProjects = await getProjects();
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

    function raf(time: any) {
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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground transition-colors duration-700">
          Latest Rural Electrification Projects,
          <br />
          Mini-Grid Solutions & Energizing Supplies
        </h2>
      </div>
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <Card
            key={`p_${project._id}`}
            i={i}
            title={project.title}
            description={project.description}
            images={project.images}
            location={project.location}
            gradientFrom={project.gradientFrom}
            gradientTo={project.gradientTo}
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
