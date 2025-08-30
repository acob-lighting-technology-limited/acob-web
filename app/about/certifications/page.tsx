import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Award, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { MaskText } from '@/components/animations/MaskText';

export default function CertificationsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Certifications' },
  ];

  const certifications = [
    {
      title: 'ISO 9001:2015',
      description: 'Quality Management System',
      year: '2020',
      status: 'Active',
    },
    {
      title: 'ISO 14001:2015',
      description: 'Environmental Management System',
      year: '2021',
      status: 'Active',
    },
    {
      title: 'OHSAS 18001:2007',
      description: 'Occupational Health and Safety',
      year: '2021',
      status: 'Active',
    },
    {
      title: 'NERC License',
      description: 'Nigerian Electricity Regulatory Commission',
      year: '2019',
      status: 'Active',
    },
    {
      title: 'SONCAP Certification',
      description: 'Standards Organization of Nigeria',
      year: '2020',
      status: 'Active',
    },
    {
      title: 'NEMSA Approval',
      description: 'Nigerian Electricity Management Services Agency',
      year: '2022',
      status: 'Active',
    },
  ];

  const awards = [
    {
      title: 'Best Renewable Energy Company',
      organization: 'Nigerian Energy Awards',
      year: '2023',
      description:
        'Recognition for outstanding contribution to renewable energy development.',
    },
    {
      title: 'Community Impact Award',
      organization: 'Sustainable Development Forum',
      year: '2022',
      description:
        'For exceptional community development through solar energy projects.',
    },
    {
      title: 'Innovation Excellence',
      organization: 'West African Energy Summit',
      year: '2021',
      description:
        'Awarded for innovative solar solutions and technology implementation.',
    },
  ];

  return (
    <>
      <PageHero
        title="Certifications & Awards"
        backgroundImage="/images/about/acob-team.webp?height=400&width=1200"
      >
        <MaskText
          phrases={[
            'Meeting the highest standards in quality and safety.',
            'Recognized for excellence in renewable energy solutions.',
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/*
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <MaskText phrases={['Our Certifications & Standards']} />
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ACOB Lighting maintains the highest standards of quality, safety,
            and environmental responsibility. Our certifications demonstrate our
            commitment to excellence and compliance with international and local
            regulations.
          </p>
        </div> */}

            {/* Certifications */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Industry Certifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-foreground mb-1">
                            {cert.title}
                          </h4>
                          <p className="text-muted-foreground text-sm mb-2">
                            {cert.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Year: {cert.year}
                            </span>
                            <span className="flex items-center text-sm text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {cert.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Awards & Recognition
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {awards.map((award, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="text-lg font-bold text-foreground mb-2">
                          {award.title}
                        </h4>
                        <p className="text-primary font-semibold text-sm mb-2">
                          {award.organization}
                        </p>
                        <p className="text-muted-foreground text-sm mb-3">
                          {award.description}
                        </p>
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {award.year}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quality Commitment */}
            <div className="mb-16">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Our Quality Commitment
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                      At ACOB Lighting, we are committed to maintaining the
                      highest standards of quality in all our operations. Our
                      certifications and awards reflect our dedication to
                      excellence, safety, and environmental responsibility.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-xl">🔒</span>
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Safety First
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Ensuring the safety of our team and communities in all
                          projects.
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-xl">🌍</span>
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Environmental Care
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Minimizing environmental impact through sustainable
                          practices.
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-xl">⭐</span>
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Quality Excellence
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Delivering superior quality in every project and
                          service.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quality Standards</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="h-4 w-4 bg-primary rounded-sm mt-0.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        ISO Certified
                      </p>
                      <p className="text-sm font-medium">Multiple Standards</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="h-4 w-4 bg-primary rounded-sm mt-0.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Industry Awards
                      </p>
                      <p className="text-sm font-medium">3+ Awards Received</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="h-4 w-4 bg-primary rounded-sm mt-0.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Compliance
                      </p>
                      <p className="text-sm font-medium">100% Regulatory</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Explore More</h3>
                <div className="space-y-2">
                  <Link
                    href="/about/our-story"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/about/mission"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Mission & Vision
                  </Link>
                  <Link
                    href="/about/team"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Meet Our Team
                  </Link>
                
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/about">
            <Button variant="outline" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to About Us
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
