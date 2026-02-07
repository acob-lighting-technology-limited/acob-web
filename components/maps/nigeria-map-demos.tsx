'use client';

import { useEffect, useRef, useState } from 'react';

// Colors
const INACTIVE_COLOR = '#E5E7EB';
const ACTIVE_COLOR = '#16A34A';
const HOVER_COLOR = '#22c55e';
const STROKE_COLOR = '#64748B';

// =============================================================================
// MAP 1: HOVER TOOLTIPS
// =============================================================================
export function MapWithTooltips() {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    name: string;
    x: number;
    y: number;
  }>({ show: false, name: '', x: 0, y: 0 });

  useEffect(() => {
    const loadSvg = async () => {
      const response = await fetch('/images/ng.svg');
      const svgText = await response.text();

      if (svgContainerRef.current) {
        svgContainerRef.current.innerHTML = svgText;
        const svg = svgContainerRef.current.querySelector('svg');

        if (svg) {
          svg.style.width = '100%';
          svg.style.height = 'auto';

          // Hide label points
          const labelPoints = svg.querySelector('#label_points');
          if (labelPoints) {
            (labelPoints as any).style.display = 'none';
          }
          const points = svg.querySelector('#points');
          if (points) {
            (points as any).style.display = 'none';
          }

          // Style and add hover events to all paths
          const paths = svg.querySelectorAll('#features path');
          paths.forEach(path => {
            path.setAttribute('fill', INACTIVE_COLOR);
            path.setAttribute('stroke', STROKE_COLOR);
            path.setAttribute('stroke-width', '0.8');
            (path as any).style.cursor = 'pointer';
            (path as any).style.transition = 'fill 0.2s ease';

            path.addEventListener('mouseenter', e => {
              path.setAttribute('fill', HOVER_COLOR);
              const name = path.getAttribute('name') || 'Unknown';
              const rect = (e.target as Element).getBoundingClientRect();
              setTooltip({
                show: true,
                name,
                x: rect.left + rect.width / 2,
                y: rect.top - 10,
              });
            });

            path.addEventListener('mouseleave', () => {
              path.setAttribute('fill', INACTIVE_COLOR);
              setTooltip(prev => ({ ...prev, show: false }));
            });
          });
        }
      }
    };
    loadSvg();
  }, []);

  return (
    <div className="relative">
      <div ref={svgContainerRef} className="w-full" />
      {tooltip.show && (
        <div
          className="fixed z-50 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.name}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
        </div>
      )}
    </div>
  );
}

// =============================================================================
// MAP 2: STATE LABELS
// =============================================================================
export function MapWithLabels() {
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSvg = async () => {
      const response = await fetch('/images/ng.svg');
      const svgText = await response.text();

      if (svgContainerRef.current) {
        svgContainerRef.current.innerHTML = svgText;
        const svg = svgContainerRef.current.querySelector('svg');

        if (svg) {
          svg.style.width = '100%';
          svg.style.height = 'auto';

          // Style all paths
          const paths = svg.querySelectorAll('#features path');
          paths.forEach(path => {
            path.setAttribute('fill', INACTIVE_COLOR);
            path.setAttribute('stroke', STROKE_COLOR);
            path.setAttribute('stroke-width', '0.8');
          });

          // Hide default points
          const points = svg.querySelector('#points');
          if (points) {
            (points as any).style.display = 'none';
          }

          // Use label_points to add text labels
          const labelPoints = svg.querySelector('#label_points');
          if (labelPoints) {
            const circles = labelPoints.querySelectorAll('circle');
            circles.forEach(circle => {
              const cx = circle.getAttribute('cx');
              const cy = circle.getAttribute('cy');
              const stateName = circle.getAttribute('class') || '';

              // Create text element
              const text = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'text',
              );
              text.setAttribute('x', cx || '0');
              text.setAttribute('y', cy || '0');
              text.setAttribute('text-anchor', 'middle');
              text.setAttribute('dominant-baseline', 'middle');
              text.setAttribute('font-size', '8');
              text.setAttribute('font-weight', '600');
              text.setAttribute('fill', '#1f2937');
              text.textContent =
                stateName.length > 8
                  ? `${stateName.substring(0, 6)}..`
                  : stateName;

              svg.appendChild(text);
            });

            // Hide the circles
            (labelPoints as any).style.display = 'none';
          }
        }
      }
    };
    loadSvg();
  }, []);

  return <div ref={svgContainerRef} className="w-full" />;
}

// =============================================================================
// MAP 3: PROJECT MARKERS
// =============================================================================
const PROJECT_LOCATIONS = [
  { stateId: 'NGFC', projects: 12, name: 'Abuja' },
  { stateId: 'NGLA', projects: 8, name: 'Lagos' },
  { stateId: 'NGKN', projects: 5, name: 'Kano' },
  { stateId: 'NGRI', projects: 7, name: 'Rivers' },
  { stateId: 'NGED', projects: 4, name: 'Edo' },
];

export function MapWithMarkers() {
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSvg = async () => {
      const response = await fetch('/images/ng.svg');
      const svgText = await response.text();

      if (svgContainerRef.current) {
        svgContainerRef.current.innerHTML = svgText;
        const svg = svgContainerRef.current.querySelector('svg');

        if (svg) {
          svg.style.width = '100%';
          svg.style.height = 'auto';

          // Style all paths
          const paths = svg.querySelectorAll('#features path');
          paths.forEach(path => {
            path.setAttribute('fill', INACTIVE_COLOR);
            path.setAttribute('stroke', STROKE_COLOR);
            path.setAttribute('stroke-width', '0.8');
          });

          // Hide default elements
          const points = svg.querySelector('#points');
          if (points) {
            (points as any).style.display = 'none';
          }

          // Get label points for marker positioning
          const labelPoints = svg.querySelector('#label_points');
          if (labelPoints) {
            PROJECT_LOCATIONS.forEach(project => {
              const labelCircle = labelPoints.querySelector(
                `#${project.stateId}`,
              );
              if (labelCircle) {
                const cx = parseFloat(labelCircle.getAttribute('cx') || '0');
                const cy = parseFloat(labelCircle.getAttribute('cy') || '0');

                // Highlight state
                const statePath = svg.querySelector(
                  `#features #${project.stateId}`,
                );
                if (statePath) {
                  statePath.setAttribute('fill', ACTIVE_COLOR);
                }

                // Create marker group
                const g = document.createElementNS(
                  'http://www.w3.org/2000/svg',
                  'g',
                );

                // Marker pin
                const pin = document.createElementNS(
                  'http://www.w3.org/2000/svg',
                  'circle',
                );
                pin.setAttribute('cx', cx.toString());
                pin.setAttribute('cy', cy.toString());
                pin.setAttribute('r', '12');
                pin.setAttribute('fill', '#dc2626');
                pin.setAttribute('stroke', '#ffffff');
                pin.setAttribute('stroke-width', '2');

                // Project count
                const text = document.createElementNS(
                  'http://www.w3.org/2000/svg',
                  'text',
                );
                text.setAttribute('x', cx.toString());
                text.setAttribute('y', (cy + 1).toString());
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('dominant-baseline', 'middle');
                text.setAttribute('font-size', '10');
                text.setAttribute('font-weight', 'bold');
                text.setAttribute('fill', '#ffffff');
                text.textContent = project.projects.toString();

                g.appendChild(pin);
                g.appendChild(text);
                svg.appendChild(g);
              }
            });

            (labelPoints as any).style.display = 'none';
          }
        }
      }
    };
    loadSvg();
  }, []);

  return <div ref={svgContainerRef} className="w-full" />;
}

// =============================================================================
// MAP 4: CLICK INTERACTIONS
// =============================================================================
export function MapWithClickInteractions() {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [stateInfo, setStateInfo] = useState<{
    name: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    const loadSvg = async () => {
      const response = await fetch('/images/ng.svg');
      const svgText = await response.text();

      if (svgContainerRef.current) {
        svgContainerRef.current.innerHTML = svgText;
        const svg = svgContainerRef.current.querySelector('svg');

        if (svg) {
          svg.style.width = '100%';
          svg.style.height = 'auto';

          // Hide extras
          const labelPoints = svg.querySelector('#label_points');
          if (labelPoints) {
            (labelPoints as any).style.display = 'none';
          }
          const points = svg.querySelector('#points');
          if (points) {
            (points as any).style.display = 'none';
          }

          // Style and add click events
          const paths = svg.querySelectorAll('#features path');
          paths.forEach(path => {
            path.setAttribute('fill', INACTIVE_COLOR);
            path.setAttribute('stroke', STROKE_COLOR);
            path.setAttribute('stroke-width', '0.8');
            (path as any).style.cursor = 'pointer';
            (path as any).style.transition = 'fill 0.2s ease';

            path.addEventListener('click', () => {
              const id = path.getAttribute('id') || '';
              const name = path.getAttribute('name') || 'Unknown';

              // Reset all states
              paths.forEach(p => p.setAttribute('fill', INACTIVE_COLOR));

              // Highlight clicked state
              path.setAttribute('fill', ACTIVE_COLOR);
              setSelectedState(id);
              setStateInfo({ name, id });
            });

            path.addEventListener('mouseenter', () => {
              if (path.getAttribute('fill') !== ACTIVE_COLOR) {
                path.setAttribute('fill', HOVER_COLOR);
              }
            });

            path.addEventListener('mouseleave', () => {
              const id = path.getAttribute('id');
              if (id !== selectedState) {
                path.setAttribute('fill', INACTIVE_COLOR);
              }
            });
          });
        }
      }
    };
    loadSvg();
  }, [selectedState]);

  return (
    <div className="space-y-4">
      <div ref={svgContainerRef} className="w-full" />
      {stateInfo && (
        <div className="p-4 bg-card border border-border rounded-lg">
          <h4 className="font-semibold text-lg">{stateInfo.name}</h4>
          <p className="text-sm text-muted-foreground">
            State ID: {stateInfo.id}
          </p>
          <button
            onClick={() =>
              window.alert(`Navigate to /projects/${stateInfo.id}`)
            }
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
          >
            View Projects in {stateInfo.name}
          </button>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// MAP 5: ANIMATED PATH DRAWING
// =============================================================================
export function MapWithAnimatedDrawing() {
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSvg = async () => {
      const response = await fetch('/images/ng.svg');
      const svgText = await response.text();

      if (svgContainerRef.current) {
        svgContainerRef.current.innerHTML = svgText;
        const svg = svgContainerRef.current.querySelector('svg');

        if (svg) {
          svg.style.width = '100%';
          svg.style.height = 'auto';

          // Hide extras
          const labelPoints = svg.querySelector('#label_points');
          if (labelPoints) {
            (labelPoints as any).style.display = 'none';
          }
          const points = svg.querySelector('#points');
          if (points) {
            (points as any).style.display = 'none';
          }

          // Animate each path
          const paths = svg.querySelectorAll('#features path');
          paths.forEach((path, index) => {
            const pathElement = path as any;
            const length = pathElement.getTotalLength();

            // Set up initial state
            pathElement.style.fill = 'transparent';
            pathElement.style.stroke = ACTIVE_COLOR;
            pathElement.style.strokeWidth = '1.5';
            pathElement.style.strokeDasharray = length.toString();
            pathElement.style.strokeDashoffset = length.toString();

            // Animate with staggered delay
            pathElement.style.transition = `stroke-dashoffset 1.5s ease ${index * 0.03}s, fill 0.5s ease ${index * 0.03 + 1.5}s`;

            // Trigger animation
            requestAnimationFrame(() => {
              pathElement.style.strokeDashoffset = '0';
              pathElement.style.fill = INACTIVE_COLOR;
            });
          });

          // Highlight specific states after animation
          setTimeout(() => {
            ['NGFC', 'NGNA', 'NGON', 'NGED', 'NGOG'].forEach(id => {
              const state = svg.querySelector(`#${id}`);
              if (state) {
                (state as any).style.fill = ACTIVE_COLOR;
              }
            });
          }, 3500);
        }
      }
    };
    loadSvg();
  }, []);

  return <div ref={svgContainerRef} className="w-full" />;
}
