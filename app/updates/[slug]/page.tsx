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
import { ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { ShareCopy } from '@/components/updates/share-copy';
import { CommentForm } from '@/components/updates/comment-form';
import { Hero } from '@/components/ui/hero';
import { UpdateContent } from './update-content';

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

// Force dynamic rendering in development to show comments immediately
export const dynamic =
  process.env.NODE_ENV === 'development' ? 'force-dynamic' : 'auto';

// Revalidate every 30 seconds in production to show new approved comments quickly
export const revalidate = 30;

export default async function UpdatePage({ params }: UpdatePageProps) {
  const { slug } = await params;

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
      <Hero
        title={categoryTitle}
        description={post.title}
        image={post.featuredImage}
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <Card className="pt-2">
          <CardContent className="p-4 sm:p-6 xl:p-8 space-y-4 sm:space-y-6">
            {/* Post Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Overview
              </h1>
            </div>

            {/* Post Content - Wrapped in flex for image grid */}
            <UpdateContent content={post.content} />

            {/* Post Metadata */}
            <div className="flex items-center text-sm text-muted-foreground flex-wrap gap-2 pt-8 border-t">
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.author}</span>
              {post.category && (
                <>
                  <span>•</span>
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

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 pt-8 border-t">
                <span className="text-sm font-medium text-gray-700">Tags:</span>
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
          </CardContent>
        </Card>

        {/* Related Updates */}
        {Array.isArray(related) && related.length > 0 && (
          <div className="mt-8">
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
          </div>
        )}

        {/* Back to Updates Button */}
        <div className="mt-12 mb-8 text-center">
          <Link href="/updates">
            <Button variant="outline" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Updates
            </Button>
          </Link>
        </div>

        {/* Display Comments */}
        <div className="mt-8 sm:mt-12">
          <Card className="border shadow-md border-border bg-surface">
            <CardContent className="p-4 sm:p-6 xl:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
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
        </div>

        {/* Comment Form */}
        <div className="mt-8 sm:mt-12">
          <CommentForm postId={post._id} />
        </div>
      </Container>
    </>
  );
}
