import { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how ACOB Lighting Technology Limited collects, uses, and protects your personal information.',
};

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

      <Container className="py-12">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Privacy Policy</CardTitle>
              <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  ACOB Lighting Technology Limited (&quot;we,&quot;
                  &quot;our,&quot; or &quot;us&quot;) is committed to protecting
                  your privacy. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you visit
                  our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  2. Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Personal Information</h3>
                    <p className="text-muted-foreground">
                      We may collect personal information such as your name,
                      email address, phone number, company name, and any other
                      information you provide when you:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Fill out contact forms</li>
                      <li>Request quotes or services</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Apply for careers</li>
                      <li>Contact our support team</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">
                      Automatically Collected Information
                    </h3>
                    <p className="text-muted-foreground">
                      We automatically collect certain information when you
                      visit our website, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>IP address and location data</li>
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>Pages visited and time spent</li>
                      <li>Referring website</li>
                      <li>Device information</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  3. How We Use Your Information
                </h2>
                <p className="text-muted-foreground mb-3">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>To provide and maintain our services</li>
                  <li>To respond to your inquiries and requests</li>
                  <li>
                    To send you marketing communications (with your consent)
                  </li>
                  <li>To improve our website and services</li>
                  <li>To analyze website usage and trends</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect against fraud and security threats</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  4. Cookies and Tracking Technologies
                </h2>
                <p className="text-muted-foreground mb-3">
                  We use cookies and similar tracking technologies to enhance
                  your browsing experience:
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium">Essential Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      Required for the website to function properly. These
                      cannot be disabled.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Analytics Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors use our website to improve
                      performance.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Marketing Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      Used to deliver relevant advertisements and track
                      marketing campaign performance.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  5. Information Sharing and Disclosure
                </h2>
                <p className="text-muted-foreground mb-3">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information in the following
                  circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>
                    With trusted service providers who assist in our operations
                  </li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the internet is 100% secure, and
                  we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
                <p className="text-muted-foreground mb-3">
                  Depending on your location, you may have the following rights
                  regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Right to access your personal information</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to delete your personal information</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Right to withdraw consent</li>
                </ul>
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
                  <p>Email: privacy@acoblighting.com</p>
                  <p>Phone: +234-XXX-XXX-XXXX</p>
                  <p>Address: [Your Business Address]</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}
