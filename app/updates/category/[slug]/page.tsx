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
import { Metadata } from 'next';


interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getUpdatePosts();
  const categoryPosts = posts.filter((post: UpdatePost) => post.category === slug);
  
  const categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const postCount = categoryPosts.length;

  return {
    title: `${categoryName} - ACOB Lighting Technology Limited`,
    description: `Browse ${postCount} ${categoryName.toLowerCase()} updates from ACOB Lighting Technology Limited. Stay updated with our latest ${categoryName.toLowerCase()}, news, and developments in solar energy solutions across Nigeria.`,
    keywords: `${categoryName}, ACOB Lighting ${categoryName.toLowerCase()}, solar energy ${categoryName.toLowerCase()}, renewable energy, Nigeria solar ${categoryName.toLowerCase()}`,
    openGraph: {
      title: `${categoryName} - ACOB Lighting Technology Limited`,
      description: `Browse ${postCount} ${categoryName.toLowerCase()} updates from ACOB Lighting.`,
      type: 'website',
      url: `https://acoblighting.com/updates/category/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} - ACOB Lighting Technology Limited`,
      description: `Browse ${postCount} ${categoryName.toLowerCase()} updates from ACOB Lighting.`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const posts = await getUpdatePosts();

  // Filter posts by category using the new string-based system
  const categoryPosts = posts.filter(
    (post: UpdatePost) => post.category === slug,
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: 'Category', href: `/updates/category/${slug}` },
    { label: 'Posts' },
  ];

  return (
    <>
      <PageHero
        title={`${slug.replace(/-/g, ' ')} Updates`}
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {categoryPosts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
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
                  className="overflow-hidden p-0 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <Image
                      src={post.featuredImage || '/placeholder.svg'}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                                                  {formatDate(post.publishedAt)}
                      </span>
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
                    {slug.replace(/-/g, ' ')}
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
