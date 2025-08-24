import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { getUpdatePosts } from '@/sanity/lib/client';
import type { UpdatePost } from '@/lib/types';

export default async function LatestPage() {
  const posts = await getUpdatePosts();

  // Get current year and previous year
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  // Filter posts by year and sort by date
  const currentYearPosts = posts.filter((post: UpdatePost) => {
    const postYear = new Date(post.publishedAt).getFullYear();
    return postYear === currentYear;
  }).sort((a: UpdatePost, b: UpdatePost) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const previousYearPosts = posts.filter((post: UpdatePost) => {
    const postYear = new Date(post.publishedAt).getFullYear();
    return postYear === previousYear;
  }).sort((a: UpdatePost, b: UpdatePost) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Combine posts: current year first, then previous year if needed
  let latestPosts = [...currentYearPosts];
  
  // If we have fewer than 6 posts from current year, add from previous year
  if (latestPosts.length < 6) {
    const neededFromPrevious = 6 - latestPosts.length;
    const additionalPosts = previousYearPosts.slice(0, neededFromPrevious);
    latestPosts = [...latestPosts, ...additionalPosts];
  }

  // Take only the first 10 posts for display
  latestPosts = latestPosts.slice(0, 10);

  // Find the featured post (or use the most recent if none is featured)
  const featuredPost = latestPosts.find((post: UpdatePost) => post.featured) || latestPosts[0];
  
  // Remove the featured post from the regular posts list
  const regularPosts = latestPosts.filter((post: UpdatePost) => post._id !== featuredPost?._id);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: 'Latest Updates' },
  ];

  return (
    <>
      <PageHero
        title="Latest Updates"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Post */}
            {featuredPost && (
              <Card className="overflow-hidden  p-0 hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[21/9] overflow-hidden">
                  <img
                    src={featuredPost.featuredImage || '/placeholder.svg'}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(
                        featuredPost.publishedAt
                      ).toLocaleDateString()}
                    </span>
                    <span className="mx-2">•</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <h1 className="text-3xl font-bold mb-4 text-foreground">
                    {featuredPost.title}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <Link href={`/updates/${featuredPost.slug.current}`}>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Recent Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularPosts.map((post: UpdatePost) => (
                <Card
                  key={post._id}
                  className="overflow-hidden  p-0 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={post.featuredImage || '/placeholder.svg'}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="mx-2">•</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link href={`/updates/${post.slug.current}`}>
                      <Button variant="outline" className="w-full">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
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

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Latest Updates Info */}
            <Card className="">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Latest Updates</h3>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-medium text-primary mb-2">
                    Recent Developments
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Stay informed with our latest news, project updates, and
                    industry insights.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {latestPosts.length} recent post
                    {latestPosts.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {/* Categories are no longer fetched, so this section will be empty */}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link href="/updates/press">
                    <Button variant="outline" className="w-full justify-start">
                      Press Releases
                    </Button>
                  </Link>
                  <Link href="/updates/case-studies">
                    <Button variant="outline" className="w-full justify-start">
                      Case Studies
                    </Button>
                  </Link>
                  <Link href="/updates/gallery">
                    <Button variant="outline" className="w-full justify-start">
                      Media Gallery
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
