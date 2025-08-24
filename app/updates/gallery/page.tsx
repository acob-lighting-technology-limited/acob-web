import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Image,
  Video,
  Camera,
  Filter,
  Grid,
  List,
} from 'lucide-react';
import Link from 'next/link';
import { getUpdatePosts, getCategories } from '@/sanity/lib/client';

export default async function MediaGalleryPage() {
  const [posts, sanityCategories] = await Promise.all([
    getUpdatePosts(),
    getCategories(),
  ]);

  // Mock gallery data - in a real implementation, this would come from Sanity
  const galleryItems = [
    {
      id: 1,
      title: 'Solar Installation Project',
      type: 'image',
      src: '/images/projects/solar-pump-distribution.webp',
      category: 'Projects',
      date: '2024-01-15',
      description: 'Solar pump installation in rural community',
    },
    {
      id: 2,
      title: 'Street Lighting Installation',
      type: 'image',
      src: '/images/projects/installation-high-density-streetlight-1.webp',
      category: 'Infrastructure',
      date: '2024-01-10',
      description: 'High-density street lighting project',
    },
    {
      id: 3,
      title: 'Hospital Power System',
      type: 'image',
      src: '/images/projects/keffi-nassarawa-hospital-1.webp',
      category: 'Healthcare',
      date: '2024-01-05',
      description: 'Solar power system for healthcare facility',
    },
    {
      id: 4,
      title: 'Team at Work Site',
      type: 'image',
      src: '/images/about/acob-team.webp',
      category: 'Team',
      date: '2024-01-01',
      description: 'Our team working on installation',
    },
    {
      id: 5,
      title: 'Project Completion Ceremony',
      type: 'video',
      src: '/placeholder.svg',
      category: 'Events',
      date: '2023-12-20',
      description: 'Celebrating successful project completion',
    },
    {
      id: 6,
      title: 'Equipment and Tools',
      type: 'image',
      src: '/images/projects/routine-maintenance-streetlight-abuja.webp',
      category: 'Equipment',
      date: '2023-12-15',
      description: 'Professional tools and equipment',
    },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: 'Media Gallery' },
  ];

  const galleryCategories = [
    'All',
    'Projects',
    'Infrastructure',
    'Healthcare',
    'Team',
    'Events',
    'Equipment',
  ];

  return (
    <>
      <PageHero
        title="Media Gallery"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Controls */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Filter by:</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Grid className="h-4 w-4 mr-2" />
                      Grid
                    </Button>
                    <Button variant="outline" size="sm">
                      <List className="h-4 w-4 mr-2" />
                      List
                    </Button>
                  </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {galleryCategories.map(category => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryItems.map(item => (
                <Card
                  key={item.id}
                  className="overflow-hidden  hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Video className="h-12 w-12 text-white" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                        {item.type === 'video' ? 'Video' : 'Image'}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <span className="bg-muted px-2 py-1 rounded text-xs">
                        {item.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Image className="mr-2 h-4 w-4" />
                      View Full Size
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center pt-8">
              <Button size="lg" variant="outline">
                Load More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Gallery Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Media Gallery</h3>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <Camera className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-medium text-primary mb-2">
                    Visual Stories
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Explore photos and videos from our projects, team
                    activities, and achievements.
                  </p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{galleryItems.length} items</span>
                    <span>5 categories</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gallery Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Gallery Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Images</span>
                    <span className="text-sm font-medium text-primary">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Videos</span>
                    <span className="text-sm font-medium text-primary">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Projects</span>
                    <span className="text-sm font-medium text-primary">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Events</span>
                    <span className="text-sm font-medium text-primary">1</span>
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
                  <Link href="/updates/case-studies">
                    <Button variant="outline" className="w-full justify-start">
                      Case Studies
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Contact for Media */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Request Media</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need high-resolution images or video content for media use?
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Contact Media Team
                    <ArrowRight className="ml-2 h-4 w-4" />
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
