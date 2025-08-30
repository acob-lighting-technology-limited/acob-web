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
                <MaskText phrases={['ACOB\'s Journey to Powering Rural Communities']} />
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                ACOB Lighting Technology Limited was established in 2016, starting with street lighting installation and maintenance. From 2016-2018, we successfully piloted LED streetlight projects across 23 Nigerian states, maintaining critical infrastructure including 25 kilometres of street lighting from the National Stadium to the Airport City Gate for the FCDA.
              </p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                In 2018, we expanded into the renewable energy sector, embracing solar installations for residential homes, offices, and institutions. This strategic pivot led us to become one of the first companies selected by the Rural Electrification Agency (REA) to construct solar mini-grids in rural areas as part of their pilot program.
              </p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Today, ACOB has grown from a two-person team to 75 staff members, with the capability to complete a 15 kWp EPC project in just 2-3 weeks, highlighting our growth in efficiency and supply chain management.
              </p>

              <h3 className="text-2xl font-bold text-foreground mb-4 mt-8">
                Our Strategic Evolution
              </h3>

              <div className="space-y-6">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-foreground mb-3">From Street Lighting to Solar Mini-Grids</h4>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Maintaining and installing street lighting formed the initial bedrock of ACOB's business. From 2016–2018, notable street lighting projects included piloting LED streetlight projects across 23 Nigerian states, maintaining 25 kilometres of street lighting from the National Stadium to the Airport City Gate for the FCDA, and undertaking comprehensive street lighting infrastructure for the Kogi State Government House.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    As street lighting maintenance contracts neared completion, we discovered an answer to the question of what would happen to our assembled staff when we heard of and registered to attend a Schneider Electric training workshop in Lagos in 2018. During this training, we received detailed exposure to large-scale solar installations.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-foreground mb-3">Scaling ACOB Lighting</h4>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    ACOB lighting has since grown, evolving from a two-person team to 75 staff members. Today, a similar 15 kWp EPC project can be completed in just 2-3 weeks, highlighting ACOB's growth in efficiency and supply chain management.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    In addition to street lighting installation and maintenance, ACOB offers comprehensive services in the renewable energy sector including isolated mini-grids, commercial & industrial solutions, EPC/contractor services, and energy audit services.
                  </p>
                </div>
              </div>
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
