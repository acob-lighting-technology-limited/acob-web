"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { MaskText } from '@/components/animations/MaskText';
import { AutoCarousel } from '@/components/ui/auto-carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { certifications, recognitions } from '@/lib/data/certifications-data';

export default function CertificationsPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Certifications' },
  ];

  return (
    <>
      <PageHero
        title="Certifications that Anchor Our Reliability"
        eyebrow="Certifications & Awards"
        backgroundImage="/images/about/acob-team.webp?height=800&width=1600"
        align="center"
      >
        <p className="mx-auto max-w-3xl text-balance text-lg text-white/90 md:text-xl">
          We uphold rigorous quality, safety, and environmental standards so every asset we
          deliver remains trusted, bankable, and future-ready.
        </p>
      </PageHero>

      <Container>
        <Breadcrumb items={breadcrumbItems} className="mb-10" />

        <section className="mb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 rounded-3xl border border-border bg-card/80 p-10 shadow-sm">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Why It Matters
            </span>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              <MaskText phrases={["Compliance frameworks for bankable energy assets"]} />
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Our certifications go beyond checklists—they signal the diligence, safety
              processes, and governance systems that inspire investor and community trust.
              Every deployment is audited for quality, health & safety, and environmental
              performance.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'ISO-aligned quality assurance', value: '9001:2015' },
                { label: 'Regulatory compliance', value: 'NERC & REA standards' },
                { label: 'Safety protocols', value: 'HSE Level 3' },
                { label: 'Environmental stewardship', value: 'Sustainable procurement' },
              ].map(item => (
                <Card key={item.label} className="h-full border border-border bg-muted/20">
                  <CardContent className="p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {item.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="rounded-3xl border border-border bg-card/80 p-8 shadow-sm">
              <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Accreditation Pillars</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    • Quality management systems that guarantee consistent delivery and
                    documentation oversight.
                  </p>
                  <p>
                    • Licensed operations under NERC mini-grid regulations and REA oversight.
                  </p>
                  <p>
                    • Certified technical teams trained by leading global solar institutions.
                  </p>
                  <p>
                    • Environmental and social impact frameworks aligned with international
                    best practices.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border bg-primary/5 p-8 text-primary">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                Assurance Statement
              </p>
              <p className="mt-4 text-base leading-relaxed text-primary/90">
                "Our certification portfolio gives financiers and communities confidence
                that every project we deliver will perform safely and sustainably for the
                long term."
              </p>
              <div className="mt-6">
                <p className="text-sm font-semibold">Grace Adebayo</p>
                <p className="text-xs uppercase tracking-[0.2em] text-primary/70">
                  Head of Finance & Risk
                </p>
              </div>
            </Card>
          </aside>
        </section>

        <section className="mb-16">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <span className="mx-auto inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Core Certifications
            </span>
            <h3 className="text-3xl font-semibold text-foreground md:text-4xl">
              Standards that underpin our operations
            </h3>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
              Each certification represents a rigorous assessment of our processes, safety
              culture, and technical capabilities.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {certifications.map(certification => (
              <Card
                key={certification.name}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-border bg-card/80 p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <certification.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    {certification.name}
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {certification.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-3xl border border-border bg-card/80 p-10 shadow-sm">
          <div className="mb-8 flex flex-col gap-3 text-center">
            <span className="mx-auto inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Recognitions & Awards
            </span>
            <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
              Industry recognition for impact and reliability
            </h3>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
              Our projects and leadership have been recognized by national and international
              partners for advancing clean energy access.
            </p>
          </div>

          <AutoCarousel
            items={recognitions}
            renderItem={(item: typeof recognitions[0]) => (
              <Card className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card/80 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    {item.year}
                  </Badge>
                  <span>{item.organizer}</span>
                </div>
                <h4 className="text-xl font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            )}
          />
        </section>

        <section className="mb-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Compliance in Practice
            </span>
            <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
              Integrated governance across every project stage
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: 'Design & Engineering',
                  details: 'Peer-reviewed designs, environmental and social impact assessments, and HSE planning before mobilisation.',
                },
                {
                  title: 'Construction & Commissioning',
                  details: 'Licensed technicians, quality audits, and independent testing protocols before handover.',
                },
                {
                  title: 'Operations & Maintenance',
                  details: 'Remote monitoring, scheduled maintenance, and rapid response teams for uptime assurance.',
                },
                {
                  title: 'Stakeholder Reporting',
                  details: 'Transparent performance dashboards for investors, regulators, and community leaders.',
                },
              ].map(item => (
                <Card key={item.title} className="border border-border bg-muted/20">
                  <CardContent className="space-y-2 p-5">
                    <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.details}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-primary/30 bg-primary/5 p-8 text-primary">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                Partner Confidence
              </p>
              <p className="text-base leading-relaxed text-primary/90">
                Our compliance track record has enabled us to secure NGN 1.51 billion in
                green infrastructure financing and longstanding partnerships with
                international technology providers.
              </p>
            </div>
            <Button asChild variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
              <Link href="/contact/quote">Request compliance documentation</Link>
            </Button>
          </Card>
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
