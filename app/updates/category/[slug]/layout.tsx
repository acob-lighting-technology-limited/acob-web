import { Metadata } from 'next';
import { getUpdatePostsPaginated } from '@/sanity/lib/client';
import { getOgImageUrl } from '@/lib/utils/og-image';
import type { UpdatePost } from '@/lib/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Get first post from this category for og image
  const result = await getUpdatePostsPaginated({ page: 1, limit: 8 });
  const posts = result.posts;
  const categoryPost = posts.find(
    (p: UpdatePost) => p.category === slug && p.featuredImage,
  );

  const ogImage = categoryPost?.featuredImage
    ? getOgImageUrl(categoryPost.featuredImage)
    : getOgImageUrl('/images/services/header.webp');

  const categoryTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${categoryTitle} - ACOB Lighting Technology Limited`,
    description: `Browse ${categoryTitle.toLowerCase()} updates and news from ACOB Lighting Technology Limited. Find specific content including case studies, press releases, and industry insights.`,
    keywords: `ACOB Lighting ${categoryTitle.toLowerCase()}, solar energy ${categoryTitle.toLowerCase()}, renewable energy updates, Nigeria solar ${categoryTitle.toLowerCase()}`,
    openGraph: {
      title: `${categoryTitle} - ACOB Lighting Technology Limited`,
      description: `Browse ${categoryTitle.toLowerCase()} updates and news from ACOB Lighting.`,
      type: 'website',
      url: `https://acoblighting.com/updates/category/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `ACOB Lighting ${categoryTitle}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryTitle} - ACOB Lighting Technology Limited`,
      description: `Browse ${categoryTitle.toLowerCase()} updates and news from ACOB Lighting.`,
      images: [ogImage],
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
