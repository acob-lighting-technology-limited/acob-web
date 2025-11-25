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
    // Main company stats - all values only, no suffixes or units
    projectsCompleted: 100,
    totalCapacityMW: 10,
    communitiesServed: 50,
    staffStrength: 90,

    // Detailed deployment stats
    communitiesDeployed: 9,
    communitiesUnderConstruction: 19,
    totalConnections: 2306,
    installedCapacityKwp: 690,

    // Impact metrics
    communitiesElectrified: 15,
    connectionsEnergized: 5306,
    installedCapacityDetailedKwp: 1500,
    projectsUnderway: 19,

    // Mission metrics
    peopleToImpact: 5000000,
    streetlights: 2000000,
    miniGridDeployments: 150,
    renewableEnergyCapacityMW: 50,
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
