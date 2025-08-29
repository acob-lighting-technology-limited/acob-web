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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Help Overview */}
            <Card className="border shadow-lg border-border bg-surface">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  <MaskText phrases={['How Can We Help You?']} />
                </h2>
                <div className="text-foreground leading-relaxed space-y-6 text-lg">
                  <p>
                    At ACOB Lighting, we are committed to providing excellent
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
            <Card className="border shadow-lg border-border bg-surface">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  <MaskText phrases={['Contact Our Support Team']} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {supportMethods.map(
                    ({ icon: Icon, title, description, contacts }) => (
                      <div
                        key={title}
                        className="flex items-start gap-4 border border-border p-2 bg-muted rounded-lg"
                      >
                        <Icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {title}
                          </h3>
                          <p className="text-muted-foreground">{description}</p>
                          <div className="mt-2 space-y-1 text-lg font-bold text-primary">
                            {contacts.map((item, i) => (
                              <div key={i}>{item}</div>
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
            <Card className="border shadow-lg border-border bg-surface">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  <MaskText phrases={['Frequently Asked Questions']} />
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
                      className="border border-border rounded-lg px-4 bg-muted/50"
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline">
                        {question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                        {answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    View All FAQs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="!border-t-2 !border-t-primary border border-border">
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
