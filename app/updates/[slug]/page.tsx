import Link from 'next/link';

import {
  getUpdatePosts,
  getUpdatePost,
  getApprovedCommentsForPost,
  getRelatedUpdatePosts,
} from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import type { UpdatePost, Comment } from '@/lib/types';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { ShareCopy } from '@/components/updates/share-copy';
import { CommentForm } from '@/components/updates/comment-form';
import { PageHero } from '@/components/ui/page-hero';
import { UpdateContent } from './update-content';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

// Valid category values
const VALID_CATEGORIES = [
  'announcements',
  'case-studies',
  'press-releases',
  'events',
  'celebrations',
];

interface UpdatePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getUpdatePosts();
  return posts
    .filter((post: UpdatePost) => post.slug && post.slug.current)
    .map((post: UpdatePost) => ({
      slug: post.slug.current,
    }));
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const { slug } = await params;

  // Check if slug is a category
  if (VALID_CATEGORIES.includes(slug)) {
    // Handle category page
    const posts = await getUpdatePosts();
    const categoryPosts = posts.filter(
      (post: UpdatePost) => post.category === slug,
    );

    const categoryTitle = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const breadcrumbItems = [
      { label: 'Home', href: '/' },
      { label: 'Updates', href: '/updates' },
      { label: categoryTitle },
    ];

    return (
      <>
        <PageHero
          title={categoryTitle}
          description={`Browse ${categoryTitle.toLowerCase()} updates and news from ACOB Lighting`}
          backgroundImage="/images/services/header.webp?height=400&width=1200"
        />

        <Container className="px-4 py-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 lg:space-y-4">
              {categoryPosts.length === 0 ? (
                <Card>
                  <CardContent className="p-4 sm:p-6 xl:p-8 text-center">
                    <div className="text-muted-foreground mb-4">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold mb-2">
                        No posts found
                      </h3>
                      <p>No updates available in this category yet.</p>
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
                categoryPosts.map((post: UpdatePost) => (
                  <Card
                    key={post._id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-500"
                  >
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <Image
                        src={post.featuredImage || '/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-4 text-foreground">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <Link href={`/updates/${post.slug.current}`}>
                        <Button>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 sticky top-20 self-start">
              {/* Category Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Category</h3>
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <h4 className="font-medium text-primary mb-2">
                      {categoryTitle}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Updates in this category.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {categoryPosts.length} post
                      {categoryPosts.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Back to Updates */}
              <Card>
                <CardContent className="p-6">
                  <Link href="/updates">
                    <Button variant="outline" className="w-full">
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                      Back to All Updates
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </>
    );
  }

  // Handle individual post page
  const post = await getUpdatePost(slug);
  if (!post) {
    notFound();
  }

  // Fetch comments and related posts
  const comments = await getApprovedCommentsForPost(post._id);
  const related = await getRelatedUpdatePosts(post.category || 'news', slug, 3);

  // Format category name for display
  const formatCategoryName = (category: string | undefined): string => {
    if (!category) {
      return 'Updates';
    }
    const categoryMap: Record<string, string> = {
      news: 'News',
      'case-studies': 'Case Studies',
      'press-releases': 'Press Releases',
      announcements: 'Announcements',
      events: 'Events',
      celebrations: 'Celebrations',
    };
    return (
      categoryMap[category] ||
      category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };

  const categoryTitle = formatCategoryName(post.category);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: post.title },
  ];

  return (
    <>
      <PageHero
        title={categoryTitle}
        description={post.title}
        backgroundImage={post.featuredImage || '/images/hero-bg.webp'}
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="space-y-4">
          <Card className="">
            <CardContent className="p-4 sm:p-6 xl:p-8 space-y-8">
              {/* Post Header */}
              <div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                  {post.category && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="bg-primary text-white px-2 py-1 rounded text-xs">
                        {post.category === 'news'
                          ? 'News'
                          : post.category === 'case-studies'
                            ? 'Case Studies'
                            : post.category === 'press-releases'
                              ? 'Press Releases'
                              : post.category === 'announcements'
                                ? 'Announcements'
                                : post.category === 'events'
                                  ? 'Events'
                                  : post.category === 'celebrations'
                                    ? 'Celebrations'
                                    : post.category}
                      </span>
                    </>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-card-foreground mb-4">
                  Overview
                </h1>
              </div>

              {/* Post Content - Wrapped in flex for image grid */}
              <UpdateContent content={post.content} />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2 pt-8 border-t">
                  <span className="text-sm font-medium text-gray-700">
                    Tags:
                  </span>
                  {post.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {/* Share Buttons */}
              <div className="flex items-center gap-4 pt-8 border-t">
                <ShareCopy className="rounded-full bg-transparent" />
              </div>
              {Array.isArray(related) && related.length > 0 && (
                <div className="pt-8 border-t">
                  <h3 className="text-2xl font-bold mb-4">Related Updates</h3>
                  <ul className="space-y-2">
                    {related.map(
                      (item: {
                        _id: string;
                        slug?: { current?: string };
                        title?: string;
                        publishedAt?: string;
                      }) => {
                        const href = item?.slug?.current
                          ? `/updates/${item.slug.current}`
                          : null;

                        if (!href) {
                          return null;
                        }

                        return (
                          <li key={item._id}>
                            <Link
                              href={href}
                              className="group flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-muted/50 border border-border hover:border-primary/50"
                            >
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                  {item.title}
                                </h4>
                                {item.publishedAt && (
                                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                                    <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                                    <span className="truncate">
                                      {new Date(
                                        item.publishedAt,
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </Link>
                          </li>
                        );
                      },
                    )}
                  </ul>
                  <div className="mt-6 text-center">
                    <Link href="/updates">
                      <Button variant="outline">
                        View All Updates
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Display Comments */}
          <Card className="mt-12 ">
            <CardContent className="p-4 sm:p-6 xl:p-8">
              <h2 className="text-2xl font-bold mb-6">
                Comments ({comments.length})
              </h2>
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment: Comment) => {
                    const initial = (comment.name || '?')
                      .charAt(0)
                      .toUpperCase();
                    const dateStr = new Date(
                      comment.createdAt,
                    ).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    });
                    return (
                      <div
                        key={comment._id}
                        className="flex gap-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur p-4 transition-colors hover:bg-white/70 dark:hover:bg-white/10"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          {initial}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                              {comment.name}
                            </p>
                            <p className="text-xs text-gray-500 whitespace-nowrap">
                              {dateStr}
                            </p>
                          </div>
                          <p className="mt-1 text-gray-700 dark:text-gray-300 leading-relaxed">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">
                  No comments yet. Be the first to leave a reply!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Comment Form */}
          <CommentForm postId={post._id} />
        </div>
      </Container>
    </>
  );
}
