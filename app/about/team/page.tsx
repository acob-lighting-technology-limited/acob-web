import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { MaskText } from '@/components/animations/MaskText';
import Image from 'next/image';
import { teamMembers } from '@/lib/data/about-data';

export default function TeamPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Meet Our Team' },
  ];

  return (
    <>
      <PageHero
        title="Meet Our Team"
        backgroundImage="/images/about/acob-team.webp?height=400&width=1200"
      >
        <MaskText
          phrases={[
            '75 dedicated professionals driving energy access across Nigeria.',
            'Meet the team behind our solar mini-grid solutions.',
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <MaskText phrases={['Our Leadership Team']} />
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our team of experienced professionals brings together expertise in
            renewable energy, engineering, community development, and
            sustainable business practices to deliver exceptional results.
          </p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {teamMembers.map(member => (
                <Card
                  key={member.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow !py-0"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold mb-3">
                      {member.position}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex space-x-2">
                      <Link href={member.linkedin}>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`mailto:${member.email}`}>
                        <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Join Our Team</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="h-4 w-4 bg-primary rounded-sm mt-0.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Open Positions</p>
                      <p className="text-sm font-medium">Multiple roles available</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="h-4 w-4 bg-primary rounded-sm mt-0.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Work Environment</p>
                      <p className="text-sm font-medium">On-site</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="h-4 w-4 bg-primary rounded-sm mt-0.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Contact</p>
                      <p className="text-sm font-medium">careers@acoblighting.com</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Link
                    href="/contact/careers"
                    className="text-sm text-primary hover:text-primary/80 flex items-center font-medium"
                  >
                    View Career Opportunities
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
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
                    href="/about/certifications"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Certifications
                  </Link>
                  <Link
                    href="/about"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    About Overview
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Values */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            <MaskText phrases={['What Drives Our Team']} />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Expertise
                </h3>
                <p className="text-muted-foreground text-sm">
                  Years of experience in renewable energy and sustainable
                  development.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Passion
                </h3>
                <p className="text-muted-foreground text-sm">
                  Genuine commitment to making a positive impact in communities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Collaboration
                </h3>
                <p className="text-muted-foreground text-sm">
                  Working together to achieve our shared vision of sustainable
                  energy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div> */}

        <div className="text-center">
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
