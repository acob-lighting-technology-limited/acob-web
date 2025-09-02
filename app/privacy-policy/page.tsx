import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Shield, Lock, Calendar, Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy' },
  ];

  return (
    <>
      <PageHero
        title="Privacy Policy"
        backgroundImage="/images/contact/contact-us.jpg"
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
                      Introduction
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-base pl-11">
                    ACOB Lighting Technology Limited (&quot;we,&quot;
                    &quot;our,&quot; or &quot;us&quot;) is committed to protecting
                    your privacy. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you visit
                    our website or use our services.
                  </p>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      2
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Information We Collect
                    </h2>
                  </div>
                  <div className="pl-11 space-y-6">
                    <div>
                      <h3 className="font-medium mb-3 text-foreground">Personal Information</h3>
                      <p className="text-muted-foreground mb-3 text-base">
                        We may collect personal information such as your name,
                        email address, phone number, company name, and any other
                        information you provide when you:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          'Fill out contact forms',
                          'Request quotes or services',
                          'Subscribe to our newsletter',
                          'Apply for careers',
                          'Contact our support team'
                        ].map((action, index) => (
                          <div key={index} className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3 text-foreground">
                        Automatically Collected Information
                      </h3>
                      <p className="text-muted-foreground mb-3 text-base">
                        We automatically collect certain information when you
                        visit our website, including:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          'IP address and location data',
                          'Browser type and version',
                          'Operating system',
                          'Pages visited and time spent',
                          'Referring website',
                          'Device information'
                        ].map((info, index) => (
                          <div key={index} className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">{info}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      3
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      How We Use Your Information
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground mb-4 text-base">
                      We use the information we collect for the following purposes:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        'To provide and maintain our services',
                        'To respond to your inquiries and requests',
                        'To send you marketing communications (with your consent)',
                        'To improve our website and services',
                        'To analyze website usage and trends',
                        'To comply with legal obligations',
                        'To protect against fraud and security threats'
                      ].map((purpose, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{purpose}</span>
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
                      Cookies and Tracking Technologies
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground mb-4 text-base">
                      We use cookies and similar tracking technologies to enhance
                      your browsing experience:
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-lg border border-border">
                        <h3 className="font-medium text-foreground mb-2">Essential Cookies</h3>
                        <p className="text-sm text-muted-foreground">
                          Required for the website to function properly. These
                          cannot be disabled.
                        </p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg border border-border">
                        <h3 className="font-medium text-foreground mb-2">Analytics Cookies</h3>
                        <p className="text-sm text-muted-foreground">
                          Help us understand how visitors use our website to improve
                          performance.
                        </p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg border border-border">
                        <h3 className="font-medium text-foreground mb-2">Marketing Cookies</h3>
                        <p className="text-sm text-muted-foreground">
                          Used to deliver relevant advertisements and track
                          marketing campaign performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      5
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Information Sharing and Disclosure
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground mb-4 text-base">
                      We do not sell, trade, or rent your personal information to
                      third parties. We may share your information in the following
                      circumstances:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        'With your explicit consent',
                        'To comply with legal obligations',
                        'To protect our rights and safety',
                        'With trusted service providers who assist in our operations',
                        'In connection with a business transfer or merger'
                      ].map((circumstance, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{circumstance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      6
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Data Security
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      We implement appropriate technical and organizational measures
                      to protect your personal information against unauthorized
                      access, alteration, disclosure, or destruction. However, no
                      method of transmission over the internet is 100% secure, and
                      we cannot guarantee absolute security.
                    </p>
                  </div>
                </section>

                <section className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      7
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Your Rights
                    </h2>
                  </div>
                  <div className="pl-11">
                    <p className="text-muted-foreground mb-4 text-base">
                      Depending on your location, you may have the following rights
                      regarding your personal information:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        'Right to access your personal information',
                        'Right to correct inaccurate information',
                        'Right to delete your personal information',
                        'Right to restrict processing',
                        'Right to data portability',
                        'Right to object to processing',
                        'Right to withdraw consent'
                      ].map((right, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{right}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  8. Data Retention
                </h2>
                <p className="text-muted-foreground">
                  We retain your personal information for as long as necessary
                  to fulfill the purposes outlined in this Privacy Policy,
                  unless a longer retention period is required or permitted by
                  law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  9. International Data Transfers
                </h2>
                <p className="text-muted-foreground">
                  Your information may be transferred to and processed in
                  countries other than your own. We ensure appropriate
                  safeguards are in place to protect your information in
                  accordance with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  10. Children&apos;s Privacy
                </h2>
                <p className="text-muted-foreground">
                  Our website is not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If you are a parent or guardian and believe
                  your child has provided us with personal information, please
                  contact us.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  11. Changes to This Privacy Policy
                </h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">12. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us:
                </p>
                <div className="mt-3 space-y-1 text-muted-foreground">
                  <p>Email: info@acoblighting.com</p>
                  <p>Phone: +234 704 920 2634</p>
                  <p>Address: Plot 2. Block 14 Extension, Federal Ministry of Works And Housing Sites and Service Scheme, Setraco Gate Gwarinpa, Abuja, Nigeria</p>
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
