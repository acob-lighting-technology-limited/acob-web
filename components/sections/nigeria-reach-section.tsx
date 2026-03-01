'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { MaskText } from '@/components/animations/MaskText';
import { FadeIn } from '@/components/animations/FadeIn';
import type { Project } from '@/lib/types';

// =============================================================================
// CONFIGURATION
// =============================================================================

// States with projects (with random project counts)
const PROJECT_STATES = [
  { id: 'NGFC', name: 'Abuja (FCT)', slug: 'abuja' }, // projects: 3
  { id: 'NGED', name: 'Edo', slug: 'edo' }, // projects: 6
  { id: 'NGDE', name: 'Delta', slug: 'delta' }, // projects: 2
  { id: 'NGRI', name: 'Rivers', slug: 'rivers' }, // projects: 3
  { id: 'NGKO', name: 'Kogi', slug: 'kogi' }, // projects: 2
  { id: 'NGNA', name: 'Nasarawa', slug: 'nasarawa' }, // projects: 5
  { id: 'NGJI', name: 'Jigawa', slug: 'jigawa' }, // projects: 1
  { id: 'NGKD', name: 'Kaduna', slug: 'kaduna' }, // projects: 3
  { id: 'NGKN', name: 'Kano', slug: 'kano' }, // projects: 2
  { id: 'NGOG', name: 'Ogun', slug: 'ogun' }, // projects: 3
  { id: 'NGEN', name: 'Enugu', slug: 'enugu' }, // projects: 2
  { id: 'NGBO', name: 'Borno', slug: 'borno' }, // projects: 1
  { id: 'NGON', name: 'Ondo', slug: 'ondo' }, // projects: 4
] as const;

// Slug to Sanity state value mapping (aligned with Sanity schema)
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

// Colors
const INACTIVE_COLOR = '#E5E7EB'; // Soft neutral grey
const ACTIVE_COLOR = 'hsl(var(--primary))'; // Global primary green
const HOVER_COLOR = '#22c55e'; // Lighter green on hover
const STROKE_COLOR = '#1f2937'; // Dark/black border for distinction

// Office Location
const HQ_COORDS = {
  lat: 9.117522041312775,
  lng: 7.42208461436331,
};

// SVG Reference Points (extracted from ng.svg for precise mapping)
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

/**
 * Maps geographic coordinates to SVG coordinates
 */
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

// =============================================================================
// COMPONENT
// =============================================================================

interface NigeriaReachSectionProps {
  projects?: Project[];
}

export function NigeriaReachSection({
  projects = [],
}: NigeriaReachSectionProps) {
  const router = useRouter();
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  // Project HQ coordinates onto SVG space
  const hqPos = projectPoint(HQ_COORDS.lat, HQ_COORDS.lng);

  // Calculate live project states based on Sanity data + hardcoded fallbacks
  const activeProjectStates = PROJECT_STATES.map((state, index) => {
    const sanityStateValue = STATE_QUERY_MAPPING[state.slug];
    const sanityCount = projects.filter(
      p => p.state === sanityStateValue,
    ).length;

    // For "dummy data" request, ensure we have at least some counts for the map
    const dummyCount = [4, 6, 3, 2, 5, 8, 2, 3, 4, 3, 5, 2, 3][index % 13];

    return {
      ...state,
      projects: sanityCount > 0 ? sanityCount : dummyCount,
    };
  }); // Remove .filter(s => s.projects > 0) to show all predefined states as "Active" for dummy data

  // Create a set for quick lookup of current highlighted IDs
  const projectStateIds = new Set(activeProjectStates.map(s => s.id));

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [tooltip, setTooltip] = useState<{
    show: boolean;
    name: string;
    projects?: number;
    x: number;
    y: number;
    isActive: boolean;
  }>({ show: false, name: '', x: 0, y: 0, isActive: false });

  // Load and configure the SVG
  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch('/images/ng.svg');
        const svgText = await response.text();

        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = svgText;
          const svg = svgContainerRef.current.querySelector('svg');

          if (svg) {
            svg.style.width = '100%';
            svg.style.height = 'auto';
            svg.setAttribute('class', 'drop-shadow-xl');

            // Hide label points and reference points
            const labelPoints = svg.querySelector('#label_points');
            if (labelPoints) {
              (labelPoints as HTMLElement).style.display = 'none';
            }
            const points = svg.querySelector('#points');
            if (points) {
              (points as HTMLElement).style.display = 'none';
            }

            // Style all paths
            const paths = svg.querySelectorAll('#features path');
            paths.forEach(path => {
              const pathElement = path as HTMLElement;
              const stateId = path.getAttribute('id') || '';
              const stateName = path.getAttribute('name') || 'Unknown';
              const isProjectState = (projectStateIds as Set<string>).has(
                stateId,
              );
              const projectData = activeProjectStates.find(
                s => (s.id as string) === stateId,
              );

              // Set colors - initially all states get grey
              pathElement.setAttribute('fill', INACTIVE_COLOR);
              pathElement.setAttribute('stroke', STROKE_COLOR);
              pathElement.setAttribute('stroke-width', '1');
              pathElement.style.transition =
                'fill 0.5s ease, transform 0.2s ease';
              pathElement.style.cursor = isProjectState ? 'pointer' : 'default';

              // Hover events
              pathElement.addEventListener('mouseenter', () => {
                const rect = pathElement.getBoundingClientRect();

                // Show tooltip
                setTooltip({
                  show: true,
                  name: stateName,
                  projects: projectData?.projects,
                  x: rect.left + rect.width / 2,
                  y: rect.top - 10,
                  isActive: isProjectState,
                });

                // Hover effect for project states
                if (isProjectState) {
                  pathElement.setAttribute('fill', HOVER_COLOR);
                }
              });

              pathElement.addEventListener('mouseleave', () => {
                setTooltip(prev => ({ ...prev, show: false }));

                // Reset color (only if it has already been "activated" by the animation)
                if (
                  isProjectState &&
                  pathElement.getAttribute('data-active') === 'true'
                ) {
                  pathElement.setAttribute('fill', ACTIVE_COLOR);
                } else {
                  pathElement.setAttribute('fill', INACTIVE_COLOR);
                }
              });

              // Click to navigate (only for project states)
              if (isProjectState && projectData) {
                pathElement.addEventListener('click', () => {
                  router.push(`/projects/${projectData.slug}`);
                });
              }
            });

            // 3. Add HQ Pin
            const hqGroup = document.createElementNS(
              'http://www.w3.org/2000/svg',
              'g',
            );
            hqGroup.setAttribute('id', 'hq-marker');
            hqGroup.style.cursor = 'pointer';

            // Pulse effect (outer)
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

            // Inner dot
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

            // HQ Label
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

            // Tooltip for HQ
            hqGroup.addEventListener('mouseenter', () => {
              const rect = innerDot.getBoundingClientRect();
              setTooltip({
                show: true,
                name: 'ACOB Headquarters',
                projects: undefined,
                x: rect.left + rect.width / 2,
                y: rect.top - 10,
                isActive: true,
              });
            });
            hqGroup.addEventListener('mouseleave', () => {
              setTooltip(prev => ({ ...prev, show: false }));
            });

            // Click to open Google Maps
            hqGroup.addEventListener('click', () => {
              window.open(
                'https://maps.app.goo.gl/9poy3WT5WbSCDDFZA',
                '_blank',
              );
            });

            hqGroup.setAttribute('title', 'Click to view on Google Maps');

            svg.appendChild(hqGroup);
          }
        }
      } catch (error) {
        console.error('Failed to load Nigeria SVG:', error);
      }
    };

    loadSvg();
  }, [router]);

  // Handle sophisticated technical reveal when in view
  useEffect(() => {
    if (inView && !hasAnimatedRef.current && svgContainerRef.current) {
      hasAnimatedRef.current = true;
      const svg = svgContainerRef.current.querySelector('svg');
      if (!svg) {
        return;
      }

      activeProjectStates.forEach((project, index) => {
        const path = svg.querySelector(`#${project.id}`) as HTMLElement | null;
        if (path) {
          // Start from neutral inactive state
          path.setAttribute('fill', INACTIVE_COLOR);
          setTimeout(
            () => {
              // Clean, direct activation without flashes
              path.style.transition = 'fill 0.4s ease-out';
              path.setAttribute('fill', ACTIVE_COLOR);
              path.setAttribute('data-active', 'true');
            },
            100 + index * 100,
          ); // Steady one-by-one reveal
        }
      });
    }
  }, [inView, activeProjectStates]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 py-12 sm:py-16 lg:py-20 xl:py-24"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(22,_163,_74,_0.03),_transparent_70%)]" />

      <Container className="relative px-4">
        {/* Balanced grid ratio - providing room for large typography */}
        <div className="grid gap-4 lg:gap-6 xl:grid-cols-[0.9fr_2fr] items-center">
          {/* Left side - Content (smaller) */}
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-center xl:text-left">
              <div className="space-y-3">
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary border-primary/20 bg-primary/5 rounded-full"
                >
                  Our Reach
                </Badge>
                <MaskText
                  phrases={['Electrifying Progress Across the Nation']}
                  className="text-3xl font-bold md:text-3xl lg:text-4xl leading-tight"
                />
              </div>

              <p className="text-base text-muted-foreground md:text-lg max-w-md mx-auto xl:mx-0 leading-relaxed">
                From Abuja to the coastlines, we deliver reliable clean energy
                solutions that transform lives and empower communities.
              </p>

              {/* Stats - restored to prominent sizes */}
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

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4 pt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-sm border border-gray-800"
                    style={{ backgroundColor: ACTIVE_COLOR }}
                  />
                  <span>Active Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-sm border border-gray-800"
                    style={{ backgroundColor: INACTIVE_COLOR }}
                  />
                  <span>Coming Soon</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary border border-white"></span>
                  </div>
                  <span>Branch/Office</span>
                </div>
              </div>

              {/* Instruction */}
              <p className="text-xs text-muted-foreground/70 italic">
                Click on any green state to view projects
              </p>
            </div>
          </FadeIn>

          {/* Right side - Map (larger) */}
          <FadeIn delay={0.2}>
            <div className="relative flex flex-col items-center">
              {/* Nigeria Map SVG Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full"
              >
                <div ref={svgContainerRef} className="w-full h-auto" />
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Floating Tooltip */}
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
            {tooltip.isActive && tooltip.projects && (
              <div className="text-xs opacity-80">
                {tooltip.projects} projects • Click to view
              </div>
            )}
            {!tooltip.isActive && (
              <div className="text-xs opacity-60">Coming soon</div>
            )}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
