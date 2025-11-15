import { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FAQSection } from '@/components/faq/faq-section';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Solar Energy FAQs | ACOB Lighting',
  description:
    'Find answers to common questions about solar energy systems, installation, costs, maintenance, and more. Expert guidance from ACOB Lighting Technology Limited.',
  keywords:
    'solar energy FAQ, solar panel questions, solar installation guide, solar system costs, solar maintenance, renewable energy questions, Nigeria solar FAQ',
  openGraph: {
    title: 'Frequently Asked Questions - ACOB Lighting Technology Limited',
    description:
      'Get answers to your solar energy questions from Nigerian renewable energy experts.',
    type: 'website',
    url: 'https://acoblighting.com/faq',
  },
};

export default function FAQPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'FAQ' }];

  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        description="Get answers to common questions about solar energy systems"
        backgroundImage="/images/services/solar-installation.webp"
      />

      <Container className="px-4 py-12">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need to Know About Solar Energy
          </h2>
          <p className="text-muted-foreground text-lg">
            Can't find your question? Contact our support team at{' '}
            <a
              href="mailto:support@acoblighting.com"
              className="text-primary hover:underline"
            >
              support@acoblighting.com
            </a>{' '}
            or call{' '}
            <a
              href="tel:+2347049202634"
              className="text-primary hover:underline"
            >
              +234 704 920 2634
            </a>
          </p>
        </div>

        <FAQSection />
      </Container>
    </>
  );
}
