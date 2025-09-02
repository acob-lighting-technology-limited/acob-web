import Image from 'next/image';
import Link from 'next/link';

import { PortableText } from '@portabletext/react';
import type {
  PortableTextBlock,
  PortableTextComponentProps,
} from '@portabletext/react';
import { urlFor, getUpdatePosts, getUpdatePost, getApprovedCommentsForPost, getRelatedUpdatePosts } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import type { UpdatePost, Comment } from '@/lib/types';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { ShareCopy } from '@/components/updates/share-copy';
import { CommentForm } from '@/components/updates/comment-form';
import { Metadata } from 'next';

interface UpdatePostPageProps {
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getUpdatePost(slug);

  if (!post) {
    return {
      title: 'Update Not Found - ACOB Lighting Technology Limited',
      description: 'The requested update could not be found.',
    };
  }

  return {
    title: `${post.title} - ACOB Lighting Technology Limited`,
    description: post.excerpt || `Read about ${post.title} from ACOB Lighting Technology Limited. Stay updated with our latest news, case studies, and developments in solar energy solutions across Nigeria.`,
    keywords: `${post.title}, ACOB Lighting news, solar energy updates, renewable energy, Nigeria solar news, ${post.category || 'news'}`,
    openGraph: {
      title: `${post.title} - ACOB Lighting Technology Limited`,
      description: post.excerpt || `Read about ${post.title} from ACOB Lighting.`,
      type: 'article',
      url: `https://acoblighting.com/updates/${slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} - ACOB Lighting Technology Limited`,
      description: post.excerpt || `Read about ${post.title} from ACOB Lighting.`,
    },
  };
}

// Custom Portable Text Components
const components = {
  types: {
    image: ({
      value,
    }: {
      value: { asset: { _ref: string }; alt?: string };
    }) => {
      if (!value.asset) {
        return null;
      }
      const imageUrl = urlFor(value)
        .width(800)
        .height(600)
        .fit('crop')
        .auto('format')
        .quality(75)
        .url();
      return (
        <div className="w-full md:w-1/2 px-2 my-4">
          {' '}
          {/* Each image takes half width, with horizontal padding */}
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={value.alt || 'Update post image'}
            width={800} // Provide a default width/height, ideally from image metadata
            height={600} // Provide a default width/height
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="text-4xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="text-3xl font-bold my-3">{children}</h2>
    ),
    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="text-2xl font-bold my-2">{children}</h3>
    ),
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="my-2">{children}</p>
    ),
    blockquote: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="list-disc pl-5 my-2">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="list-decimal pl-5 my-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="my-1">{children}</li>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="my-1">{children}</li>
    ),
  },
};

export default async function UpdatePostPage({ params }: UpdatePostPageProps) {
  const { slug } = await params;

  const post = await getUpdatePost(slug);
  if (!post) {
    notFound();
  }

  // Fetch comments, related posts, and recent posts
  const comments = await getApprovedCommentsForPost(post._id);
  const related = await getRelatedUpdatePosts(post.category || 'news', slug, 3);
  const recentPosts = await getUpdatePosts();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: post.title },
  ];

  return (
    <Container className="px-4 py-8">
      <Breadcrumb items={breadcrumbItems} className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="">
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="aspect-[16/9] overflow-hidden rounded-lg">
                  <Image
                    src={post.featuredImage || '/placeholder.svg'}
                    alt={post.title}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

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
                        {post.category === 'news' ? 'News' :
                          post.category === 'case-studies' ? 'Case Studies' :
                            post.category === 'press-releases' ? 'Press Releases' :
                              post.category}
                      </span>
                    </>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-card-foreground mb-4">
                  {post.title}
                </h1>
              </div>

              {/* Post Content - Wrapped in flex for image grid */}
              <div className="prose prose-lg max-w-none flex flex-wrap -mx-2">
                <PortableText value={post.content} components={components} />
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
              {Array.isArray(related) && related.length > 0 && (
              <div className="pt-8 border-t">
                <h2 className="text-xl font-semibold mb-4">Related Updates</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {related.map((item: any) => {
                    const href = item?.slug?.current ? `/updates/${item.slug.current}` : null;
                    const CardInner = (
                      <>
                        <div className="aspect-[16/9] overflow-hidden">
                          <Image
                            src={item.featuredImage || '/placeholder.svg'}
                            alt={item.title}
                            width={1200}
                            height={675}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="text-sm text-muted-foreground mb-2">
                            {new Date(item.publishedAt).toLocaleDateString()}
                          </div>
                          <h4 className="text-xs font-semibold text-foreground leading-snug line-clamp-2">
                            {item.title}
                          </h4>
                        </CardContent>
                      </>
                    );

                    const cardClass = "overflow-hidden p-0 border-2 hover:shadow-lg transition-shadow" + (href ? " cursor-pointer" : " opacity-90");

                    return href ? (
                      <Link key={item._id} href={href}>
                        <Card className={cardClass}>{CardInner}</Card>
                      </Link>
                    ) : (
                      <Card key={item._id} className={cardClass} aria-disabled="true">
                        {CardInner}
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}



            </CardContent>
          </Card>

          {/* Display Comments */}
          <Card className="mt-12 ">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                Comments ({comments.length})
              </h2>
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment: Comment) => {
                    const initial = (comment.name || '?').charAt(0).toUpperCase();
                    const dateStr = new Date(comment.createdAt).toLocaleDateString(undefined, {
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
                            <p className="text-xs text-gray-500 whitespace-nowrap">{dateStr}</p>
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

        {/* Sidebar */}
        <div className="space-y-6 sticky top-20 self-start">
       
          {/* Categories */}
          <Card className="!border-t-2 !border-t-primary border border-border">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Browse Categories</h3>
              <div className="space-y-2">
                <Link
                  href="/updates/case-studies"
                  className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                >
                  Case Studies
                </Link>
                <Link
                  href="/updates/press"
                  className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                >
                  Press Releases
                </Link>
                <Link
                  href="/updates"
                  className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                >
                  All Updates
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card className="!border-t-2 !border-t-primary border border-border">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Recent Updates</h3>
              <div className="space-y-2">
                {recentPosts.slice(0, 5).map((item: UpdatePost) => (
                  <Link
                    key={item._id}
                    href={`/updates/${item.slug.current}`}
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 border border-border group"
                  >
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary mb-1">
                      {item.title}
                    </h4>
                    <div className="text-xs text-muted-foreground">
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="pt-4 border-t">
                <Link
                  href="/updates"
                  className="text-sm text-primary hover:text-primary/80 flex items-center font-medium"
                >
                  View All Updates
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Related Updates */}
         
        </div>
      </div>
    </Container>
  );
}
