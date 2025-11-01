import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
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

  return (
    <>
      <PageHero
        description="Get in Touch with Our Team"
        backgroundImage="/images/contact/contact-us.webp?height=400&width=1200"
      />

      <Container className="px-4 py-8 ">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <SectionHeader
          title={<MaskText phrases={['How Can We Assist You?']} />}
          description="Whether you have a question, need support, or are looking for a career opportunity, we're ready to connect."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactSections.map(section => {
            return (
              <Link key={section.href} href={section.href}>
                <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={section.image || '/placeholder.svg'}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <CardContent className="flex flex-1 flex-col gap-4 p-4">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">
                        {section.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                    <Button variant="default" className="w-full mt-auto">
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
