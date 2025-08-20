export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  icon: string;
  features: string[];
  benefits: string[];
  applications: string[];
  whyChooseUs: string[];
  gallery: string[];
  category: string;
}

export const servicesData: ServiceData[] = [
  {
    id: 'mini-grid-solutions',
    title: 'Mini-Grid Solutions',
    slug: 'mini-grid-solutions',
    shortDescription:
      'ACOB delivers reliable mini-grid systems to homes, businesses, and industries, using innovative, scalable technology that empowers communities with sustainable, affordable, and efficient energy access.',
    fullDescription:
      'ACOB provides minigrid solutions that serve a wide range of customers which include private households, commercial businesses such as shops, ice makers and mobile phone chargers, agricultural loads such as cold storage, productive loads such as grind mills, food processing and wood or metal workingshops, and semi industrials such astelecom towers. At ACOB Lighting Technology Ltd., we recognize the diverse needs of our customers and are dedicated to providing tailored solutions that meet their unique requirements. Through innovation, reliability, and a commitment to sustainability, we empower communities to thrive and prosper.',
    image: '/images/olooji-community.jpg',
    icon: '/images/mini-grid-solutions.webp',
    features: [
      'Scalable power solutions for communities',
      'Hybrid solar and battery systems',
      'Smart grid management technology',
      'Remote monitoring capabilities',
      'Flexible payment systems',
    ],
    benefits: [
      'Reliable 24/7 power supply',
      'Reduced electricity costs',
      'Environmental sustainability',
      'Economic development for communities',
      'Job creation opportunities',
    ],
    applications: [
      'Rural communities',
      'Commercial establishments',
      'Agricultural facilities',
      'Healthcare centers',
      'Educational institutions',
    ],
    whyChooseUs: [
      'Over 10 years of experience in mini-grid development',
      'Proven track record with 100+ successful installations',
      'Local expertise and understanding of Nigerian market',
      'Comprehensive maintenance and support services',
      'Innovative financing solutions',
    ],
    gallery: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
    category: 'Power Solutions',
  },
  {
    id: 'captive-power-solutions',
    title: 'Captive Power Solutions',
    slug: 'captive-power-solutions',
    shortDescription:
      'We provide customized solar and inverter systems for homes, businesses, and institutions, ensuring uninterrupted, efficient, and reliable power for diverse, off-grid and grid-tied applications.',

    fullDescription:
      'ACOB provides Solar and Inverter system to residential customers, commercial customers and for public driven projects. For example, gas stations, banks, schools, business offices and other type of facilities/buildings that require reliable power. Our solutions are designed to meet the specific needs of residential, commercial, and public-driven projects, ensuring reliable and sustainable power supply in diverse applications. For residential customers, our captive power solutions offer an independent source of electricity, reducing dependence on the grid and providing uninterrupted power for essential household needs.',
    image: '/images/services/captive-power-solutions.webp',
    icon: '/images/captive-power-solutions.webp',
    features: [
      'Dedicated power systems for businesses',
      'Solar and battery hybrid solutions',
      'Grid-tie and off-grid options',
      'Load management systems',
      'Energy storage solutions',
    ],
    benefits: [
      'Reduced operational costs',
      'Energy independence',
      'Improved business continuity',
      'Environmental compliance',
      'Long-term cost savings',
    ],
    applications: [
      'Gas stations',
      'Banks and financial institutions',
      'Schools and universities',
      'Business offices',
      'Manufacturing facilities',
    ],
    whyChooseUs: [
      'Customized solutions for each client',
      'High-quality components and materials',
      'Professional installation and commissioning',
      'Ongoing maintenance and support',
      'Competitive pricing and financing options',
    ],
    gallery: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
    category: 'Power Solutions',
  },
  {
    id: 'professional-energy-audit',
    title: 'Professional Energy Audit',
    slug: 'professional-energy-audit',
    shortDescription:
      'ACOB offers expert energy audits for industries, residences, and offices to analyze usage, identify inefficiencies, and recommend cost-effective, energy-saving solutions for improved performance.',
    fullDescription: `
      ACOB Lighting Technology Ltd. has amassed extensive expertise and experience in conducting Professional Energy Audits tailored to the unique needs of industries, residential buildings, offices, and public lighting facilities. Our comprehensive Energy Audit services are designed to provide in-depth analysis and insights into energy consumption patterns, identify areas of inefficiency, and recommend cost-effective solutions to optimize energy usage and reduce operational costs.
      
      For industries, our Energy Audit process begins with a thorough assessment of the facility’s energy infrastructure, including electrical systems, HVAC (Heating, Ventilation, and Air Conditioning) systems, lighting fixtures, and machinery. We utilize advanced monitoring and measurement techniques to collect data on energy consumption and demand, analyze energy usage trends, and identify opportunities for energy efficiency improvements.
      `,

    image: '/images/services/professional-energy-audit.webp',
    icon: '/images/professional-energy-audit.webp',
    features: [
      'Comprehensive energy assessments',
      'Detailed energy consumption analysis',
      'Cost-benefit analysis',
      'Customized recommendations',
      'Implementation support',
    ],
    benefits: [
      'Reduced energy costs',
      'Improved energy efficiency',
      'Environmental impact reduction',
      'Compliance with regulations',
      'Enhanced operational performance',
    ],
    applications: [
      'Industrial facilities',
      'Residential buildings',
      'Office complexes',
      'Public lighting systems',
      'Commercial establishments',
    ],
    whyChooseUs: [
      'Certified energy auditors',
      'Advanced measurement tools',
      'Detailed reporting and analysis',
      'Implementation guidance',
      'Follow-up support services',
    ],
    gallery: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
    category: 'Consulting',
  },
  {
    id: 'engineering-procurement-construction',
    title: 'Engineering Procurement & Construction',
    slug: 'engineering-procurement-construction',
    shortDescription:
      'With Over 8 years of vast experience, at ACOB Lighting Technology Limited, we pride ourselves on offering comprehensive Engineering, Procurement, and Construction (EPC) solutions tailored to meet the unique energy needs of unserved and underserved communities. Our holistic approach ensures that every stage of your energy project is expertly managed, from initial concept through to final commissioning.',
    fullDescription:
      'Our Engineering, Procurement, and Construction (EPC) services provide end-to-end solutions for solar power projects. We handle everything from initial feasibility studies and design through procurement, construction, and commissioning.',
    image:
      '/images/services/engineering-procurement-construction.webp?height=400&width=600',
    icon: '/images/services/engineering-procurement.webp',
    features: [
      'Complete project management',
      'Engineering design and planning',
      'Equipment procurement',
      'Construction and installation',
      'Testing and commissioning',
    ],
    benefits: [
      'Single point of responsibility',
      'Reduced project risks',
      'Faster project delivery',
      'Quality assurance',
      'Cost optimization',
    ],
    applications: [
      'Utility-scale solar farms',
      'Commercial solar installations',
      'Industrial power systems',
      'Mini-grid projects',
      'Hybrid power systems',
    ],
    whyChooseUs: [
      'Experienced project management team',
      'Proven track record',
      'Quality materials and workmanship',
      'Timely project delivery',
      'Comprehensive warranties',
    ],
    gallery: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
    category: 'Construction',
  },
  {
    id: 'streetlighting-infrastructure',
    title: 'Streetlighting Infrastructure Project Development',
    slug: 'streetlighting-infrastructure',
    shortDescription:
      'Development and implementation of solar-powered streetlighting infrastructure for urban and rural areas.',
    fullDescription:
      'We specialize in the development of sustainable streetlighting infrastructure using solar technology. Our solutions improve public safety, reduce municipal costs, and contribute to environmental sustainability.',
    image:
      '/images/services/streetlighting-infrastructure-project-development.webp?height=400&width=600',
    icon: '/images/services/street-light-street.png?height=80&width=80',
    features: [
      'Solar-powered LED streetlights',
      'Smart lighting controls',
      'Remote monitoring systems',
      'Weather-resistant designs',
      'Low maintenance requirements',
    ],
    benefits: [
      'Reduced electricity costs',
      'Improved public safety',
      'Environmental sustainability',
      'Low maintenance costs',
      'Enhanced community development',
    ],
    applications: [
      'Urban streets and highways',
      'Rural communities',
      'Parks and recreational areas',
      'Commercial districts',
      'Residential neighborhoods',
    ],
    whyChooseUs: [
      'Specialized streetlighting expertise',
      'High-quality LED technology',
      'Durable and weather-resistant systems',
      'Comprehensive maintenance services',
      'Proven installation experience',
    ],
    gallery: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
    category: 'Infrastructure',
  },
];

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(service => service.slug === slug);
};

export const getServicesByCategory = (category: string): ServiceData[] => {
  return servicesData.filter(service => service.category === category);
};
