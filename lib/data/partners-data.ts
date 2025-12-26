export interface Partner {
  name: string;
  fullName: string;
  slug: string;
  logo: string;
  category:
    | 'Financial'
    | 'Government'
    | 'Technology'
    | 'Development'
    | 'Energy';
  description: string;
  details?: {
    overview: string;
    partnershipType: string;
    keyAchievements?: string[];
    website?: string;
    videoUrl?: string;
    socialMedia?: {
      linkedin?: string;
      twitter?: string;
      facebook?: string;
    };
  };
}

export const partners: Partner[] = [
  {
    name: 'AEDC',
    fullName: 'Abuja Electricity Distribution Company',
    slug: 'aedc',
    logo: '/images/partners/aedc.png?height=60&width=120',
    category: 'Energy',
    description:
      'Abuja Electricity Distribution Company - Strategic energy distribution partner',
    details: {
      overview:
        "ACOB Lighting collaborates with AEDC on multi-stakeholder initiatives for rural electrification in Nasarawa State and the Federal Capital Territory. In October 2024, ACOB's MD Alexander Obiechina met with AEDC's MD and REA leadership to strengthen collaboration for rural electrification infrastructure development in the Umaisha Community of Toto Local Government Area. AEDC is responsible for electricity distribution in Abuja, Kogi, Niger, and Nasarawa States.",
      partnershipType: 'Energy Distribution Partnership',
      keyAchievements: [
        'Multi-stakeholder collaboration for Umaisha rural electrification',
        'Joint infrastructure development initiatives',
        'Distribution network integration support',
      ],
      website: 'https://www.abujaelectricity.com',
    },
  },
  {
    name: 'BAE',
    fullName: 'BAE Systems',
    slug: 'bae',
    logo: '/images/partners/bae.png?height=60&width=120',
    category: 'Financial',
    description:
      'Banking partner supporting renewable energy financing solutions',
    details: {
      overview:
        "BAE provides financial backing and banking services for ACOB Lighting's renewable energy projects across Nigeria, supporting the deployment of sustainable energy infrastructure.",
      partnershipType: 'Financial Partnership',
      website: 'https://www.baesystems.com',
    },
  },
  {
    name: 'CrossBoundary',
    fullName: 'CrossBoundary Energy',
    slug: 'crossboundary',
    logo: '/images/partners/crossboundary.png?height=60&width=120',
    category: 'Development',
    description: 'International development partner for clean energy access',
    details: {
      overview:
        "CrossBoundary Energy Access is Africa's first blended finance platform for mini-grids. While both ACOB Lighting and CrossBoundary are active in Nigeria's mini-grid sector working with the REA under the Nigeria Electrification Project, they share common goals of expanding clean energy access across emerging markets and rural communities.",
      partnershipType: 'Development Partnership',
      website: 'https://www.crossboundary.com',
    },
  },
  {
    name: 'ECREEE',
    fullName: 'ECOWAS Centre for Renewable Energy and Energy Efficiency',
    slug: 'ecreee',
    logo: '/images/partners/ecreee.png?height=60&width=120',
    category: 'Development',
    description: 'ECOWAS Centre for Renewable Energy and Energy Efficiency',
    details: {
      overview:
        'ECREEE supports regional renewable energy initiatives and policy development across the ECOWAS region. As a specialized agency of ECOWAS, ECREEE promotes renewable energy and energy efficiency investments, contributing to sustainable development in West Africa including Nigeria.',
      partnershipType: 'Regional Development Partnership',
      website: 'https://www.ecreee.org',
    },
  },
  {
    name: 'Everlight',
    fullName: 'Everlight Electronics',
    slug: 'everlight',
    logo: '/images/partners/everlight.png?height=60&width=120',
    category: 'Technology',
    description: 'LED technology and lighting solutions provider',
    details: {
      overview:
        "Everlight Electronics supplies cutting-edge LED technology for ACOB Lighting's street lighting infrastructure projects. As a leading LED manufacturer, Everlight provides high-quality, energy-efficient lighting components that support ACOB's sustainable lighting solutions across Nigeria.",
      partnershipType: 'Technology Partnership',
      website: 'https://www.everlight.com',
    },
  },
  {
    name: 'FCMB',
    fullName: 'First City Monument Bank',
    slug: 'fcmb',
    logo: '/images/partners/fcmb.png?height=60&width=120',
    category: 'Financial',
    description: 'First City Monument Bank - Financial services partner',
    details: {
      overview:
        'FCMB is a leading Nigerian bank actively engaged in renewable energy financing. The bank has disbursed over N7 billion for energy efficiency projects and partnered with REA to launch a N100 billion renewable energy fund for mini-grid projects. FCMB offers Clean Energy Loans up to N30 million and has supported over 50% of key renewable energy developers in Nigeria with debt financing.',
      partnershipType: 'Banking Partnership',
      keyAchievements: [
        'N7 billion+ disbursed for energy efficiency projects',
        'N100 billion renewable energy fund with REA',
        'Clean Energy Loans up to N30 million',
        'Supporting 50%+ of key developers in Nigeria',
      ],
      website: 'https://www.fcmb.com',
    },
  },
  {
    name: 'Federal Ministry of Power',
    fullName: 'Federal Ministry of Power',
    slug: 'federal-ministry-of-power',
    logo: '/images/partners/federal-ministry-of-power.png?height=60&width=120',
    category: 'Government',
    description:
      'Government partner for national energy policy and infrastructure',
    details: {
      overview:
        "ACOB Lighting collaborates with the Federal Ministry of Power through the Rural Electrification Agency (REA), an agency under the ministry. The ministry is the primary policy-making body responsible for power provision in Nigeria, working towards a sustainable energy future with targets for renewable energy contribution to the electricity mix. ACOB's CEO Alexander Obiechina has advocated for public-private partnerships to accelerate renewable energy delivery across Nigeria.",
      partnershipType: 'Government Partnership',
      keyAchievements: [
        'Collaboration through REA for rural electrification',
        "Supporting Nigeria's renewable energy targets",
        'Public-private partnership advocacy',
      ],
      website: 'https://power.gov.ng',
    },
  },
  {
    name: 'GIZ',
    fullName: 'Deutsche Gesellschaft für Internationale Zusammenarbeit',
    slug: 'giz',
    logo: '/images/partners/giz.png?height=60&width=120',
    category: 'Development',
    description: 'German development cooperation for sustainable energy',
    details: {
      overview:
        'ACOB Lighting was selected as one of eight Nigerian companies to receive grants and technical assistance from the EU and Germany through the Nigerian Energy Support Programme (NESP). GIZ provides technical support to accelerate electrification in rural areas through green mini-grid projects. GIZ has been working in Nigeria since 1974, focusing on economic development, employment, and energy supply, with the goal of providing 100,000 people in rural areas with more stable electricity via solar power.',
      partnershipType: 'International Development Partnership',
      keyAchievements: [
        'Selected for EU-Germany NESP grants and technical assistance',
        'Technical support for green mini-grid acceleration',
        'Capacity building for renewable energy specialists',
        'Policy advisory for energy transition',
      ],
      website: 'https://www.giz.de',
    },
  },
  {
    name: 'Hoppecke',
    fullName: 'Hoppecke Batterien',
    slug: 'hoppecke',
    logo: '/images/partners/hoppecke.png?height=60&width=120',
    category: 'Technology',
    description: 'Battery and energy storage technology provider',
    details: {
      overview:
        "Hoppecke supplies advanced battery and energy storage solutions for ACOB Lighting's mini-grid projects. As a leading German manufacturer of industrial batteries, Hoppecke provides reliable, long-lasting energy storage systems that ensure continuous power supply for off-grid and hybrid solar installations.",
      partnershipType: 'Technology Partnership',
      website: 'https://www.hoppecke.com',
    },
  },
  {
    name: 'IHS',
    fullName: 'IHS Towers',
    slug: 'ihs',
    logo: '/images/partners/ihs-logo.png?height=60&width=120',
    category: 'Technology',
    description: 'Infrastructure and telecommunications tower solutions',
    details: {
      overview:
        "IHS Towers provides infrastructure solutions supporting ACOB Lighting's energy distribution networks. As Africa's largest independent mobile telecommunications infrastructure provider, IHS offers tower infrastructure and power solutions that complement renewable energy deployments.",
      partnershipType: 'Infrastructure Partnership',
      website: 'https://www.ihstowers.com',
    },
  },
  {
    name: 'InfraCredit',
    fullName: 'InfraCredit',
    slug: 'infracredit',
    logo: '/images/partners/infracredit.png?height=60&width=120',
    category: 'Financial',
    description:
      'Green infrastructure financing and credit enhancement partner',
    details: {
      overview:
        "In January 2024, InfraCredit provided credit enhancement for ACOB Lighting's NGN 755 million (£10 million) 7-year Series 1 Fixed Rate Guaranteed Senior Green Infrastructure Bond. This financing, blended with a subordinated concessionary loan from the UK's FCDO, supports the construction and operation of isolated solar hybrid mini-grids in seven communities across Edo and Ondo States. The projects have a total solar PV capacity of 335 kW and will electrify up to 3,597 households and small businesses, create approximately 868 jobs, and reduce GHG emissions by 352 tonnes. This bond was recognized as the Best Social Bond in Africa at the EMEA Finance Achievement Awards for 2024.",
      partnershipType: 'Strategic Infrastructure Financing Partnership',
      keyAchievements: [
        'NGN 755 million green infrastructure bond financing',
        '335 kWp solar capacity across 7 communities in Edo and Ondo States',
        '3,597 households and businesses electrified',
        '868 jobs created',
        '352 tonnes GHG emissions reduced',
        'Best Social Bond in Africa 2024 (EMEA Finance Awards)',
        'Climate Bonds Standard certified',
      ],
      videoUrl: 'https://www.youtube.com/embed/C6S2Qj-Dsc0',
      website: 'https://www.infracredit.ng',
    },
  },
  {
    name: 'IOM UN Migration',
    fullName: 'International Organization for Migration',
    slug: 'iom-un-migration',
    logo: '/images/partners/iom-un-migration.png?height=60&width=120',
    category: 'Development',
    description: 'UN migration agency supporting community development',
    details: {
      overview:
        'The International Organization for Migration (IOM) collaborates with ACOB Lighting on energy access projects that support displaced communities and vulnerable populations. IOM works to promote humane and orderly migration, and energy access is a critical component of community stabilization and development programs.',
      partnershipType: 'International Development Partnership',
      website: 'https://www.iom.int',
    },
  },
  {
    name: 'JED',
    fullName: 'Jos Electricity Distribution Company',
    slug: 'jed',
    logo: '/images/partners/jed-logo.png?height=60&width=120',
    category: 'Energy',
    description: 'Jos Electricity Distribution Company',
    details: {
      overview:
        'Jos Electricity Distribution Company (JED) partners with ACOB Lighting on electricity distribution projects in the Jos region and surrounding areas. JED is responsible for electricity distribution in Plateau, Bauchi, Gombe, and Benue States.',
      partnershipType: 'Energy Distribution Partnership',
      website: 'https://www.jedc.com.ng',
    },
  },
  {
    name: 'JINKO',
    fullName: 'JinkoSolar Holding Co., Ltd',
    slug: 'jinko',
    logo: '/images/partners/jinko.png?height=60&width=120',
    category: 'Technology',
    description: 'Leading solar panel manufacturer and technology provider',
    details: {
      overview:
        "JinkoSolar supplies high-efficiency solar panels for ACOB Lighting's renewable energy installations. As one of the world's largest and most innovative solar module manufacturers, JinkoSolar provides reliable, high-performance photovoltaic products that power ACOB's mini-grid and solar projects across Nigeria.",
      partnershipType: 'Technology Partnership',
      website: 'https://www.jinkosolar.com',
    },
  },
  {
    name: 'Kogi Confluence',
    fullName: 'Kogi State Government',
    slug: 'kogi-confluence',
    logo: '/images/partners/kogi-confluence.png?height=60&width=120',
    category: 'Government',
    description: 'State government partner for regional energy development',
    details: {
      overview:
        "ACOB Lighting collaborates with the Kogi State Government on regional energy infrastructure projects. This partnership supports the state's economic development goals through improved energy access and renewable energy deployment in underserved communities.",
      partnershipType: 'State Government Partnership',
      website: 'https://www.kogistate.gov.ng',
    },
  },
  {
    name: 'NSIA',
    fullName: 'Nigeria Sovereign Investment Authority',
    slug: 'nsia',
    logo: '/images/partners/nsia.png?height=60&width=120',
    category: 'Financial',
    description: 'Nigeria Sovereign Investment Authority',
    details: {
      overview:
        "The Nigeria Sovereign Investment Authority (NSIA) provides sovereign investment support for strategic infrastructure projects. NSIA manages Nigeria's sovereign wealth fund and invests in critical infrastructure sectors including power and renewable energy to support long-term economic development.",
      partnershipType: 'Investment Partnership',
      website: 'https://nsia.com.ng',
    },
  },
  {
    name: 'Odyssey',
    fullName: 'Odyssey Energy Solutions',
    slug: 'odyssey',
    logo: '/images/partners/odyssey.png?height=60&width=120',
    category: 'Technology',
    description: 'Energy technology and solutions provider',
    details: {
      overview:
        "Odyssey Energy Solutions delivers innovative energy technology solutions for ACOB Lighting's projects. They provide advanced energy management systems, monitoring solutions, and technical expertise that enhance the efficiency and reliability of renewable energy installations.",
      partnershipType: 'Technology Partnership',
      website: 'https://www.odysseyenergysolutions.com',
    },
  },
  {
    name: 'REA',
    fullName: 'Rural Electrification Agency',
    slug: 'rea',
    logo: '/images/partners/rea.png?height=60&width=120',
    category: 'Government',
    description: 'Rural Electrification Agency - Key government partner',
    details: {
      overview:
        "ACOB Lighting has a long-standing collaboration with Nigeria's Rural Electrification Agency under the Nigeria Electrification Project (NEP), funded by the African Development Bank and World Bank. Through Performance-Based Grants and Minimum Subsidy Tender agreements, we've deployed hybrid solar mini-grids across multiple states. In February 2024, we signed agreements for 5 sites in Nasarawa State, and in March 2023, we secured grants for 6 additional sites across Edo and Ondo States with 305 kWp capacity, providing energy access to 17,860 people. We've committed to building 100 hybrid solar mini-grids in rural areas over five years.",
      partnershipType: 'Government Partnership',
      keyAchievements: [
        'Early partner in REA pilot program',
        '910 kWp total solar PV capacity in past projects',
        '17,860 people provided with energy access (2023)',
        '305 kWp across 6 sites in Edo and Ondo States',
        '5 sites in Nasarawa State (2024)',
        'Commitment to 100 mini-grids over 5 years',
        '2,000 households electrified in 4 rural communities',
      ],
      website: 'https://rea.gov.ng',
    },
  },
  {
    name: 'SEforALL',
    fullName: 'Sustainable Energy for All',
    slug: 'seforall',
    logo: '/images/partners/seforall.png?height=60&width=120',
    category: 'Development',
    description: 'Sustainable Energy for All - Global energy access initiative',
    details: {
      overview:
        'ACOB Lighting is a member of the SEforALL Electrification Accelerator, aligning with our commitment to promoting sustainable LED products, renewable energy, and electrification projects across Nigeria and Africa. SEforALL has been partnering with the Nigerian government since 2020 to advance universal energy access and a path to net-zero greenhouse gas emissions. Through this collaboration, we contribute to achieving Sustainable Development Goal 7 (SDG7) – access to affordable, reliable, sustainable, and modern energy for all by 2030.',
      partnershipType: 'International Development Partnership',
      keyAchievements: [
        'Member of SEforALL Electrification Accelerator',
        'Contributing to SDG7 achievement',
        "Supporting Nigeria's net-zero emissions target by 2060",
        'Advancing universal energy access by 2030',
      ],
      website: 'https://www.seforall.org',
    },
  },
  {
    name: 'SHOTO',
    fullName: 'SHOTO Energy Management',
    slug: 'shoto',
    logo: '/images/partners/shoto.png?height=60&width=120',
    category: 'Technology',
    description: 'Energy management and monitoring solutions',
    details: {
      overview:
        "SHOTO provides advanced energy management and monitoring systems for ACOB Lighting's installations. Their smart energy solutions enable real-time monitoring, performance optimization, and predictive maintenance of mini-grid systems, ensuring maximum uptime and efficiency.",
      partnershipType: 'Technology Partnership',
      website: 'https://www.shoto.africa',
    },
  },
  {
    name: 'SMA Solar Technology',
    fullName: 'SMA Solar Technology AG',
    slug: 'sma-solar-technology',
    logo: '/images/partners/sma-solar-technology.png?height=60&width=120',
    category: 'Technology',
    description: 'Solar inverter and energy solutions manufacturer',
    details: {
      overview:
        "SMA Solar Technology supplies industry-leading inverters and energy management systems for ACOB Lighting's solar installations. As a global leader in photovoltaic system technology, SMA provides reliable, high-efficiency inverters that are critical components of solar mini-grids and hybrid power systems.",
      partnershipType: 'Technology Partnership',
      website: 'https://www.sma.de',
    },
  },
  {
    name: 'Starsight',
    fullName: 'Starsight Energy',
    slug: 'starsight',
    logo: '/images/partners/starsight.png?height=60&width=120',
    category: 'Technology',
    description: 'Energy monitoring and asset management platform',
    details: {
      overview:
        "Starsight Energy provides digital monitoring and asset management solutions for ACOB Lighting's energy infrastructure. Their cloud-based platform enables remote monitoring, data analytics, and performance optimization of distributed energy assets, improving operational efficiency and reducing downtime.",
      partnershipType: 'Technology Partnership',
      website: 'https://www.starsight.energy',
    },
  },
];
