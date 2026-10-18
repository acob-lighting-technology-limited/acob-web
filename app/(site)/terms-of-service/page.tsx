import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Calendar, Mail, Phone, MapPin } from 'lucide-react';
import {
  termsOfServiceSections,
  termsOfServiceLastUpdated,
  ContactInfo,
} from '@/lib/data/terms-of-service-data';
import Link from 'next/link';

export default function TermsOfServicePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms of Service' },
  ];

  return (
    <>
      <Hero
        title="Terms of Service"
        description="The Rules of Engagement."
        image="/images/legal/terms-of-service.webp"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Standfirst */}
        <div className="max-w-[68ch]">
          <span className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.3em] text-primary">
            <Calendar className="h-3.5 w-3.5" />
            Last updated: {termsOfServiceLastUpdated}
          </span>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            The terms and conditions governing your use of ACOB Lighting
            Technology Limited&apos;s website and services.
          </p>
        </div>

        {/* Clauses */}
        <div className="mt-12 max-w-4xl border-t border-border pt-4 md:mt-16">
          {termsOfServiceSections.map((section, index) => (
            <section
              key={index}
              className="grid grid-cols-[44px_1fr] gap-x-5 border-b border-border py-8 md:grid-cols-[60px_1fr] md:gap-x-8"
            >
              <div className="text-2xl font-extrabold leading-none tabular-nums text-primary md:text-3xl">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                  {section.title}
                </h2>

                {section.content.type === 'paragraph' &&
                  (section.content.hasLink ? (
                    <p className="mt-3 max-w-[64ch] leading-relaxed text-muted-foreground">
                      Your privacy is important to us. Please review our{' '}
                      <Link
                        href="/privacy-policy"
                        className="font-semibold text-primary transition-colors hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      , which also governs your use of our services, to
                      understand our practices.
                    </p>
                  ) : (
                    <p className="mt-3 max-w-[64ch] leading-relaxed text-muted-foreground">
                      {section.content.data as string}
                    </p>
                  ))}

                {section.content.type === 'paragraphs' && (
                  <div className="mt-3 space-y-3">
                    {(section.content.data as string[]).map(
                      (paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="max-w-[64ch] leading-relaxed text-muted-foreground"
                        >
                          {paragraph}
                        </p>
                      ),
                    )}
                  </div>
                )}

                {section.content.type === 'list' && (
                  <div className="mt-3">
                    {section.content.intro && (
                      <p className="max-w-[64ch] leading-relaxed text-muted-foreground">
                        {section.content.intro}
                      </p>
                    )}
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
                      {(section.content.data as string[]).map(
                        (item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-primary" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {section.content.type === 'contact' && (
                  <div className="mt-3">
                    <p className="max-w-[64ch] leading-relaxed text-muted-foreground">
                      {(section.content.data as ContactInfo).description}
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4 shrink-0 text-primary" />
                        <span>
                          {(section.content.data as ContactInfo).email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4 shrink-0 text-primary" />
                        <span>
                          {(section.content.data as ContactInfo).phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <span>
                          {(section.content.data as ContactInfo).address}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
