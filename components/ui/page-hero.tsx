'use client';
import type React from 'react';
import { Container } from '@/components/ui/container';
import { MaskText } from '../animations/MaskText';

interface PageHeroProps {
  title: string;
  backgroundImage: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({
  title,
  backgroundImage,
  className = '',
  children,
}: PageHeroProps) {
  return (
    <section
      className={`relative h-[400px] flex items-end justify-start overflow-hidden ${className}`}
    >
      {/* Background Image with Animation */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat animate-slow-zoom"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <Container
        noPadding
        className="relative z-10 w-full  h-full flex items-end pb-10 px-4"
      >
        <div className="text-left text-white">
          <MaskText
            phrases={[title]} // or split into lines if desired
            className="text-4xl md:text-7xl font-bold"
          />
          {children}
        </div>
      </Container>
    </section>
  );
}
