'use client';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MaskText } from '@/components/animations/MaskText';

export function AboutSection() {
  return (
    <section className="py-4 bg-primary text-primary-foreground transition-colors duration-700">
      <Container className="px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8">
          <MaskText
            phrases={['Lighting Up Nigeria with Advanced Solar Solutions.']}
            className="text-2xl md:text-4xl font-bold text-center lg:text-left"
          />
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-white bg-white text-primary hover:bg-primary  dark:hover:bg- hover:text-white dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900 dark:hover:text-zinc-100 duration-700 transition-colors px-8 py-5 text-lg font-medium whitespace-nowrap"
          >
            Explore Our Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
