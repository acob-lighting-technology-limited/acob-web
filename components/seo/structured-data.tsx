export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ACOB Lighting Technology Limited',
    url: 'https://acoblighting.com',
    logo: 'https://acoblighting.com/images/ACOB-logo.png',
    description:
      'Leading supplier of solar materials for manufacturers, installers & contractors. Mini-grid solutions, captive power systems, and professional energy audits.',
          address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot 2. Block 14 Extension, Federal Ministry of Works And Housing Sites and Service Scheme, Setraco Gate Gwarinpa',
        addressLocality: 'Abuja',
        addressRegion: 'FCT',
        postalCode: '900001',
        addressCountry: 'NG',
      },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234 704 920 2634',
      contactType: 'customer service',
      email: 'info@acoblighting.com',
    },
    sameAs: [
      'https://www.linkedin.com/company/acob-lighting',
      'https://www.facebook.com/acoblighting',
      'https://twitter.com/acoblighting',
    ],
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
    url: 'https://acoblighting.com',
    description:
      'Leading supplier of solar materials for manufacturers, installers & contractors',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://acoblighting.com/search?q={search_term_string}',
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
