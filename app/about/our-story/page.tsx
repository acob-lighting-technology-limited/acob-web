import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MaskText } from '@/components/animations/MaskText';
import { milestones } from '@/lib/data/about-data';

export default function OurStoryPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Story' },
  ];

  return (
    <>
      <PageHero
        title="Our Story"
        backgroundImage="/images/about/acob-team.webp?height=400&width=1200"
      >
        <MaskText
          phrases={[
            'From humble beginnings to lighting up communities across Nigeria.',
            'Discover the journey that shaped ACOB Lighting into a leader in sustainable energy.',
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 p-6 rounded-xl bg-card">
            <div className=" max-w-none">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                <MaskText phrases={['The ACOB Lighting Journey']} />
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2016, ACOB Lighting Technology Limited emerged from a
                simple yet powerful vision: to transform Nigeria&apos;s energy
                landscape through sustainable, reliable, and accessible solar
                solutions. What started as a small team of passionate engineers
                has grown into a comprehensive energy solutions provider.
              </p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our journey began with a deep understanding of Nigeria&apos;s
                energy challenges. We recognized that millions of Nigerians,
                particularly in rural areas, lacked access to reliable
                electricity. This realization became the driving force behind
                our mission to bring light and power to every community.
              </p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Today, ACOB Lighting stands as a testament to what can be
                achieved through innovation, dedication, and a genuine
                commitment to community development. We&apos;ve successfully
                completed projects across multiple states, bringing sustainable
                energy solutions to communities that were once left in the dark.
              </p>

              <h3 className="text-2xl font-bold text-foreground mb-4 mt-8">
                Our Founding Principles
              </h3>

              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Innovation in renewable energy technology</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Community-centered development approach</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Sustainability and environmental responsibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>
                    Excellence in service delivery and customer satisfaction
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="h-4 w-4 bg-primary rounded-sm mt-0.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Founded</p>
                      <p className="text-sm font-medium">2016</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="h-4 w-4 bg-primary rounded-sm mt-0.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Projects Completed</p>
                      <p className="text-sm font-medium">50+</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="h-4 w-4 bg-primary rounded-sm mt-0.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Communities Served</p>
                      <p className="text-sm font-medium">100+</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="h-4 w-4 bg-primary rounded-sm mt-0.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-muted-foreground">Team Members</p>
                      <p className="text-sm font-medium">25+</p>
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

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            <MaskText phrases={['Our Milestones']} />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone) => {
              const IconComponent = milestone.icon;
              return (
                <Card key={milestone.year} className="text-center p-6">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {milestone.year}
                    </h3>
                    <h4 className="text-lg font-semibold text-primary mb-3">
                      {milestone.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/about">
            <Button variant="default" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform " />
              Back to About Us
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
