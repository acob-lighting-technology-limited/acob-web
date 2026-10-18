import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { GalleryClient } from './gallery-client';
import { getProjects, urlFor } from '@/sanity/lib/queries';
import type { Project } from '@/lib/types';
import type { PortableTextBlock } from '@portabletext/types';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

export default async function GalleryPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Updates', href: '/updates' },
    { label: 'Media Gallery' },
  ];

  const projects = await getProjects();

  const formatCategoryName = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const allImages: Array<{ src: string; alt: string; category: string }> = [];
  const seenUrls = new Set<string>();

  projects.forEach((project: Project) => {
    const categoryName = project.categories?.[0]
      ? formatCategoryName(project.categories[0])
      : 'Solar Projects';

    if (project.projectImage && !seenUrls.has(project.projectImage)) {
      seenUrls.add(project.projectImage);
      allImages.push({
        src: project.projectImage,
        alt: project.title,
        category: categoryName,
      });
    }

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
      <Hero
        title="Media Gallery"
        description="Our Work, in Frame."
        image="/images/services/header.webp"
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Standfirst */}
        <div className="max-w-[62ch]">
          <SectionEyebrow>{allImages.length} images</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            Browse through our collection of renewable energy projects across
            Nigeria.
          </p>
        </div>

        <div className="mt-10 md:mt-14">
          <GalleryClient images={allImages} />
        </div>
      </Container>
    </>
  );
}
