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
import { getProjectsForGallery } from '@/sanity/lib/client';
import type { Project } from '@/lib/types';

export default async function GalleryPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: 'Media Gallery' },
  ];

  // Fetch projects with gallery images
  const projects = await getProjectsForGallery();
  
  // Get actual categories from projects and convert to title case
  const actualCategories = Array.from(new Set(projects.map((p: Project) => p.category))).filter(Boolean);
  
  // Convert kebab-case to title case
  const formatCategoryName = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Define the 4 project categories (use actual categories if available)
  const projectCategories = actualCategories.length > 0 ? actualCategories : [
    'rural-electrification',
    'commercial-installations', 
    'street-lighting',
    'healthcare-projects'
  ];

  // Process projects to extract gallery images by category
  const galleryData = projectCategories.map(category => {
    const categoryProjects = projects.filter((project: Project) => 
      project.category === category
    );
    
    // Extract all images from projects in this category
    const allImages: string[] = [];
    categoryProjects.forEach((project: Project) => {
      // Always add the main project image
      if (project.projectImage) {
        allImages.push(project.projectImage);
      }
      
      // Add gallery images if they exist
      if (project.galleryImages && Array.isArray(project.galleryImages)) {
        allImages.push(...project.galleryImages.filter(Boolean));
      }
    });

    return {
      category: formatCategoryName(category as string),
      projects: categoryProjects,
      images: allImages,
      totalImages: allImages.length
    };
  });

  // Calculate total stats
  const totalImages = galleryData.reduce((sum, cat) => sum + cat.totalImages, 0);
  const totalProjects = projects.length;

  return (
    <>
      <PageHero title="Media Gallery" backgroundImage="/images/services/header.jpg?height=400&width=1200" />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <GalleryClient galleryData={galleryData} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Gallery Info */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Media Gallery</h3>
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <Camera className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-medium text-primary mb-2">Project Visuals</h4>
                  <p className="text-sm text-muted-foreground">
                    Explore photos and images from our projects organized by category.
                  </p>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{totalImages} images</span>
                    <span>{projectCategories.length} categories</span>
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
                      <span className="text-sm font-medium">Total Images</span>
                      <span className="text-sm font-medium text-primary">{totalImages}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Projects</span>
                      <span className="text-sm font-medium text-primary">{totalProjects}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Categories</span>
                      <span className="text-sm font-medium text-primary">{projectCategories.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">By Category</h3>
                <div className="space-y-2">
                  {galleryData.map((categoryData) => (
                    <div key={categoryData.category} className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{categoryData.category}</span>
                        <span className="text-sm font-medium text-primary">{categoryData.totalImages}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Browse Categories */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Browse Updates</h3>
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
