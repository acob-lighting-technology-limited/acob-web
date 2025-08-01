import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Phone, MapPin, LifeBuoy, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { MaskText } from '@/components/animations/MaskText';
import { OptimizedImage } from '@/components/ui/optimized-image';

const contactSections = [
  {
    title: 'Get a Quote',
    description:
      'Request a personalized energy audit or project quotation for your needs.',
    href: '/contact/get-quote',
    image: '/images/contact/get-quote.png?height=200&width=300',
  },
  {
    title: 'Office Locations',
    description:
      'Find our head office and branch locations, and get directions.',
    href: '/contact/locations',
    image: '/images/contact/office-location.jpg?height=200&width=300',
  },
  {
    title: 'Support',
    description:
      'Access our support resources or get assistance with your ACOB Lighting products and services.',
    href: '/contact/support',
    image: '/images/contact/support.jpg?height=200&width=300',
  },
  {
    title: 'Careers',
    description:
      'Explore career opportunities and join our growing team of energy innovators.',
    href: '/contact/careers',
    image: '/images/contact/careers.webp?height=200&width=300',
  },
];

export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us' },
  ];

  return (
    <>
      <PageHero
        title="Contact Us"
        backgroundImage="/images/contact/contact-us.jpg?height=400&width=1200"
      >
        <MaskText
          phrases={[
            "We're here to help you with all your clean energy needs.",
            'Reach out to us through our various channels.',
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container className="px-4 py-8 ">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <MaskText phrases={['How Can We Assist You?']} />
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you have a question, need support, or are looking for a
            career opportunity, we&apos;re ready to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactSections.map((section, index) => {
            return (
              <Link key={section.href} href={section.href}>
                <Card className="overflow-hidden bg-surface border-0 custom-shadow  p-0 hover:shadow-lg  h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden flex items-center justify-center bg-primary/5">
                    <OptimizedImage
                      src={section.image || '/placeholder.svg'}
                      alt={section.title}
                      fill
                      className="hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                      {section.description}
                    </p>
                    <Button
                      variant="link"
                      className="bg-primary w-full text-center px-4 py-2 text-primary-foreground hover:text-primary/80   mt-auto"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </>
  );
}
