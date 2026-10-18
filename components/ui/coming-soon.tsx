import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FadeIn } from '@/components/animations/FadeIn';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';
import { CONTACT_INFO } from '@/lib/constants/app.constants';

interface ComingSoonProps {
  title: string;
  description?: string;
  breadcrumbItems?: Array<{ label: string; href?: string }>;
  backgroundImage?: string;
  backHref?: string;
  backLabel?: string;
}

export function ComingSoon({
  title,
  description = "We're working on something amazing. This page will be available soon!",
  breadcrumbItems,
  backgroundImage,
  backHref = '/',
  backLabel = 'Back to Home',
}: ComingSoonProps) {
  return (
    <>
      {backgroundImage ? (
        <Hero
          title={title}
          description={title}
          image={backgroundImage}
          titleSize="display"
        />
      ) : null}

      <Container className="px-4 py-8">
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />
        )}

        <FadeIn>
          <div className="flex min-h-[45vh] flex-col justify-center border-t border-border py-12 md:py-16">
            <SectionEyebrow>Coming soon</SectionEyebrow>
            <p className="mt-5 max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
              {description}
            </p>
            <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-muted-foreground md:text-lg">
              We&apos;re working hard to bring you an improved experience. In
              the meantime, our team is happy to help directly.
            </p>

            {/* Never a dead end: a direct way to reach the team. */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${CONTACT_INFO.email.general}`}>
                <Button size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Email {CONTACT_INFO.email.general}
                </Button>
              </a>
              <Link href={backHref}>
                <Button variant="outline" size="lg" className="group">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  {backLabel}
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
