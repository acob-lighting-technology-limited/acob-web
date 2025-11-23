import { Metadata } from 'next';
import { getProjectsPaginated } from '@/sanity/lib/client';
import { getOgImageUrl } from '@/lib/utils/og-image';
import type { Project } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  // Get first page of projects for og image
  const result = await getProjectsPaginated({ page: 1, limit: 6 });
  const projects = result.projects;

  // Get first project image from carousel
  const firstProject = projects.find((p: Project) => p.projectImage);
  const ogImage = firstProject?.projectImage
    ? getOgImageUrl(firstProject.projectImage)
    : 'https://www.acoblighting.com/images/og-image.jpg';

  return {
    title: 'Projects - ACOB Lighting Technology Limited',
    description:
      'Explore our portfolio of successful solar energy projects including mini-grid installations, street lighting, and renewable energy solutions across Nigeria.',
    keywords:
      'solar projects, mini-grid installations, street lighting projects, renewable energy portfolio, ACOB Lighting projects, Nigeria solar projects',
    openGraph: {
      title: 'Projects - ACOB Lighting Technology Limited',
      description:
        'Portfolio of successful solar energy projects including mini-grid installations and street lighting solutions.',
      type: 'website',
      url: 'https://acoblighting.com/projects',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Projects - Solar Energy Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Projects - ACOB Lighting Technology Limited',
      description:
        'Portfolio of successful solar energy projects across Nigeria.',
      images: [ogImage],
    },
  };
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
