'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Copy, Map, Video } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { FadeIn } from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import { CONTACT_INFO } from '@/lib/constants/app.constants';

type ViewMode = 'map' | 'video';

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
      toast.success('Address copied to clipboard!', {
        duration: 2000,
      });
    } catch (_err) {
      toast.error('Failed to copy address', {
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Hero
        title="Office Locations"
        description="Find Us Across Nigeria"
        image="/images/contact/office-location-hero.webp?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content Area - Map or Video */}
          <div className="lg:col-span-2 space-y-6">
            {/* View Toggle */}
            <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-lg w-fit border border-border">
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className={cn(
                  'flex items-center gap-2 transition-all',
                  viewMode === 'map' && 'shadow-sm',
                )}
              >
                <Map className="h-4 w-4" />
                Map View
              </Button>
              <Button
                variant={viewMode === 'video' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('video')}
                className={cn(
                  'flex items-center gap-2 transition-all',
                  viewMode === 'video' && 'shadow-sm',
                )}
              >
                <Video className="h-4 w-4" />
                Video Tour
              </Button>
            </div>

            {/* Map View */}
            <FadeIn delay={0.1}>
              <Card
                className={cn(
                  'border border-border bg-surface overflow-hidden transition-all duration-300',
                  viewMode === 'map' ? 'block' : 'hidden',
                )}
              >
                <CardContent className="p-0">
                  <div className="w-full h-[500px] rounded-lg overflow-hidden">
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
                </CardContent>
              </Card>
            </FadeIn>

            {/* Video View */}
            <FadeIn delay={0.1}>
              <Card
                className={cn(
                  'border border-border bg-surface overflow-hidden transition-all duration-300',
                  viewMode === 'video' ? 'block' : 'hidden',
                )}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video w-full bg-muted/50">
                    <iframe
                      src="https://player.vimeo.com/video/1147319323?title=0&byline=0&portrait=0"
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title="ACOB Office Location Video Tour"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Virtual Office Tour
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Take a virtual tour of our office facilities and see where
                      we work to bring sustainable energy solutions to
                      communities across Nigeria.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Sidebar - Office Information */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Head Office</h3>
                <div className="space-y-3">
                  <button
                    onClick={() =>
                      handleCopyAddress(
                        'Plot 2. Block 14 Extension, Federal Ministry of Works And Housing Sites and Services Scheme, Setraco Gate, Gwarinpa, FCT, Nigeria.',
                      )
                    }
                    className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors w-full text-left group"
                  >
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs text-muted-foreground">Address</p>
                        <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm font-medium">
                        Plot 2. Block 14 Extension, Federal Ministry of Works
                        And Housing Sites and Services Scheme, Setraco Gate,
                        Gwarinpa, FCT, Nigeria.
                      </p>
                    </div>
                  </button>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <div className="flex flex-col gap-1">
                        <a
                          href={`tel:${CONTACT_INFO.phone.primary.replace(/\s/g, '')}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {CONTACT_INFO.phone.primary}
                        </a>
                        <a
                          href={`tel:${CONTACT_INFO.phone.secondary.replace(/\s/g, '')}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {CONTACT_INFO.phone.secondary}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <div className="flex flex-col gap-1">
                        <Link
                          href={`mailto:${CONTACT_INFO.email.general}`}
                          className="hover:underline text-primary text-sm font-medium"
                        >
                          {CONTACT_INFO.email.general}
                        </Link>
                        <Link
                          href={`mailto:${CONTACT_INFO.email.secondary}`}
                          className="hover:underline text-primary text-sm font-medium"
                        >
                          {CONTACT_INFO.email.secondary}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=ACOB+LIGHTING+TECHNOLOGY+LIMITED,+Plot+2,+Ministry+of+Works+And+Housing+Sites+and+Service+Scheme,+Setraco+Gate,+behind+Clifford+Mall,+Gwarinpa,+Federal+Capital+Territory"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 flex items-center font-medium"
                  >
                    <MapPin className="mr-1 h-3 w-3" />
                    Get Directions
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Branch Office</h3>
                <div className="space-y-3">
                  <button
                    onClick={() =>
                      handleCopyAddress(
                        '1st Floor, Rochas Plaza, 26 Herbert Macaulay Way, Abuja, Nigeria',
                      )
                    }
                    className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors w-full text-left group"
                  >
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs text-muted-foreground">Address</p>
                        <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm font-medium">
                        1st Floor, Rochas Plaza, 26 Herbert Macaulay Way, Abuja,
                        Nigeria
                      </p>
                    </div>
                  </button>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <div className="flex flex-col gap-1">
                        <a
                          href={`tel:${CONTACT_INFO.phone.primary.replace(/\s/g, '')}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {CONTACT_INFO.phone.primary}
                        </a>
                        <a
                          href={`tel:${CONTACT_INFO.phone.secondary.replace(/\s/g, '')}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {CONTACT_INFO.phone.secondary}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <div className="flex flex-col gap-1">
                        <Link
                          href={`mailto:${CONTACT_INFO.email.general}`}
                          className="hover:underline text-primary text-sm font-medium"
                        >
                          {CONTACT_INFO.email.general}
                        </Link>
                        <Link
                          href={`mailto:${CONTACT_INFO.email.secondary}`}
                          className="hover:underline text-primary text-sm font-medium"
                        >
                          {CONTACT_INFO.email.secondary}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=Rochas+Plaza,+26+Herbert+Macaulay+Way,+Abuja,+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 flex items-center font-medium"
                  >
                    <MapPin className="mr-1 h-3 w-3" />
                    Get Directions
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
