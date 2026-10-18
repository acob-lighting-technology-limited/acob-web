import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Building2, Map, MapPin } from 'lucide-react';

import { FadeIn } from '@/components/animations/FadeIn';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { NigeriaReachSection } from '@/components/sections/nigeria-reach-section';
import { COMPANY_STATS } from '@/lib/constants/app.constants';
import { getProjectsForListing } from '@/sanity/lib/queries';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

export const metadata: Metadata = {
  title: 'Our Reach | ACOB Lighting',
  description:
    "Explore ACOB's project footprint, active project states, and community impact across Nigeria.",
};

export const revalidate = 300;

const reachHighlights = [
  {
    label: 'Communities Served',
    value: `${COMPANY_STATS.communitiesServed}+`,
  },
  {
    label: 'Installed Capacity',
    value: `${COMPANY_STATS.totalCapacityMW}MW+`,
  },
  {
    label: 'Beneficiaries',
    value: '50K+',
  },
  {
    label: 'Installed Projects',
    value: `${COMPANY_STATS.projectsCompleted}+`,
  },
];

const reachDetails = [
  {
    icon: Map,
    title: 'Active Project States',
    description:
      'Green states indicate locations where ACOB has active project presence.',
  },
  {
    icon: MapPin,
    title: 'Project Sites',
    description:
      'Black dots represent individual project sites positioned from stored coordinates.',
  },
  {
    icon: Building2,
    title: 'Headquarters',
    description:
      'The HQ marker points to our main office and links directly to our locations page.',
  },
];

export default async function OurReachPage() {
  const projects = await getProjectsForListing();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Reach' },
  ];

  return (
    <>
      <Hero
        title="Our Reach"
        description="Nationwide, and Growing."
        image="/images/about/our-reach.webp"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Standfirst */}
        <div className="max-w-[68ch]">
          <SectionEyebrow>National footprint</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            This map highlights the states where we are active, our project
            sites, and our headquarters — use it to explore the breadth of our
            deployment activity across Nigeria.
          </p>
        </div>

        {/* Map */}
        <div className="mt-8 md:mt-10">
          <NigeriaReachSection projects={projects} embedded />
        </div>

        {/* Stat band */}
        <section className="mt-8 border-y border-border py-10 md:mt-10 md:py-12">
          <dl className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
            {reachHighlights.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.08}>
                <div className="border-l border-border pl-4 md:pl-6">
                  <dt className="text-4xl font-extrabold tabular-nums tracking-tight text-foreground md:text-5xl">
                    {item.value}
                  </dt>
                  <dd className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </section>

        {/* What this shows */}
        <section className="mt-16 md:mt-24">
          <SectionEyebrow>Reading the map</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl">
            What this shows
          </h2>

          <div className="mt-8 border-t border-border">
            {reachDetails.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn
                  key={item.title}
                  delay={i * 0.08}
                  className="grid grid-cols-[44px_1fr] gap-x-5 border-b border-border py-6 md:grid-cols-[60px_1fr] md:gap-x-8"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight text-foreground md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[62ch] leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        <div className="mb-8 mt-16 text-center">
          <Link href="/about">
            <Button variant="outline" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to About Overview
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
