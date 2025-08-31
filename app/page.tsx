import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { CompanySection } from '@/components/sections/company-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { TransitionSection } from '@/components/sections/transition-section';
import { ContactSection } from '@/components/sections/contact-section';
import { UpdatesSection } from '@/components/sections/updates-section';
import { PartnersSection } from '@/components/sections/partners-section';
import { getProjects } from '@/sanity/lib/client';
import { getUpdatePosts } from '@/sanity/lib/client';

export default async function HomePage() {
  // Fetch data server-side
  const [projects, posts] = await Promise.all([
    getProjects(),
    getUpdatePosts(),
  ]);

  return (
    <>
      <HeroSection projects={projects} />
      <AboutSection />
      <ServicesSection />
      <CompanySection />
      <ProjectsSection projects={projects} />
      <TransitionSection />
      <ContactSection />
      <UpdatesSection posts={posts} />
      <PartnersSection />
    </>
  );
}
