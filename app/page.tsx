import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { CompanySection } from '@/components/sections/company-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { UpdatesSection } from '@/components/sections/updates-section';
import { ContactSection } from '@/components/sections/contact-section';
import { PartnersSection } from '@/components/sections/partners-section';
import {
  getProjects,
  getFeaturedProjects,
  getUpdatePosts,
} from '@/sanity/lib/client';
import type { Metadata } from 'next';

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
  metadataBase: new URL('https://acoblighting.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description:
      'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    type: 'website',
    url: 'https://acoblighting.com',
    siteName: 'ACOB Lighting Technology Limited',
    locale: 'en_US',
    images: [
      {
        url: 'https://acoblighting.com/images/olooji-community.webp',
        width: 1200,
        height: 630,
        alt: 'ACOB Lighting Solar Installation Project',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description:
      'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    creator: '@acoblighting',
    images: ['https://acoblighting.com/images/olooji-community.webp'],
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
  verification: {
    google: 'your-google-verification-code',
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
    <>
      <HeroSection projects={featuredProjects} />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection projects={projects} />
      <CompanySection />
      <TestimonialsSection />
      <UpdatesSection posts={posts} />
      <ContactSection />
      <PartnersSection />
    </>
  );
}
