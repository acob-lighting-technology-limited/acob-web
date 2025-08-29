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
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
// Remove direct Sanity import - use API route instead
import type { UpdatePost } from '@/lib/types';

export default async function CaseStudiesPage() {
  const response = await fetch('/api/updates');
  if (!response.ok) {
    throw new Error('Failed to fetch updates');
  }
  const posts = await response.json();

  // Filter for case studies using the new string-based category system
  const caseStudies = posts.filter(
    (post: UpdatePost) =>
      post.category === 'case-studies' ||
      post.tags?.some((tag: string) =>
        tag.toLowerCase().includes('case study'),
      ) ||
      post.title?.toLowerCase().includes('case study'),
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: 'Case Studies' },
  ];

  return (
    <>
      <PageHero
        title="Case Studies"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {caseStudies.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground mb-4">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">
                      No Case Studies
                    </h3>
                    <p>No case studies available at the moment.</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudies.map((post: UpdatePost) => (
                  <Card
                    key={post._id}
                    className="overflow-hidden p-0 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    <div className="aspect-[16/9] overflow-hidden flex-shrink-0">
                      <Image
                        src={post.featuredImage || '/placeholder.svg'}
                        alt={post.title}
                        width={1200}
                        height={675}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex-1">
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <User className="h-4 w-4 mr-1" />
                          <span>{post.author}</span>{' '}
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold mb-4 text-foreground">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <Link href={`/updates/${post.slug.current}`}>
                          <Button className="w-full">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Case Studies Info */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Case Studies</h3>
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-medium text-primary mb-2">
                    Success Stories
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Real-world implementation stories showcasing our successful
                    projects and their impact.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {caseStudies.length} case study
                    {caseStudies.length !== 1 ? 's' : ''}
                  </p>
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
                    href="/updates/press"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Press Releases
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

            {/* Recent Case Studies */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Recent Case Studies</h3>
                <div className="space-y-2">
                  {caseStudies.slice(0, 5).map((post: UpdatePost) => (
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
