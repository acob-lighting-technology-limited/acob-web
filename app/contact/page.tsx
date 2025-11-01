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
      >
        <MaskText
          phrases={[
            'We are here to help you with all your clean energy needs.',
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
          {contactSections.map(section => {
            return (
              <Link key={section.href} href={section.href}>
                <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
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
                    <Button
                      variant="default"
                      className="w-full text-center px-4 py-2 mt-auto bg-primary text-primary-foreground hover:bg-primary/70"
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
