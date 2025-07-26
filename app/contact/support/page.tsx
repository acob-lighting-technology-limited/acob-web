import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import { MaskText } from "@/components/animations/MaskText";

const supportMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description:
      "For immediate assistance, please call our support lines during business hours.",
    contacts: ["0704 920 2634", "0803 290 2825"],
  },
  {
    icon: Mail,
    title: "Email Us",
    description:
      "Send us an email with your detailed query, and we'll get back to you within 24-48 hours.",
    contacts: [
      <Link
        key="email"
        href="mailto:support@acoblighting.com"
        className="text-primary hover:underline mt-2 block"
      >
        support@acoblighting.com
      </Link>,
    ],
  },
];

const faqItems = [
  {
    question: "How long do solar panels last?",
    answer:
      "Solar panels typically last between 25 to 30 years, often with a performance warranty guaranteeing a certain output percentage after that period.",
  },
  {
    question: "What is a mini-grid?",
    answer:
      "A mini-grid is an independent electricity distribution network, typically powered by renewable energy, serving a localized group of consumers.",
  },
  {
    question: "Do you offer installation services?",
    answer:
      "Yes, we provide comprehensive installation services for all our solar and energy solutions.",
  },
];

const contactLinks = [
  { label: "Get a Quote", href: "/contact/get-quote" },
  { label: "Office Locations", href: "/contact/locations" },
  { label: "Careers", href: "/contact/careers" },
];

export default function SupportPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: "/contact" },
    { label: "Support" },
  ];

  return (
    <>
      <PageHero
        title="Customer Support"
        backgroundImage="/images/contact/support.jpg?height=400&width=1200"
      >
        <MaskText
          phrases={[
            "Our dedicated support team is here to assist you.",
            "Find answers to your questions or get in touch directly.",
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container className="px-4 py-8 bg-gray-50">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Help Overview */}
            <Card className="border shadow-lg border-gray-200   text-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["How Can We Help You?"]} />
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
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
            <Card className="border shadow-lg border-gray-200 text-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Contact Our Support Team"]} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {supportMethods.map(
                    ({ icon: Icon, title, description, contacts }) => (
                      <div
                        key={title}
                        className="flex items-start gap-4 border border-gray-200 p-2 bg-gray-50 rounded-lg"
                      >
                        <Icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {title}
                          </h3>
                          <p className="text-gray-700">{description}</p>
                          <div className="mt-2 space-y-1 text-lg font-bold text-primary">
                            {contacts.map((item, i) => (
                              <div key={i}>{item}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* FAQs */}
            <Card className="border shadow-lg border-gray-200 text-white">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  <MaskText phrases={["Frequently Asked Questions"]} />
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
                      className="border border-gray-200 rounded-lg px-4 bg-gray-50/50"
                    >
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-primary hover:no-underline">
                        {question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed pt-2">
                        {answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    View All FAQs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="border shadow-lg border-gray-200  bg-primary text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">More Contact Options</h3>
                <ul className="space-y-2">
                  {contactLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-gray-200 border-b pb-1 border-white hover:text-white transition-colors duration-200 flex items-center justify-between"
                      >
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
