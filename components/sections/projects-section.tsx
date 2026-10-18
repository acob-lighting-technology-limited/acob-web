'use client';

import Link from 'next/link';
import Image from '@/components/ui/image';
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
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';
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
const HOLD_START = 0.08;
const HOLD_END = 0.08;
const MAX_PROJECTS = 4;

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
      // Low threshold: on phones the next card only peeks (~18% visible), and
      // it has to reveal for the peek to show at all.
      viewport={{ once: true, amount: 0.1 }}
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
      <SectionEyebrow>Our portfolio</SectionEyebrow>
      <motion.h2
        variants={item}
        className="mt-3 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-4xl lg:text-5xl text-foreground"
      >
        Selected Energy Deployments.
      </motion.h2>
      <motion.p
        variants={item}
        className="mt-4 text-base text-muted-foreground md:text-lg"
      >
        Each project is engineered to deliver bankable returns, resilient
        operations, and measurable socio-economic impact for communities across
        Nigeria.
      </motion.p>
    </motion.div>
  );
}

/**
 * Closes the strip: a full-height card the size of a project frame, so the
 * strip ends on content rather than a lone button in empty space.
 */
function SeeMoreFrame({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('shrink-0', className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <Link
        href="/projects"
        className="group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-border bg-muted/50 p-6 transition-colors duration-500 hover:border-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl transition-transform duration-700 group-hover:scale-125"
        />
        <span className="relative text-[0.65rem] font-bold uppercase tracking-[0.24em] text-primary">
          Full portfolio
        </span>
        <p className="relative mt-3 text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground sm:text-3xl">
          See every deployment.
        </p>
        <p className="relative mt-3 text-sm text-muted-foreground">
          Mini-grids, hospitals, streetlights, and commercial solar across
          Nigeria.
        </p>
        <span className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all group-hover:gap-3">
          See more projects
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </Link>
    </motion.div>
  );
}

/**
 * Phone strip card, matched to the Embla carousels (82% slide minus its 16px
 * gutter), snapping to the 16px content edge.
 */
const STRIP_CARD =
  'aspect-[4/5] w-[calc(82vw-16px)] max-w-sm shrink-0 snap-start';

/** Dots matching the shadcn carousel's CarouselDots, for the native strip. */
function StripDots({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-4 flex items-center justify-center">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === active}
          // Dot is 8px tall but the button is a 32px touch target.
          className="flex h-8 w-6 items-center justify-center"
        >
          <span
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === active
                ? 'w-6 bg-primary'
                : 'w-2 bg-muted-foreground/40',
            )}
          />
        </button>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20 xl:py-24">
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
  const [stripIndex, setStripIndex] = useState(0);

  // Measure how far the strip travels; pin only on wide screens. Right padding
  // matches the left inset, so the end card comes to rest on the gutter.
  useLayoutEffect(() => {
    const measure = () => {
      setWide(window.matchMedia('(min-width: 768px)').matches);
      const track = trackRef.current;
      const last = track?.lastElementChild as HTMLElement | null;
      if (!track || !last) {
        return;
      }
      // End on the container gutter, mirroring the strip's left inset.
      const pad = Math.max(24, (window.innerWidth - 1280) / 2 + 16);
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
        className="bg-background py-12 sm:py-16"
      >
        <Container className="px-4">
          <Intro />
        </Container>
        {/* Same strip as the Services and Updates carousels: first card on the
            16px edge, cards ~82% wide so the next one clearly peeks. */}
        <div
          ref={trackRef}
          onScroll={e => {
            const track = e.currentTarget;
            const first = track.firstElementChild as HTMLElement | null;
            if (first) {
              setStripIndex(
                Math.round(track.scrollLeft / (first.offsetWidth + 16)),
              );
            }
          }}
          className="mt-10 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 [scrollbar-width:none]"
        >
          {displayProjects.map((project, i) => (
            <ProjectFrame
              key={project._id}
              project={project}
              index={i}
              className={STRIP_CARD}
            />
          ))}
          <SeeMoreFrame className={STRIP_CARD} />
        </div>
        <StripDots
          count={displayProjects.length + 1}
          active={stripIndex}
          onSelect={i => {
            const track = trackRef.current;
            const first = track?.firstElementChild as HTMLElement | null;
            if (track && first) {
              track.scrollTo({
                left: i * (first.offsetWidth + 16),
                behavior: 'smooth',
              });
            }
          }}
        />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Selected energy deployments"
      style={{ height: `calc(100svh + ${runway}px)` }}
      className="relative bg-background"
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
          <SeeMoreFrame className="h-full w-[min(32vw,24rem)]" />
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
