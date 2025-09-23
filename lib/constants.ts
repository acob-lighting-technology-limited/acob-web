export const COMPANY_INFO = {
  name: 'ACOB Lighting Technology Limited',
  shortName: 'ACOB Lighting',
  tagline: 'Lighting Up Nigeria with Advanced Solar Solutions',
  description:
    'Leading supplier of solar materials for manufacturers, installers & contractors. Mini-grid solutions, captive power systems, and professional energy audits.',

  contact: {
    phones: ['0704 700 2424', '0903 700 7895'],
    email: 'info@acoblighting.com',
    additionalEmail: 'infoacob@gmail.com',
    address: 'Abuja, Nigeria',
  },

  social: {
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    instagram: '#',
  },

  services: [
    'Mini-Grid Solutions',
    'Captive Power Solutions',
    'Professional Energy Audit',
    'Solar Installation',
    'Maintenance & Support',
  ],

  stats: {
    projectsCompleted: '100+',
    totalCapacity: '150MW+',
    communitiesServed: '200+',
    yearsExperience: '10+',
  },
} as const;

export const NAVIGATION_ITEMS = [
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Projects', href: '/projects' },
  { name: 'News & Media', href: '/news' },
  { name: 'Contact Us', href: '/contact' },
] as const;
