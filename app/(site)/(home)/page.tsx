import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { HeroSectionV2 } from '@/components/sections/hero-section-v2';
import { AboutSectionV2 } from '@/components/sections/about-section-v2';
import { ServicesSection } from '@/components/sections/services-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { UpdatesSection } from '@/components/sections/updates-section';
import {
  getProjectsForListing,
  getFeaturedProjects,
  getUpdatePosts,
} from '@/sanity/lib/queries';
import {
  ANNIVERSARY_2026,
  isAnniversaryYear2026,
} from '@/lib/constants/anniversary';

// Lazy load below-the-fold sections
const PartnersSectionV2 = dynamic(
  () =>
    import('@/components/sections/partners-section-v2').then(
      mod => mod.PartnersSectionV2,
    ),
  { ssr: true },
);

const NigeriaReachSection = dynamic(
  () =>
    import('@/components/sections/nigeria-reach-section').then(
      mod => mod.NigeriaReachSection,
    ),
  { ssr: true },
);

const CtaSectionV2 = dynamic(
  () =>
    import('@/components/sections/cta-section-v2').then(
      mod => mod.CtaSectionV2,
    ),
  { ssr: true },
);

// Revalidate every 5 minutes (300 seconds)
export const revalidate = 300;

const isAnniversaryYear = isAnniversaryYear2026();

export const metadata: Metadata = {
  title: isAnniversaryYear
    ? `${ANNIVERSARY_2026.title} | ACOB Lighting Technology Limited`
    : 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
  description: isAnniversaryYear
    ? `${ANNIVERSARY_2026.summary} ${ANNIVERSARY_2026.period} • ${ANNIVERSARY_2026.tagline}.`
    : 'ACOB Lighting Technology Limited is a leading supplier of solar materials for manufacturers, installers & contractors. We provide mini-grid solutions, street lighting infrastructure, and comprehensive solar energy services across Nigeria.',
  openGraph: {
    title: isAnniversaryYear
      ? `${ANNIVERSARY_2026.title} | ACOB Lighting Technology Limited`
      : 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description: isAnniversaryYear
      ? `${ANNIVERSARY_2026.summary} ${ANNIVERSARY_2026.period} • ${ANNIVERSARY_2026.tagline}.`
      : 'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    type: 'website',
    url: 'https://www.acoblighting.com/',
    siteName: 'ACOB Lighting Technology Limited',
    images: [
      {
        url: isAnniversaryYear
          ? 'https://www.acoblighting.com/images/acob-10-years-impact-2026.jpeg'
          : 'https://www.acoblighting.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: isAnniversaryYear
          ? 'ACOB Lighting Technology Limited celebrating 10 years of impact, 2016 to 2026'
          : 'ACOB Lighting Solar Energy Solutions - Mini-Grid Projects Across Nigeria',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: isAnniversaryYear
      ? `${ANNIVERSARY_2026.title} | ACOB Lighting Technology Limited`
      : 'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
    description: isAnniversaryYear
      ? `${ANNIVERSARY_2026.summary} ${ANNIVERSARY_2026.period} • ${ANNIVERSARY_2026.tagline}.`
      : 'Leading supplier of solar materials and mini-grid solutions for manufacturers, installers & contractors across Nigeria.',
    images: [
      isAnniversaryYear
        ? 'https://www.acoblighting.com/images/acob-10-years-impact-2026.jpeg'
        : 'https://www.acoblighting.com/images/og-image.jpg',
    ],
  },
};

export default async function HomePage() {
  // Fetch data server-side
  const [projects, featuredProjects, posts] = await Promise.all([
    getProjectsForListing(),
    getFeaturedProjects(),
    getUpdatePosts(),
  ]);

  return (
    <main role="main">
      <HeroSectionV2 projects={featuredProjects} />
      <AboutSectionV2 />
      <ServicesSection />
      <ProjectsSection projects={projects} />
      <NigeriaReachSection projects={projects} showMoreLink />
      <UpdatesSection posts={posts} />
      <PartnersSectionV2 />
      <CtaSectionV2 />
    </main>
  );
}
