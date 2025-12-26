import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Handshake, CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';
import { partners } from '@/lib/data/partners-data';
import { getBlurDataURL } from '@/lib/utils/image-optimization';

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

  return (
    <>
      <Hero
        title={partner.name}
        description={
          partner.details?.partnershipType || 'Strategic Partnership'
        }
        image="/images/about/partners-collage.webp"
      />

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-10" />

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Video Section (if available) */}
            {partner.details?.videoUrl && (
              <FadeIn delay={0.1}>
                <Card className="overflow-hidden border-2 border-primary/20">
                  <div className="relative w-full aspect-video bg-muted/50">
                    <iframe
                      src={partner.details.videoUrl}
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title={`${partner.name} Partnership Video`}
                    />
                  </div>
                </Card>
              </FadeIn>
            )}

            {/* Overview Section */}
            <FadeIn delay={0.2}>
              <Card className="border border-border bg-surface p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Handshake className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">
                      Partnership Overview
                    </h2>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {partner.details?.overview}
                  </p>
                </div>
              </Card>
            </FadeIn>

            {/* Key Achievements */}
            {partner.details?.keyAchievements &&
              partner.details.keyAchievements.length > 0 && (
                <FadeIn delay={0.3}>
                  <Card className="border border-border bg-surface p-6 sm:p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Key Achievements
                    </h3>
                    <ul className="space-y-3">
                      {partner.details.keyAchievements.map(
                        (achievement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-base text-muted-foreground">
                              {achievement}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </Card>
                </FadeIn>
              )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Partner Logo Card */}
            <FadeIn delay={0.1}>
              <Card className="border border-border bg-surface p-6">
                <div className="space-y-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {partner.category}
                  </Badge>
                  <div className="relative h-24 w-full flex items-center justify-center bg-muted/30 rounded-lg p-4">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={200}
                      height={100}
                      className="h-auto w-full max-w-[180px] object-contain"
                      quality={90}
                      placeholder="blur"
                      blurDataURL={getBlurDataURL()}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </Card>
            </FadeIn>

            {/* Partnership Type */}
            <FadeIn delay={0.2}>
              <Card className="border border-primary/30 bg-primary/5 p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                  Partnership Type
                </h4>
                <p className="text-base text-foreground">
                  {partner.details?.partnershipType}
                </p>
              </Card>
            </FadeIn>

            {/* Website Link */}
            {partner.details?.website && (
              <FadeIn delay={0.3}>
                <Card className="border border-border bg-surface p-6">
                  <a
                    href={partner.details.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm font-medium">Visit Website</span>
                  </a>
                </Card>
              </FadeIn>
            )}

            {/* Related Partners */}
            <FadeIn delay={0.4}>
              <Card className="border border-border bg-surface p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                  Related Partners
                </h4>
                <div className="space-y-3">
                  {partners
                    .filter(
                      p =>
                        p.category === partner.category &&
                        p.slug !== partner.slug,
                    )
                    .slice(0, 3)
                    .map(relatedPartner => (
                      <Link
                        key={relatedPartner.slug}
                        href={`/about/partners/${relatedPartner.slug}`}
                        className="block group"
                      >
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="relative h-12 w-16 flex items-center justify-center bg-muted/30 rounded">
                            <Image
                              src={relatedPartner.logo}
                              alt={relatedPartner.name}
                              width={60}
                              height={40}
                              className="h-auto w-full max-w-[50px] object-contain"
                              quality={75}
                            />
                          </div>
                          <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                            {relatedPartner.name}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              </Card>
            </FadeIn>
          </aside>
        </div>

        {/* Back Button */}
        <div className="mt-12 mb-8">
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
