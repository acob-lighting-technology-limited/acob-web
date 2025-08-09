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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Office Details */}
          <div className="md:col-span-1 space-y-6">
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  <MaskText phrases={['Head Office']} />
                </h2>
                <div className="space-y-3 text-muted-foreground text-base">
                  <p className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Plot 2. Block 14 Extension, Federal Ministry of Works And
                      Housing Sites and Service Scheme, Setraco Gate Gwarinpa,
                      Abuja, Nigeria.
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">
                      +234 704 920 2634, +234 803 290 2825
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <Link
                        href="mailto:info@acoblighting.com"
                        className="hover:underline text-primary text-sm"
                      >
                        info@acoblighting.com
                      </Link>
                      <Link
                        href="mailto:infoacob@gmail.com"
                        className="hover:underline text-primary text-sm"
                      >
                        infoacob@gmail.com
                      </Link>
                    </div>
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=ACOB+LIGHTING+TECHNOLOGY+LIMITED,+Plot+2,+Ministry+of+Works+And+Housing+Sites+and+Service+Scheme,+Setraco+Gate,+behind+Clifford+Mall,+Gwarinpa,+Federal+Capital+Territory"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  <MaskText phrases={['Branch Office']} />
                </h2>
                <div className="space-y-3 text-muted-foreground text-base">
                  <p className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      1st Floor, Rochas Plaza, 26 Herbert Macaulay Way, Abuja,
                      Nigeria
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">
                      +234 704 920 2634, +234 803 290 2825
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <Link
                        href="mailto:info@acoblighting.com"
                        className="hover:underline text-primary text-sm"
                      >
                        info@acoblighting.com
                      </Link>
                      <Link
                        href="mailto:infoacob@gmail.com"
                        className="hover:underline text-primary text-sm"
                      >
                        infoacob@gmail.com
                      </Link>
                    </div>
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=Rochas+Plaza,+26+Herbert+Macaulay+Way,+Abuja,+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <div className="md:col-span-2 w-full h-[500px] rounded-lg overflow-hidden custom-shadow sticky top-20 self-start">
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
        </div>
      </Container>
    </>
  );
}
