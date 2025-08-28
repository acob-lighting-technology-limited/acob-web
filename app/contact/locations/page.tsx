import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { MaskText } from '@/components/animations/MaskText';

export default function LocationsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Office Locations' },
  ];

  return (
    <>
      <PageHero
        title="Our Office Locations"
        backgroundImage="/images/contact/office-location-hero.jpg?height=400&width=1200"
      >
        <MaskText
          phrases={[
            'Visit us at our offices or reach out through our contact details.',
            'We are always happy to welcome you.',
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Map Section */}
          <div className="lg:col-span-2 w-full h-[500px] rounded-lg overflow-hidden custom-shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4042.0004937198446!2d7.418824175135592!3d9.11723979094763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b1e73987599%3A0xd8a3ed0c898644c5!2sACOB%20LIGHTING%20TECHNOLOGY%20LIMITED!5e1!3m2!1sen!2sng!4v1752592656509!5m2!1sen!2sng&maptype=satellite"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Head Office</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="text-sm font-medium">
                        Plot 2. Block 14 Extension, Federal Ministry of Works And
                        Housing Sites and Service Scheme, Setraco Gate Gwarinpa,
                        Abuja, Nigeria.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">
                        +234 704 920 2634, +234 803 290 2825
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <div className="flex flex-col gap-1">
                        <Link
                          href="mailto:info@acoblighting.com"
                          className="hover:underline text-primary text-sm font-medium"
                        >
                          info@acoblighting.com
                        </Link>
                        <Link
                          href="mailto:infoacob@gmail.com"
                          className="hover:underline text-primary text-sm font-medium"
                        >
                          infoacob@gmail.com
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=ACOB+LIGHTING+TECHNOLOGY+LIMITED,+Plot+2,+Ministry+of+Works+And+Housing+Sites+and+Service+Scheme,+Setraco+Gate,+behind+Clifford+Mall,+Gwarinpa,+Federal+Capital+Territory"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 flex items-center font-medium"
                  >
                    <MapPin className="mr-1 h-3 w-3" />
                    Get Directions
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Branch Office</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="text-sm font-medium">
                        1st Floor, Rochas Plaza, 26 Herbert Macaulay Way, Abuja,
                        Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">
                        +234 704 920 2634, +234 803 290 2825
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <div className="flex flex-col gap-1">
                        <Link
                          href="mailto:info@acoblighting.com"
                          className="hover:underline text-primary text-sm font-medium"
                        >
                          info@acoblighting.com
                        </Link>
                        <Link
                          href="mailto:infoacob@gmail.com"
                          className="hover:underline text-primary text-sm font-medium"
                        >
                          infoacob@gmail.com
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=Rochas+Plaza,+26+Herbert+Macaulay+Way,+Abuja,+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 flex items-center font-medium"
                  >
                    <MapPin className="mr-1 h-3 w-3" />
                    Get Directions
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
