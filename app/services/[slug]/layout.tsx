import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data';
import { getOgImageUrl } from '@/lib/utils/og-image';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found - ACOB Lighting Technology Limited',
      description: 'The requested service could not be found.',
    };
  }

  const ogImage = service.image
    ? getOgImageUrl(service.image)
    : 'https://www.acoblighting.com/images/og-image.jpg';

  return {
    title: `${service.title} - ACOB Lighting Technology Limited`,
    description:
      service.excerpt ||
      `Learn about ${service.title} services from ACOB Lighting Technology Limited. We provide comprehensive solar energy solutions including ${service.title.toLowerCase()} across Nigeria.`,
    keywords: `${service.title}, solar energy, ${service.title.toLowerCase()}, ACOB Lighting, Nigeria solar services, renewable energy`,
    openGraph: {
      title: `${service.title} - ACOB Lighting Technology Limited`,
      description:
        service.excerpt ||
        `Learn about ${service.title} services from ACOB Lighting.`,
      type: 'website',
      url: `https://www.acoblighting.com/services/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${service.title} - ACOB Lighting Service`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} - ACOB Lighting Technology Limited`,
      description:
        service.excerpt ||
        `Learn about ${service.title} services from ACOB Lighting.`,
      images: [ogImage],
    },
  };
}

export default function ServiceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
