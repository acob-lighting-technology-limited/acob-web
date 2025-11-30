'use client';

import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import Link from 'next/link';

import {
  supportMethods,
  faqItems,
  contactLinks,
} from '@/lib/data/support-data';

export default function SupportPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Support' },
  ];

  return (
    <>
      <Hero
        description="We're Here to Help You"
        image="/images/contact/support.webp?height=400&width=1200"
      />

      <Container className="px-4 py-6 md:py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6 md:mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Help Overview */}
            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-4 sm:p-5 md:p-6">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-foreground">
                  How Can We Help You?
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-4 md:space-y-5 text-base">
                  <p>
                    At ACOB Lighting Technology Limited, we are committed to
                    providing excellent support for all our products and
                    services. Whether you have a technical question, need
                    assistance with an installation, or require maintenance, our
                    team is ready to help.
                  </p>
                  <p>
                    We strive to ensure your experience with our clean energy
                    solutions is seamless and satisfactory. Please explore the
                    options below to find the support you need.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-4 sm:p-5 md:p-6">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-foreground">
                  Contact Our Support Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {supportMethods.map(
                    ({ icon: Icon, title, description, contacts }) => (
                      <div
                        key={title}
                        className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors duration-500"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-semibold text-foreground mb-1.5 md:mb-2">
                            {title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2 md:mb-3 leading-relaxed">
                            {description}
                          </p>
                          <div className="space-y-1">
                            {contacts.map((item, i) => {
                              // Check if it's a phone number
                              const isPhone = /^\+?\d[\d\s-]+$/.test(
                                item.trim(),
                              );
                              // Check if it's an email
                              const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                item.trim(),
                              );
                              if (isPhone) {
                                const phoneNumber = item.replace(/\s/g, '');
                                return (
                                  <a
                                    key={i}
                                    href={`tel:${phoneNumber}`}
                                    className="text-primary font-semibold text-sm md:text-base hover:underline block"
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
                                    className="text-primary font-semibold text-sm md:text-base hover:underline block break-all"
                                  >
                                    {item}
                                  </a>
                                );
                              }
                              return (
                                <div
                                  key={i}
                                  className="text-primary font-semibold text-sm md:text-base"
                                >
                                  {item}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            {/* FAQs */}
            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-4 sm:p-5 md:p-6">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-foreground">
                  Frequently Asked Questions
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-3 md:space-y-4"
                >
                  {faqItems.map(({ question, answer }, index) => (
                    <AccordionItem
                      key={question}
                      value={`item-${index}`}
                      className="border border-border rounded-lg px-4 md:px-6 bg-muted/30 hover:bg-muted/50 transition-colors duration-500"
                    >
                      <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-foreground hover:text-primary hover:no-underline py-3 md:py-4">
                        {question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pt-2 pb-3 md:pb-4">
                        {answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="mt-6 md:mt-8 text-center">
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
                    >
                      Contact Us Directly
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6 sticky top-20 self-start">
            {/* Quick Contact */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-4 md:p-5 lg:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-2.5 md:space-y-3">
                  <div className="p-2.5 md:p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <a
                      href="tel:+2347049202634"
                      className="text-xs md:text-sm font-semibold text-primary hover:underline block"
                    >
                      +234 704 920 2634
                    </a>
                  </div>
                  <div className="p-2.5 md:p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <div className="space-y-1">
                      <a
                        href="mailto:info@acoblighting.com"
                        className="text-xs md:text-sm font-semibold text-primary hover:underline block break-all"
                      >
                        info@acoblighting.com
                      </a>
                      <a
                        href="mailto:infoacob@gmail.com"
                        className="text-xs md:text-sm font-semibold text-primary hover:underline block break-all"
                      >
                        infoacob@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="p-2.5 md:p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Business Hours
                    </p>
                    <p className="text-xs md:text-sm font-semibold">
                      Mon - Fri: 8AM - 5PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* More Contact Options */}
            <Card className="border border-border">
              <CardContent className="p-4 md:p-5 lg:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
                  More Contact Options
                </h3>
                <div className="space-y-2">
                  {contactLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block p-2.5 md:p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-500 text-xs md:text-sm font-medium border border-border"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
