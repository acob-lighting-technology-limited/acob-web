import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getUpdatePosts } from '@/sanity/lib/client';
import type { UpdatePost } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { applySanityImagePreset } from '@/lib/utils/sanity-image';

export default async function LatestPage() {
  const posts = await getUpdatePosts();

  // Get the 10 most recent posts
  const latestPosts = posts
    .sort(
      (a: UpdatePost, b: UpdatePost) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 10);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: 'Latest Updates' },
  ];

  return (
    <>
      <PageHero
        description="Stay Updated with Our Recent Work"
        backgroundImage="/images/services/header.webp?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div>
          {/* Main Content */}
          <div className="space-y-4">
            {/* Featured Post */}
            {latestPosts.length > 0 && (
              <Link
                href={`/updates/${latestPosts[0].slug.current}`}
                className="group block"
              >
                <Card className="h-full overflow-hidden border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                    {latestPosts[0].featuredImage ? (
                      <Image
                        src={applySanityImagePreset(
                          latestPosts[0].featuredImage,
                          'card',
                        )}
                        alt={latestPosts[0].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
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
                    {latestPosts[0].category && (
                      <div className="absolute bottom-4 left-4 right-4 z-10 text-sm font-medium uppercase tracking-wide text-white/90">
                        {latestPosts[0].category}
                      </div>
                    )}
                  </div>

                  <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                    {/* Author & Date */}
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      {latestPosts[0].author && (
                        <>
                          <User className="h-3.5 w-3.5 mr-1" />
                          <span>{latestPosts[0].author}</span>
                        </>
                      )}
                      {latestPosts[0].author && latestPosts[0].publishedAt && (
                        <span className="mx-2">•</span>
                      )}
                      {latestPosts[0].publishedAt && (
                        <>
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>{formatDate(latestPosts[0].publishedAt)}</span>
                        </>
                      )}
                    </div>

                    <div className="space-y-3 flex-1">
                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {latestPosts[0].title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                        {latestPosts[0].excerpt}
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
            )}

            {/* Recent Posts Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.slice(1).map((post: UpdatePost) => (
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
                            'card',
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

            {/* Load More Button */}
            {posts.length > 10 && (
              <div className="text-center pt-8">
                <Link href="/updates">
                  <Button size="lg" variant="outline">
                    View All Updates
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
