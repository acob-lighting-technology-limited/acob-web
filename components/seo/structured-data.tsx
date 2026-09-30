import { CONTACT_INFO, SOCIAL_MEDIA } from '@/lib/constants/app.constants';
import {
  ANNIVERSARY_2026,
  isAnniversaryYear2026,
} from '@/lib/constants/anniversary';

export function StructuredData() {
  const isAnniversaryYear = isAnniversaryYear2026();
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ACOB Lighting Technology Limited',
    url: 'https://www.acoblighting.com',
    logo: 'https://www.acoblighting.com/images/acob-logo-dark.png',
    image: isAnniversaryYear
      ? 'https://www.acoblighting.com/images/acob-10-years-impact-2026.jpeg'
      : 'https://www.acoblighting.com/images/olooji-community.webp',
    description: isAnniversaryYear
      ? `${ANNIVERSARY_2026.summary} ${ANNIVERSARY_2026.period} • ${ANNIVERSARY_2026.tagline}.`
      : 'Leading supplier of solar materials for manufacturers, installers & contractors. Mini-grid solutions, captive power systems, and professional energy audits.',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Plot 2. Block 14 Extension, Federal Ministry of Works And Housing Sites and Services Scheme, Setraco Gate, Gwarinpa, FCT, Nigeria',
      addressLocality: 'Abuja',
      addressRegion: 'FCT',
      postalCode: '900001',
      addressCountry: 'NG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone.primary,
      contactType: 'customer service',
      email: CONTACT_INFO.email.support,
    },
    sameAs: Object.values(SOCIAL_MEDIA).map(social => social.url),
    serviceArea: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Solar Energy Solutions',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mini-Grid Solutions',
            description:
              'Complete mini-grid solutions for communities and businesses',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Captive Power Systems',
            description:
              'Custom captive power solutions for industrial applications',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Professional Energy Audits',
            description: 'Comprehensive energy audit services',
          },
        },
      ],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ACOB Lighting Technology Limited',
    url: 'https://www.acoblighting.com',
    description:
      'Leading supplier of solar materials for manufacturers, installers & contractors',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate:
          'https://www.acoblighting.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
