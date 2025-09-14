import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
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
import { MaskText } from '@/components/animations/MaskText';

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
      <PageHero
        title="Customer Support"
        backgroundImage="/images/contact/support.jpg?height=400&width=1200"
      >
        <MaskText
          phrases={[
            'Our dedicated support team is here to assist you.',
            'Find answers to your questions or get in touch directly.',
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 ">
            {/* Help Overview */}
            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  How Can We Help You?
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-4 text-lg">
                  <p>
                    At ACOB Lighting Technology Limited, we are committed to providing excellent
                    support for all our products and services. Whether you have
                    a technical question, need assistance with an installation,
                    or require maintenance, our team is ready to help.
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
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Contact Our Support Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {supportMethods.map(
                    ({ icon: Icon, title, description, contacts }) => (
                      <div
                        key={title}
                        className="flex items-start gap-4 p-6 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors duration-200"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {title}
                          </h3>
                          <p className="text-muted-foreground mb-3 leading-relaxed">{description}</p>
                          <div className="space-y-1">
                            {contacts.map((item, i) => (
                              <div key={i} className="text-primary font-semibold text-lg">
                                {item}
                              </div>
                            ))}
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
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  Frequently Asked Questions
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {faqItems.map(({ question, answer }, index) => (
                    <AccordionItem
                      key={question}
                      value={`item-${index}`}
                      className="border border-border rounded-lg px-6 bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-4">
                        {question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                        {answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="mt-8 text-center">
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent px-8 py-3"
                    >
                      Contact Us Directly
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Quick Contact */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <p className="text-sm font-semibold text-primary">+234 704 920 2634</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="text-sm font-semibold text-primary">info@acoblighting.com</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Business Hours</p>
                    <p className="text-sm font-semibold">Mon - Fri: 8AM - 6PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* More Contact Options */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">More Contact Options</h3>
                <div className="space-y-2">
                  {contactLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
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
