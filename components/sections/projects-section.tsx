'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MaskWords } from '@/components/animations/MaskWords';
import type { Project } from '@/lib/types';
import { addSanityImageParams } from '@/lib/utils/sanity-image';
import { cn } from '@/lib/utils';

interface ProjectsSectionProps {
  projects: Project[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll "dwell" at each end of the pinned strip (fractions of the section's
 * scroll): the intro holds before the strip moves, and the last project holds
 * centred before the section unpins, so nothing arrives or leaves abruptly.
 */
const HOLD_START = 0.12;
const HOLD_END = 0.14;
const MAX_PROJECTS = 6;

function projectLocation(project: Project) {
  const state =
    project.state &&
    (project.state.toUpperCase() === 'FCT' ? 'FCT' : `${project.state} State`);
  if (project.location && state) {
    return `${project.location}, ${state}`;
  }
  return project.location || state || 'Nigeria';
}

function projectImage(project: Project) {
  return project.projectImage
    ? addSanityImageParams(project.projectImage, {
        w: 1400,
        fit: 'max',
        auto: 'format',
        q: 80,
      })
    : '/images/olooji-community.webp';
}

/**
 * One project frame. The unclipped <figure> is what's observed for the reveal:
 * a clip-path on the observed element itself makes IntersectionObserver report
 * a ratio of 0, so the wipe would never trigger. The clipped layers follow
 * through variants instead.
 */
function ProjectFrame({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  return (
    <motion.figure
      className={cn('group relative shrink-0', className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <Link
        href={`/projects/${project.slug?.current}`}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
      >
        <motion.div
          className="relative h-full w-full overflow-hidden rounded-2xl bg-muted"
          variants={{
            hidden: { clipPath: 'inset(0 0 0 100%)' },
            show: {
              clipPath: 'inset(0 0 0 0%)',
              transition: { duration: 1.2, ease: EASE },
            },
          }}
        >
          <motion.div
            className="absolute inset-0"
            variants={{
              hidden: { scale: 1.25 },
              show: { scale: 1, transition: { duration: 1.8, ease: EASE } },
            }}
          >
            <Image
              src={projectImage(project)}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 55vw, 85vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
              quality={80}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: EASE, delay: 0.5 },
                },
              }}
            >
              <p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/75">
                <span className="text-primary-foreground/90 rounded-sm bg-primary px-1.5 py-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                <span className="line-clamp-1">{projectLocation(project)}</span>
              </p>
              <p className="mt-3 max-w-md text-xl font-extrabold leading-tight tracking-tight line-clamp-2 sm:text-2xl">
                {project.title}
              </p>
              {project.excerpt && (
                <p className="mt-2 max-w-md text-sm text-white/75 line-clamp-2">
                  {project.excerpt}
                </p>
              )}
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white">
                View project
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary">
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </span>
            </motion.div>
          </figcaption>
        </motion.div>
      </Link>
    </motion.figure>
  );
}

function Intro() {
  const item = {
    hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: EASE },
    },
  };
  return (
    <motion.div
      className="flex w-[min(80vw,30rem)] shrink-0 flex-col justify-center pr-6 md:mr-[5vw]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
      }}
    >
      <motion.span
        variants={item}
        className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary"
      >
        Our portfolio
      </motion.span>
      <MaskWords
        as="h2"
        text="Selected Energy Deployments."
        className="mt-2 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-5xl"
      />
      <motion.p
        variants={item}
        className="mt-4 text-base text-muted-foreground md:text-lg"
      >
        Each project is engineered to deliver bankable returns, resilient
        operations, and measurable socio-economic impact for communities across
        Nigeria.
      </motion.p>
      <motion.div variants={item} className="mt-8">
        <Link href="/projects">
          <Button className="px-8 py-3">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <section className="border-b border-border-[0.5px] bg-background py-12 sm:py-16 lg:py-20 xl:py-24">
      <Container className="px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Featured Deployments
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our project portfolio is being refreshed. Check back soon or explore
            our full project stories.
          </p>
          <Link href="/projects" className="mt-8">
            <Button size="lg">View Projects Archive</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

/**
 * Desktop: the section pins and vertical scroll drives the project strip
 * sideways. Phones and reduced motion: a native, snap-scrolling strip.
 */
export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const displayProjects = Array.isArray(projects)
    ? projects.slice(0, MAX_PROJECTS)
    : [];
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [endPad, setEndPad] = useState(0);
  const [wide, setWide] = useState(false);

  // Measure how far the strip travels; pin only on wide screens. Right padding
  // is sized so the last project comes to rest centred, not against the edge.
  useLayoutEffect(() => {
    const measure = () => {
      setWide(window.matchMedia('(min-width: 768px)').matches);
      const track = trackRef.current;
      const last = track?.lastElementChild as HTMLElement | null;
      if (!track || !last) {
        return;
      }
      const pad = Math.max(32, (window.innerWidth - last.offsetWidth) / 2);
      setEndPad(pad);
      // Measured to the last frame: Chrome leaves a flex container's end
      // padding out of scrollWidth, which would stop the strip short.
      const contentRight =
        last.getBoundingClientRect().right - track.getBoundingClientRect().left;
      setDistance(Math.max(0, contentRight + pad - window.innerWidth));
    };
    measure();
    // Same guard as header.tsx: ResizeObserver isn't in the lint globals.
    const ro =
      typeof window.ResizeObserver !== 'undefined'
        ? new window.ResizeObserver(measure)
        : undefined;
    if (ro && trackRef.current) {
      ro.observe(trackRef.current);
    }
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [wide, reduceMotion]);

  const pinned = wide && !reduceMotion;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  const x = useTransform(
    smooth,
    [0, HOLD_START, 1 - HOLD_END, 1],
    [0, 0, -distance, -distance],
  );
  const rail = useTransform(smooth, [HOLD_START, 1 - HOLD_END], [0, 1]);
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(rail, 'change', setProgress);
  // Extra scroll runway so the holds don't speed up the travel.
  const runway = distance / (1 - HOLD_START - HOLD_END);

  if (displayProjects.length === 0) {
    return <EmptyState />;
  }

  // Alternate landscape and portrait frames for an editorial rhythm.
  const frameShape = (i: number) =>
    i % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]';

  if (!pinned) {
    return (
      <section
        ref={sectionRef}
        aria-label="Selected energy deployments"
        className="border-b border-border-[0.5px] bg-background py-12 sm:py-16"
      >
        <Container className="px-4">
          <Intro />
        </Container>
        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none]"
        >
          {displayProjects.map((project, i) => (
            <ProjectFrame
              key={project._id}
              project={project}
              index={i}
              className="aspect-[4/5] w-[82vw] max-w-sm snap-center"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Selected energy deployments"
      style={{ height: `calc(100svh + ${runway}px)` }}
      className="relative border-b border-border-[0.5px] bg-background"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x, paddingRight: endPad }}
          className="flex h-[68svh] items-stretch gap-6 pl-[max(1.5rem,calc((100vw-80rem)/2+1rem))] will-change-transform"
        >
          <Intro />
          {displayProjects.map((project, i) => (
            <ProjectFrame
              key={project._id}
              project={project}
              index={i}
              className={cn('h-full', frameShape(i))}
            />
          ))}
        </motion.div>

        {/* Progress rail */}
        <div className="absolute inset-x-0 bottom-8 mx-auto flex w-[min(80rem,calc(100vw-5rem))] items-center gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            {String(
              Math.min(
                displayProjects.length,
                Math.floor(progress * displayProjects.length) + 1,
              ),
            ).padStart(2, '0')}
          </span>
          <div className="relative h-px flex-1 bg-border">
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left bg-primary"
              style={{ scaleX: rail }}
            />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {String(displayProjects.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
