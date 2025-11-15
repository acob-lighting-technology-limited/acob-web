import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getUpdatePosts } from '@/sanity/lib/client';
import type { UpdatePost } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';

export default async function PressPage() {
  const posts = await getUpdatePosts();

  // Filter for press releases using the new string-based category system
  const pressReleases = posts.filter(
    (post: UpdatePost) =>
      post.category === 'press-releases' ||
      post.tags?.some((tag: string) =>
        tag.toLowerCase().includes('press release')
      ) ||
      post.title?.toLowerCase().includes('press release')
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: 'Press Releases' },
  ];

  return (
    <>
      <PageHero
        description="Official Press Releases and Announcements"
        backgroundImage="/images/services/header.webp?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div>
          {/* Main Content */}
          <div className="space-y-4">
            {pressReleases.length === 0 ? (
              <Card>
                <CardContent className="p-4 sm:p-6 xl:p-8 text-center">
                  <div className="text-muted-foreground mb-4">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">
                      No Press Releases
                    </h3>
                    <p>No press releases available at the moment.</p>
                  </div>
                  <Link href="/updates">
                    <Button variant="outline">
                      View All Updates
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pressReleases.map((post: UpdatePost) => (
                  <Link
                    key={post._id}
                    href={`/updates/${post.slug.current}`}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                      {/* Image */}
                      <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                        {post.featuredImage ? (
                          <Image
                            src={applySanityImagePreset(
                              post.featuredImage,
                              'card'
                            )}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">
                              No image
                            </span>
                          </div>
                        )}
                        {/* Gradient overlay - always visible for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                        {/* Category at bottom left */}
                        {post.category && (
                          <div className="absolute bottom-4 left-4 right-4 z-10 text-sm font-medium uppercase tracking-wide text-white/90">
                            {post.category}
                          </div>
                        )}
                      </div>

                      <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                        {/* Author & Date */}
                        <div className="flex items-center text-xs text-muted-foreground mb-3">
                          {post.author && (
                            <>
                              <User className="h-3.5 w-3.5 mr-1" />
                              <span>{post.author}</span>
                            </>
                          )}
                          {post.author && post.publishedAt && (
                            <span className="mx-2">•</span>
                          )}
                          {post.publishedAt && (
                            <>
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </>
                          )}
                        </div>

                        <div className="space-y-3 flex-1">
                          {/* Title */}
                          <h3 className="text-xl md:text-2xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Read More Button */}
                        <div className="mt-auto pt-6">
                          <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
