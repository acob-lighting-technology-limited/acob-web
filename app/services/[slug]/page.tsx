import {
  Breadcrumb,
  generateBreadcrumbSchema,
} from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getServiceBySlug, servicesData } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/ui/page-hero';
import CallToAction from '@/components/layout/call-to-action';
import { Metadata } from 'next';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return servicesData.map(service => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found - ACOB Lighting Technology Limited',
      description: 'The requested service could not be found.',
    };
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.title },
  ];

  return {
    title: `${service.title} - ACOB Lighting Technology Limited`,
    description:
      service.excerpt ||
      `Learn about ${service.title} services from ACOB Lighting Technology Limited. We provide comprehensive solar energy solutions including ${service.title.toLowerCase()} across Nigeria.`,
    keywords: `${service.title}, solar energy, ${service.title.toLowerCase()}, ACOB Lighting, Nigeria solar services, renewable energy`,
    openGraph: {
      title: `${service.title} - ACOB Lighting Technology Limited`,
      description:
        service.excerpt ||
        `Learn about ${service.title} services from ACOB Lighting.`,
      type: 'website',
      url: `https://new.acoblighting.com/services/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} - ACOB Lighting Technology Limited`,
      description:
        service.excerpt ||
        `Learn about ${service.title} services from ACOB Lighting.`,
    },
    other: {
      'application/ld+json': JSON.stringify(
        generateBreadcrumbSchema(breadcrumbItems)
      ),
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.title },
  ];

  // Create sidebar links with current service marked as active
  const sidebarLinks = servicesData.map(s => ({
    label: s.title,
    href: `/services/${s.slug}`,
    isActive: s.slug === slug,
  }));

  // Get related services (excluding current service)
  const relatedServices = servicesData.filter(s => s.slug !== slug).slice(0, 3); // Show only 3 related services

  return (
    <>
      <PageHero description={service.title} backgroundImage={service.image} />
      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 lg:space-y-4">
            {/* Overview */}
            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-4 sm:p-6 xl:p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Overview
                </h2>
                <div className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                  {service.description}
                </div>

                {/* Gallery */}
                {service.gallery.length > 0 && (
                  <div className="grid grid-cols-1  gap-4 mt-6">
                    {service.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-[4/3] overflow-hidden rounded-lg relative"
                      >
                        <Image
                          src={image || '/placeholder.svg'}
                          alt={`${service.title} project ${index + 1}`}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover  transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features */}
            {/* <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-4 sm:p-6 xl:p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Applications */}
            {/* <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-4 sm:p-6 xl:p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.applications.map((application, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{application}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Why Choose Us */}
            {/* <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-4 sm:p-6 xl:p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Why Choose Us?
                </h2>
                <div className="space-y-4">
                  {service.whyChooseUs.map((reason, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{reason}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Services Navigation - Hidden on mobile */}
            <Card className="!border-t-2 !border-t-primary border border-border hidden lg:block">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Our Services
                </h2>
                <div className="space-y-2">
                  {sidebarLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className={`
                        block p-3 rounded-lg transition-all duration-500 text-sm border border-border
                        ${
                          link.isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-muted/30 text-foreground hover:bg-muted/50 hover:text-foreground'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{link.label}</span>
                        {link.isActive && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h2 className="font-semibold mb-4">Need This Service?</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a customized quote for {service.title.toLowerCase()}.
                </p>
                <Link href="/contact/quote">
                  <Button variant="default" className="w-full">
                    Get Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Service Features */}
            {service.features && service.features.length > 0 && (
              <Card className="!border-t-2 !border-t-primary border border-border">
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4">Key Features</h2>
                  <ul className="space-y-2">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-sm p-2 rounded-lg bg-muted/30 border border-border"
                      >
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Call to Action Widget */}
            <CallToAction />
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Related Services</h3>
            <ul className="space-y-2">
              {relatedServices.map(relatedService => (
                <li key={relatedService.id}>
                  <Link
                    href={`/services/${relatedService.slug}`}
                    className="group flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-muted/50 border border-border hover:border-primary/50"
                  >
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {relatedService.title}
                      </h4>
                      {relatedService.excerpt && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {relatedService.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <Link href="/services">
                <Button variant="outline">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Back to Services Button */}
        <div className="mt-12 mb-8 text-center">
          <Link href="/services">
            <Button variant="outline" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Services
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
