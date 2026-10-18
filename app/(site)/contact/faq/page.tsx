import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FAQSection } from '@/components/faq/faq-section';
import { CONTACT_INFO } from '@/lib/constants/app.constants';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

export default function FAQPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ' },
  ];

  return (
    <>
      <Hero
        title="Frequently Asked Questions"
        description="Your Questions, Answered."
        image="/images/contact/faq-hero.webp"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Standfirst */}
        <div className="max-w-[68ch]">
          <SectionEyebrow>Solar energy & company, explained</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            Can&apos;t find your question? Contact our support team at{' '}
            <a
              href={`mailto:${CONTACT_INFO.email.support}`}
              className="text-primary hover:underline"
            >
              {CONTACT_INFO.email.support}
            </a>{' '}
            or call{' '}
            <a
              href={`tel:${CONTACT_INFO.phone.primary.replace(/\s/g, '')}`}
              className="text-primary hover:underline"
            >
              {CONTACT_INFO.phone.primary}
            </a>
            .
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <FAQSection />
        </div>
      </Container>
    </>
  );
}
