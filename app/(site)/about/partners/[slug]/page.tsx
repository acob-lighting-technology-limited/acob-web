import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { ArrowLeft, ExternalLink, Handshake, CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';
import { partners } from '@/lib/data/partners-data';
import { getBlurDataURL } from '@/lib/utils/image-optimization';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

interface PartnerDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return partners.map(partner => ({
    slug: partner.slug,
  }));
}

export async function generateMetadata({ params }: PartnerDetailPageProps) {
  const { slug } = await params;
  const partner = partners.find(p => p.slug === slug);

  if (!partner) {
    return {
      title: 'Partner Not Found',
    };
  }

  return {
    title: `${partner.name} - Partnership | ACOB`,
    description: partner.description,
  };
}

export default async function PartnerDetailPage({
  params,
}: PartnerDetailPageProps) {
  const { slug } = await params;
  const partner = partners.find(p => p.slug === slug);

  if (!partner) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Partners', href: '/about/partners' },
    { label: partner.name },
  ];

  const relatedPartners = partners
    .filter(p => p.category === partner.category && p.slug !== partner.slug)
    .slice(0, 3);

  return (
    <>
      <Hero
        title={partner.name}
        description={
          partner.details?.partnershipType || 'Strategic Partnership'
        }
        image="/images/about/partners-collage.webp"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
          {/* Main content */}
          <div className="space-y-12 md:space-y-16">
            {partner.details?.videoUrl && (
              <FadeIn>
                <div className="relative aspect-video w-full overflow-hidden border border-border bg-muted/50 rounded-lg">
                  <iframe
                    src={partner.details.videoUrl}
                    className="absolute left-0 top-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={`${partner.name} Partnership Video`}
                  />
                </div>
              </FadeIn>
            )}

            <FadeIn>
              <section>
                <div className="flex items-center gap-2">
                  <Handshake className="h-4 w-4 text-primary" />
                  <SectionEyebrow>Partnership overview</SectionEyebrow>
                </div>
                <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-foreground/90">
                  {partner.details?.overview}
                </p>
              </section>
            </FadeIn>

            {partner.details?.keyAchievements &&
              partner.details.keyAchievements.length > 0 && (
                <FadeIn>
                  <section>
                    <SectionEyebrow>Track record</SectionEyebrow>
                    <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
                      Key achievements
                    </h2>
                    <div className="mt-6 border-t border-border">
                      {partner.details.keyAchievements.map(
                        (achievement, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 border-b border-border py-4"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <span className="leading-relaxed text-muted-foreground">
                              {achievement}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </section>
                </FadeIn>
              )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-10 lg:sticky lg:top-24">
            <section>
              <div className="border-t border-border pt-4">
                <span className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {partner.category}
                </span>
              </div>
              <div className="mt-4 flex h-24 w-full items-center justify-center overflow-hidden rounded-lg bg-muted/30 p-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={200}
                  height={100}
                  className="h-full w-auto max-w-[180px] object-contain"
                  quality={90}
                  placeholder="blur"
                  blurDataURL={getBlurDataURL()}
                />
              </div>
              <h3 className="mt-4 text-lg font-extrabold tracking-tight text-foreground">
                {partner.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {partner.description}
              </p>
            </section>

            {partner.details?.partnershipType && (
              <section className="border-t border-border pt-4">
                <h4 className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Partnership Type
                </h4>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {partner.details.partnershipType}
                </p>
              </section>
            )}

            {partner.details?.website && (
              <a
                href={partner.details.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                <ExternalLink className="h-4 w-4 text-primary" />
                Visit Website
              </a>
            )}

            {relatedPartners.length > 0 && (
              <section className="border-t border-border pt-4">
                <h4 className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Related Partners
                </h4>
                <div className="mt-3 divide-y divide-border">
                  {relatedPartners.map(relatedPartner => (
                    <Link
                      key={relatedPartner.slug}
                      href={`/about/partners/${relatedPartner.slug}`}
                      className="group -mx-2 flex items-center gap-3 px-2 py-3 transition-colors hover:bg-muted/40"
                    >
                      <div className="relative flex h-12 w-16 shrink-0 items-center justify-center bg-muted/30 rounded">
                        <Image
                          src={relatedPartner.logo}
                          alt={relatedPartner.name}
                          width={60}
                          height={40}
                          className="h-auto w-full max-w-[50px] object-contain"
                          quality={75}
                        />
                      </div>
                      <span className="text-sm text-foreground transition-colors group-hover:text-primary">
                        {relatedPartner.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>

        <div className="mb-8 mt-16 text-center">
          <Link href="/about/partners">
            <Button variant="outline" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to All Partners
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
