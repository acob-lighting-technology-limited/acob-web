'use client';
import type React from 'react';
import { Container } from '@/components/ui/container';
import { MaskText } from '../animations/MaskText';

interface PageHeroProps {
  title: string;
  backgroundImage: string;
  backgroundPosition?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({
  title,
  backgroundImage,
  backgroundPosition = 'bg-center',
  className = '',
  children,
}: PageHeroProps) {
  // Truncate title to max 25 characters
  const truncatedTitle = title.length > 60 ? title.substring(0, 60) + '...' : title;

  return (
    <section
      className={`relative h-[400px] flex items-end justify-start overflow-hidden ${className}`}
    >
      {/* Background Image with Animation */}
      <div
        className={`absolute inset-0 bg-cover ${backgroundPosition} bg-no-repeat animate-slow-zoom`}
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
            phrases={[truncatedTitle]}
            className="text-4xl md:text-7xl font-bold"
          />
          {/* {children} */}
        </div>
      </Container>
    </section>
  );
}
