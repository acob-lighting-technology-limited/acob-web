import Link from 'next/link';
import Image from 'next/image';

import {
  getUpdatePosts,
  getUpdatePost,
  getApprovedCommentsForPost,
  getRelatedUpdatePosts,
} from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import type { UpdatePost, Comment } from '@/lib/types';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  User,
  MessageSquare,
} from 'lucide-react';
import { ShareCopy } from '@/components/updates/share-copy';
import { CommentForm } from '@/components/updates/comment-form';
import { Hero } from '@/components/ui/hero';
import { UpdateContent } from './update-content';
import { formatDate } from '@/lib/utils/date';

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

// Revalidate every 5 minutes (300 seconds) — balances freshness with API quota
export const revalidate = 300;

function authorName(author: UpdatePost['author']): string {
  if (typeof author === 'string') {
    return author;
  }
  return (author as { name?: string })?.name || 'ACOB Lighting';
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const { slug } = await params;

  const post = await getUpdatePost(slug);
  if (!post) {
    notFound();
  }

  const comments = await getApprovedCommentsForPost(post._id);
  const related = await getRelatedUpdatePosts(post.category || 'news', slug, 3);

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
        image={post.featuredImage || post.coverImage}
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Byline */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            {authorName(post.author)}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            {formatDate(post.publishedAt)}
          </span>
          {post.category && (
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary">
              {categoryTitle}
            </span>
          )}
        </div>

        {/* Article content */}
        <div className="mt-10 prose prose-lg max-w-none md:mt-12">
          <UpdateContent content={post.content} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Tags
            </span>
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="mt-10 flex items-center gap-4 border-t border-border pt-8">
          <span className="text-sm font-semibold text-muted-foreground">
            Share this Update:
          </span>
          <ShareCopy className="rounded-full bg-transparent" />
        </div>

        {/* Related updates */}
        {Array.isArray(related) && related.length > 0 && (
          <section className="mt-16 md:mt-20">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-primary">
                  Keep reading
                </span>
                <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
                  Related updates
                </h2>
              </div>
              <Link
                href="/updates"
                className="hidden items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2 sm:flex"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {related.map((item: UpdatePost) => {
                const href = item?.slug?.current
                  ? `/updates/${item.slug.current}`
                  : null;

                if (!href) {
                  return null;
                }

                const categoryLabel = formatCategoryName(item.category);
                const imageSrc = item.featuredImage || item.coverImage;

                return (
                  <Link
                    key={item._id}
                    href={href}
                    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg">
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                        {imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={item.title ?? ''}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                            <span className="select-none text-4xl font-bold text-primary/20">
                              ACOB
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {item.category && (
                          <span className="absolute bottom-3 left-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/90">
                            {categoryLabel}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-4 md:p-5">
                        <h3 className="text-base font-extrabold tracking-tight text-foreground line-clamp-2">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2 md:text-sm">
                            {item.excerpt}
                          </p>
                        )}
                        {item.publishedAt && (
                          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 shrink-0" />
                            <span>
                              {new Date(item.publishedAt).toLocaleDateString(
                                undefined,
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                },
                              )}
                            </span>
                          </div>
                        )}
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary md:text-sm">
                          Read
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4" />
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Back */}
        <div className="mb-8 mt-16 text-center">
          <Link href="/updates">
            <Button variant="outline" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Updates
            </Button>
          </Link>
        </div>

        {/* Discussion */}
        <section className="mt-4 border-t-[3px] border-foreground pt-10">
          <div className="mb-6 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-extrabold uppercase tracking-tight sm:text-2xl">
              Discussion
              {comments.length > 0 && (
                <span className="ml-2 text-base font-normal normal-case text-muted-foreground">
                  ({comments.length})
                </span>
              )}
            </h2>
          </div>

          {comments.length > 0 ? (
            <div className="divide-y divide-border border-y border-border">
              {comments.map((comment: Comment) => {
                const initial = (comment.name || '?').charAt(0).toUpperCase();
                const dateStr = new Date(comment.createdAt).toLocaleDateString(
                  undefined,
                  { year: 'numeric', month: 'short', day: 'numeric' },
                );
                return (
                  <div key={comment._id} className="flex gap-4 py-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {initial}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="line-clamp-1 font-semibold text-foreground">
                          {comment.name}
                        </p>
                        <p className="whitespace-nowrap text-xs text-muted-foreground">
                          {dateStr}
                        </p>
                      </div>
                      <p className="mt-1 leading-relaxed text-muted-foreground">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
              <MessageSquare className="mb-3 h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">
                No comments yet
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Be the first to share your thoughts below.
              </p>
            </div>
          )}

          <div className="mt-8">
            <CommentForm postId={post._id} inline />
          </div>
        </section>
      </Container>
    </>
  );
}
