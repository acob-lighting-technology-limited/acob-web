import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { CompanySection } from '@/components/sections/company-section';
import { TransitionSection } from '@/components/sections/transition-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { UpdatesSection } from '@/components/sections/updates-section';
import { ContactSection } from '@/components/sections/contact-section';
import { PartnersSection } from '@/components/sections/partners-section';
import { MapSection } from '@/components/sections/map-section';
import { getProjects, getFeaturedProjects } from '@/sanity/lib/client';
import { getUpdatePosts } from '@/sanity/lib/client';

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
      {/* <TransitionSection /> */}
      <TestimonialsSection />
      <UpdatesSection posts={posts} />
      <ContactSection />
      <PartnersSection />
      {/* <MapSection /> */}
    </>
  );
}
