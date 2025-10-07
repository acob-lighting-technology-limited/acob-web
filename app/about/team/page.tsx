import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { MaskText } from '@/components/animations/MaskText';
import { AutoCarousel } from '@/components/ui/auto-carousel';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { PageHero } from '@/components/ui/page-hero';
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
        title="Meet the Leaders Powering Nigeria's Energy Transition"
        backgroundImage="/images/about/acob-team.webp?height=800&width=1600"
        eyebrow="Our Team"
        align="center"
      >
        <p className="mx-auto max-w-3xl text-balance text-lg text-white/90 md:text-xl">
          A multidisciplinary team of engineers, project managers, community specialists,
          and support professionals delivering bankable clean energy infrastructure across
          Nigeria.
        </p>
      </PageHero>

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-10" />

        <section className="mb-16 grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 rounded-3xl border border-border bg-card/80 p-10 shadow-sm">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Leadership Philosophy
            </span>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              <MaskText phrases={["People-first execution, engineering-led delivery"]} />
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Our team blends local expertise with international best practices to deliver
              resilient energy infrastructure. Each project is championed by
              cross-functional squads—engineering, community engagement, finance, and
              operations—ensuring communities stay powered long after commissioning.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              With regional hubs and on-the-ground maintenance crews, we continue to invest
              in capacity-building, safety, and innovation so every installation improves
              quality of life and economic opportunity.
            </p>
          </div>

          <aside className="space-y-6">
            <Card className="rounded-3xl border border-border bg-card/80 p-8 shadow-sm">
              <CardContent className="p-0 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  Team Snapshot
                </h3>
                <div className="grid gap-3">
                  {[
                    { label: 'Full-time specialists', value: '75+' },
                    { label: 'Regional maintenance hubs', value: '5' },
                    { label: 'Women in leadership', value: '40%' },
                    { label: 'Average years of experience', value: '12+' },
                  ].map(item => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-muted/20 p-4"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border bg-primary/5 p-8 text-primary">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                Team Ethos
              </p>
              <p className="mt-4 text-base leading-relaxed text-primary/90">
                "We build generational infrastructure by mentoring the next wave of
                Nigerian engineers and project managers to own the energy transition."
              </p>
              <div className="mt-6">
                <p className="text-sm font-semibold">Alex Obiechina</p>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/70">
                  Founder & CEO
                </p>
              </div>
            </Card>
          </aside>
        </section>

        <section className="mb-16">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <span className="mx-auto inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Leadership Team
            </span>
            <h3 className="text-3xl font-semibold text-foreground md:text-4xl">
              Specialist teams driving project delivery
            </h3>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
              Our leadership combines engineering, finance, community development, and
              operational excellence to ensure every asset performs reliably and delivers
              measurable impact.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map(member => (
              <Card
                key={member.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <h4 className="text-xl font-semibold text-foreground">
                      {member.name}
                    </h4>
                    <p className="text-sm uppercase tracking-[0.2em] text-primary">
                      {member.position}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-3 text-sm">
                    {member.email ? (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-primary transition-colors hover:text-primary/80"
                      >
                        {member.email}
                      </a>
                    ) : null}
                    {member.linkedin && member.linkedin !== '#' ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        LinkedIn
                      </a>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-3xl border border-border bg-card/80 p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Project Delivery Pods
              </span>
              <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
                Agile teams aligned to project lifecycle phases
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Every deployment is executed by cross-functional pods—combining design
                engineering, procurement, field construction, community engagement, and
                ongoing maintenance. This structure keeps our assets dependable and
                responsive to evolving community needs.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  'Project origination & feasibility',
                  'Engineering design & procurement',
                  'Community engagement & productive use',
                  'Operations, maintenance & monitoring',
                ].map(item => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/company-team.webp"
                alt="ACOB operations team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <div className="mb-8 text-center">
          <Link href="/about">
            <Button variant="outline" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to About Overview
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
