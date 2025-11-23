import { Metadata } from 'next';
import { getUpdatePost, getUpdatePostsPaginated } from '@/sanity/lib/client';
import { getOgImageUrl } from '@/lib/utils/og-image';
import type { UpdatePost } from '@/lib/types';

// Valid category values
const VALID_CATEGORIES = [
  'announcements',
  'case-studies',
  'press-releases',
  'events',
  'celebrations',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Check if slug is a category
  if (VALID_CATEGORIES.includes(slug)) {
    // Handle category metadata
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
        url: `https://acoblighting.com/updates/${slug}`,
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

  // Handle individual post metadata
  const post = await getUpdatePost(slug);

  if (!post) {
    return {
      title: 'Update Not Found - ACOB Lighting Technology Limited',
      description: 'The requested update could not be found.',
    };
  }

  const ogImage = post.featuredImage
    ? getOgImageUrl(post.featuredImage)
    : 'https://www.acoblighting.com/images/og-image.jpg';

  return {
    title: `${post.title} - ACOB Lighting Technology Limited`,
    description:
      post.excerpt ||
      `Read about ${post.title} from ACOB Lighting Technology Limited. Stay updated with our latest news, case studies, and developments in solar energy solutions across Nigeria.`,
    keywords: `${post.title}, ACOB Lighting news, solar energy updates, renewable energy, Nigeria solar news, ${post.category || 'news'}`,
    openGraph: {
      title: `${post.title} - ACOB Lighting Technology Limited`,
      description:
        post.excerpt || `Read about ${post.title} from ACOB Lighting.`,
      type: 'article',
      url: `https://www.acoblighting.com/updates/${slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${post.title} - ACOB Lighting Update`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} - ACOB Lighting Technology Limited`,
      description:
        post.excerpt || `Read about ${post.title} from ACOB Lighting.`,
      images: [ogImage],
    },
  };
}

export default function UpdateSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
