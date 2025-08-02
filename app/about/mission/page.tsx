import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { MaskText } from '@/components/animations/MaskText';

import CallToAction from '@/components/layout/call-to-action';

import { missionVisionData, coreValues } from '@/lib/data/mission-data';

export default function MissionVisionPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Mission & Vision' },
  ];
  const sidebarLinks = [
    { label: 'Our Story', href: '/about/our-story', isActive: false },
    { label: 'Mission & Vision', href: '/about/mission', isActive: true },
    { label: 'Meet Our Team', href: '/about/team', isActive: false },
    { label: 'Certifications', href: '/about/certifications', isActive: false },
  ];
  return (
    <>
      <PageHero
        title="Our Mission & Vision"
        backgroundImage="/images/about/mission-vision-hero.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8 ">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border shadow-lg border-border bg-surface">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  <MaskText
                    phrases={['Our Driving Purpose: Illuminating Lives']}
                  />
                </h2>
                <div className="text-foreground leading-relaxed space-y-6 text-lg">
                  {missionVisionData.map(({ icon: Icon, title, content }) => (
                    <div
                      key={title}
                      className="flex items-start gap-4 border border-border p-2 bg-muted rounded-lg"
                    >
                      <Icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                          {title}
                        </h3>
                        <p className="text-muted-foreground">{content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-lg border-border bg-surface">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  <MaskText phrases={['Our Core Values']} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-foreground leading-relaxed">
                  {coreValues.map(({ icon: Icon, title, description }) => (
                    <div
                      key={title}
                      className="flex items-start gap-3 border border-border p-2 bg-muted rounded-lg"
                    >
                      <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start ">
            <div className="bg-muted p-6 rounded-lg  border-t-2 border-t-primary border-[1px]">
              {/* <h3 className="text-2xl font-bold text-black mb-6">More About Us</h3> */}
              <div className="space-y-3">
                {sidebarLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className={`
                    p-3 rounded-lg flex items-center justify-between
                      ${link.isActive ? 'bg-primary text-primary-foreground' : 'bg-surface text-foreground hover:bg-muted'}
                    `}
                  >
                    <span className="font-semibold text-sm">{link.label}</span>
                    {link.isActive && (
                      <div className="w-6 h-6 bg-primary-foreground rounded-full flex-shrink-0"></div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            {/* Call to Action Widget */}
            <CallToAction />
          </div>
        </div>
      </Container>
    </>
  );
}
