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

  const coreValues = [
    {
      icon: '🤝',
      title: 'COLLABORATION',
      description: 'Synergizing diversities and harnessing cross-sectoral competencies in satisfying our customer needs while identifying and leveraging on stakeholder partnership and relationship management in advancing and meeting our vision and mission.'
    },
    {
      icon: '💎',
      title: 'LOYALTY',
      description: 'Consistently building and maintaining a culture of trust and dedication to our brand by ensuring our client gets top-notch service delivery through innovative and value-driven solutions.'
    },
    {
      icon: '⚖️',
      title: 'ACCOUNTABILITY',
      description: 'Sustaining a culture of transparency while imbibing the high ethos of integrity, responsibility and reliability in the management of our customer and stakeholder engagements.'
    },
    {
      icon: '🎯',
      title: 'PROFESSIONALISM',
      description: 'We pride ourselves in deploying efficient solutions while imbibing high ethical standards in service delivery to stakeholders in line with international best practices.'
    }
  ];

  const sidebarCoreValues = [
    {
      title: 'collaboration',
      description: 'Synergizing diversities and harnessing cross-sectoral competencies.'
    },
    {
      title: 'loyalty',
      description: 'Building trust and dedication through innovative solutions.'
    },
    {
      title: 'accountability',
      description: 'Sustaining transparency with integrity and reliability.'
    },
    {
      title: 'professionalism',
      description: 'Deploying efficient solutions with high ethical standards.'
    }
  ];

  return (
    <>
      <PageHero
        title="Mission & Vision"
        backgroundImage="/images/about/mission-vision.png?height=400&width=1200"
        backgroundPosition="bg-center"
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
            {/* Vision */}
            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  <MaskText phrases={['Our Vision']} />
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be a flagship renewable energy company in Nigeria, driven by innovations and committed to transforming communities through sustainable energy solutions that power economic growth and environmental stewardship.
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  <MaskText phrases={['Our Mission Statement']} />
                </h2>
                <ul className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>To rapidly deploy mini-grids to underdeveloped and underserved populace in Nigeria which will be impacting the lives of over 5 million Nigerians by 2030.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Providing clean, affordable & reliable energy to unserved & underserved communities in Nigeria through isolated & interconnected mini-grids.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>To carry out the deployment of high-density LED & solar street-lighting infrastructure that meets best standards.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Using renewable energy as a catalyst to solving the decade of energy poverty in Nigeria and Sub-Saharan Africa.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Creating a sustainable future in line with the global Sustainable Development Goals (SDG-7).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Deployment of 2 million all-in-one across all geopolitical zones by 2029.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">•</span>
                    <span>Building communal resilience through the use of renewable energy.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Our Core Values</h3>
                <div className="space-y-2">
                  {sidebarCoreValues.map((value, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border">
                      <h4 className="text-sm font-medium text-foreground mb-1">
                        {value.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  ))}
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
                
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Title */}
            <div className="bg-primary text-white p-8 h-full lg:p-12 rounded-lg flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="w-4 h-4 bg-white rounded-sm mr-3"></div>
                <span className="text-sm font-medium">OUR</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                CORE VALUES
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                ACOB Lighting Technology Limited is built upon unique values that holds us together.
              </p>
            </div>

            {/* Right Column - Values */}
            <div className="space-y-6">
              {coreValues.map((value, index) => (
                <div key={index} className="border-2 border-dashed border-primary/30 p-6 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center border-2 border-dashed border-primary/50">
                        <span className="text-white font-bold text-lg">
                          {value.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goals */}
        {/* <div className="mb-16">
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
