'use client';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { FadeIn } from '@/components/animations/FadeIn';
import {
  StaggerChildren,
  staggerItem,
} from '@/components/animations/StaggerChildren';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Remove direct Sanity import - use API route instead

import type { UpdatePost } from '@/lib/types';
import { formatDate } from '@/lib/utils/date';

interface UpdatesSectionProps {
  posts: UpdatePost[];
}

export function UpdatesSection({ posts }: UpdatesSectionProps) {
  const latestPosts = posts.slice(0, 3); // Get only the latest 3 posts
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      // Track current slide if needed in the future
    });
  }, [api]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!api || latestPosts.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, [api, latestPosts.length]);

  if (!posts || posts.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white dark:bg-zinc-950 transition-colors duration-500">
        <Container className="px-4">
          <div className="text-center">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mx-auto max-w-md mb-4" />
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mx-auto max-w-2xl mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white dark:bg-zinc-950 transition-all duration-500">
      <Container className="px-4">
        {/* Header */}
        <FadeIn delay={0.2}>
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded-full text-sm font-medium mb-4 dark:bg-primary/30 dark:text-primary transition-colors duration-500">
              News & Announcements
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white transition-colors duration-500">
              Recent Updates
            </h2>{' '}
            {/* Renamed title */}
          </div>
        </FadeIn>

        {/* Mobile Carousel */}
        <div className="block md:hidden">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {latestPosts.map((post: UpdatePost) => (
                <CarouselItem key={post._id} className="pl-2 md:pl-4">
                  <Card className="group h-full overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                    {/* Image */}
                    <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={false}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">
                            No image available
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                      <div className="absolute bottom-4 left-4 right-4 text-sm font-medium uppercase tracking-wide text-white/70">
                        {post.category || 'News'}
                      </div>
                    </div>

                    <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                      {/* Date and Author */}
                      <div className="flex items-center text-xs text-muted-foreground mb-3">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>

                      <div className="space-y-3">
                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-semibold text-foreground line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm md:text-base text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Read More Button */}
                      <div className="mt-auto pt-6">
                        <Link href={`/updates/${post.slug.current}`}>
                          <Button
                            variant="outline"
                            className="relative w-full justify-center gap-2 border-primary bg-background text-foreground overflow-hidden transition-colors duration-500 group-hover:text-primary-foreground"
                          >
                            <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                            <span className="relative z-10 flex items-center gap-2">
                              <span className="sr-only">
                                Read more about {post.title}
                              </span>
                              <span aria-hidden="true">Read more</span>
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <StaggerChildren
          staggerDelay={0.3}
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {latestPosts.map((post: UpdatePost) => (
            <motion.div key={post._id} variants={staggerItem}>
              <Card className="group h-full overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">
                        No image available
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-medium uppercase tracking-wide text-white/70">
                    {post.category || 'News'}
                  </div>
                </div>

                <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                  {/* Date and Author */}
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>

                  <div className="space-y-3">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm md:text-base text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <div className="mt-auto pt-6">
                    <Link href={`/updates/${post.slug.current}`}>
                      <Button
                        variant="outline"
                        className="relative w-full justify-center gap-2 border-primary bg-background text-foreground overflow-hidden transition-colors duration-500 group-hover:text-primary-foreground"
                      >
                        <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />
                        <span className="relative z-10 flex items-center gap-2">
                          <span className="sr-only">
                            Read more about {post.title}
                          </span>
                          <span aria-hidden="true">Read more</span>
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* View All Button */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-12">
            <Link href="/updates">
              {' '}
              {/* Changed link to /updates */}
              <Button className=" px-8 py-3">
                View All Updates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
