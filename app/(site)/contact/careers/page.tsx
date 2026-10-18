import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import {
  ArrowRight,
  Calendar,
  MapPin as LocationIcon,
  Briefcase,
} from 'lucide-react';
import Link from 'next/link';
import { whyWorkItems } from '@/lib/data/contact-data';
import { getJobPostings } from '@/sanity/lib/queries';
import { FadeIn } from '@/components/animations/FadeIn';
import { formatDate } from '@/lib/utils/date';
import {
  QuickContact,
  MoreContactOptions,
} from '@/components/contact/contact-sidebar';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

export const revalidate = 300;

interface JobPosting {
  _id: string;
  title: string;
  department?: string;
  location?: string;
  employmentType?: string;
  description?: string;
  applicationDeadline?: string;
  slug: { current: string };
}

export default async function CareersPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers' },
  ];

  const jobPostings = await getJobPostings();

  return (
    <>
      <Hero
        title="Careers"
        description="Build What Powers Nigeria."
        image="/images/contact/careers.webp?height=400&width=1200"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Standfirst */}
        <div className="max-w-[68ch]">
          <SectionEyebrow>Join the team</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            Our people are our greatest asset — a mission-driven team at the
            forefront of Nigeria&apos;s clean energy revolution.
          </p>
          <p className="mt-5 max-w-[70ch] text-lg leading-relaxed text-muted-foreground">
            We offer a collaborative environment where creativity is encouraged
            and professional growth is prioritized. If you are passionate about
            making a tangible difference and contributing to a brighter, more
            sustainable future, explore career opportunities with us.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 border-t border-border pt-10 lg:grid-cols-[1fr_300px] lg:gap-14 md:mt-16">
          {/* Main column */}
          <div className="space-y-14 md:space-y-20">
            {/* Openings */}
            <section id="openings" className="scroll-mt-28">
              <div className="flex flex-wrap items-center gap-3">
                <SectionEyebrow>Opportunities</SectionEyebrow>
                {jobPostings.length > 0 && (
                  <span className="bg-primary px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary-foreground">
                    {jobPostings.length} open{' '}
                    {jobPostings.length === 1 ? 'role' : 'roles'}
                  </span>
                )}
              </div>
              <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-4xl">
                {jobPostings.length > 0
                  ? 'Current openings'
                  : 'Career opportunities'}
              </h2>

              {jobPostings.length > 0 ? (
                <div className="mt-8 space-y-6">
                  {jobPostings.map((job: JobPosting, index: number) => (
                    <article
                      key={job._id}
                      className="group relative border-l-4 border-primary bg-muted/50 p-6 transition-colors hover:bg-muted md:p-8"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="text-sm font-extrabold tabular-nums text-primary">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                          {job.title}
                        </h3>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {job.department && (
                          <span className="flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground">
                            <Briefcase className="h-3.5 w-3.5 text-primary" />
                            {job.department}
                          </span>
                        )}
                        {job.location && (
                          <span className="flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground">
                            <LocationIcon className="h-3.5 w-3.5 text-primary" />
                            {job.location}
                          </span>
                        )}
                        {job.employmentType && (
                          <span className="flex items-center gap-1.5 border border-border bg-background px-3 py-1.5 text-xs font-semibold capitalize text-foreground">
                            <Briefcase className="h-3.5 w-3.5 text-primary" />
                            {job.employmentType}
                          </span>
                        )}
                      </div>

                      {job.description && (
                        <p className="mt-5 max-w-[64ch] leading-relaxed text-muted-foreground">
                          {job.description}
                        </p>
                      )}

                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <Link
                          href={`/contact/careers/${job.slug.current}`}
                          className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-bold uppercase tracking-wide text-background transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          View details
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        {job.applicationDeadline && (
                          <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            Apply by {formatDate(job.applicationDeadline)}
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-8 border-y border-border py-12">
                  <p className="text-3xl font-extrabold uppercase tracking-tight text-foreground md:text-4xl">
                    No current openings
                  </p>
                  <p className="mt-4 max-w-[64ch] text-lg leading-relaxed text-muted-foreground">
                    We don&apos;t have any open positions right now, but
                    we&apos;re always looking for talented people who are
                    passionate about clean energy and innovation. Check back
                    regularly, or reach out directly to express interest in
                    future roles.
                  </p>
                  <Link
                    href="/contact"
                    className="group mt-6 inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-bold text-foreground transition-all hover:gap-3 hover:border-primary hover:text-primary"
                  >
                    Contact us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </section>

            {/* Why work here */}
            <section>
              <SectionEyebrow>Our culture</SectionEyebrow>
              <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
                Why work at ACOB Lighting?
              </h2>

              <div className="mt-8 border-t border-border">
                {whyWorkItems.map(({ title, description }, index) => (
                  <FadeIn
                    key={title}
                    delay={index * 0.08}
                    className="grid grid-cols-[48px_1fr] gap-x-5 border-b border-border py-6 md:grid-cols-[72px_1fr] md:gap-x-8"
                  >
                    <div className="text-2xl font-extrabold leading-none tabular-nums text-primary md:text-3xl">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="max-w-[62ch]">
                      <h3 className="text-lg font-extrabold tracking-tight text-foreground md:text-xl">
                        {title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10 lg:sticky lg:top-24">
            <QuickContact emailAudience="careers" phones="both" showAddress />
            <MoreContactOptions excludeHref="/contact/careers" />
          </aside>
        </div>
      </Container>
    </>
  );
}
