import { Metadata } from 'next';
import { getUpdatePost } from '@/sanity/lib/client';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
