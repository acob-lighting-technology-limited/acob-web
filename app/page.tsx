'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { CompanySection } from '@/components/sections/company-section';

// Lazy load heavy components
const TransitionSection = dynamic(
  () =>
    import('@/components/sections/transition-section').then(mod => ({
      default: mod.TransitionSection,
    })),
  {
    loading: () => <div className="py-16 bg-zinc-50 dark:bg-zinc-950" />,
  }
);

const ContactSection = dynamic(
  () =>
    import('@/components/sections/contact-section').then(mod => ({
      default: mod.ContactSection,
    })),
  {
    loading: () => <div className="py-16 bg-zinc-50 dark:bg-zinc-950" />,
  }
);

const UpdatesSection = dynamic(
  () =>
    import('@/components/sections/updates-section').then(mod => ({
      default: mod.UpdatesSection,
    })),
  {
    loading: () => <div className="py-16 bg-zinc-50 dark:bg-zinc-950" />,
  }
);

const PartnersSection = dynamic(
  () =>
    import('@/components/sections/partners-section').then(mod => ({
      default: mod.PartnersSection,
    })),
  {
    loading: () => <div className="py-16 bg-zinc-50 dark:bg-zinc-950" />,
  }
);

const ProjectsSection = dynamic(
  () =>
    import('@/components/sections/projects-section').then(mod => ({
      default: mod.ProjectsSection,
    })),
  {
    loading: () => <div className="py-16 bg-zinc-50 dark:bg-zinc-950" />,
  }
);

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  const handleHeroLoaded = () => {
    setHeroLoaded(true);
  };

  return (
    <>
      <HeroSection onLoaded={handleHeroLoaded} />
      {heroLoaded && (
        <>
          <AboutSection />
          <ServicesSection />
          <CompanySection />
          <ProjectsSection />
          {/* <TestimonialsSection /> */}
          <TransitionSection />
          <ContactSection />
          <UpdatesSection />
          <PartnersSection />
          {/* <MapSection /> */}
        </>
      )}
    </>
  );
}
