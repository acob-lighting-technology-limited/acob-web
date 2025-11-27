import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { UpdatesSection } from '@/components/sections/updates-section';
import {
  getProjects,
  getFeaturedProjects,
  getUpdatePosts,
} from '@/sanity/lib/client';

// Lazy load below-the-fold sections
const CompanySection = dynamic(
  () =>
    import('@/components/sections/company-section').then(
      mod => mod.CompanySection,
    ),
  { ssr: true },
);

const PartnersSection = dynamic(
  () =>
    import('@/components/sections/partners-section').then(
      mod => mod.PartnersSection,
    ),
  { ssr: true },
);

// Revalidate every 5 minutes (300 seconds)
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
  description:
    'ACOB Lighting Technology Limited is a leading supplier of solar materials for manufacturers, installers & contractors. We provide mini-grid solutions, street lighting infrastructure, and comprehensive solar energy services across Nigeria.',
  openGraph: {
    title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description:
      'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    type: 'website',
    url: 'https://www.acoblighting.com/',
    siteName: 'ACOB Lighting Technology Limited',
    images: [
      {
        url: 'https://www.acoblighting.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ACOB Lighting Solar Energy Solutions - Mini-Grid Projects Across Nigeria',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description:
      'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    images: ['https://www.acoblighting.com/images/og-image.jpg'],
  },
};

export default async function HomePage() {
  // Fetch data server-side
  const [projects, featuredProjects, posts] = await Promise.all([
    getProjects(),
    getFeaturedProjects(),
    getUpdatePosts(),
  ]);

  return (
    <main role="main">
      <HeroSection projects={featuredProjects} />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection projects={projects} />
      <CompanySection />
      <UpdatesSection posts={posts} />
      <PartnersSection />
    </main>
  );
}
