import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Camera,
} from 'lucide-react';
import Link from 'next/link';
import { GalleryClient } from './gallery-client';

export default function GalleryPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: 'Media Gallery' },
  ];

  const galleryItems: Array<{
    id: number;
    title: string;
    type: 'image' | 'video';
    src: string;
    category: string;
    date: string;
    description: string;
  }> = [
    { id: 1, title: 'Solar Installation Project', type: 'image', src: '/images/projects/routine-maintenance-streetlight-abuja.webp', category: 'Projects', date: '2024-01-15', description: 'Large-scale solar installation in rural community' },
    { id: 2, title: 'Street Lighting Infrastructure', type: 'image', src: '/images/services/streetlighting-infrastructure-project-development.webp', category: 'Infrastructure', date: '2024-01-10', description: 'LED street lighting installation and maintenance' },
    { id: 3, title: 'Healthcare Facility Power System', type: 'image', src: '/images/services/captive-power-solutions.webp', category: 'Healthcare', date: '2024-01-05', description: 'Reliable power system for healthcare facilities' },
    { id: 4, title: 'Team at Work Site', type: 'image', src: '/images/about/acob-team.webp', category: 'Team', date: '2024-01-01', description: 'Our team working on installation' },
    { id: 5, title: 'Project Completion Ceremony', type: 'video', src: '/placeholder.svg', category: 'Events', date: '2023-12-20', description: 'Celebrating successful project completion' },
    { id: 6, title: 'Equipment and Tools', type: 'image', src: '/images/projects/routine-maintenance-streetlight-abuja.webp', category: 'Equipment', date: '2023-12-15', description: 'Professional tools and equipment' },
  ];

  const galleryCategories = ['All','Projects','Infrastructure','Healthcare','Team','Events','Equipment'];

  return (
    <>
      <PageHero title="Media Gallery" backgroundImage="/images/services/header.jpg?height=400&width=1200" />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <GalleryClient galleryItems={galleryItems} galleryCategories={galleryCategories} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Gallery Info */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Media Gallery</h3>
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <Camera className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-medium text-primary mb-2">Visual Stories</h4>
                  <p className="text-sm text-muted-foreground">
                    Explore photos and videos from our projects, team activities, and achievements.
                  </p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{galleryItems.length} items</span>
                    <span>{galleryCategories.length - 1} categories</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gallery Stats */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Gallery Stats</h3>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Images</span>
                      <span className="text-sm font-medium text-primary">5</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Videos</span>
                      <span className="text-sm font-medium text-primary">1</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Projects</span>
                      <span className="text-sm font-medium text-primary">3</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Events</span>
                      <span className="text-sm font-medium text-primary">1</span>
                    </div>
                  </div>
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
                    href="/updates/case-studies"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Case Studies
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Contact for Media */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Request Media</h3>
                <p className="text-sm text-muted-foreground mb-4">Need high-resolution images or video content for media use?</p>
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
