'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MaskText } from '@/components/animations/MaskText';
import { FadeIn } from '@/components/animations/FadeIn';

const commitments = [
  'Community-first electrification strategies built with local partners',
  'Complete engineering for solar PV, hybrid mini-grids, and storage',
  'Performance monitoring, O&M, and training for long-term reliability',
];

export function AboutSection() {
  return (
    <section className="border-b border-border-[0.5px] bg-primary text-primary-foreground py-12 sm:py-16 lg:py-20 xl:py-24 transition-all duration-500">
      <Container className="px-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <FadeIn delay={0.3}>
            <div className="space-y-6">
              <MaskText
                phrases={['ACOB Lighting Technology Limited']}
                className="text-3xl font-bold md:text-4xl lg:text-5xl text-primary-foreground"
              />

              <MaskText
                phrases={[
                  'Powering Nigeria with dependable renewable energy systems that help households, industries, and governments unlock sustainable growth. From strategy to implementation, our team manages every stage of the clean energy lifecycle.',
                ]}
                className="text-base text-primary-foreground/95 md:text-lg"
              />
              <ul className="space-y-3 text-sm uppercase tracking-wide text-primary-foreground/90">
                {commitments.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className=" h-2 w-2 mt-5 flex-shrink-0 rounded-full bg-primary-foreground" />
                    <MaskText
                      phrases={[item]}
                      className="leading-relaxed text-left normal-case text-base md:text-lg"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="space-y-6 rounded-3xl bg-white/10 p-4 sm:p-6 xl:p-8 shadow-lg backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl">
              <h3 className="text-xl font-semibold uppercase tracking-wide text-primary-foreground">
                How we support your energy transition
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <FadeIn delay={0.6} direction="up">
                  <div className="h-full group rounded-2xl border border-white/20 bg-white/10 p-4 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    <h4 className="text-lg font-semibold text-primary-foreground">
                      Advisory & Audits
                    </h4>
                    <p className="mt-2 text-sm text-primary-foreground/95">
                      Site assessments, energy modelling, and regulatory
                      guidance to chart the best path forward.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.7} direction="up">
                  <div className="h-full group rounded-2xl border border-white/20 bg-white/10 p-4 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    <h4 className="text-lg font-semibold text-primary-foreground">
                      Engineering & Delivery
                    </h4>
                    <p className="mt-2 text-sm text-primary-foreground/95">
                      Design, procurement, installation, and commissioning of
                      high-performance solar and storage assets.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.8} direction="up">
                  <div className="h-full group rounded-2xl border border-white/20 bg-white/10 p-4 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    <h4 className="text-lg font-semibold text-primary-foreground">
                      Operations & Growth
                    </h4>
                    <p className="mt-2 text-sm text-primary-foreground/95">
                      Managed services and training that keep systems productive
                      and communities powered.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.9} direction="up">
                  <div className="h-full group rounded-2xl border border-white/20 bg-white/10 p-4 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                    <h4 className="text-lg font-semibold text-primary-foreground">
                      Investment Support
                    </h4>
                    <p className="mt-2 text-sm text-primary-foreground/95">
                      Business models and financing structures tuned for rapid
                      scale and measurable impact.
                    </p>
                  </div>
                </FadeIn>
              </div>

              <Link href="/about" className="inline-flex">
                <Button
                  size="lg"
                  className="border-2 border-white/70 bg-transparent px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-white hover:text-primary"
                >
                  Learn about our mission
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
