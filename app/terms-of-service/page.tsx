import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Shield, FileText, Calendar, Mail, Phone, MapPin } from 'lucide-react';

export default function TermsOfServicePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms of Service' },
  ];

  return (
    <>
      <PageHero
        title="Terms of Service"
        backgroundImage="/images/contact/contact-us.jpg"
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
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content */}
          <div className="space-y-8">
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-8 space-y-8">
                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      1
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Acceptance of Terms
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-base pl-11">
                    By accessing and using the website of ACOB Lighting Technology
                    Limited (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;),
                    you accept and agree to be bound by the terms and provision of
                    this agreement. If you do not agree to abide by the above,
                    please do not use this service.
                  </p>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      2
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Description of Service
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground mb-4 text-base">
                      ACOB Lighting Technology Limited provides solar energy
                      solutions including:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        'Mini-grid solutions for communities and businesses',
                        'Captive power systems for industrial applications',
                        'Professional energy audit services',
                        'Solar panel supply and installation',
                        'Energy consulting and project management'
                      ].map((service, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      3
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      User Responsibilities
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground mb-4 text-base">
                      As a user of our website and services, you agree to:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        'Provide accurate and complete information when requested',
                        'Maintain the security of your account information',
                        'Use our services only for lawful purposes',
                        'Not interfere with or disrupt our services',
                        'Respect intellectual property rights',
                        'Comply with all applicable laws and regulations'
                      ].map((responsibility, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{responsibility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      4
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Intellectual Property Rights
                    </h2>
                  </div>
                  <div className="pl-11 space-y-3">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      The content on this website, including but not limited to
                      text, graphics, images, logos, and software, is the property
                      of ACOB Lighting Technology Limited and is protected by
                      copyright and other intellectual property laws.
                    </p>
                    <p className="text-muted-foreground text-base">
                      You may not reproduce, distribute, modify, or create
                      derivative works from this content without our express written
                      consent.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      5
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Privacy Policy
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground text-base">
                      Your privacy is important to us. Please review our{' '}
                      <a
                        href="/privacy-policy"
                        className="text-primary hover:underline font-medium transition-colors"
                      >
                        Privacy Policy
                      </a>
                      , which also governs your use of our services, to understand
                      our practices.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      6
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Service Availability
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      We strive to maintain the availability of our website and
                      services, but we do not guarantee uninterrupted access. We may
                      temporarily suspend or restrict access for maintenance,
                      updates, or other operational reasons.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      7
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Limitation of Liability
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground mb-4 text-base">
                      To the maximum extent permitted by law, ACOB Lighting
                      Technology Limited shall not be liable for any indirect,
                      incidental, special, consequential, or punitive damages,
                      including but not limited to:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        'Loss of profits, data, or use',
                        'Business interruption',
                        'Personal injury or property damage',
                        'Any damages arising from the use of our services'
                      ].map((damage, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{damage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      8
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Indemnification
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      You agree to indemnify and hold harmless ACOB Lighting
                      Technology Limited, its officers, directors, employees, and
                      agents from any claims, damages, losses, or expenses arising
                      from your use of our services or violation of these terms.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      9
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Disclaimers
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground mb-4 text-base">
                      Our services are provided &quot;as is&quot; and &quot;as
                      available&quot; without warranties of any kind, either express
                      or implied, including but not limited to:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        'Warranties of merchantability',
                        'Fitness for a particular purpose',
                        'Non-infringement',
                        'Accuracy or completeness of information'
                      ].map((disclaimer, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{disclaimer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      10
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Governing Law
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      These terms shall be governed by and construed in accordance
                      with the laws of Nigeria. Any disputes arising from these
                      terms or your use of our services shall be subject to the
                      exclusive jurisdiction of the courts in Nigeria.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      11
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Changes to Terms
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      We reserve the right to modify these terms at any time. We
                      will notify users of any material changes by posting the new
                      terms on this page and updating the &quot;Last updated&quot;
                      date. Your continued use of our services after such changes
                      constitutes acceptance of the new terms.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      12
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Severability
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      If any provision of these terms is found to be unenforceable
                      or invalid, that provision will be limited or eliminated to
                      the minimum extent necessary so that these terms will
                      otherwise remain in full force and effect.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      13
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Contact Information
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground mb-4 text-base">
                      If you have any questions about these Terms of Service, please
                      contact us:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>legal@acoblighting.com</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>+234-XXX-XXX-XXXX</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>[Your Business Address]</span>
                      </div>
                    </div>
                  </div>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
