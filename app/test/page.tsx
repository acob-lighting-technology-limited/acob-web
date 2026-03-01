'use client';

import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';

// =============================================================================
// CONFIGURATION
// =============================================================================

const PROJECT_STATES = [
  { id: 'NGFC', name: 'Abuja (FCT)', x: 345, y: 310 }, // Center
  { id: 'NGED', name: 'Edo', x: 260, y: 450 },
  { id: 'NGDE', name: 'Delta', x: 260, y: 500 },
  { id: 'NGRI', name: 'Rivers', x: 315, y: 560 },
  { id: 'NGKO', name: 'Kogi', x: 300, y: 380 },
  { id: 'NGNA', name: 'Nasarawa', x: 390, y: 345 },
  { id: 'NGJI', name: 'Jigawa', x: 480, y: 90 },
  { id: 'NGKD', name: 'Kaduna', x: 345, y: 220 },
  { id: 'NGKN', name: 'Kano', x: 420, y: 140 },
  { id: 'NGOG', name: 'Ogun', x: 120, y: 435 },
  { id: 'NGEN', name: 'Enugu', x: 380, y: 470 },
  { id: 'NGBO', name: 'Borno', x: 670, y: 130 },
  { id: 'NGON', name: 'Ondo', x: 215, y: 440 },
] as const;

const INACTIVE_COLOR = '#E5E7EB';
const ACTIVE_COLOR = '#15803d'; // Primary Green
const STROKE_COLOR = '#1f2937';

type AnimationType =
  | 'technical-trace'
  | 'fade-pulse'
  | 'ripple-out'
  | 'scanner-sweep'
  | 'digital-flicker'
  | 'organic-grow';

interface MapVariantProps {
  type: AnimationType;
  title: string;
  description: string;
}

function MapVariant({ type, title, description }: MapVariantProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0); // For looping the animation

  useEffect(() => {
    const loadSvg = async () => {
      const response = await fetch('/images/ng.svg');
      const svgText = await response.text();
      if (containerRef.current) {
        containerRef.current.innerHTML = svgText;
        const svg = containerRef.current.querySelector('svg');
        if (svg) {
          svg.style.width = '100%';
          svg.style.height = 'auto';

          // Hide labels/points
          const lp = svg.querySelector('#label_points');
          if (lp) {
            (lp as any).style.display = 'none';
          }
          const p = svg.querySelector('#points');
          if (p) {
            (p as any).style.display = 'none';
          }

          // Initial state - all grey
          const paths = svg.querySelectorAll('#features path');
          paths.forEach(p => {
            const el = p as any;
            el.setAttribute('fill', INACTIVE_COLOR);
            el.setAttribute('stroke', STROKE_COLOR);
            el.setAttribute('stroke-width', '1');
          });

          // Start animation sequence
          runAnimation(svg);
        }
      }
    };

    const runAnimation = (svg: any) => {
      const activeIds = PROJECT_STATES.map(s => s.id);

      // 1. Technical Trace (Current)
      if (type === 'technical-trace') {
        activeIds.forEach((id, i) => {
          const path = svg.querySelector(`#${id}`) as any;
          if (!path) {
            return;
          }
          const len = path.getTotalLength();
          path.style.strokeDasharray = `${len}`;
          path.style.strokeDashoffset = `${len}`;
          path.style.stroke = ACTIVE_COLOR;
          path.style.strokeWidth = '2';

          setTimeout(() => {
            path.animate(
              [
                { strokeDashoffset: len, fill: INACTIVE_COLOR },
                { strokeDashoffset: 0, fill: ACTIVE_COLOR },
              ],
              { duration: 1200, easing: 'ease-in-out', fill: 'forwards' },
            );
          }, i * 150);
        });
      }

      // 2. Fade Pulse
      if (type === 'fade-pulse') {
        activeIds.forEach((id, i) => {
          const path = svg.querySelector(`#${id}`) as any;
          if (!path) {
            return;
          }
          setTimeout(() => {
            path.animate(
              [
                { opacity: 0, fill: ACTIVE_COLOR, transform: 'scale(0.95)' },
                { opacity: 1, fill: ACTIVE_COLOR, transform: 'scale(1)' },
              ],
              { duration: 1000, easing: 'ease-out', fill: 'forwards' },
            );
          }, i * 100);
        });
      }

      // 3. Ripple Out (From Abuja)
      if (type === 'ripple-out') {
        const abujaX = 345;
        const abujaY = 310;

        const sortedByDist = [...PROJECT_STATES].sort((a, b) => {
          const distA = Math.sqrt(
            Math.pow(a.x - abujaX, 2) + Math.pow(a.y - abujaY, 2),
          );
          const distB = Math.sqrt(
            Math.pow(b.x - abujaX, 2) + Math.pow(b.y - abujaY, 2),
          );
          return distA - distB;
        });

        sortedByDist.forEach((s, i) => {
          const path = svg.querySelector(`#${s.id}`) as any;
          if (!path) {
            return;
          }
          setTimeout(() => {
            path.animate(
              [
                { fill: INACTIVE_COLOR, transform: 'scale(0.98)' },
                { fill: ACTIVE_COLOR, transform: 'scale(1)' },
              ],
              {
                duration: 800,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                fill: 'forwards',
              },
            );
          }, i * 120);
        });
      }

      // 4. Scanner Sweep (West to East)
      if (type === 'scanner-sweep') {
        const sortedByX = [...PROJECT_STATES].sort((a, b) => a.x - b.x);
        sortedByX.forEach((s, i) => {
          const path = svg.querySelector(`#${s.id}`) as any;
          if (!path) {
            return;
          }
          setTimeout(() => {
            path.animate(
              [
                { fill: INACTIVE_COLOR, filter: 'brightness(1)' },
                { fill: '#4ade80', filter: 'brightness(1.5)' },
                { fill: ACTIVE_COLOR, filter: 'brightness(1)' },
              ],
              { duration: 600, easing: 'linear', fill: 'forwards' },
            );
          }, i * 80);
        });
      }

      // 5. Digital Flicker
      if (type === 'digital-flicker') {
        activeIds.forEach((id, i) => {
          const path = svg.querySelector(`#${id}`) as any;
          if (!path) {
            return;
          }
          setTimeout(() => {
            path.animate(
              [
                { fill: INACTIVE_COLOR, opacity: 0.3 },
                { fill: ACTIVE_COLOR, opacity: 0.8 },
                { fill: INACTIVE_COLOR, opacity: 0.5 },
                { fill: ACTIVE_COLOR, opacity: 1 },
              ],
              { duration: 400, iterations: 1, fill: 'forwards' },
            );
          }, i * 60);
        });
      }

      // 6. Organic Grow
      if (type === 'organic-grow') {
        activeIds.forEach((id, i) => {
          const path = svg.querySelector(`#${id}`) as any;
          if (!path) {
            return;
          }
          path.style.transformOrigin = 'center';
          setTimeout(() => {
            path.animate(
              [
                { fill: INACTIVE_COLOR, transform: 'scale(0.5)', opacity: 0 },
                { fill: ACTIVE_COLOR, transform: 'scale(1.05)', opacity: 1 },
                { fill: ACTIVE_COLOR, transform: 'scale(1)', opacity: 1 },
              ],
              {
                duration: 1000,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fill: 'forwards',
              },
            );
          }, i * 140);
        });
      }

      // Loop after 10 seconds
      setTimeout(() => setKey(prev => prev + 1), 10000);
    };

    loadSvg();
  }, [type, key]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="relative aspect-[4/3] bg-card border border-border rounded-xl p-8 overflow-hidden group shadow-lg flex items-center justify-center">
        <div ref={containerRef} className="w-full h-full max-w-md" />
        <div className="absolute top-4 right-4 animate-pulse">
          <Badge
            variant="outline"
            className="bg-primary/5 text-primary border-primary/20"
          >
            Looping...
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default function AnimationTestPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col space-y-4 mb-20 text-center">
          <Badge className="w-fit mx-auto rounded-full px-4 py-1">
            Design Lab
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Nigeria Map Animations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A playground to explore different architectural reveal styles for
            the national project reach map.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <MapVariant
            type="technical-trace"
            title="1. Technical Trace (Current)"
            description="Vector path drawing with deliberate strokes. Feels calculated and engineering-focused."
          />
          <MapVariant
            type="ripple-out"
            title="2. Central Ripple"
            description="Radiates from the FCT (Abuja) outwards. Symbolizes the center of command spreading power."
          />
          <MapVariant
            type="scanner-sweep"
            title="3. Scanner Sweep"
            description="A clean West-to-East data sweep. Modern, fast, and digital."
          />
          <MapVariant
            type="organic-grow"
            title="4. Organic Growth"
            description="States pop into existence with an elastic scale. Playful and high-energy."
          />
          <MapVariant
            type="fade-pulse"
            title="5. Ethereal Fade"
            description="Soft opacity transitions with subtle scaling. Minimalist and premium."
          />
          <MapVariant
            type="digital-flicker"
            title="6. Data Activation"
            description="High-frequency flicker reveal. Feels like a system coming online."
          />
        </div>

        <div className="mt-32 p-12 bg-primary/5 rounded-3xl border border-primary/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Implementation Note</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            All animations are built using the native Web Animations API or
            Framer Motion for maximum performance. Which one feels most like
            ACOB's brand?
          </p>
        </div>
      </div>
    </main>
  );
}
