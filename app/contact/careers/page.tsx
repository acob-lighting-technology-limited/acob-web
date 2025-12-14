'use client';

import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Lightbulb,
  Users,
  Award,
  Heart,
  Calendar,
  MapPin as LocationIcon,
  Briefcase,
} from 'lucide-react';
import Link from 'next/link';
import { whyWorkItems, contactLinks } from '@/lib/data/contact-data';
import { getJobPostings } from '@/sanity/lib/client';
import { useEffect, useState } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';

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

  const [jobPostings, setJobPostings] = useState<
    Array<{
      _id: string;
      title: string;
      department?: string;
      location?: string;
      employmentType?: string;
      description?: string;
      applicationDeadline?: string;
      slug: { current: string };
    }>
  >([]);

  useEffect(() => {
    getJobPostings().then(setJobPostings);
  }, []);

  return (
    <>
      <Hero
        title="Careers"
        description="Join Our Mission to Power Nigeria"
        image="/images/contact/careers.webp?height=400&width=1200"
      />

      <Container className="px-4 py-6 md:py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6 md:mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-4 sm:p-5 md:p-6">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-foreground">
                  Shape the Future of Energy with Us
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-4 md:space-y-5 text-base">
                  <p>
                    At ACOB Lighting Technology Limited, we believe that our
                    people are our greatest asset. We are a dynamic and growing
                    company at the forefront of Nigeria&apos;s clean energy
                    revolution. Joining our team means becoming part of a
                    mission-driven organization dedicated to innovation,
                    sustainability, and community empowerment.
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

            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-4 sm:p-5 md:p-6">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-foreground">
                  Why Work at ACOB Lighting?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {whyWorkItems.map(({ icon, title, description }, index) => {
                    const IconComponent = iconMap[icon as keyof typeof iconMap];
                    return (
                      <FadeIn key={title} delay={index * 0.15} direction="up">
                        <div className="group flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl bg-muted/30 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer">
                          <div className="relative rounded-full bg-primary/10 p-3 overflow-hidden transition-all duration-500 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                            <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                            <IconComponent className="h-5 w-5 md:h-6 md:w-6 relative z-10 transition-colors duration-500 text-muted-foreground group-hover:text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-base md:text-lg mb-1.5 md:mb-2 text-foreground">
                              {title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {description}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-4 sm:p-5 md:p-6">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-foreground">
                  {jobPostings.length > 0
                    ? 'Current Openings'
                    : 'Career Opportunities'}
                </h2>

                {jobPostings.length > 0 ? (
                  <div className="space-y-4 md:space-y-6">
                    {jobPostings.map(
                      (job: {
                        _id: string;
                        title: string;
                        department?: string;
                        location?: string;
                        employmentType?: string;
                        description?: string;
                        applicationDeadline?: string;
                        slug: { current: string };
                      }) => (
                        <div
                          key={job._id}
                          className="p-4 md:p-5 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors duration-500"
                        >
                          <div className="mb-3 md:mb-4">
                            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                              {job.department && (
                                <div className="flex items-center gap-1">
                                  <Briefcase className="h-4 w-4" />
                                  <span>{job.department}</span>
                                </div>
                              )}
                              {job.location && (
                                <div className="flex items-center gap-1">
                                  <LocationIcon className="h-4 w-4" />
                                  <span>{job.location}</span>
                                </div>
                              )}
                              {job.employmentType && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{job.employmentType}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                            {job.description}
                          </p>

                          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                            <Link href={`/contact/careers/${job.slug.current}`}>
                              <Button variant="default">
                                View Details
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                            {job.applicationDeadline && (
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  Deadline:{' '}
                                  {new Date(
                                    job.applicationDeadline,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto">
                      We're always looking for talented individuals who are
                      passionate about clean energy and innovation to join our
                      growing team.
                    </p>
                    <div className="p-4 md:p-6 bg-muted/30 rounded-xl border border-border mb-6 md:mb-8">
                      <p className="text-sm text-muted-foreground">
                        Please check this page regularly for current job
                        openings and opportunities.
                      </p>
                    </div>
                    <Link href="/contact">
                      <Button variant="default" size="lg">
                        Contact Us
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6 sticky top-20 self-start">
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-4 md:p-5 lg:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
                  More Contact Options
                </h3>
                <div className="space-y-2">
                  {contactLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block p-2.5 md:p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-500 text-xs md:text-sm font-medium border border-border group"
                    >
                      <div className="flex items-center justify-between">
                        <span>{label}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-500" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-4 md:p-5 lg:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-2.5 md:space-y-3">
                  <div className="p-2.5 md:p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <div className="space-y-1">
                      <a
                        href="tel:+2347049202634"
                        className="text-xs md:text-sm font-semibold text-primary hover:underline block"
                      >
                        +234 704 920 2634
                      </a>
                      <a
                        href="tel:+2348032902825"
                        className="text-xs md:text-sm font-semibold text-primary hover:underline block"
                      >
                        +234 803 290 2825
                      </a>
                    </div>
                  </div>
                  <div className="p-2.5 md:p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <div className="space-y-1">
                      <a
                        href="mailto:info@acoblighting.com"
                        className="text-xs md:text-sm font-semibold text-primary hover:underline block break-all"
                      >
                        info@acoblighting.com
                      </a>
                      <a
                        href="mailto:infoacob@gmail.com"
                        className="text-xs md:text-sm font-semibold text-primary hover:underline block break-all"
                      >
                        infoacob@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="p-2.5 md:p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Address
                    </p>
                    <p className="text-xs md:text-sm font-semibold leading-relaxed">
                      Plot 2. Block 14 Extension, Federal Ministry of Works And
                      Housing Sites and Services Scheme, Setraco Gate, Gwarinpa,
                      FCT, Nigeria.
                    </p>
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
