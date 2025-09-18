export interface ServiceData {
  id: string;
  title: string;
  slug: string | { current: string };
  excerpt: string;
  description: string;
  fullDescription?: string;
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
    excerpt:
      'Transform rural communities with reliable 24/7 solar power that reduces costs by up to 60% and creates lasting economic opportunities.',
    description:
      'Our comprehensive mini-grid solutions bring sustainable electricity to off-grid communities across Nigeria, serving over 10,000 households to date. These hybrid solar and battery systems provide consistent power for diverse needs - from residential lighting and mobile charging to commercial ice-making, agricultural cold storage, and productive enterprises like grain mills and workshops. Each mini-grid is designed with smart management technology and flexible payment systems, making clean energy accessible and affordable. Our locally-manufactured components and community-centered approach ensure long-term sustainability while creating jobs and enabling economic growth in previously underserved areas.',
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
    excerpt:
      'Cut your energy bills by 70% with custom solar systems designed for businesses, schools, and residential properties across Nigeria.',
    description:
      'ACOB specializes in designing and installing captive power systems that provide energy independence for businesses and institutions. Our end-to-end solar solutions combine high-efficiency panels, intelligent inverters, and advanced battery storage to ensure uninterrupted power supply even during grid outages. Whether you operate a gas station, bank, school, or manufacturing facility, our systems are engineered to handle your specific load requirements while significantly reducing operational costs. We offer both grid-tie and off-grid configurations, complete with load management systems that optimize energy consumption. From initial site assessment to final commissioning, our experienced team ensures seamless integration with your existing infrastructure.\n\nWe have successfully completed major captive power projects including:\n• ACOB has completed the deployment of 50kWp 192KWh Solar Hybrid Systems across 12 Hospitals in the North-Western Zone of Nigeria; Jigawa, Kano and Kaduna State, respectively.',
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
      
      '/images/services/captive-power-solutions.jpeg?height=400&width=600',
      '/images/services/captive-power-solutions-2.jpeg?height=400&width=600',
    ],
    category: 'Power Solutions',
  },
  {
    id: 'professional-energy-audit',
    title: 'Professional Energy Audit',
    slug: 'professional-energy-audit',
    excerpt:
      'Discover hidden energy savings worth thousands of naira through detailed audits that identify inefficiencies and optimization opportunities.',
    description:
      "ACOB's certified energy auditors conduct comprehensive assessments of your facility's energy consumption patterns using advanced monitoring equipment and proven methodologies. Our audit process covers all energy-consuming systems including HVAC, lighting, machinery, and electrical infrastructure across industries, residential buildings, offices, and public facilities. We provide detailed analysis of energy usage trends, benchmark performance against industry standards, and deliver actionable recommendations with clear ROI projections. Our reports include prioritized improvement strategies, cost-benefit analyses, and implementation roadmaps that typically result in 20-40% energy savings. Beyond identifying inefficiencies, we support clients through the implementation phase and provide follow-up monitoring to ensure sustained performance improvements.",
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
    excerpt:
      'Complete turnkey renewable energy projects delivered on time and within budget, from concept to commissioning by experienced professionals.',
    description:
      'As a leading EPC contractor, ACOB manages every aspect of your renewable energy project through a single point of responsibility. Our integrated approach combines world-class engineering design, strategic procurement of premium components, and professional construction services backed by over 8 years of industry experience. We specialize in utility-scale solar installations, commercial power systems, and complex mini-grid projects for both local and international developers. Our project management methodology ensures strict adherence to timelines, budgets, and quality standards while maintaining safety protocols throughout the construction phase. From initial feasibility studies and detailed engineering to equipment procurement, installation, testing, and final commissioning, we deliver complete solutions that meet international standards at competitive pricing.',
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
    excerpt:
      'Illuminate communities safely and sustainably with solar LED streetlights that operate maintenance-free for up to 10 years.',
    description:
      'ACOB designs and deploys intelligent solar streetlighting infrastructure that enhances public safety while reducing municipal energy costs by up to 90%. Our high-density LED lighting systems feature advanced photovoltaic panels, long-life lithium batteries, and smart controllers that automatically adjust brightness based on ambient conditions and traffic patterns. Each streetlight is engineered for the harsh Nigerian climate with IP65-rated weatherproofing and can operate reliably for 10+ years with minimal maintenance. Our comprehensive service includes detailed site surveys, custom engineering design, professional installation, and ongoing maintenance programs. Whether for urban highways, rural communities, or commercial districts, our streetlighting solutions improve security, enable extended business hours, and contribute to community development.\n\nWe have successfully completed major streetlighting projects including:\n\n• Installation of High-Density LED Streetlight Infrastructure at Kogi State Government House in Lokoja, Nigeria\n\n• Installation of High-Density LED Streetlight Infrastructure along Stella Obasanjo Way in Lokoja, Kogi State, Nigeria\n\n• Installation of High-Density LED Pilot AC Streetlight Infrastructure across Delta, Ogun, Cross River, Akwa Ibom, and Lagos states\n\n• World Bank Project for the procurement of 418 solar-powered street lights across 11 locations in 11 wards of Akwanga Local Government and Loko Ward in Nasarawa State',
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
      '/images/services/streetlighting_1.jpeg?height=400&width=600',
      '/images/services/streetlighting_2.jpeg?height=400&width=600',
    ],
    category: 'Infrastructure',
  },
  {
    id: 'operations-and-maintenance',
    title: 'Operations and Maintenance',
    slug: 'operations-and-maintenance',
    excerpt:
      'Maximize your renewable energy ROI with 24/7 monitoring and proactive maintenance that ensures 99%+ system uptime year-round.',
    description:
      'Our comprehensive Operations & Maintenance services protect your renewable energy investment through continuous monitoring, preventive care, and rapid response support. Using advanced SCADA systems and IoT sensors, we track performance metrics in real-time, identifying potential issues before they impact energy production. Our certified technicians conduct regular inspections, cleaning, and component testing following manufacturer specifications and industry best practices. Emergency response teams are available 24/7 to address system faults, weather damage, or equipment failures with guaranteed response times. We maintain detailed maintenance logs, performance reports, and warranty compliance documentation to ensure your systems operate at peak efficiency throughout their 25+ year lifespan. Our service agreements are flexible and scalable, covering everything from small residential installations to large utility-scale facilities.\n\nWe have successfully completed routine maintenance projects including:\n• Routine Maintenance on Streetlight Infrastructure along Airport road, Abuja\n• Routine Maintenance on Streetlight Infrastructure along Bannex Round-About, Abuja',
    image: '/images/services/operations-and-maintenance.webp',
    icon: '/images/operations-and-maintenance.webp',
    features: [
      '24/7 system monitoring and surveillance',
      'Preventive maintenance programs',
      'Performance optimization services',
      'Emergency response and repairs',
      'Component replacement and upgrades',
    ],
    benefits: [
      'Maximum energy production efficiency',
      'Reduced system downtime',
      'Extended equipment lifespan',
      'Protection of investment',
      'Compliance with warranty requirements',
    ],
    applications: [
      'Solar power plants',
      'Wind energy systems',
      'Mini-grid installations',
      'Commercial solar systems',
      'Industrial renewable energy facilities',
    ],
    whyChooseUs: [
      'Experienced technical maintenance team',
      'Advanced monitoring technology',
      'Proactive maintenance approach',
      'Rapid response capabilities',
      'Comprehensive service agreements',
    ],
    gallery: [
      '/images/services/operations-maintenance.jpeg?height=400&width=600',
    ],
    category: 'Maintenance',
  },
];

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(service => service.slug === slug);
};

export const getServicesByCategory = (category: string): ServiceData[] => {
  return servicesData.filter(service => service.category === category);
};
