import { Metadata } from 'next';
import { getUpdatePostsPaginated } from '@/sanity/lib/client';
import { getOgImageUrl } from '@/lib/utils/og-image';
import type { UpdatePost } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  // Get first page of updates for og image
  const result = await getUpdatePostsPaginated({ page: 1, limit: 8 });
  const posts = result.posts;

  // Get first update image from carousel
  const firstPost = posts.find((p: UpdatePost) => p.featuredImage);
  const ogImage = firstPost?.featuredImage
    ? getOgImageUrl(firstPost.featuredImage)
    : 'https://www.acoblighting.com/images/og-image.jpg';

  return {
    title: 'Updates & Media - ACOB Lighting Technology Limited',
    description:
      'Stay updated with the latest news, case studies, press releases, and media coverage from ACOB Lighting Technology Limited. Discover our latest projects and industry insights.',
    keywords:
      'ACOB Lighting news, solar energy updates, case studies, press releases, media coverage, renewable energy news, Nigeria solar updates',
    openGraph: {
      title: 'Updates & Media - ACOB Lighting Technology Limited',
      description:
        'Latest news, case studies, press releases, and media coverage from ACOB Lighting.',
      type: 'website',
      url: 'https://acoblighting.com/updates',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'ACOB Lighting Updates & News',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Updates & Media - ACOB Lighting Technology Limited',
      description:
        'Latest news, case studies, and media coverage from ACOB Lighting.',
      images: [ogImage],
    },
  };
}

export default function UpdatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
