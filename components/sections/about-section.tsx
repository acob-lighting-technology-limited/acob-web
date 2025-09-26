'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MaskText } from '@/components/animations/MaskText';

const commitments = [
  'Community-first electrification strategies built with local partners',
  'Turnkey engineering for solar PV, hybrid mini-grids, and storage',
  'Performance monitoring, O&M, and training for long-term reliability',
];

export function AboutSection() {
  return (
    <section className="border-b border-border bg-primary text-primary-foreground py-16 transition-colors duration-700">
      <Container className="px-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="space-y-6">
            <MaskText
              phrases={['Lighting up economies with dependable renewable power']}
              className="text-3xl font-semibold leading-tight md:text-4xl"
            />
            <MaskText
              phrases={["ACOB Lighting Technology Limited designs and delivers scalable clean energy systems that help households, industries, and governments unlock sustainable growth. From strategy to implementation, our team manages every stage of the clean energy lifecycle."]}
              className="text-base text-primary-foreground/80 md:text-lg"
            />
            <ul className="space-y-3 text-sm uppercase tracking-wide text-primary-foreground/70">
              {commitments.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary-foreground" />
                  <MaskText
                    phrases={[item]}
                    className="leading-relaxed text-left normal-case text-base md:text-lg"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 rounded-3xl bg-white/10 p-8 shadow-lg backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl">
            <h3 className="text-xl font-semibold uppercase tracking-wide text-primary-foreground/80">
              How we support your energy transition
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <h4 className="text-lg font-semibold">Advisory & Audits</h4>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Site assessments, energy modelling, and regulatory guidance to chart the best path forward.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <h4 className="text-lg font-semibold">Engineering & Delivery</h4>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Design, procurement, installation, and commissioning of high-performance solar and storage assets.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <h4 className="text-lg font-semibold">Operations & Growth</h4>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Managed services and training that keep systems productive and communities powered.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <h4 className="text-lg font-semibold">Investment Support</h4>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Business models and financing structures tuned for rapid scale and measurable impact.
                </p>
              </div>
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
        </div>
      </Container>
    </section>
  );
}
