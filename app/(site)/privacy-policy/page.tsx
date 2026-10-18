import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Calendar } from 'lucide-react';
import {
  privacyPolicySections,
  privacyPolicyLastUpdated,
  PrivacyPolicySubsection,
  ContactInfo,
} from '@/lib/data/privacy-policy-data';

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy' },
  ];

  return (
    <>
      <Hero
        title="Privacy Policy"
        description="How We Protect Your Data."
        image="/images/legal/privacy-policy.webp"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Standfirst */}
        <div className="max-w-[68ch]">
          <span className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.3em] text-primary">
            <Calendar className="h-3.5 w-3.5" />
            Last updated: {privacyPolicyLastUpdated}
          </span>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            How ACOB Lighting Technology Limited collects, uses, and protects
            your personal information across our website and services.
          </p>
        </div>

        {/* Clauses */}
        <div className="mt-12 max-w-4xl border-t border-border pt-4 md:mt-16">
          {privacyPolicySections.map((section, index) => (
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

                {section.content.type === 'paragraph' && (
                  <p className="mt-3 max-w-[64ch] leading-relaxed text-muted-foreground">
                    {section.content.data as string}
                  </p>
                )}

                {section.content.type === 'list' && (
                  <div className="mt-3">
                    {section.content.intro && (
                      <p className="max-w-[64ch] leading-relaxed text-muted-foreground">
                        {section.content.intro}
                      </p>
                    )}
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
                      {(section.content.data as string[]).map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-primary" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.content.type === 'subsections' && (
                  <div className="mt-4 space-y-6">
                    {(section.content.data as PrivacyPolicySubsection[]).map(
                      (subsection, subIndex) => (
                        <div key={subIndex}>
                          <h3 className="font-bold text-foreground">
                            {subsection.title}
                          </h3>
                          {subsection.description && (
                            <p className="mt-2 max-w-[64ch] leading-relaxed text-muted-foreground">
                              {subsection.description}
                            </p>
                          )}
                          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
                            {subsection.items.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-muted-foreground"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-primary" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                )}

                {section.content.type === 'contact' && (
                  <div className="mt-3">
                    <p className="max-w-[64ch] leading-relaxed text-muted-foreground">
                      {(section.content.data as ContactInfo).description}
                    </p>
                    <div className="mt-3 space-y-1 text-muted-foreground">
                      <p>
                        Email: {(section.content.data as ContactInfo).email}
                      </p>
                      <p>
                        Phone: {(section.content.data as ContactInfo).phone}
                      </p>
                      <p>
                        Address: {(section.content.data as ContactInfo).address}
                      </p>
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
