'use client';
import type React from 'react';
import { Container } from '@/components/ui/container';
import { MaskText } from '../animations/MaskText';

interface PageHeroProps {
  title: string;
  eyebrow?: string;
  backgroundImage: string;
  backgroundPosition?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({
  title,
  eyebrow,
  backgroundImage,
  backgroundPosition = 'bg-center',
  align = 'left',
  className = '',
  children,
}: PageHeroProps) {
  // Truncate title to max 60 characters
  const truncatedTitle = title.length > 60 ? `${title.substring(0, 60)}...` : title;

  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

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
        className={`relative z-10 w-full h-full flex items-end pb-10 px-4 justify-${align}`}
      >
        <div className={`text-white ${alignmentClass} max-w-4xl`}>
          {eyebrow && (
            <p className="text-sm md:text-base font-medium text-white/80 mb-2 uppercase tracking-wider">
              {eyebrow}
            </p>
          )}
          <MaskText
            phrases={[truncatedTitle]}
            className="text-4xl md:text-7xl font-bold"
          />
          {children && <div className="mt-4">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
