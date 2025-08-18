'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { CompanySection } from '@/components/sections/company-section';

// Lazy load heavy components with better loading states
const TransitionSection = dynamic(
  () =>
    import('@/components/sections/transition-section').then(mod => ({
      default: mod.TransitionSection,
    })),
  {
    loading: () => (
      <div className="py-16 bg-zinc-50 dark:bg-zinc-950 animate-pulse" />
    ),
  }
);

const ContactSection = dynamic(
  () =>
    import('@/components/sections/contact-section').then(mod => ({
      default: mod.ContactSection,
    })),
  {
    loading: () => (
      <div className="py-16 bg-zinc-50 dark:bg-zinc-950 animate-pulse" />
    ),
  }
);

const NewsSection = dynamic(
  () =>
    import('@/components/sections/news-section').then(mod => ({
      default: mod.NewsSection,
    })),
  {
    loading: () => (
      <div className="py-16 bg-zinc-50 dark:bg-zinc-950 animate-pulse" />
    ),
  }
);

const PartnersSection = dynamic(
  () =>
    import('@/components/sections/partners-section').then(mod => ({
      default: mod.PartnersSection,
    })),
  {
    loading: () => (
      <div className="py-16 bg-zinc-50 dark:bg-zinc-950 animate-pulse" />
    ),
  }
);

const ProjectsSection = dynamic(
  () =>
    import('@/components/sections/projects-section').then(mod => ({
      default: mod.ProjectsSection,
    })),
  {
    loading: () => (
      <div className="py-16 bg-zinc-50 dark:bg-zinc-950 animate-pulse" />
    ),
  }
);

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleHeroLoaded = () => {
    setHeroLoaded(true);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection onLoaded={handleHeroLoaded} />
      {heroLoaded && (
        <>
          <AboutSection />
          <ServicesSection />
          <CompanySection />
          <Suspense
            fallback={
              <div className="py-16 bg-zinc-50 dark:bg-zinc-950 animate-pulse" />
            }
          >
            <ProjectsSection />
          </Suspense>
          {/* <TestimonialsSection /> */}
          <Suspense
            fallback={
              <div className="py-16 bg-zinc-50 dark:bg-zinc-950 animate-pulse" />
            }
          >
            <TransitionSection />
          </Suspense>
          <Suspense
            fallback={
              <div className="py-16 bg-zinc-50 dark:bg-zinc-950 animate-pulse" />
            }
          >
            <ContactSection />
          </Suspense>
          <Suspense
            fallback={
              <div className="py-16 bg-zinc-50 dark:bg-zinc-950 animate-pulse" />
            }
          >
            <NewsSection />
          </Suspense>
          <Suspense
            fallback={
              <div className="py-16 bg-zinc-50 dark:bg-zinc-950 animate-pulse" />
            }
          >
            <PartnersSection />
          </Suspense>
          {/* <MapSection /> */}
        </>
      )}
    </>
  );
}
