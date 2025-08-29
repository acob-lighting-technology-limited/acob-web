import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MaskText } from '@/components/animations/MaskText';

export default function MissionPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Mission & Vision' },
  ];

  return (
    <>
      <PageHero
        title="Mission & Vision"
        backgroundImage="/images/about/acob-team.webp?height=400&width=1200"
      >
        <MaskText
          phrases={[
            'Driving sustainable energy solutions across Nigeria.',
            'Empowering communities through innovative solar technology.',
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-12">
          {/* Mission */}
          <Card className="border shadow-md border-border bg-surface">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                <MaskText phrases={['Our Mission']} />
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To provide sustainable, reliable, and accessible solar energy solutions that transform rural communities across Nigeria, while contributing to the global transition towards renewable energy and bridging the energy access gap.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are committed to providing energy access to areas where grid extension projects cannot easily reach, ensuring that every Nigerian community has access to clean, affordable electricity that powers their homes, businesses, and economic activities.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="border shadow-md border-border bg-surface">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                <MaskText phrases={['Our Vision']} />
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To be the leading provider of solar mini-grid solutions in Nigeria, recognized for innovation, reliability, and positive community impact in rural energy access.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We envision a Nigeria where clean energy is accessible to all rural communities, where local economies thrive with reliable power, and where our solutions contribute to sustainable development and economic empowerment for generations to come.
              </p>
            </CardContent>
          </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Our Values</h3>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <h4 className="text-sm font-medium text-foreground mb-1">Innovation</h4>
                    <p className="text-xs text-muted-foreground">Pioneering sustainable energy solutions</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <h4 className="text-sm font-medium text-foreground mb-1">Quality</h4>
                    <p className="text-xs text-muted-foreground">Excellence in every project we deliver</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <h4 className="text-sm font-medium text-foreground mb-1">Community</h4>
                    <p className="text-xs text-muted-foreground">Empowering communities through energy</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <h4 className="text-sm font-medium text-foreground mb-1">Sustainability</h4>
                    <p className="text-xs text-muted-foreground">Protecting our environment for future generations</p>
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

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            <MaskText phrases={['Our Core Values']} />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Innovation
                </h3>
                <p className="text-muted-foreground text-sm">
                  Continuously developing cutting-edge solar solutions and
                  technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Community
                </h3>
                <p className="text-muted-foreground text-sm">
                  Putting communities first in all our projects and initiatives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Sustainability
                </h3>
                <p className="text-muted-foreground text-sm">
                  Committed to environmental responsibility and long-term
                  impact.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Excellence
                </h3>
                <p className="text-muted-foreground text-sm">
                  Delivering the highest quality solutions and customer service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Goals */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            <MaskText phrases={['Our Strategic Goals']} />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Short-term (1-2 years)
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Expand operations to 5 additional states</li>
                  <li>• Complete 100+ mini-grid installations</li>
                  <li>• Launch mobile solar solutions</li>
                  <li>• Establish partnerships with local governments</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Medium-term (3-5 years)
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Cover 20+ states across Nigeria</li>
                  <li>• Develop smart grid technologies</li>
                  <li>• Create 500+ direct jobs</li>
                  <li>• Achieve carbon neutrality</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Long-term (5+ years)
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Become the leading solar provider in West Africa</li>
                  <li>• Power 1 million+ households</li>
                  <li>• Export technology to neighboring countries</li>
                  <li>• Contribute to Nigeria&apos;s energy independence</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

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
