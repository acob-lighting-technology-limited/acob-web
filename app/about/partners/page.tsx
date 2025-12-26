'use client';

import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { partners } from '@/lib/data/partners-data';
import { FadeIn } from '@/components/animations/FadeIn';
import { getBlurDataURL } from '@/lib/utils/image-optimization';
import { Handshake, Video } from 'lucide-react';

export default function PartnersPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Partners' },
  ];

  const infraCreditPartner = partners.find(p => p.name === 'InfraCredit');

  // Debug: Check if fullName exists
  console.log('First partner:', partners[0]);
  console.log('Has fullName?', partners[0]?.fullName);

  return (
    <>
      <Hero
        title="Our Partners"
        description="Powering Progress Through Strategic Collaborations"
        image="/images/about/partners-collage.webp"
      />

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-10" />

        {/* InfraCredit Featured Section */}
        {infraCreditPartner && (
          <FadeIn delay={0.1} className="mb-16 w-full max-w-full">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden w-full max-w-full">
              <CardContent className="p-0 max-w-full overflow-hidden w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-0 w-full max-w-full">
                  {/* Video Section - Takes 60% (3/5) */}
                  <div className="relative w-full max-w-full aspect-video lg:aspect-auto lg:h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] bg-muted/50 order-2 lg:order-1 overflow-hidden">
                    <div className="absolute inset-0 w-full h-full max-w-full overflow-hidden">
                      <iframe
                        src="https://www.youtube.com/embed/C6S2Qj-Dsc0"
                        className="absolute top-0 left-0 w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        title="ACOB & InfraCredit Partnership Video"
                        style={{
                          maxWidth: '100%',
                          width: '100%',
                          maxHeight: '100%',
                          height: '100%',
                          boxSizing: 'border-box',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                        <Video className="h-3 w-3 mr-1" />
                        Partnership Video
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section - Takes 40% (2/5) */}
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center order-1 lg:order-2">
                    <div className="mb-4">
                      <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                        Featured Partnership
                      </Badge>
                      <div className="relative h-16 w-auto mb-6">
                        <Image
                          src={infraCreditPartner.logo}
                          alt={infraCreditPartner.name}
                          width={200}
                          height={80}
                          className="h-full w-auto object-contain"
                          quality={90}
                        />
                      </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-foreground">
                      ACOB & InfraCredit Partnership
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground mb-6">
                      Discover how our strategic partnership with InfraCredit is
                      enabling sustainable energy access across rural Nigeria
                      through innovative green infrastructure financing.
                      Together, we're scaling solar mini-grid solutions and
                      empowering communities with reliable, clean energy.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Handshake className="h-4 w-4 text-primary" />
                      <span>
                        Strategic Infrastructure Financing Partnership
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        )}

        {/* All Partners Grid */}
        <FadeIn delay={0.2}>
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-foreground">
                Trusted Partners & Collaborators
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We collaborate with leading organizations, government agencies,
                and technology providers to deliver sustainable energy solutions
                across Nigeria.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {partners.map((partner, index) => (
                <FadeIn
                  key={partner.slug}
                  delay={0.1 + index * 0.05}
                  direction="up"
                >
                  <Link
                    href={`/about/partners/${partner.slug}`}
                    className="block h-full"
                  >
                    <div className="group h-full perspective-1000 cursor-pointer">
                      <div className="relative h-full min-h-[160px] transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                        {/* Front - Logo */}
                        <Card className="absolute inset-0 backface-hidden border border-border bg-card hover:border-primary/50 transition-colors duration-300 hover:shadow-lg">
                          <CardContent className="p-4 sm:p-6 flex items-center justify-center h-full">
                            <div className="relative w-full h-full flex items-center justify-center rounded-lg p-3">
                              <Image
                                src={partner.logo}
                                alt={partner.name}
                                width={150}
                                height={100}
                                className="h-auto w-full max-w-[120px] object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                loading="lazy"
                                quality={75}
                                placeholder="blur"
                                blurDataURL={getBlurDataURL()}
                              />
                            </div>
                          </CardContent>
                        </Card>

                        {/* Back - Description */}
                        <Card className="absolute inset-0 backface-hidden rotate-y-180 border border-primary/50 bg-primary/5">
                          <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center h-full text-center gap-2">
                            <Badge className="text-[10px] px-2 py-0.5">
                              {partner.category}
                            </Badge>
                            <h3 className="font-semibold text-sm sm:text-base leading-tight text-foreground px-2">
                              {partner.fullName}
                            </h3>
                            <span className="text-xs text-primary font-medium mt-auto">
                              Learn more →
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
