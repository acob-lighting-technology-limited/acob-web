import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, Users, Award, Heart, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { MaskText } from '@/components/animations/MaskText';
import { whyWorkItems, contactLinks } from '@/lib/data/contact-data';

// Icon mapping
const iconMap = {
  Lightbulb,
  Users,
  Award,
  Heart,
};

export default function CareersPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers' },
  ];

  return (
    <>
      <PageHero
        title="Careers at ACOB Lighting"
        backgroundImage="/images/contact/careers.webp?height=400&width=1200"
      >
        <MaskText
          phrases={[
            'Join our team and power the future of clean energy in Nigeria.',
            'Innovate, grow, and make a real impact.',
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border shadow-lg border-border bg-surface ">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  <MaskText phrases={['Shape the Future of Energy with Us']} />
                </h2>
                <div className="text-foreground leading-relaxed space-y-6 text-lg">
                  <p>
                    At ACOB Lighting, we believe that our people are our
                    greatest asset. We are a dynamic and growing company at the
                    forefront of Nigeria&apos;s clean energy revolution. Joining
                    our team means becoming part of a mission-driven
                    organization dedicated to innovation, sustainability, and
                    community empowerment.
                  </p>
                  <p>
                    We offer a collaborative work environment where creativity
                    is encouraged, and professional growth is prioritized. If
                    you are passionate about making a tangible difference and
                    contributing to a brighter, more sustainable future, we
                    invite you to explore career opportunities with us.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-lg border-border bg-surface ">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground ">
                  <MaskText phrases={['Why Work at ACOB Lighting?']} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-foreground leading-relaxed">
                  {whyWorkItems.map(({ icon, title, description }) => {
                    const IconComponent = iconMap[icon as keyof typeof iconMap];
                    return (
                      <div
                        key={title}
                        className="flex items-start gap-3 border p-2 rounded-lg bg-muted"
                      >
                        <IconComponent className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-lg mb-1">
                            {title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-lg border-border bg-surface ">
              <CardContent className="p-8 text-center ">
                <h2 className="text-3xl font-bold mb-6 text-foreground ">
                  <MaskText phrases={['Current Openings']} />
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We are always looking for talented individuals to join our
                  team. Check our current vacancies below.
                </p>
                <Link href="#" className="inline-block">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                    View All Vacancies
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-muted-foreground text-sm mt-4">
                  Don&apos;t see a suitable role? Send your resume to{' '}
                  <Link
                    href="mailto:careers@acoblighting.com"
                    className="text-primary hover:underline"
                  >
                    careers@acoblighting.com
                  </Link>{' '}
                  for future consideration.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">More Contact Options</h3>
                <div className="space-y-2">
                  {contactLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border group"
                    >
                      <div className="flex items-center justify-between">
                        <span>{label}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">careers@acoblighting.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">+234 704 920 2634</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">Abuja, Nigeria</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
