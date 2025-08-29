import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MaskText } from '@/components/animations/MaskText';
import Image from 'next/image';
import { aboutSections } from '@/lib/data/about-data';

export default function AboutPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'About Us' }];

  return (
    <>
      <PageHero
        title="About ACOB Lighting"
        backgroundImage="/images/about/acob-team.webp?height=400&width=1200"
      >
        <MaskText
          phrases={[
            'Lighting Up Nigeria with Advanced Solar Solutions.',
            'Committed to sustainable energy and community empowerment.',
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <MaskText
              phrases={["Pioneering Nigeria's Energy Access Revolution"]}
            />
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The story of Nigeria's expansion of energy access to rural
            communities cannot be told without including the pioneering role
            played by ACOB Lighting Technology Limited. We have remained
            resilient in creating new pathways for growing and scaling solar
            mini-grid solutions, providing energy access to areas where grid
            extension projects cannot easily reach.
          </p>
        </div>

        {/* Company Overview */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Our Journey
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ACOB Lighting Technology Limited was established in 2016,
                starting with street lighting installation and maintenance. From
                2016-2018, we successfully piloted LED streetlight projects
                across 23 Nigerian states, maintaining critical infrastructure
                including 25 kilometres of street lighting from the National
                Stadium to the Airport City Gate for the FCDA.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In 2018, we expanded into the renewable energy sector, embracing
                solar installations for residential homes, offices, and
                institutions. This strategic pivot led us to become one of the
                first companies selected by the Rural Electrification Agency
                (REA) to construct solar mini-grids in rural areas as part of
                their pilot program.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, ACOB has grown from a two-person team to 75 staff
                members, with the capability to complete a 15 kWp EPC project in
                just 2-3 weeks, highlighting our growth in efficiency and supply
                chain management.
              </p>
            </div>
            <div className="bg-muted/30 p-8 rounded-lg">
              <h4 className="text-xl font-semibold text-foreground mb-4">
                Our Impact
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">
                    Deployed projects in 9 communities
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">
                    Built 690 kWp combined system size
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">
                    Powers 2,306 connections
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">
                    19 communities under construction (90% completion)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">
                    2.74 MWp additional capacity in pipeline
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutSections.map(section => (
            <Link key={section.href} href={section.href}>
              <Card className="overflow-hidden shadow-lg border-[1px] border-border p-0 hover:shadow-lg transition-shadow  h-full flex flex-col">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <Image
                    src={section.image || '/placeholder.svg'}
                    alt={section.title}
                    fill
                    className="hover:scale-105 object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {section.description}
                  </p>
                  <Button
                    variant="default"
                    className="  p-3 w-full text-center h-auto justify-center mt-auto"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
