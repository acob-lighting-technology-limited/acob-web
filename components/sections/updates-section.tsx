'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';
import type { UpdatePost } from '@/lib/types';
import { formatDate } from '@/lib/utils/date';
import { cn } from '@/lib/utils';
import { MaskWords } from '@/components/animations/MaskWords';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

interface UpdatesSectionProps {
  posts: UpdatePost[];
}

function authorName(author: UpdatePost['author']): string {
  if (typeof author === 'string') {
    return author;
  }
  return (author as { name?: string })?.name || 'ACOB Lighting';
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** One update. `featured` is the large lead story: image fills the card with text over it. */
function UpdateCard({
  post,
  featured = false,
}: {
  post: UpdatePost;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/updates/${post.slug.current}`}
      className="group relative block h-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <article
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-500 group-hover:border-primary/40',
          featured ? 'min-h-[34rem] justify-end' : 'md:flex-row',
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden bg-muted',
            featured
              ? 'absolute inset-0'
              : 'aspect-[16/10] w-full md:aspect-auto md:w-[45%] md:shrink-0',
          )}
        >
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              sizes={
                featured
                  ? '(min-width: 768px) 55vw, 85vw'
                  : '(min-width: 768px) 20vw, 85vw'
              }
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-sm text-muted-foreground">
                No image available
              </span>
            </div>
          )}
          <div
            className={cn(
              'absolute inset-0',
              featured
                ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent'
                : 'bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden',
            )}
          />
        </div>

        <div
          className={cn(
            'relative flex flex-1 flex-col p-5 md:p-6',
            featured && 'flex-none text-white md:p-8',
          )}
        >
          <div
            className={cn(
              'mb-3 flex flex-wrap items-center gap-2 text-[0.7rem]',
              featured ? 'text-white/75' : 'text-muted-foreground',
            )}
          >
            <span className="rounded-full bg-primary px-2.5 py-0.5 font-bold uppercase tracking-[0.12em] text-primary-foreground">
              {post.category || 'News'}
            </span>
            <span>{authorName(post.author)}</span>
            <span aria-hidden>•</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <h3
            className={cn(
              'font-extrabold tracking-tight line-clamp-2',
              featured
                ? 'text-2xl md:text-3xl'
                : 'text-base text-foreground md:text-lg',
            )}
          >
            {post.title}
          </h3>
          <p
            className={cn(
              'mt-2 text-sm leading-relaxed line-clamp-3',
              featured
                ? 'max-w-xl text-white/80'
                : 'flex-1 text-muted-foreground',
            )}
          >
            {post.excerpt}
          </p>
          <span
            className={cn(
              'mt-4 inline-flex items-center gap-2 text-sm font-bold',
              featured ? 'text-white' : 'text-primary',
            )}
          >
            Read more
            <span
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground',
                featured ? 'border-white/40' : 'border-primary/40',
              )}
            >
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </span>
        </div>
      </article>
    </Link>
  );
}

export function UpdatesSection({ posts }: UpdatesSectionProps) {
  const latestPosts = posts?.slice(0, 3) ?? [];

  if (!posts || posts.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-background transition-colors duration-500">
        <Container className="px-4">
          <div className="text-center">
            <div className="h-3 bg-muted rounded animate-pulse mx-auto max-w-[7rem] mb-4" />
            <div className="h-10 bg-muted rounded animate-pulse mx-auto max-w-md mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="aspect-[16/10] bg-muted rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 xl:py-28 bg-white dark:bg-zinc-950 transition-colors duration-500">
      <Container className="px-4">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>News &amp; Announcements</SectionEyebrow>
            <MaskWords
              as="h2"
              text="Recent Updates."
              className="mt-3 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground md:text-4xl lg:text-5xl"
            />
          </div>
          <FadeIn delay={0.2} className="hidden md:block">
            <Link
              href="/updates"
              className="group inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-bold text-foreground transition-all hover:gap-3 hover:border-primary hover:text-primary"
            >
              View all updates
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        {/* Desktop bento: newest story large, the next two stacked beside it */}
        <motion.div
          className="hidden gap-6 md:grid md:grid-cols-[1.35fr_1fr] md:grid-rows-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          {latestPosts.map((post, i) => (
            <motion.div
              key={post._id}
              className={i === 0 ? 'md:row-span-2' : ''}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: EASE },
                },
              }}
            >
              <UpdateCard post={post} featured={i === 0} />
            </motion.div>
          ))}
        </motion.div>

        {/* Phones: swipeable cards */}
        <div className="md:hidden">
          <Carousel opts={{ containScroll: false }}>
            <CarouselContent className="-ml-4">
              {latestPosts.map(post => (
                <CarouselItem key={post._id} className="basis-[85%] pl-4">
                  <UpdateCard post={post} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots className="mt-6" />
          </Carousel>
          <div className="mt-10 text-center">
            <Link href="/updates">
              <Button className="px-8 py-3">
                View All Updates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
