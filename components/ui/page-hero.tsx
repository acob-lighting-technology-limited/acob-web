'use client';
import type React from 'react';
import { usePathname } from 'next/navigation';
import { MaskText } from '../animations/MaskText';

interface PageHeroProps {
  title?: string; // Now optional, auto-generated from route
  description: string; // Short 1-line description (old title)
  backgroundImage: string;
  backgroundPosition?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: React.ReactNode;
}

// Helper function to generate title from pathname
function generateTitleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return 'Home';
  }

  // Get the last segment or second-to-last if it's a specific page
  const lastSegment = segments[segments.length - 1];

  // Common route mappings
  const routeMap: Record<string, string> = {
    // About pages
    about: 'About Us',
    mission: 'Mission & Vision',
    'our-story': 'Our Story',
    team: 'Our Team',
    certifications: 'Certifications & Awards',

    // Contact pages
    contact: 'Contact Us',
    quote: 'Request a Quote',
    careers: 'Careers',
    support: 'Customer Support',
    locations: 'Office Locations',

    // Projects
    projects: 'Our Project',
    residential: 'Residential Projects',
    commercial: 'Commercial Projects',
    industrial: 'Industrial Projects',
    'mini-grid': 'Mini-Grid Projects',
    'street-lighting': 'Street Lighting Projects',

    // Services
    services: 'Our Services',

    // Updates
    updates: 'Updates & News',
    latest: 'Latest Updates',
    press: 'Press Releases',
    'case-studies': 'Case Studies',
    gallery: 'Media Gallery',

    // Legal
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service',
  };

  // Check if we have a mapping
  if (routeMap[lastSegment]) {
    return routeMap[lastSegment];
  }

  // Format the segment as title case
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function PageHero({
  title,
  description,
  backgroundImage,
  backgroundPosition = 'bg-center',
  align = 'left',
  className = '',
  children: _children,
}: PageHeroProps) {
  const pathname = usePathname();

  // Use provided title or auto-generate from pathname
  const displayTitle = title || generateTitleFromPath(pathname);

  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <section
      className={`relative h-[50vh] md:h-[60vh] flex items-end justify-start overflow-hidden ${className}`}
    >
      {/* Background Image with Animation */}
      <div
        className={`absolute inset-0 bg-cover ${backgroundPosition} bg-no-repeat animate-slow-zoom`}
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end pb-10">
        <div className="2xl:container max-w-7xl mx-auto px-4 w-full">
          <div className={`text-white ${alignmentClass} max-w-5xl space-y-3`}>
            {/* Title with background */}
            <div className="inline-block">
              <p className="text-sm md:text-base font-semibold text-white bg-primary/90 px-4 py-2 rounded-md uppercase tracking-wider backdrop-blur-sm">
                {displayTitle}
              </p>
            </div>

            {/* Description (old title) */}

            <MaskText className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {description}
            </MaskText>
          </div>
        </div>
      </div>
    </section>
  );
}
