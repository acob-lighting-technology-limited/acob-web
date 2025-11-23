import { Metadata } from 'next';
import { getProject } from '@/sanity/lib/client';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found - ACOB Lighting Technology Limited',
      description: 'The requested project could not be found.',
    };
  }

  const ogImage = project.projectImage
    ? getOgImageUrl(project.projectImage)
    : 'https://www.acoblighting.com/images/og-image.jpg';

  return {
    title: `${project.title} - ACOB Lighting Technology Limited`,
    description:
      project.description ||
      `Explore ${project.title} project by ACOB Lighting Technology Limited. We provide comprehensive solar energy solutions and mini-grid installations across Nigeria.`,
    keywords: `${project.title}, solar energy project, mini-grid installation, renewable energy, ACOB Lighting, Nigeria solar projects`,
    openGraph: {
      title: `${project.title} - ACOB Lighting Technology Limited`,
      description:
        project.description ||
        `Explore ${project.title} project by ACOB Lighting.`,
      type: 'website',
      url: `https://www.acoblighting.com/projects/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - ACOB Lighting Project`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - ACOB Lighting Technology Limited`,
      description:
        project.description ||
        `Explore ${project.title} project by ACOB Lighting.`,
      images: [ogImage],
    },
  };
}

export default function ProjectSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
