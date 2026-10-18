import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ArrowUpRight } from 'lucide-react';
import Image from '@/components/ui/image';
import Link from 'next/link';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';
import { cn } from '@/lib/utils';
import { contactSections } from '@/lib/data/contact-data';

// Two columns on desktop, filled column by column (01–03, then 04–05).
const PATH_ROWS = Math.ceil(contactSections.length / 2);

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
          <SectionEyebrow>How can we help?</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            Whether you have a question, need support, or are looking for a
            career opportunity — we&apos;re ready to connect.
          </p>
        </div>

        {/* Paths — the same numbered index as the home Services section */}
        <section
          aria-labelledby="contact-paths"
          className="mt-14 pb-12 md:mt-20 md:pb-20"
        >
          <SectionEyebrow>Get in touch</SectionEyebrow>
          <h2
            id="contact-paths"
            className="mt-3 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            Choose a path
          </h2>

          <ul
            className="mt-8 grid lg:auto-cols-fr lg:grid-flow-col lg:grid-rows-[repeat(var(--rows),auto)] lg:gap-x-14"
            style={{ '--rows': PATH_ROWS } as React.CSSProperties}
          >
            {contactSections.map((section, i) => (
              <li
                key={section.href}
                className={cn(
                  'border-b border-border',
                  i === 0 && 'border-t',
                  // Top rule on the first row of the second column.
                  i === PATH_ROWS && 'lg:border-t',
                )}
              >
                <FadeIn delay={i * 0.06}>
                  <Link
                    href={section.href}
                    className="group relative grid grid-cols-[1.75rem_4.5rem_minmax(0,1fr)_auto] items-center gap-4 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:grid-cols-[2.5rem_6rem_minmax(0,1fr)_auto] sm:gap-5"
                  >
                    {/* Fill sweeping in from the left on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-primary/[0.06] transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    <span className="relative text-sm font-extrabold tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {/* Mini card — decorative; the title carries the meaning. */}
                    <span
                      aria-hidden
                      className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted ring-1 ring-border transition-all duration-500 group-hover:-rotate-2 group-hover:shadow-lg group-hover:ring-primary/40"
                    >
                      <Image
                        src={section.image || '/placeholder.svg'}
                        alt=""
                        fill
                        sizes="6rem"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </span>
                    <span className="relative min-w-0">
                      <span className="block text-base font-extrabold uppercase leading-tight tracking-tight text-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:text-primary lg:text-lg">
                        {section.title}
                      </span>
                      <span className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {section.description}
                      </span>
                    </span>
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground sm:h-10 sm:w-10">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
