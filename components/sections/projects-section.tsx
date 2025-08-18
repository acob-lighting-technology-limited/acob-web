'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useScroll } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

import Card from '../ui/stack-cards';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { MaskText } from '../animations/MaskText';
import { ProjectsSkeleton } from '../ui/projects-skeleton';
import type { Project } from '@/lib/types';

export function ProjectsSection() {
  // The container ref is still used for the <main> element, but useScroll will now target the window.
  const container = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  // Cache key for projects
  const CACHE_KEY = 'projects-section-data';
  const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes

  // Get cached projects
  const getCachedProjects = useCallback((): Project[] | null => {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const parsed = JSON.parse(cached);
      const isExpired = Date.now() - parsed.timestamp > CACHE_DURATION;

      if (isExpired) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return parsed.data;
    } catch {
      return null;
    }
  }, []);

  // Cache projects
  const cacheProjects = useCallback((data: Project[]) => {
    if (typeof window === 'undefined') return;

    try {
      const cached = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  const fetchProjectsData = useCallback(async () => {
    try {
      // Check cache first
      const cached = getCachedProjects();
      if (cached) {
        setProjects(cached);
        setLoading(false);
        return;
      }

      const response = await fetch('/api/projects', {
        headers: {
          'Cache-Control': 'max-age=300',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`);
      }
      const fetchedProjects = await response.json();
      setProjects(fetchedProjects);

      // Cache the results
      cacheProjects(fetchedProjects);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to load projects. Please try refreshing the page.');
    } finally {
      setLoading(false);
    }
  }, [getCachedProjects, cacheProjects]);

  useEffect(() => {
    fetchProjectsData();
  }, [fetchProjectsData]);

  // Initialize Lenis only once and reuse
  useEffect(() => {
    if (!lenisInstance && typeof window !== 'undefined') {
      try {
        const lenis = new Lenis();

        setLenisInstance(lenis);

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } catch (error) {
        console.error('Failed to initialize Lenis:', error);
      }
    }

    return () => {
      if (lenisInstance) {
        try {
          lenisInstance.destroy();
        } catch (error) {
          console.error('Failed to destroy Lenis:', error);
        }
      }
    };
  }, [lenisInstance]);

  // Use useScroll to track scroll progress of the window (default behavior when target is not specified)
  // This is appropriate when Lenis is managing the global scroll.
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  });

  // Pre-compute gradients to avoid recalculation
  const gradients = useMemo(
    () => [
      { from: '#616161', to: '#000000' }, // 1st card - Gray
      { from: '#08913F', to: '#003808' }, // 2nd card - Green
      { from: '#616161', to: '#000000' }, // 3rd card - Gray
    ],
    []
  );

  // Memoize expensive computations with better optimization
  const processedProjects = useMemo(() => {
    if (!projects.length) return [];

    return projects.slice(0, 3).map((project, i) => {
      const targetScale = 1 - (3 - i) * 0.05;
      const gradientConfig = gradients[i];

      // Add fallback image if no valid images
      const projectImages =
        project.images?.length > 0
          ? project.images
          : [
              {
                asset: {
                  url: '/images/olooji-community-optimized.webp?height=800&width=1400',
                },
              },
            ];

      return {
        ...project,
        targetScale,
        gradientConfig,
        projectImages,
      };
    });
  }, [projects, gradients]);

  if (loading) {
    return <ProjectsSkeleton />;
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
      {processedProjects.map((project, i) => (
        <Card
          key={`p_${project._id}`}
          i={i}
          title={project.title}
          description={project.description}
          images={project.projectImages}
          location={project.location}
          gradientFrom={project.gradientConfig.from}
          gradientTo={project.gradientConfig.to}
          url={`/projects/${project.slug.current}`}
          progress={scrollYProgress}
          range={[i * 0.25, 1]}
          targetScale={project.targetScale}
        />
      ))}
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
