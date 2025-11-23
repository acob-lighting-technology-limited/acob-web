import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getServiceBySlug, servicesData } from '@/lib/data';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import { ServiceGallery } from '@/components/services/service-gallery';

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

  // Get related services (excluding current service)
  const relatedServices = servicesData.filter(s => s.slug !== slug).slice(0, 3); // Show only 3 related services

  return (
    <>
      <PageHero
        title="Our Services"
        description={service.title}
        backgroundImage={service.image}
      />
      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="space-y-4">
          {/* Main Content */}
          <div>
            {/* Overview */}
            <Card className="border shadow-md border-border bg-surface ">
              <CardContent className="p-4 sm:p-6 xl:p-8">
                <div className="max-w-3xl">
                  <h2 className="text-3xl font-bold mb-6 text-foreground">
                    Overview
                  </h2>
                  <div className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                    {service.description}
                  </div>
                </div>

                {/* Gallery outside max-w-3xl */}
                {service.gallery && service.gallery.length > 0 && (
                  <div className="mt-6">
                    <ServiceGallery
                      images={service.gallery}
                      serviceTitle={service.title}
                    />
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
              {/* <Link href="/services">
                <Button variant="outline">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link> */}
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
