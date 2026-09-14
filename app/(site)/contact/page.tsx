import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '@/components/animations/FadeIn';
import { contactSections } from '@/lib/data/contact-data';

export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us' },
  ];

  const contactImages = [
    { src: '/images/contact/contact-us.webp', alt: 'Contact Us' },
    { src: '/images/contact/careers.webp', alt: 'Careers' },
    { src: '/images/contact/support.webp', alt: 'Support' },
    { src: '/images/contact/office-location-hero.webp', alt: 'Our Locations' },
    { src: '/images/contact/faq-hero.webp', alt: 'Frequently Asked Questions' },
  ];

  return (
    <>
      <Hero
        image={contactImages}
        title="Contact Us"
        description="Let's Get in Touch."
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Standfirst */}
        <div className="max-w-[68ch]">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-primary">
            How can we help?
          </span>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            Whether you have a question, need support, or are looking for a
            career opportunity — we&apos;re ready to connect.
          </p>
        </div>

        {/* Card grid */}
        <section className="mt-14 md:mt-20">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary">
            Get in Touch
          </span>
          <h2 className="mt-2 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Choose a path
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {contactSections.map((section, i) => (
              <FadeIn key={section.href} delay={i * 0.06} className="h-full">
                <Link
                  href={section.href}
                  className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={section.image || '/placeholder.svg'}
                        alt={section.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 text-sm font-extrabold tabular-nums leading-none text-white">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4 md:p-5">
                      <h3 className="text-base font-extrabold tracking-tight text-foreground md:text-lg">
                        {section.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3 md:text-sm">
                        {section.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary md:text-sm">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
