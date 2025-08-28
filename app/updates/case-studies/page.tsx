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
  TrendingUp,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getUpdatePosts } from '@/sanity/lib/client';
import type { UpdatePost } from '@/lib/types';

export default async function CaseStudiesPage() {
  const posts = await getUpdatePosts();

  // Filter for case studies using the new string-based category system
  const caseStudies = posts.filter(
    (post: UpdatePost) =>
      post.category === 'case-studies' ||
      post.tags?.some((tag: string) =>
        tag.toLowerCase().includes('case study')
      ) ||
      post.title?.toLowerCase().includes('case study')
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
              caseStudies.map((post: UpdatePost) => (
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
                      <FileText className="h-4 w-4 mr-1" />
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        Case Study
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

                    <Link href={`/updates/${post.slug.current}`}>
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        <FileText className="mr-2 h-4 w-4" />
                        Read Case Study
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
            {/* Case Studies Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Case Studies</h3>
                <div className="bg-primary/10 p-4 rounded-lg">
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

            {/* Project Types */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Project Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <span className="text-sm">Rural Electrification</span>
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <span className="text-sm">Commercial Installations</span>
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <span className="text-sm">Street Lighting</span>
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <span className="text-sm">Healthcare Projects</span>
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link href="/updates/latest">
                    <Button variant="outline" className="w-full justify-start">
                      Latest Updates
                    </Button>
                  </Link>
                  <Link href="/updates/press">
                    <Button variant="outline" className="w-full justify-start">
                      Press Releases
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

            {/* Categories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {/* Categories are no longer fetched, so this section is removed */}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
