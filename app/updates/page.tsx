import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import { getUpdatePosts } from '@/sanity/lib/client';
import type { UpdatePost } from '@/lib/types';

export default async function UpdatesPage() {
  const posts = await getUpdatePosts();

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Updates' }];

  return (
    <>
      <PageHero
        title="Updates & News"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post: UpdatePost) => (
              <Card
                key={post._id}
                className="overflow-hidden p-0 hover:shadow-lg transition-shadow h-full"
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
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link href={`/updates/${post.slug.current}`}>
                    {' '}
                    {/* Changed link to /updates */}
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Search</h3>
                <div className="relative border-[0.5px] rounded-md border-primary">
                  <Input placeholder="Search updates..." className="pr-10" />{' '}
                  {/* Renamed placeholder */}
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {/* Removed categories mapping as categories are no longer available */}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
