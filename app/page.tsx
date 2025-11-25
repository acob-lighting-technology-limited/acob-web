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
