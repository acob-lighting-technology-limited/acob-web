import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { CompanySection } from '@/components/sections/company-section';

import { TransitionSection } from '@/components/sections/transition-section';
import { ContactSection } from '@/components/sections/contact-section';
import { NewsSection } from '@/components/sections/news-section';
import { PartnersSection } from '@/components/sections/partners-section';
import { MapSection } from '@/components/sections/map-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ChatBot } from '@/components/chat-box';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CompanySection />
      <ProjectsSection />
      <TransitionSection />
      <div id="get-quote">
        {' '}
        <ContactSection />
      </div>
      <NewsSection />
      <PartnersSection />
      <ChatBot />
      {/* <MapSection /> */}
    </>
  );
}
