import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Shield, Calendar, Mail, Phone, MapPin } from 'lucide-react';
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
        description="Terms and Conditions of Use"
        image="/images/legal/terms-of-service.webp"
      />

      <Container className="py-16">
        <Breadcrumb items={breadcrumbItems} className="mb-12" />

        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                Terms of Service
              </CardTitle>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {termsOfServiceLastUpdated}</span>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content */}
          <div className="space-y-8">
            <Card className="border-border shadow-sm">
              <CardContent className="p-4 sm:p-6 xl:p-8 space-y-8">
                {termsOfServiceSections.map((section, index) => (
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
                      <div className="pl-11">
                        {section.content.hasLink ? (
                          <p className="text-muted-foreground text-base">
                            Your privacy is important to us. Please review our{' '}
                            <Link
                              href="/privacy-policy"
                              className="text-primary hover:underline font-medium transition-colors"
                            >
                              Privacy Policy
                            </Link>
                            , which also governs your use of our services, to
                            understand our practices.
                          </p>
                        ) : (
                          <p className="text-muted-foreground leading-relaxed text-base">
                            {section.content.data as string}
                          </p>
                        )}
                      </div>
                    )}

                    {section.content.type === 'paragraphs' && (
                      <div className="pl-11 space-y-3">
                        {(section.content.data as string[]).map(
                          (paragraph, pIndex) => (
                            <p
                              key={pIndex}
                              className={`text-muted-foreground text-base ${
                                pIndex === 0 ? 'leading-relaxed' : ''
                              }`}
                            >
                              {paragraph}
                            </p>
                          ),
                        )}
                      </div>
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
                            (item, itemIndex) => (
                              <div
                                key={itemIndex}
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

                    {section.content.type === 'contact' && (
                      <div className="pl-11">
                        <p className="text-muted-foreground mb-4 text-base">
                          {(section.content.data as ContactInfo).description}
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Mail className="w-4 h-4 text-primary" />
                            <span>
                              {(section.content.data as ContactInfo).email}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Phone className="w-4 h-4 text-primary" />
                            <span>
                              {(section.content.data as ContactInfo).phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>
                              {(section.content.data as ContactInfo).address}
                            </span>
                          </div>
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
