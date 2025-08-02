import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { getUpdatePosts, getCategories } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category: any) => ({
    slug: category.slug.current,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [posts, categories] = await Promise.all([
    getUpdatePosts(),
    getCategories(),
  ]);

  // Find the current category
  const currentCategory = categories.find(
    (category: any) => category.slug.current === slug
  );

  if (!currentCategory) {
    notFound();
  }

  // Filter posts by category
  const categoryPosts = posts.filter(
    (post: any) => post.category?.slug?.current === slug
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: currentCategory.name },
  ];

  return (
    <>
      <PageHero
        title={`${currentCategory.name} Updates`}
        subtitle={
          currentCategory.description ||
          `Latest updates in ${currentCategory.name}`
        }
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {categoryPosts.length === 0 ? (
              <Card className="border-0 custom-shadow shadow-none">
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
              categoryPosts.map((post: any) => (
                <Card
                  key={post._id}
                  className="overflow-hidden border-0 custom-shadow shadow-none p-0 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.featuredImage || '/placeholder.svg'}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString()}
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
                      <Button className="bg-primary hover:bg-primary/90 text-white">
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
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Category</h3>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">
                    {currentCategory.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {currentCategory.description ||
                      `Updates in ${currentCategory.name}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {categoryPosts.length} post
                    {categoryPosts.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* All Categories */}
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">All Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category: any) => (
                    <li key={category._id}>
                      <Link
                        href={`/updates/category/${category.slug.current}`}
                        className={`block p-2 rounded-md transition-colors duration-200 ${
                          category.slug.current === slug
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                        }`}
                      >
                        <span>{category.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Back to Updates */}
            <Card className="border-0 custom-shadow shadow-none">
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
