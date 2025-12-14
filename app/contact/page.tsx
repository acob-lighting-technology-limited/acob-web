import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MaskText } from '@/components/animations/MaskText';
import Image from 'next/image';
import { contactSections } from '@/lib/data/contact-data';
import { SectionHeader } from '@/components/ui/section-header';

export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us' },
  ];

  // Images from contact sub-routes
  const contactImages = [
    { src: '/images/contact/contact-us.webp', alt: 'Contact Us' },
    { src: '/images/contact/careers.webp', alt: 'Careers' },
    { src: '/images/contact/support.webp', alt: 'Support' },
    { src: '/images/contact/office-location-hero.webp', alt: 'Our Locations' },
  ];

  return (
    <>
      <Hero
        image={contactImages}
        title="Contact Us"
        description="Get in Touch with ACOB Lighting Technology"
      />

      <Container className="px-4 py-8 ">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <SectionHeader
          title={
            <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              <MaskText phrases={['How Can We Assist You?']} />
            </h2>
          }
          description="Whether you have a question, need support, or are looking for a career opportunity, we're ready to connect."
          className="mb-12"
        />

        <div className="grid grid-cols-2 gap-3 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {contactSections.map(section => {
            return (
              <Link key={section.href} href={section.href}>
                <Card className="group flex h-full flex-col overflow-hidden rounded-xl md:rounded-3xl border border-border bg-surface shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-square md:aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={section.image || '/placeholder.svg'}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <CardContent className="flex flex-1 flex-col gap-2 md:gap-4 p-3 md:p-4">
                    <div className="flex-1">
                      <h4 className="text-sm md:text-lg font-semibold text-foreground line-clamp-2">
                        {section.title}
                      </h4>
                      <p className="mt-1 md:mt-2 text-xs md:text-sm leading-relaxed text-muted-foreground line-clamp-2 md:line-clamp-none">
                        {section.description}
                      </p>
                    </div>
                    <Button
                      variant="default"
                      className="w-full mt-auto text-xs md:text-sm py-2 md:py-2.5 h-auto"
                    >
                      Learn More
                      <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
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
