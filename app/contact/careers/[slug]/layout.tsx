import { Metadata } from 'next';
import { getJobPosting } from '@/sanity/lib/client';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobPosting(slug);

  if (!job) {
    return {
      title: 'Job Not Found - ACOB Lighting Technology Limited',
      description: 'The requested job posting could not be found.',
    };
  }

  const ogImage = getOgImageUrl('/images/contact/careers.webp');

  return {
    title: `${job.title} - ACOB Lighting Technology Limited`,
    description:
      job.description ||
      `Explore the ${job.title} position at ACOB Lighting Technology Limited. Join our team and be part of Nigeria's energy access revolution.`,
    keywords: `${job.title}, ACOB Lighting careers, solar energy jobs, renewable energy careers, Nigeria solar jobs, ${job.department || ''}`,
    openGraph: {
      title: `${job.title} - ACOB Lighting Technology Limited`,
      description:
        job.description ||
        `Explore the ${job.title} position at ACOB Lighting.`,
      type: 'website',
      url: `https://acoblighting.com/contact/careers/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${job.title} - ACOB Lighting Career`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} - ACOB Lighting Technology Limited`,
      description:
        job.description ||
        `Explore the ${job.title} position at ACOB Lighting.`,
      images: [ogImage],
    },
  };
}

export default function CareerSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
