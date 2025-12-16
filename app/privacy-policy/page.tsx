import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Lock, Calendar } from 'lucide-react';
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
        description="How We Protect Your Information"
        image="/images/legal/privacy-policy.webp"
      />

      <Container className="py-16">
        <Breadcrumb items={breadcrumbItems} className="mb-12" />

        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                Privacy Policy
              </CardTitle>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {privacyPolicyLastUpdated}</span>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content */}
          <div className="space-y-8">
            <Card className="border-border shadow-sm">
              <CardContent className="p-4 sm:p-6 xl:p-8 space-y-8">
                {privacyPolicySections.map((section, index) => (
                  <section key={index} className="group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {section.title}
                      </h2>
                    </div>

                    {section.content.type === 'paragraph' && (
                      <p className="text-muted-foreground leading-relaxed text-base pl-11">
                        {section.content.data as string}
                      </p>
                    )}

                    {section.content.type === 'list' && (
                      <div className="pl-11">
                        {section.content.intro && (
                          <p className="text-muted-foreground mb-4 text-base">
                            {section.content.intro}
                          </p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {(section.content.data as string[]).map(
                            (item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-muted-foreground"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-sm">{item}</span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {section.content.type === 'subsections' && (
                      <div className="pl-11 space-y-6">
                        {(
                          section.content.data as PrivacyPolicySubsection[]
                        ).map((subsection, subIndex) => (
                          <div key={subIndex}>
                            <h3 className="font-medium mb-3 text-foreground">
                              {subsection.title}
                            </h3>
                            {subsection.description && (
                              <p className="text-muted-foreground mb-3 text-base">
                                {subsection.description}
                              </p>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {subsection.items.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-muted-foreground"
                                >
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.content.type === 'contact' && (
                      <div className="pl-11">
                        <p className="text-muted-foreground mb-4 text-base leading-relaxed">
                          {(section.content.data as ContactInfo).description}
                        </p>
                        <div className="space-y-1 text-muted-foreground">
                          <p className="text-base">
                            Email: {(section.content.data as ContactInfo).email}
                          </p>
                          <p className="text-base">
                            Phone: {(section.content.data as ContactInfo).phone}
                          </p>
                          <p className="text-base">
                            Address:{' '}
                            {(section.content.data as ContactInfo).address}
                          </p>
                        </div>
                      </div>
                    )}
                  </section>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
