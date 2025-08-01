import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { MaskText } from '@/components/animations/MaskText';
import CallToAction from '@/components/layout/call-to-action';
import { milestones, sidebarLinks } from '@/lib/data/about-data';

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
        backgroundImage="/images/about/our-story-hero.jpg?height=400&width=1200"
      />

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  <MaskText
                    phrases={['From Vision to Illumination: Our Journey']}
                  />
                </h2>
                <div className="text-foreground leading-relaxed space-y-6 text-lg">
                  <p>
                    ACOB Lighting Technology Limited was founded with a
                    singular, powerful vision...
                  </p>
                  <p>
                    In our early years, we focused on laying the groundwork...
                  </p>
                  <p>
                    Over the years, we&apos;ve grown from a nascent startup into
                    a trusted leader...
                  </p>
                  <p>Today, ACOB Lighting continues to innovate...</p>
                </div>
              </CardContent>
            </Card>

            {/* Key Milestones */}
            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-8 space-y-8">
                <h2 className="text-3xl font-bold text-foreground">
                  <MaskText phrases={['Key Milestones']} />
                </h2>
                <ol className="relative border-l border-primary space-y-8 ml-4">
                  {milestones.map((milestone, idx) => (
                    <li key={idx} className="ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-8 ring-surface dark:ring-surface">
                        <milestone.icon className="w-3 h-3 text-primary-foreground" />
                      </span>
                      <h3 className="text-lg font-semibold text-foreground">
                        {milestone.year}
                      </h3>
                      <time className="block mb-2 text-sm text-muted-foreground">
                        {milestone.title}
                      </time>
                      <p className="text-base text-muted-foreground">
                        {milestone.description}
                      </p>
                    </li>
                  ))}
                </ol>
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
