'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Copy, Map, Video } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/animations/FadeIn';
import { CONTACT_INFO } from '@/lib/constants/app.constants';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

type ViewMode = 'map' | 'video';

interface Office {
  name: string;
  kind: string;
  locale: string;
  address: string;
  directionsUrl: string;
}

const OFFICES: Office[] = [
  {
    name: 'Head Office',
    kind: 'Headquarters',
    locale: 'Gwarinpa, FCT',
    address:
      'Plot 2, Block 14 Extension, Federal Ministry of Works & Housing Sites and Services Scheme, Setraco Gate, Gwarinpa, FCT, Nigeria.',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=ACOB+LIGHTING+TECHNOLOGY+LIMITED,+Plot+2,+Ministry+of+Works+And+Housing+Sites+and+Service+Scheme,+Setraco+Gate,+behind+Clifford+Mall,+Gwarinpa,+Federal+Capital+Territory',
  },
  {
    name: 'Branch Office',
    kind: 'Branch',
    locale: 'Central Abuja',
    address:
      '1st Floor, Rochas Plaza, 26 Herbert Macaulay Way, Abuja, Nigeria.',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Rochas+Plaza,+26+Herbert+Macaulay+Way,+Abuja,+Nigeria',
  },
];

export default function LocationsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Office Locations' },
  ];

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard!', { duration: 2000 });
    } catch (_err) {
      toast.error('Failed to copy address', { duration: 2000 });
    }
  };

  return (
    <>
      <Hero
        title="Office Locations"
        description="Our Offices."
        image="/images/contact/office-location-hero.webp?height=400&width=1200"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* ── Editorial dateline (info, not a headline) ──────── */}
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-y border-border py-3 text-sm text-muted-foreground">
          <span>Two locations · Federal Capital Territory</span>
          <span>
            <b className="font-semibold text-foreground">Mon–Fri</b>{' '}
            {CONTACT_INFO.workHours.weekdays.replace('Monday – Friday, ', '')}
          </span>
        </div>

        {/* ── Map / Video feature ────────────────────────────── */}
        <section className="mt-10 md:mt-14">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionEyebrow>Explore</SectionEyebrow>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {viewMode === 'map' ? 'Locate the head office' : 'Take a tour'}
              </h2>
            </div>

            {/* Segmented toggle */}
            <div className="inline-flex self-start rounded-full border border-border bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setViewMode('map')}
                aria-pressed={viewMode === 'map'}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
                  viewMode === 'map'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Map className="h-4 w-4" />
                Map View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('video')}
                aria-pressed={viewMode === 'video'}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
                  viewMode === 'video'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Video className="h-4 w-4" />
                Video Tour
              </button>
            </div>
          </div>

          <FadeIn className="overflow-hidden rounded-2xl border border-border bg-surface">
            {/* Map View */}
            <div className={cn(viewMode === 'map' ? 'block' : 'hidden')}>
              <div className="h-[420px] w-full md:h-[520px]">
                <iframe
                  title="ACOB Lighting Technology Limited Head Office and Branch Locations"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4042.0004937198446!2d7.418824175135592!3d9.11723979094763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b1e73987599%3A0xd8a3ed0c898644c5!2sACOB%20LIGHTING%20TECHNOLOGY%20LIMITED!5e1!3m2!1sen!2sng!4v1752592656509!5m2!1sen!2sng&maptype=satellite"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Video View */}
            <div className={cn(viewMode === 'video' ? 'block' : 'hidden')}>
              <div className="relative aspect-video w-full bg-muted/50">
                <iframe
                  src="https://player.vimeo.com/video/1147319323?title=0&byline=0&portrait=0"
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="ACOB Office Location Video Tour"
                />
              </div>
              <div className="border-t border-border p-5 md:p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Virtual Office Tour
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Take a virtual tour of our facilities and see where we work to
                  bring sustainable energy solutions to communities across
                  Nigeria.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── Offices index ──────────────────────────────────── */}
        <section className="mt-16 border-t border-border pt-8 md:mt-24 md:pt-10">
          <SectionEyebrow>The addresses</SectionEyebrow>

          <div className="mt-8 border-t border-border">
            {OFFICES.map((office, i) => (
              <FadeIn
                key={office.name}
                delay={i * 0.12}
                className="grid grid-cols-1 gap-x-8 gap-y-4 border-b border-border py-8 md:grid-cols-[90px_1fr] md:py-10"
              >
                <div className="text-4xl font-extrabold leading-none tabular-nums text-primary md:text-5xl">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                    {office.name}
                  </h3>
                  <span className="mt-1 inline-block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {office.kind} — {office.locale}
                  </span>

                  <button
                    onClick={() => handleCopyAddress(office.address)}
                    className="group mt-5 block max-w-[36ch] text-left"
                  >
                    <span className="text-lg font-medium leading-relaxed text-foreground md:text-xl">
                      {office.address}
                    </span>
                    <span className="mt-2 flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground transition-colors group-hover:text-primary">
                      <Copy className="h-3 w-3" />
                      Copy address
                    </span>
                  </button>

                  <div className="mt-7 grid grid-cols-1 gap-6 border-t border-border pt-5 sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                    <div>
                      <div className="mb-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        Phone
                      </div>
                      <a
                        href={`tel:${CONTACT_INFO.phone.primary.replace(/\s/g, '')}`}
                        className="block font-semibold tabular-nums text-foreground hover:text-primary hover:underline"
                      >
                        {CONTACT_INFO.phone.primary}
                      </a>
                      <a
                        href={`tel:${CONTACT_INFO.phone.secondary.replace(/\s/g, '')}`}
                        className="block font-semibold tabular-nums text-foreground hover:text-primary hover:underline"
                      >
                        {CONTACT_INFO.phone.secondary}
                      </a>
                    </div>
                    <div>
                      <div className="mb-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        Email
                      </div>
                      <a
                        href={`mailto:${CONTACT_INFO.email.general}`}
                        className="block break-all font-semibold text-foreground hover:text-primary hover:underline"
                      >
                        {CONTACT_INFO.email.general}
                      </a>
                      <a
                        href={`mailto:${CONTACT_INFO.email.secondary}`}
                        className="block break-all font-semibold text-foreground hover:text-primary hover:underline"
                      >
                        {CONTACT_INFO.email.secondary}
                      </a>
                    </div>
                  </div>

                  <Link
                    href={office.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-7 inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-bold text-foreground transition-all hover:gap-3 hover:border-primary hover:text-primary"
                  >
                    Get directions
                    <span aria-hidden className="transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
