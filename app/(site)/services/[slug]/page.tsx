import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getServiceBySlug, servicesData } from '@/lib/data';
import Link from 'next/link';
import { Hero } from '@/components/ui/hero';
import { ServiceGallery } from '@/components/services/service-gallery';
import { ShareCopy } from '@/components/updates/share-copy';
import Image from 'next/image';
import { FadeIn } from '@/components/animations/FadeIn';
import { client } from '@/sanity/lib/queries';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map(service => ({ slug: service.slug }));
}

/** Pulls out the first benefit that carries a headline metric (e.g. "Up to
 *  60% reduction…") so it can be rendered as a big stat callout instead of
 *  buried in a plain bullet list. */
function extractLeadMetric(benefits: string[] | undefined) {
  if (!benefits || benefits.length === 0) {
    return null;
  }
  const metricPattern = /\d+%|\d+\/\d+|\d+\+/;
  const index = benefits.findIndex(b => metricPattern.test(b));
  if (index === -1) {
    return null;
  }
  const match = benefits[index].match(metricPattern);
  return match ? { index, value: match[0], caption: benefits[index] } : null;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.title },
  ];

  const relatedServices = servicesData.filter(s => s.slug !== slug).slice(0, 3);

  let projects: Array<{
    title: string;
    slug: { current: string };
    coverImage?: string | null;
  }> = [];
  try {
    projects = await client.fetch(
      '*[_type == "project"]{ title, slug, "coverImage": coalesce(coverImage.asset->url, projectImage.asset->url) }',
    );
  } catch (e) {
    console.error(
      'Failed to fetch projects for service deployments matching:',
      e,
    );
  }

  const findMatchingProject = (deploymentName: string) => {
    const cleanSearchTerm = (name: string) => {
      let cleaned = name.toLowerCase();
      if (cleaned.includes('akth')) {
        return 'aminu kano';
      }
      if (cleaned.includes('idh')) {
        return 'infectious disease';
      }
      if (cleaned.includes('wase')) {
        return 'wase';
      }
      if (cleaned.includes('sanusi')) {
        return 'sanusi';
      }
      if (cleaned.includes('kazaure')) {
        return 'kazaure';
      }
      if (cleaned.includes('babura')) {
        return 'babura';
      }
      if (cleaned.includes('hadejia')) {
        return 'hadejia';
      }
      if (cleaned.includes('rasheed')) {
        return 'rasheed';
      }
      if (cleaned.includes('gwantu')) {
        return 'gwantu';
      }
      if (cleaned.includes('ikara')) {
        return 'ikara';
      }
      if (cleaned.includes('yakowa') || cleaned.includes('kafanchan')) {
        return 'yakowa';
      }
      cleaned = cleaned
        .replace(
          /\b(community|hospital|general|teaching|zonal|specialist|facility|site|sites|headquarters|utility|suite|bank|home)\b/g,
          '',
        )
        .replace(/,/g, '')
        .trim();
      return cleaned;
    };

    const term = cleanSearchTerm(deploymentName);
    if (!term) {
      return null;
    }
    return projects.find(proj => proj.title.toLowerCase().includes(term));
  };

  const descParts = service.description.split(
    /We have successfully[\s\S]*?including:/i,
  );
  const introText = descParts[0].trim();
  const projectsSection = descParts[1] ? descParts[1].trim() : '';
  const completedProjects = projectsSection
    ? projectsSection
        .split('\n')
        .map(line => line.replace(/^•\s*/, '').trim())
        .filter(Boolean)
    : [];

  const hasGlance =
    (service.features && service.features.length > 0) ||
    (service.benefits && service.benefits.length > 0);

  const leadMetric = extractLeadMetric(service.benefits);
  const remainingBenefits = service.benefits
    ? service.benefits.filter((_, i) => i !== leadMetric?.index)
    : [];

  const galleryImages = service.gallery ?? [];

  return (
    <>
      <Hero
        title="Our Services"
        description={service.title}
        image={service.image}
        titleSize="display"
      />
      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Overview */}
        <div className="max-w-[72ch]">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-primary">
            Service Overview
          </span>
          <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-foreground/90 md:text-xl">
            {introText}
          </p>
        </div>

        {/* At a glance — the system (features) vs the impact (outcomes) */}
        {hasGlance && (
          <FadeIn>
            <section className="mt-12 grid gap-8 border-t-[3px] border-foreground pt-10 md:mt-16 md:grid-cols-[1fr_1.2fr] md:gap-10">
              {/* The System — compact spec list */}
              {service.features && service.features.length > 0 && (
                <div>
                  <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary">
                    The System
                  </span>
                  <h2 className="mt-2 text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                    Key Features
                  </h2>
                  <ul className="mt-6 divide-y divide-border border-y border-border">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 py-3">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-sm bg-primary" />
                        <span className="text-sm leading-relaxed text-foreground/90 md:text-base">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* The Impact — tinted panel led by the standout metric */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="border border-primary/25 bg-primary/5 p-6 md:p-8 rounded-2xl">
                  <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary">
                    The Impact
                  </span>
                  <h2 className="mt-2 text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                    Value &amp; Impact
                  </h2>

                  {leadMetric && (
                    <div className="mt-6 border-b border-primary/20 pb-6">
                      <div className="text-5xl font-extrabold leading-none tabular-nums text-primary md:text-6xl">
                        {leadMetric.value}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-foreground md:text-base">
                        {leadMetric.caption}
                      </p>
                    </div>
                  )}

                  <ul className="mt-6 space-y-3">
                    {remainingBenefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/90 md:text-base"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </FadeIn>
        )}

        {/* Applications */}
        {service.applications && service.applications.length > 0 && (
          <section className="mt-14 md:mt-16">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary">
              Target Applications
            </span>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.applications.map((app, i) => (
                <span
                  key={i}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  {app}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Portfolio gallery */}
        {service.gallery && service.gallery.length > 0 && (
          <FadeIn>
            <section className="mt-14 md:mt-20">
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary">
                Portfolio
              </span>
              <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
                Project gallery
              </h2>
              <div className="mt-6">
                <ServiceGallery
                  images={service.gallery}
                  serviceTitle={service.title}
                />
              </div>
            </section>
          </FadeIn>
        )}

        {/* Key completed deployments */}
        {completedProjects.length > 0 && (
          <FadeIn>
            <section className="mt-14 md:mt-20">
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary">
                Track record
              </span>
              <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
                Key completed deployments
              </h2>

              <div className="mt-6 border-t border-border">
                {completedProjects.map((proj, idx) => {
                  const colonIdx = proj.indexOf(':');
                  let name = proj;
                  let detail = '';
                  if (colonIdx !== -1) {
                    name = proj.substring(0, colonIdx).trim();
                    detail = proj.substring(colonIdx + 1).trim();
                  }
                  const matchingProject = findMatchingProject(name);
                  // Prioritize the matching project's own cover image;
                  // otherwise fall back to cycling through the service's gallery.
                  const thumb = matchingProject?.coverImage
                    ? matchingProject.coverImage
                    : galleryImages.length > 0
                      ? galleryImages[idx % galleryImages.length].split('?')[0]
                      : null;

                  const inner = (
                    <div className="grid grid-cols-[72px_1fr_auto] items-center gap-x-4 py-5 sm:grid-cols-[96px_1fr_auto] md:grid-cols-[120px_1fr_auto]">
                      {thumb ? (
                        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted rounded-lg">
                          <Image
                            src={thumb}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="120px"
                          />
                          <span className="absolute bottom-1 left-1.5 text-[0.7rem] font-extrabold leading-none tabular-nums text-white drop-shadow">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-extrabold leading-none tabular-nums text-primary md:text-3xl">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      )}
                      <div>
                        <h3 className="font-bold text-foreground transition-colors group-hover:text-primary">
                          {name}
                        </h3>
                        {detail && (
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {detail}
                          </p>
                        )}
                      </div>
                      {matchingProject && (
                        <ArrowRight className="h-5 w-5 shrink-0 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                      )}
                    </div>
                  );

                  return matchingProject ? (
                    <Link
                      key={idx}
                      href={`/projects/${matchingProject.slug.current}`}
                      className="group -mx-2 block border-b border-border px-2 transition-colors hover:bg-muted/40"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div key={idx} className="border-b border-border">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </section>
          </FadeIn>
        )}

        {/* Why choose ACOB */}
        {service.whyChooseUs && service.whyChooseUs.length > 0 && (
          <section className="mt-14 border-t border-border pt-10 md:mt-20">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary">
              The ACOB difference
            </span>
            <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
              Why choose us
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {service.whyChooseUs.map((w, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground dark:text-foreground/90 md:text-base"
                >
                  <span className="font-extrabold text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Share */}
        <div className="mt-14 flex items-center gap-4 border-y border-border py-8">
          <span className="text-sm font-semibold text-muted-foreground">
            Share this Service:
          </span>
          <ShareCopy className="rounded-full bg-transparent" />
        </div>

        {/* Related services */}
        {relatedServices.length > 0 && (
          <section className="mt-16 md:mt-20">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary">
                  Keep exploring
                </span>
                <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
                  Related services
                </h2>
              </div>
              <Link
                href="/services"
                className="hidden items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2 sm:flex"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {relatedServices.map(relatedService => (
                <Link
                  key={relatedService.id}
                  href={`/services/${relatedService.slug}`}
                  className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                      <Image
                        src={relatedService.image}
                        alt={relatedService.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 md:p-5">
                      <h3 className="text-base font-extrabold tracking-tight text-foreground line-clamp-2">
                        {relatedService.title}
                      </h3>
                      {relatedService.excerpt && (
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3 md:text-sm">
                          {relatedService.excerpt}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary md:text-sm">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back */}
        <div className="mb-8 mt-16 text-center">
          <Link href="/services">
            <Button variant="outline" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Services
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
