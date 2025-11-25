import { Metadata } from 'next';
import { getProjectsPaginated } from '@/sanity/lib/client';
import { getOgImageUrl } from '@/lib/utils/og-image';
import type { Project } from '@/lib/types';

const categoryInfo: Record<string, { title: string; description: string }> = {
  'rural-electrification': {
    title: 'Rural Electrification',
    description:
      'Projects bringing reliable solar power to off-grid communities across Nigeria.',
  },
  'commercial-installations': {
    title: 'Commercial Installations',
    description:
      'Solar solutions for businesses, industries, and commercial facilities.',
  },
  'street-lighting': {
    title: 'Street Lighting',
    description:
      'Public lighting infrastructure projects illuminating communities.',
  },
  'healthcare-projects': {
    title: 'Healthcare Projects',
    description:
      'Powering hospitals, clinics, and healthcare facilities with reliable solar energy.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const info = categoryInfo[category];

  if (!info) {
    return {
      title: 'Category Not Found - ACOB Lighting Technology Limited',
      description: 'The requested project category could not be found.',
    };
  }

  // Get first project from this category for og image
  const result = await getProjectsPaginated({ page: 1, limit: 6 });
  const projects = result.projects;
  const categoryProject = projects.find(
    (p: Project) => p.category === category && p.projectImage,
  );

  const ogImage = categoryProject?.projectImage
    ? getOgImageUrl(categoryProject.projectImage)
    : 'https://www.acoblighting.com/images/og-image.jpg';

  return {
    title: `${info.title} Projects - ACOB Lighting Technology Limited`,
    description: `Explore ${info.title.toLowerCase()} projects by ACOB Lighting Technology Limited. ${info.description}`,
    keywords: `${info.title}, solar energy projects, renewable energy, ACOB Lighting, Nigeria solar projects`,
    openGraph: {
      title: `${info.title} Projects - ACOB Lighting Technology Limited`,
      description: info.description,
      type: 'website',
      url: `https://acoblighting.com/projects/category/${category}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${info.title} Projects - ACOB Lighting`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${info.title} Projects - ACOB Lighting Technology Limited`,
      description: info.description,
      images: [ogImage],
    },
  };
}

export default function ProjectCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
