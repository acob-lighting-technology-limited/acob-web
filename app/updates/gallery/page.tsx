import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { GalleryClient } from './gallery-client';
import { getProjectsForGallery, urlFor } from '@/sanity/lib/client';
import type { Project } from '@/lib/types';
import type { PortableTextBlock } from '@portabletext/types';

export default async function GalleryPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: 'Media Gallery' },
  ];

  // Fetch projects with gallery images
  const projects = await getProjectsForGallery();

  // Convert kebab-case to title case
  const formatCategoryName = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Collect all unique images from all projects with their metadata
  const allImages: Array<{ src: string; alt: string; category: string }> = [];
  const seenUrls = new Set<string>(); // Track unique URLs to avoid duplicates

  projects.forEach((project: Project) => {
    const categoryName = project.category
      ? formatCategoryName(project.category)
      : 'Solar Projects';

    // Add the main project image
    if (project.projectImage && !seenUrls.has(project.projectImage)) {
      seenUrls.add(project.projectImage);
      allImages.push({
        src: project.projectImage,
        alt: project.title,
        category: categoryName,
      });
    }

    // Extract images from content blocks (PortableText)
    if (project.content && Array.isArray(project.content)) {
      project.content.forEach((block: PortableTextBlock) => {
        if (block._type === 'image') {
          const imageBlock = block as unknown as {
            asset: { _ref: string };
            alt?: string;
            _type: string;
          };
          if (imageBlock.asset) {
            const imageUrl =
              urlFor(imageBlock)
                .width(1920)
                .height(1080)
                .fit('max')
                .auto('format')
                .quality(90)
                .url() || '';

            // Only add if we haven't seen this URL before
            if (imageUrl && !seenUrls.has(imageUrl)) {
              seenUrls.add(imageUrl);
              allImages.push({
                src: imageUrl,
                alt: imageBlock.alt || project.title,
                category: categoryName,
              });
            }
          }
        }
      });
    }
  });

  return (
    <>
      <PageHero
        description="Explore Our Project Portfolio"
        backgroundImage="/images/services/header.webp?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Project Gallery</h2>
          <p className="text-muted-foreground">
            Browse through our collection of renewable energy projects (
            {allImages.length} images)
          </p>
        </div>

        <GalleryClient images={allImages} />
      </Container>
    </>
  );
}
