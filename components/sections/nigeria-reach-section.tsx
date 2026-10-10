'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from '@/components/ui/container';
import { FadeIn } from '@/components/animations/FadeIn';
import { MaskWords } from '@/components/animations/MaskWords';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/types';

const PROJECT_STATES = [
  { id: 'NGFC', name: 'Abuja (FCT)', slug: 'abuja' },
  { id: 'NGED', name: 'Edo', slug: 'edo' },
  { id: 'NGDE', name: 'Delta', slug: 'delta' },
  { id: 'NGRI', name: 'Rivers', slug: 'rivers' },
  { id: 'NGKO', name: 'Kogi', slug: 'kogi' },
  { id: 'NGNA', name: 'Nasarawa', slug: 'nasarawa' },
  { id: 'NGJI', name: 'Jigawa', slug: 'jigawa' },
  { id: 'NGKD', name: 'Kaduna', slug: 'kaduna' },
  { id: 'NGKN', name: 'Kano', slug: 'kano' },
  { id: 'NGOG', name: 'Ogun', slug: 'ogun' },
  { id: 'NGEN', name: 'Enugu', slug: 'enugu' },
  { id: 'NGBO', name: 'Borno', slug: 'borno' },
  { id: 'NGON', name: 'Ondo', slug: 'ondo' },
] as const;

const STATE_QUERY_MAPPING: Record<string, string> = {
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

const INACTIVE_COLOR = '#E5E7EB';
const ACTIVE_COLOR = 'hsl(var(--primary))';
const HOVER_COLOR = '#22c55e';
const STROKE_COLOR = '#1f2937';
const PROJECT_DOT_COLOR = '#111111';
const PROJECT_DOT_HOVER_COLOR = '#000000';

const HQ_COORDS = {
  lat: 9.117522041312775,
  lng: 7.42208461436331,
};

const SVG_REF_A = {
  lat: 4.752568550854937,
  lng: 3.271024698580586,
  x: 90.9,
  y: 738.5,
};

const SVG_REF_B = {
  lat: 13.399884281129347,
  lng: 14.069993449311253,
  x: 909.1,
  y: 74.4,
};

const projectPoint = (lat: number, lng: number) => {
  const x =
    SVG_REF_A.x +
    ((lng - SVG_REF_A.lng) * (SVG_REF_B.x - SVG_REF_A.x)) /
      (SVG_REF_B.lng - SVG_REF_A.lng);
  const y =
    SVG_REF_A.y +
    ((lat - SVG_REF_A.lat) * (SVG_REF_B.y - SVG_REF_A.y)) /
      (SVG_REF_B.lat - SVG_REF_A.lat);
  return { x, y };
};

interface NigeriaReachSectionProps {
  projects?: Project[];
  showMoreLink?: boolean;
  embedded?: boolean;
}

export function NigeriaReachSection({
  projects = [],
  showMoreLink = false,
  embedded = false,
}: NigeriaReachSectionProps) {
  const router = useRouter();
  const svgContainerRef = useRef<HTMLDivElement>(null);
  // Set once the SVG markup is injected and styled. The colour animation waits
  // on this so it never races ahead of the async SVG fetch (which would leave
  // active states grey when the page loads slowly).
  const [svgReady, setSvgReady] = useState(false);
  const hqPos = projectPoint(HQ_COORDS.lat, HQ_COORDS.lng);
  const projectsWithCoordinates = useMemo(
    () =>
      projects.filter(
        project =>
          typeof project.latitude === 'number' &&
          Number.isFinite(project.latitude) &&
          typeof project.longitude === 'number' &&
          Number.isFinite(project.longitude) &&
          Boolean(project.title) &&
          Boolean(project.slug?.current),
      ),
    [projects],
  );

  const activeProjectStates = useMemo(
    () =>
      PROJECT_STATES.map((state, index) => {
        const sanityStateValue = STATE_QUERY_MAPPING[state.slug];
        const sanityCount = projects.filter(
          project => project.state === sanityStateValue,
        ).length;
        const dummyCount = [4, 6, 3, 2, 5, 8, 2, 3, 4, 3, 5, 2, 3][index % 13];

        return {
          ...state,
          projects: sanityCount > 0 ? sanityCount : dummyCount,
        };
      }),
    [projects],
  );

  const projectStateIds = useMemo<Set<string>>(
    () => new Set<string>(activeProjectStates.map(state => state.id)),
    [activeProjectStates],
  );

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [tooltip, setTooltip] = useState<{
    show: boolean;
    name: string;
    x: number;
    y: number;
    projects?: number;
    isActive: boolean;
    subtitle?: string;
  }>({ show: false, name: '', x: 0, y: 0, isActive: false });

  useEffect(() => {
    let isCancelled = false;

    const loadSvg = async () => {
      try {
        const response = await fetch('/images/ng.svg');
        const svgText = await response.text();

        if (isCancelled || !svgContainerRef.current) {
          return;
        }

        svgContainerRef.current.innerHTML = svgText;
        const svg = svgContainerRef.current.querySelector('svg');

        if (!svg) {
          return;
        }

        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.setAttribute('class', 'drop-shadow-xl');

        const labelPoints = svg.querySelector('#label_points');
        if (labelPoints) {
          (labelPoints as HTMLElement).style.display = 'none';
        }

        const points = svg.querySelector('#points');
        if (points) {
          (points as HTMLElement).style.display = 'none';
        }

        const paths = svg.querySelectorAll('#features path');
        paths.forEach(path => {
          const pathElement = path as HTMLElement;
          const stateId = path.getAttribute('id') || '';
          const stateName = path.getAttribute('name') || 'Unknown';
          const isProjectState = projectStateIds.has(stateId);
          const projectData = activeProjectStates.find(
            state => state.id === stateId,
          );

          pathElement.setAttribute('fill', INACTIVE_COLOR);
          pathElement.setAttribute('stroke', STROKE_COLOR);
          pathElement.setAttribute('stroke-width', '1');
          pathElement.style.transition = 'fill 0.3s ease';
          pathElement.style.cursor = isProjectState ? 'pointer' : 'default';

          pathElement.addEventListener('mouseenter', () => {
            const rect = pathElement.getBoundingClientRect();
            setTooltip({
              show: true,
              name: stateName,
              projects: projectData?.projects,
              x: rect.left + rect.width / 2,
              y: rect.top - 10,
              isActive: isProjectState,
            });

            if (isProjectState) {
              pathElement.setAttribute('fill', HOVER_COLOR);
            }
          });

          pathElement.addEventListener('mouseleave', () => {
            setTooltip(prev => ({ ...prev, show: false }));

            if (
              isProjectState &&
              pathElement.getAttribute('data-active') === 'true'
            ) {
              pathElement.setAttribute('fill', ACTIVE_COLOR);
            } else {
              pathElement.setAttribute('fill', INACTIVE_COLOR);
            }
          });

          if (isProjectState && projectData) {
            pathElement.addEventListener('click', () => {
              router.push(`/projects/${projectData.slug}`);
            });
          }
        });

        projectsWithCoordinates.forEach(project => {
          const markerPosition = projectPoint(
            project.latitude as number,
            project.longitude as number,
          );

          const marker = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'circle',
          ) as unknown as HTMLElement;

          marker.setAttribute('cx', markerPosition.x.toString());
          marker.setAttribute('cy', markerPosition.y.toString());
          marker.setAttribute('r', '4');
          marker.setAttribute('fill', PROJECT_DOT_COLOR);
          marker.setAttribute('stroke', '#ffffff');
          marker.setAttribute('stroke-width', '1.5');
          marker.style.cursor = 'pointer';
          marker.style.transition = 'transform 0.2s ease, fill 0.2s ease';
          marker.style.transformOrigin = `${markerPosition.x}px ${markerPosition.y}px`;

          marker.addEventListener('mouseenter', () => {
            const rect = marker.getBoundingClientRect();
            marker.setAttribute('fill', PROJECT_DOT_HOVER_COLOR);
            marker.style.transform = 'scale(1.35)';
            setTooltip({
              show: true,
              name: project.title,
              x: rect.left + rect.width / 2,
              y: rect.top - 10,
              isActive: true,
              subtitle: 'Click to view project',
            });
          });

          marker.addEventListener('mouseleave', () => {
            marker.setAttribute('fill', PROJECT_DOT_COLOR);
            marker.style.transform = 'scale(1)';
            setTooltip(prev => ({ ...prev, show: false }));
          });

          marker.addEventListener('click', () => {
            router.push(`/projects/${project.slug.current}`);
          });

          svg.appendChild(marker);
        });

        const hqGroup = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'g',
        );
        hqGroup.setAttribute('id', 'hq-marker');
        hqGroup.style.cursor = 'pointer';

        const pulseCircle = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle',
        );
        pulseCircle.setAttribute('cx', hqPos.x.toString());
        pulseCircle.setAttribute('cy', hqPos.y.toString());
        pulseCircle.setAttribute('r', '12');
        pulseCircle.setAttribute('fill', ACTIVE_COLOR);
        pulseCircle.setAttribute('opacity', '0.3');

        const animateR = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'animate',
        );
        animateR.setAttribute('attributeName', 'r');
        animateR.setAttribute('from', '8');
        animateR.setAttribute('to', '20');
        animateR.setAttribute('dur', '2s');
        animateR.setAttribute('repeatCount', 'indefinite');

        const animateO = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'animate',
        );
        animateO.setAttribute('attributeName', 'opacity');
        animateO.setAttribute('from', '0.4');
        animateO.setAttribute('to', '0');
        animateO.setAttribute('dur', '2s');
        animateO.setAttribute('repeatCount', 'indefinite');

        pulseCircle.appendChild(animateR);
        pulseCircle.appendChild(animateO);

        const innerDot = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle',
        ) as unknown as HTMLElement;
        innerDot.setAttribute('cx', hqPos.x.toString());
        innerDot.setAttribute('cy', hqPos.y.toString());
        innerDot.setAttribute('r', '5');
        innerDot.setAttribute('fill', ACTIVE_COLOR);
        innerDot.setAttribute('stroke', '#ffffff');
        innerDot.setAttribute('stroke-width', '2');

        const hqText = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'text',
        );
        hqText.setAttribute('x', (hqPos.x + 10).toString());
        hqText.setAttribute('y', (hqPos.y + 4).toString());
        hqText.setAttribute('font-family', 'Inter, sans-serif');
        hqText.setAttribute('font-size', '12');
        hqText.setAttribute('font-weight', 'bold');
        hqText.setAttribute('fill', ACTIVE_COLOR);
        hqText.textContent = 'HQ';

        hqGroup.appendChild(pulseCircle);
        hqGroup.appendChild(innerDot);
        hqGroup.appendChild(hqText);

        hqGroup.addEventListener('mouseenter', () => {
          const rect = innerDot.getBoundingClientRect();
          setTooltip({
            show: true,
            name: 'ACOB Headquarters',
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
            isActive: true,
            subtitle: 'Click to view location',
          });
        });

        hqGroup.addEventListener('mouseleave', () => {
          setTooltip(prev => ({ ...prev, show: false }));
        });

        hqGroup.addEventListener('click', () => {
          router.push('/contact/locations');
        });

        svg.appendChild(hqGroup);
        setSvgReady(true);
      } catch (error) {
        console.error('Failed to load Nigeria SVG:', error);
      }
    };

    loadSvg();

    return () => {
      isCancelled = true;
      setSvgReady(false);

      if (svgContainerRef.current) {
        svgContainerRef.current.innerHTML = '';
      }
    };
  }, [
    activeProjectStates,
    hqPos.x,
    hqPos.y,
    projectStateIds,
    projectsWithCoordinates,
    router,
  ]);

  useEffect(() => {
    // Wait until BOTH the section is in view AND the SVG has been injected.
    // Guarding on svgReady (rather than a fire-once ref) makes this self-heal:
    // if the SVG loads after the section scrolls into view — or is re-injected
    // — the active states still get coloured instead of being stranded grey.
    if (!inView || !svgReady || !svgContainerRef.current) {
      return;
    }

    const svg = svgContainerRef.current.querySelector('svg');
    if (!svg) {
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    activeProjectStates.forEach((project, index) => {
      const path = svg.querySelector(`#${project.id}`) as HTMLElement | null;
      if (!path) {
        return;
      }
      path.setAttribute('fill', INACTIVE_COLOR);
      timers.push(
        setTimeout(
          () => {
            path.style.transition = 'fill 0.4s ease-out';
            path.setAttribute('fill', ACTIVE_COLOR);
            path.setAttribute('data-active', 'true');
          },
          100 + index * 100,
        ),
      );
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [activeProjectStates, inView, svgReady]);

  return (
    <section
      ref={ref}
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        embedded
          ? 'py-0'
          : 'min-h-screen bg-gradient-to-b from-background via-background to-muted/30 py-12 sm:py-16 lg:py-20 xl:py-24',
      )}
    >
      {!embedded && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(22,_163,_74,_0.03),_transparent_70%)]" />
      )}

      <Container className="relative px-4">
        <div className="grid gap-4 lg:gap-6 xl:grid-cols-[0.9fr_2fr] items-center">
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-center xl:text-left">
              <div className="space-y-2">
                <SectionEyebrow>Our Reach</SectionEyebrow>
                <MaskWords
                  as="h2"
                  text="Electrifying Progress Across the Nation."
                  className="max-w-sm text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground mx-auto md:text-3xl lg:text-4xl xl:mx-0"
                />
              </div>

              <p className="text-base text-muted-foreground md:text-lg max-w-md mx-auto xl:mx-0 leading-relaxed">
                From Abuja to the coastlines, we deliver reliable clean energy
                solutions that transform lives and empower communities.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center xl:text-left">
                  <div className="text-2xl font-bold text-primary md:text-3xl">
                    12+
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    States
                  </div>
                </div>
                <div className="text-center xl:text-left">
                  <div className="text-2xl font-bold text-primary md:text-3xl">
                    50+
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Projects
                  </div>
                </div>
                <div className="text-center xl:text-left">
                  <div className="text-2xl font-bold text-primary md:text-3xl">
                    20K+
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Households
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4 pt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-sm border border-gray-800"
                    style={{ backgroundColor: ACTIVE_COLOR }}
                  />
                  <span>Active Project State</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full border border-gray-800"
                    style={{ backgroundColor: PROJECT_DOT_COLOR }}
                  />
                  <span>Project Site</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary border border-white"></span>
                  </div>
                  <span>Branch/Office</span>
                </div>
              </div>

              <div className="space-y-0.5">
                <p className="text-xs text-muted-foreground/70 italic">
                  Click on any green state to view projects.
                </p>
                <p className="text-xs text-muted-foreground/70 italic">
                  Click on any black dot to view project.
                </p>
              </div>
              {showMoreLink ? (
                <div>
                  <Link
                    href="/about/our-reach"
                    className="text-xs font-semibold italic text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
                  >
                    See more about our national reach {'->'}
                  </Link>
                </div>
              ) : null}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.95 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full"
              >
                <div ref={svgContainerRef} className="w-full h-auto" />
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </Container>

      <AnimatePresence>
        {tooltip.show && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="fixed z-50 px-3 py-2 bg-foreground text-background text-sm rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <div className="font-semibold">{tooltip.name}</div>
            {tooltip.isActive && tooltip.projects ? (
              <div className="text-xs opacity-80">
                {tooltip.projects} projects - Click to view
              </div>
            ) : null}
            {tooltip.subtitle ? (
              <div className="text-xs opacity-80">{tooltip.subtitle}</div>
            ) : null}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
