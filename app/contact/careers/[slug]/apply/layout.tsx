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
    title: `Apply for ${job.title} - ACOB Lighting Technology Limited`,
    description: `Submit your application for the ${job.title} position at ACOB Lighting Technology Limited. Join our team and be part of Nigeria's energy access revolution.`,
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `Apply for ${job.title} - ACOB Lighting Technology Limited`,
      description: `Submit your application for the ${job.title} position at ACOB Lighting.`,
      type: 'website',
      url: `https://acoblighting.com/contact/careers/${slug}/apply`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Apply for ${job.title} - ACOB Lighting`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Apply for ${job.title} - ACOB Lighting Technology Limited`,
      description: `Submit your application for the ${job.title} position at ACOB Lighting.`,
      images: [ogImage],
    },
  };
}

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
