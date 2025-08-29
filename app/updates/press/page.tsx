import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Calendar,
  User,
  FileText,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getUpdatePosts } from '@/sanity/lib/client';
import type { UpdatePost } from '@/lib/types';

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
        title="Press Releases"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {pressReleases.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
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
              pressReleases.map((post: UpdatePost) => (
                <Card
                  key={post._id}
                  className="overflow-hidden p-0 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.featuredImage || '/placeholder.svg'}
                      alt={post.title}
                      width={1200}
                      height={675}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Target className="h-4 w-4 mr-1" />
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        Press Release
                      </span>
                      <span className="mx-2">•</span>
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
                    <div className="flex gap-3">
                      <Link href={`/updates/${post.slug.current}`}>
                        <Button>
                          <FileText className="mr-2 h-4 w-4" />
                          Read Full Release
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Press Releases Info */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Press Releases</h3>
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-medium text-primary mb-2">
                    Official Communications
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Official announcements and media communications from ACOB
                    Lighting Technology Limited.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {pressReleases.length} press release
                    {pressReleases.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Media Contact */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Media Contact</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-sm font-medium">For Media Inquiries:</p>
                    <p className="text-sm text-muted-foreground">
                      press@acoblighting.com
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-sm font-medium">Phone:</p>
                    <p className="text-sm text-muted-foreground">
                      +234 XXX XXX XXXX
                    </p>
                  </div>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Browse Categories */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Browse Categories</h3>
                <div className="space-y-2">
                  <Link
                    href="/updates/latest"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Latest Updates
                  </Link>
                  <Link
                    href="/updates/case-studies"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="/updates/gallery"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Media Gallery
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Press Releases */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Recent Press Releases</h3>
                <div className="space-y-2">
                  {pressReleases.slice(0, 5).map((post: UpdatePost) => (
                    <Link
                      key={post._id}
                      href={`/updates/${post.slug?.current || '#'}`}
                      className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 border border-border group"
                    >
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary mb-1">
                        {post.title}
                      </h4>
                      <div className="text-xs text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString()}
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
          </div>
        </div>
      </Container>
    </>
  );
}
