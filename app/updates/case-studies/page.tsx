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
import { getUpdatePosts, getCategories } from '@/sanity/lib/client';

export default async function CaseStudiesPage() {
  const [posts, categories] = await Promise.all([
    getUpdatePosts(),
    getCategories(),
  ]);

  // Filter for case studies (assuming they have a category or tag for case studies)
  const caseStudies = posts.filter(
    (post: any) =>
      post.category?.name?.toLowerCase().includes('case study') ||
      post.tags?.some((tag: any) => tag.toLowerCase().includes('case study')) ||
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
        subtitle="Real-world implementation stories showcasing our successful projects and their impact"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {caseStudies.length === 0 ? (
              <Card className="border-0 custom-shadow shadow-none">
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
              caseStudies.map((post: any) => (
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

                    {/* Project Details */}
                    {post.projectDetails && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                        {post.location && (
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-primary" />
                            <span className="font-medium">Location:</span>
                            <span className="ml-1 text-muted-foreground">
                              {post.location}
                            </span>
                          </div>
                        )}
                        {post.projectType && (
                          <div className="flex items-center text-sm">
                            <Target className="h-4 w-4 mr-2 text-primary" />
                            <span className="font-medium">Type:</span>
                            <span className="ml-1 text-muted-foreground">
                              {post.projectType}
                            </span>
                          </div>
                        )}
                        {post.impact && (
                          <div className="flex items-center text-sm">
                            <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                            <span className="font-medium">Impact:</span>
                            <span className="ml-1 text-muted-foreground">
                              {post.impact}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

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
            <Card className="border-0 custom-shadow shadow-none">
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
            <Card className="border-0 custom-shadow shadow-none">
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
            <Card className="border-0 custom-shadow shadow-none">
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
            <Card className="border-0 custom-shadow shadow-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category: any) => (
                    <li key={category._id}>
                      <Link
                        href={`/updates/category/${category.slug.current}`}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center justify-between"
                      >
                        <span>{category.name}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
