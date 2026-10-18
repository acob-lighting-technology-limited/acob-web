import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import Link from 'next/link';

import { supportMethods, faqItems } from '@/lib/data/support-data';
import { FadeIn } from '@/components/animations/FadeIn';
import {
  QuickContact,
  MoreContactOptions,
} from '@/components/contact/contact-sidebar';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

export default function SupportPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Support' },
  ];

  return (
    <>
      <Hero
        title="Support"
        description="We're Here to Help."
        image="/images/contact/support.webp?height=400&width=1200"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Standfirst */}
        <div className="max-w-[68ch]">
          <SectionEyebrow>How can we help?</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            Whether you have a technical question, need assistance with an
            installation, or require maintenance — our team is ready to help.
          </p>
          <p className="mt-5 max-w-[70ch] text-lg leading-relaxed text-muted-foreground">
            We strive to ensure your experience with our clean energy solutions
            is seamless and satisfactory. Explore the options below to find the
            support you need.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 border-t border-border pt-10 lg:grid-cols-[1fr_300px] lg:gap-14 md:mt-16">
          {/* Main column */}
          <div className="space-y-14 md:space-y-20">
            {/* Contact methods */}
            <section>
              <SectionEyebrow>Get in touch</SectionEyebrow>
              <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
                Contact our support team
              </h2>

              <div className="mt-8 border-t border-border">
                {supportMethods.map(
                  ({ title, description, contacts }, index) => (
                    <FadeIn
                      key={title}
                      delay={index * 0.08}
                      className="grid grid-cols-[48px_1fr] gap-x-5 border-b border-border py-6 md:grid-cols-[72px_1fr] md:gap-x-8 md:py-7"
                    >
                      <div className="text-2xl font-extrabold leading-none tabular-nums text-primary md:text-3xl">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="max-w-[62ch]">
                        <h3 className="text-lg font-extrabold tracking-tight text-foreground md:text-xl">
                          {title}
                        </h3>
                        <p className="mt-2 leading-relaxed text-muted-foreground">
                          {description}
                        </p>
                        <div className="mt-3 flex flex-col gap-0.5">
                          {contacts.map((item, i) => {
                            const isPhone = /^\+?\d[\d\s-]+$/.test(item.trim());
                            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                              item.trim(),
                            );
                            if (isPhone) {
                              return (
                                <a
                                  key={i}
                                  href={`tel:${item.replace(/\s/g, '')}`}
                                  className="block font-semibold tabular-nums text-primary hover:underline"
                                >
                                  {item}
                                </a>
                              );
                            }
                            if (isEmail) {
                              return (
                                <a
                                  key={i}
                                  href={`mailto:${item.trim()}`}
                                  className="block break-all font-semibold text-primary hover:underline"
                                >
                                  {item}
                                </a>
                              );
                            }
                            return (
                              <div
                                key={i}
                                className="font-semibold text-primary"
                              >
                                {item}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </FadeIn>
                  ),
                )}
              </div>
            </section>

            {/* FAQs */}
            <section>
              <SectionEyebrow>FAQ</SectionEyebrow>
              <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
                Frequently asked questions
              </h2>

              <Accordion
                type="single"
                collapsible
                className="mt-8 w-full border-t border-border"
              >
                {faqItems.map(({ question, answer }, index) => (
                  <AccordionItem
                    key={question}
                    value={`item-${index}`}
                    className="border-b border-border"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-bold text-foreground hover:text-primary hover:no-underline md:text-lg">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-[68ch] pb-5 text-base leading-relaxed text-muted-foreground">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8">
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Contact Us Directly
                  </Button>
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10 lg:sticky lg:top-24">
            <QuickContact emailAudience="support" phones="primary" showHours />
            <MoreContactOptions excludeHref="/contact/support" />
          </aside>
        </div>
      </Container>
    </>
  );
}
