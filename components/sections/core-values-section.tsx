'use client';

import { useEffect, useState, useRef } from 'react';

import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/animations/FadeIn';
import { coreValues } from '@/lib/data/mission-data';

function AnimatedBadge({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className="relative inline-flex items-center overflow-hidden rounded-full border border-white/30 px-4 py-2 text-sm font-bold uppercase tracking-[0.3em] shadow-lg"
    >
      <span
        className={`relative z-10 transition-colors duration-500 ${isVisible ? 'text-primary' : 'text-white'}`}
        style={{ transitionDelay: '0.8s' }}
      >
        {children}
      </span>
      <span
        className="absolute inset-0 bg-white/10 backdrop-blur-sm"
        style={{
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.8s cubic-bezier(0.25, 0.4, 0.25, 1)',
        }}
      />
      <span
        className="absolute inset-0 bg-white"
        style={{
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 1s cubic-bezier(0.25, 0.4, 0.25, 1) 0.3s',
        }}
      />
    </span>
  );
}

export function CoreValuesSection() {
  return (
    <section className="mb-16">
      <Card className="grid items-center gap-8 rounded-3xl border border-border bg-gradient-to-r from-primary to-primary-dark p-4 py-8 sm:p-6 xl:p-8 text-white lg:grid-cols-2">
        <div className="space-y-6">
          <AnimatedBadge>Our Core Values</AnimatedBadge>
          <h3 className="text-3xl font-semibold md:text-4xl">
            Principles that steer every project
          </h3>
          <p className="text-base leading-relaxed text-white/85">
            These values guide our engineering, community engagement, and
            partnership decisions—ensuring consistency, accountability, and
            positive impact.
          </p>
        </div>
        <div className="space-y-4">
          {coreValues.map((value, index) => (
            <FadeIn key={value.title} delay={index * 0.15} direction="up">
              <div className="group flex items-start gap-4 rounded-3xl bg-white/10 p-4 backdrop-blur transition-all duration-500 hover:bg-white/15 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <div className="relative rounded-full bg-white/20 p-3 overflow-hidden transition-all duration-500 flex items-center justify-center group-hover:bg-white group-hover:scale-110">
                  <div className="absolute inset-0 bg-white transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                  <value.icon className="h-6 w-6 relative z-10 transition-colors duration-500 text-white group-hover:text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-white">
                    {value.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/80 transition-colors duration-500 group-hover:text-white/95">
                    {value.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Card>
    </section>
  );
}
