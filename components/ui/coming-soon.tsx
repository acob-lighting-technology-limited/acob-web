'use client';

import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { MaskText } from '@/components/animations/MaskText';
import { FadeIn } from '@/components/animations/FadeIn';

interface ComingSoonProps {
  title: string;
  description?: string;
  breadcrumbItems?: Array<{ label: string; href?: string }>;
  backgroundImage?: string;
}

export function ComingSoon({
  title,
  description = "We're working on something amazing. This page will be available soon!",
  breadcrumbItems,
  backgroundImage,
}: ComingSoonProps) {
  return (
    <>
      {backgroundImage ? (
        <PageHero description={description} backgroundImage={backgroundImage}>
          <MaskText
            phrases={[title]}
            className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
          />
        </PageHero>
      ) : null}

      <Container className="px-4 py-16 sm:py-20">
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
        )}

        <FadeIn delay={0.2}>
          <div className="flex min-h-[60vh] items-center justify-center">
            <Card className="w-full max-w-2xl text-center shadow-lg">
              <CardContent className="p-8 sm:p-12">
                <div className="mb-8">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-6">
                      <Clock className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <h1 className="mb-4 text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
                    <MaskText phrases={[title]} />
                  </h1>
                  <p className="mx-auto max-w-md text-base text-muted-foreground sm:text-lg">
                    {description}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    We're working hard to bring you an improved experience.
                    Check back soon for updates!
                  </p>

                  <div className="pt-6">
                    <Link href="/">
                      <Button size="lg" className="group w-full sm:w-auto">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
