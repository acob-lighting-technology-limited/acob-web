import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FAQSection } from '@/components/faq/faq-section';

export default function FAQPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'FAQ' }];

  return (
    <>
      <Hero
        title="Frequently Asked Questions"
        description="Get answers to common questions about solar energy systems"
        image="/images/services/solar-installation.webp"
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
