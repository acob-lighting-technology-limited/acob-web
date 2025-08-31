import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';

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

      <Container className="py-12">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Terms of Service</CardTitle>
              <p className="text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using the website of ACOB Lighting Technology
                  Limited (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;),
                  you accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above,
                  please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  2. Description of Service
                </h2>
                <p className="text-muted-foreground mb-3">
                  ACOB Lighting Technology Limited provides solar energy
                  solutions including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Mini-grid solutions for communities and businesses</li>
                  <li>Captive power systems for industrial applications</li>
                  <li>Professional energy audit services</li>
                  <li>Solar panel supply and installation</li>
                  <li>Energy consulting and project management</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  3. User Responsibilities
                </h2>
                <p className="text-muted-foreground mb-3">
                  As a user of our website and services, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    Provide accurate and complete information when requested
                  </li>
                  <li>Maintain the security of your account information</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not interfere with or disrupt our services</li>
                  <li>Respect intellectual property rights</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  4. Intellectual Property Rights
                </h2>
                <p className="text-muted-foreground mb-3">
                  The content on this website, including but not limited to
                  text, graphics, images, logos, and software, is the property
                  of ACOB Lighting Technology Limited and is protected by
                  copyright and other intellectual property laws.
                </p>
                <p className="text-muted-foreground">
                  You may not reproduce, distribute, modify, or create
                  derivative works from this content without our express written
                  consent.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  5. Privacy Policy
                </h2>
                <p className="text-muted-foreground">
                  Your privacy is important to us. Please review our{' '}
                  <a
                    href="/privacy-policy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </a>
                  , which also governs your use of our services, to understand
                  our practices.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  6. Service Availability
                </h2>
                <p className="text-muted-foreground">
                  We strive to maintain the availability of our website and
                  services, but we do not guarantee uninterrupted access. We may
                  temporarily suspend or restrict access for maintenance,
                  updates, or other operational reasons.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  7. Limitation of Liability
                </h2>
                <p className="text-muted-foreground mb-3">
                  To the maximum extent permitted by law, ACOB Lighting
                  Technology Limited shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages,
                  including but not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Loss of profits, data, or use</li>
                  <li>Business interruption</li>
                  <li>Personal injury or property damage</li>
                  <li>Any damages arising from the use of our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  8. Indemnification
                </h2>
                <p className="text-muted-foreground">
                  You agree to indemnify and hold harmless ACOB Lighting
                  Technology Limited, its officers, directors, employees, and
                  agents from any claims, damages, losses, or expenses arising
                  from your use of our services or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">9. Disclaimers</h2>
                <p className="text-muted-foreground mb-3">
                  Our services are provided &quot;as is&quot; and &quot;as
                  available&quot; without warranties of any kind, either express
                  or implied, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Warranties of merchantability</li>
                  <li>Fitness for a particular purpose</li>
                  <li>Non-infringement</li>
                  <li>Accuracy or completeness of information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  10. Governing Law
                </h2>
                <p className="text-muted-foreground">
                  These terms shall be governed by and construed in accordance
                  with the laws of Nigeria. Any disputes arising from these
                  terms or your use of our services shall be subject to the
                  exclusive jurisdiction of the courts in Nigeria.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  11. Changes to Terms
                </h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. We
                  will notify users of any material changes by posting the new
                  terms on this page and updating the &quot;Last updated&quot;
                  date. Your continued use of our services after such changes
                  constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">12. Severability</h2>
                <p className="text-muted-foreground">
                  If any provision of these terms is found to be unenforceable
                  or invalid, that provision will be limited or eliminated to
                  the minimum extent necessary so that these terms will
                  otherwise remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">
                  13. Contact Information
                </h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="mt-3 space-y-1 text-muted-foreground">
                  <p>Email: legal@acoblighting.com</p>
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
