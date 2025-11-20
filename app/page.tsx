import dynamic from 'next/dynamic';
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
import type { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
  description:
    'ACOB Lighting Technology Limited is a leading supplier of solar materials for manufacturers, installers & contractors. We provide mini-grid solutions, street lighting infrastructure, and comprehensive solar energy services across Nigeria.',
  keywords:
    'solar energy, mini-grid solutions, street lighting, solar materials, renewable energy, Nigeria, ACOB Lighting, sustainable energy, clean power, solar installation',
  authors: [{ name: 'ACOB Lighting Technology Limited' }],
  creator: 'ACOB Lighting Technology Limited',
  publisher: 'ACOB Lighting Technology Limited',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.acoblighting.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description:
      'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    type: 'website',
    url: 'https://www.acoblighting.com',
    siteName: 'ACOB Lighting Technology Limited',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.acoblighting.com/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'ACOB Lighting Technology - Get a Quote for Solar Energy Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description:
      'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    creator: '@acoblighting',
    images: ['https://www.acoblighting.com/images/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Revalidate every 5 minutes (300 seconds)
export const revalidate = 300;

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
