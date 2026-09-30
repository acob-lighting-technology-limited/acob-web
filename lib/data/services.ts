export interface ServiceData {
  id: string;
  title: string;
  slug: string;
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
    title: 'Rural Mini-Grid Utilities',
    slug: 'mini-grid-solutions',
    excerpt:
      'Build resilient off-grid utility networks that power rural economies, households, and local industries with clean, 24/7 solar hybrid electricity.',
    description:
      'Our Rural Mini-Grid utility solutions deploy complete, decentralized, and scalable power grids to off-grid communities across Nigeria, serving over 10,000 households to date. These utility-grade projects combine high-capacity solar arrays, intelligent lithium battery energy storage systems (BESS), and automated diesel generators to guarantee reliable 24/7 power. Each installation features a smart distribution network with remote prepaid metering, enabling local consumers to pay only for the electricity they consume. Our approach fosters immediate local economic growth by powering small enterprises, agricultural agro-processing facilities, health clinics, and educational hubs.\n\nWe have successfully designed, built, and commissioned major mini-grid utilities including:\n• Umaisha Community: Deployed a 350 kWp Hybrid Solar Mini-Grid Project, Nasarawa State.\n• Musha Community: Deployed a 150 kWp Hybrid Solar Mini-Grid Project, Nasarawa State.\n• Oloyan Community: Deployed a 100 kWp Hybrid Solar Mini-Grid Project, Edo State.\n• Otu-Costain Community: Deployed a 70 kWp Hybrid Solar Mini-Grid Project, Ondo State.\n• Sule Aba-panu Community: Deployed a 60 kWp Hybrid Solar Mini-Grid Project, Edo State.',
    image:
      'https://cdn.sanity.io/images/x16t7huo/production/018bb1beb5de6f9fb5d58137ccfbca9d7a3f8b0a-2560x1920.jpg',
    icon: 'Zap',
    features: [
      'Utility-grade solar hybrid systems',
      'Integrated BESS (Battery Energy Storage Systems)',
      'Prepaid smart meters and cellular billing',
      '24/7 automated generation control',
      'Grid-ready distribution lines and hardware',
    ],
    benefits: [
      'Uninterrupted 24/7 electricity supply',
      'Up to 60% reduction in local energy expenses',
      'Displacement of noisy, high-polluting petrol generators',
      'Rapid stimulation of community-level businesses',
      'Improved local security and evening streetlighting',
    ],
    applications: [
      'Rural agricultural communities',
      'Off-grid commercial markets and hubs',
      'Community health centers and clinics',
      'Rural schools and training centers',
      'Processing workshops and mills',
    ],
    whyChooseUs: [
      'Over 10 years of pioneering mini-grid experience',
      '100% success rate across more than 22 rural communities',
      'Local grid developers with full regulatory clearance',
      'Decade-long operations, support, and community engagement',
      'Development-first financing partnerships',
    ],
    gallery: [
      'https://cdn.sanity.io/images/x16t7huo/production/018bb1beb5de6f9fb5d58137ccfbca9d7a3f8b0a-2560x1920.jpg',
      'https://cdn.sanity.io/images/x16t7huo/production/f6976f4f45f13a27a6857c4c9b0459551cdd8727-2560x1920.jpg',
      'https://cdn.sanity.io/images/x16t7huo/production/78c9b96b92703a4fda1842f005c917de09bdfa9f-2560x2393.jpg',
      'https://cdn.sanity.io/images/x16t7huo/production/c2b14dd9c302398a18beed3372122336c0513ae4-1536x1024.jpg',
    ],
    category: 'Power Solutions',
  },
  {
    id: 'captive-power-solutions',
    title: 'Commercial & Industrial Captive Solar',
    slug: 'captive-power-solutions',
    excerpt:
      'Optimize your operational bottom line and achieve energy independence with custom-engineered solar hybrid installations for businesses, schools, and offices.',
    description:
      'ACOB engineers and installs custom captive power systems that offer absolute energy security and cost optimization for commercial and industrial clients. Our solutions combine premium-tier solar PV modules, top-grade commercial inverters, and high-safety battery chemistry to deliver clean, independent electricity. By shifting away from unreliable grid supply and expensive diesel generators, our captive plants cut operational energy expenses by up to 70%. We provide complete turnkey systems, from structural and electrical engineering to procurement, installation, grid-sync, and net-metering integration.\n\nWe have successfully completed major commercial captive solar projects including:\n• AfDB Headquarters: Deployed a 100 kWp Solar Hybrid System with 614 kWh Battery Project, FCT.\n• Starsight Utility: Deployed Solar Hybrid Systems Project for bank branches across Nigeria.\n• Zamine Suite: Deployed a 50 kWp Captive Power Solution Project, Kano State.\n• FCMB Bank: Deployed a 20.7 kWp Captive Power Solution Project, FCT.\n• Premium Solar Home: Deployed an 8.5 kWp Premium Solar Home Installation Project in Gwarinpa, FCT.',
    image: '/images/services/captive-power-solutions.webp',
    icon: 'Lightbulb',
    features: [
      'Custom load-profile engineered systems',
      'Commercial-grade lithium energy storage',
      'Advanced grid-tie and zero-export controllers',
      'Seamless generator-solar synchronization',
      'Sleek structural panel mounts and safety breakers',
    ],
    benefits: [
      'Up to 70% savings on diesel and utility bills',
      'Protection against utility grid tariff hikes',
      '99.9% uptime for commercial operations and servers',
      'Enhanced corporate ESG and carbon reporting',
      '25+ year operational lifespan with fast ROI payback',
    ],
    applications: [
      'Corporate offices and financial institutions',
      'Commercial complexes and shopping malls',
      'Private schools and university campuses',
      'Industrial factories and warehouses',
      'Premium residential estates',
    ],
    whyChooseUs: [
      'Certified commercial electrical engineers',
      'Tier-1 procurement partnerships guaranteeing warranties',
      'Zero-interruption installations during work hours',
      'Robust preventive maintenance contracts',
      'Flexible capital expenditure (CAPEX) or leasing options',
    ],
    gallery: [
      '/images/services/captive-power-solutions.webp',
      'https://cdn.sanity.io/images/x16t7huo/production/a9940871fa5b8764700a2336ae56b81ef8839edd-421x383.jpg',
      'https://cdn.sanity.io/images/x16t7huo/production/2225c6206d34705a32bf448cf9154be006f833ab-492x565.jpg',
    ],
    category: 'Power Solutions',
  },
  {
    id: 'healthcare-solarization',
    title: 'Healthcare Solarization & Infrastructure',
    slug: 'healthcare-solarization',
    excerpt:
      'Deploy clinical-grade, high-availability solar power and battery storage (BESS) systems to guarantee uninterrupted 24/7 care in critical hospital wards.',
    description:
      'Our Healthcare Solarization services design and install clinical-grade solar systems specifically optimized for critical medical facilities, primary health centers, and referral hospitals. Working in partnership with the Rural Electrification Agency (REA) and backed by the World Bank, we provide reliable, silent electricity to power life-saving equipment. Our healthcare systems integrate high-performance energy storage (BESS) to guarantee 99%+ system uptime, specifically targeting critical operational zones including operating rooms, neonatal wards, emergency units, laboratories, and vaccine cold chain storage.\n\nWe have successfully completed major healthcare infrastructure projects including:\n• Aminu Kano Teaching Hospital: Deployed a 50 kWp Solar + 192 kWh Battery Backup System, Kano State.\n• Rasheed Shekoni Specialist Hospital: Deployed a 50 kWp Solar + 192 kWh Battery Backup System, Jigawa State.\n• Dawakin Tofa General Hospital: Deployed a 50 kWp Solar Hybrid Installation, Kano State.\n• Babura General Hospital: Deployed a 50 kWp Solar Hybrid Installation, Jigawa State.\n• Sir Mohammed Sanusi Hospital: Deployed a 50 kWp Solar Hybrid Installation, Kano State.\n• Hadejia General Hospital: Deployed a 50 kWp Solar Hybrid Installation, Jigawa State.',
    image:
      'https://cdn.sanity.io/images/x16t7huo/production/132acb23a362701e189a94a41ef0e00c6873a7cf-1920x1440.webp',
    icon: 'Heart',
    features: [
      'Clinical-grade solar PV installations',
      'High-safety hospital lithium battery banks',
      'Integrated solar vaccine refrigerator setups',
      'Dedicated backup circuits for surgical and ICU wards',
      'Real-time status monitoring for hospital boards',
    ],
    benefits: [
      'Zero-blackout safety for critical surgeries and ICUs',
      'Sustained cold-chain vaccine preservation',
      'Massive reductions in hospital diesel expenses',
      'Zero-noise clean operations for recovering patients',
      'Stronger primary and maternal healthcare delivery',
    ],
    applications: [
      'State and General Hospitals',
      'Federal Teaching and Specialist Hospitals',
      'Primary Health Care Centers (PHCs)',
      'Private clinics and diagnostic labs',
      'Medical cold rooms and blood banks',
    ],
    whyChooseUs: [
      'Proven experience solarizing 12+ public hospitals',
      'Strict adherence to healthcare electrical standards',
      'Rapid deployment across multiple zonal territories',
      'Long-term operations and technical service agreements',
    ],
    gallery: [
      'https://cdn.sanity.io/images/x16t7huo/production/132acb23a362701e189a94a41ef0e00c6873a7cf-1920x1440.webp',
    ],
    category: 'Power Solutions',
  },
  {
    id: 'productive-use-of-energy',
    title: 'Productive Use of Energy (PUE)',
    slug: 'productive-use-of-energy',
    excerpt:
      'Accelerate agricultural yields and clean transport networks with solar-powered irrigation, EV charging hubs, and agro-processing milling utilities.',
    description:
      'ACOB’s Productive Use of Energy (PUE) services deploy specialized, income-generating clean energy assets that directly stimulate local commerce, agriculture, and transit. Rather than basic lighting, our PUE division implements high-efficiency equipment powered by solar. This includes advanced solar-powered irrigation systems that extend farming seasons, EV charging grids that support clean logistics, and community agro-processing infrastructure. By providing reliable clean energy for economic work, we enable farmers, businesses, and transit operators to multiply their output while drastically reducing fuel overheads.\n\nWe have successfully completed major PUE projects including:\n• Adebayo Palm Oil Milling Station: Deployed a solar-powered milling facility that powers agricultural production and palm oil processing.\n• MST Sites 1,150 kWp Solar Hybrid Systems: Deployed across 5 Minimum Subsidy Tender sites and 1 Interconnected Mini Grid in Nasarawa State, powering local agricultural and enterprise hubs.',
    image:
      'https://cdn.sanity.io/images/x16t7huo/production/dfaf14c65a6b54fb550bb9b78f981aa9cc723f7a-810x1080.jpg',
    icon: 'Battery',
    features: [
      'High-yield solar-powered water pumping',
      'Electric vehicle (EV) fleet charging grids',
      'Agro-processing solar motor connections',
      'Smart PAYG (Pay-As-You-Go) business assets',
      'Optimized thermal and cooling storage units',
    ],
    benefits: [
      'Increased crop yields and food security year-round',
      'Dramatically lowered operational cost for agro-businesses',
      'Clean fuel cost savings for logistics and transport operators',
      'Local economic enablement and rural industrialization',
      'Creation of premium enterprise jobs in host communities',
    ],
    applications: [
      'Agribusinesses and smallholder farming collectives',
      'Rural and suburban enterprise clusters',
      'EV logistics depots and transit nodes',
      'Agro-processing sites (milling, drying, cooling)',
      'Community clean-water utility systems',
    ],
    whyChooseUs: [
      'Pioneers of PUE deployments in rural Nigeria',
      'Integrated commercial and agricultural technical skillsets',
      'Robust equipment tailored for tough environmental duties',
      'Strong institutional partnerships with REA and donors',
    ],
    gallery: [
      'https://cdn.sanity.io/images/x16t7huo/production/dfaf14c65a6b54fb550bb9b78f981aa9cc723f7a-810x1080.jpg',
    ],
    category: 'Power Solutions',
  },
  {
    id: 'professional-energy-audit',
    title: 'Commercial Energy Auditing & Optimization',
    slug: 'professional-energy-audit',
    excerpt:
      'Uncover operational inefficiencies and identify high-ROI clean energy transition pathways through certified utility audits.',
    description:
      "ACOB's certified energy auditing services conduct comprehensive, physics-based assessments of facility energy utilization to pinpoint energy waste and design optimization strategies. Our expert auditors utilize advanced thermal cameras, electrical load loggers, and modeling tools to evaluate HVAC, heavy machinery, lighting networks, and building envelopes. We provide granular reports showing consumption profiles, benchmarking performance against international ISO standards, and highlighting concrete upgrade measures. Each report features detailed financial analyses including CAPEX, OPEX reduction, and net payback periods, allowing clients to confidently execute energy conservation projects that typically yield 20% to 40% immediate savings.",
    image: '/images/services/professional-energy-audit.webp',
    icon: 'BarChart3',
    features: [
      'Certified thermal imaging and envelope audits',
      'Detailed electrical load logging and harmonics testing',
      'Facility utility benchmarking and compliance checks',
      'Investment-grade financial payback modeling',
      'Post-implementation savings verification services',
    ],
    benefits: [
      'Immediate identification of 20-40% energy waste',
      'Fact-based specifications for solar/hybrid system sizing',
      'Improved power factor and reduced electrical strain',
      'Compliance with local and national energy codes',
      'Optimized operational expenditure (OPEX) margins',
    ],
    applications: [
      'Commercial office complexes and high-rises',
      'Industrial factories and food processors',
      'Public health institutions and government sites',
      'Suburban estates and large residential compounds',
      'Municipal public lighting systems',
    ],
    whyChooseUs: [
      'Certified Energy Managers and expert auditors',
      'High-precision logging and diagnostics toolkit',
      'Unbiased, technology-agnostic optimization advice',
      'Proven engineering design support for identified updates',
    ],
    gallery: ['/images/services/professional-energy-audit.webp'],
    category: 'Power Solutions',
  },
  {
    id: 'streetlighting-infrastructure',
    title: 'Smart Streetlighting Infrastructure',
    slug: 'streetlighting-infrastructure',
    excerpt:
      'Design and install smart solar LED streetlights that improve public safety, lower municipal costs, and operate maintenance-free for over a decade.',
    description:
      'ACOB engineers, deploys, and commissions intelligent, high-density solar streetlighting systems that illuminate communities while zeroing fuel and utility charges. Our streetlighting units feature state-of-the-art monocrystalline solar panels, high-efficiency LEDs, integrated lithium battery storage, and smart micro-controllers. These systems automatically dim during low-activity periods and brighten as vehicles or pedestrians approach, maximizing battery longevity. Every pole is built with high-durability, anti-corrosive structural elements designed to withstand harsh weather, dust, and coastal moisture, delivering 10+ years of maintenance-free service.\n\nWe have successfully completed major streetlighting projects including:\n• Kogi State Government House: Deployed High-Density LED Streetlight Infrastructure in Lokoja, Kogi State.\n• Stella Obasanjo Way: Deployed High-Density LED Streetlight Infrastructure along Stella Obasanjo Way in Lokoja, Kogi State.\n• Akwanga World Bank Project: Procured and installed 418 solar-powered streetlights across 11 locations in Akwanga Local Government and Loko Ward in Nasarawa State.\n• Regional Pilot Project: Deployed High-Density LED Pilot AC Streetlight Infrastructure across Delta, Ogun, Cross River, Akwa Ibom, and Lagos states.',
    image:
      '/images/services/streetlighting-infrastructure-project-development.webp',
    icon: 'Wrench',
    features: [
      'Fully integrated monocrystalline solar LED poles',
      'Anti-corrosive, wind-rated steel structures',
      'Long-life lithium energy packs built into light fixtures',
      'Smart adaptive dimming and dawn-to-dusk control',
      'Optional central remote management and status reporting',
    ],
    benefits: [
      '100% reduction in public lighting fuel and electric bills',
      'Improved nocturnal security and commercial activity',
      'Substantially reduced roadside vehicular accident rates',
      'Extremely low lifecycle maintenance overheads',
      'Clean, aesthetic addition to modern urban environments',
    ],
    applications: [
      'Urban arterial roads and municipal expressways',
      'Residential streets and estate inner roads',
      'Industrial zones and commercial parking lots',
      'Rural community centers and public squares',
      'University campuses and campus pathways',
    ],
    whyChooseUs: [
      'Proven expertise completing large-scale public streetlighting',
      'World Bank and government-approved procurement standards',
      'Rigorous quality control ensuring 10+ year pole lifespans',
      'Highly professional nationwide installation crews',
    ],
    gallery: [
      '/images/services/streetlighting_1.webp',
      '/images/services/streetlighting_2.webp',
      '/images/services/streetlighting-1.webp',
      '/images/services/streetlighting-2.webp',
      '/images/services/streetlighting-3.webp',
    ],
    category: 'Power Solutions',
  },
  {
    id: 'operations-and-maintenance',
    title: 'Operations & Maintenance (O&M) Utilities',
    slug: 'operations-and-maintenance',
    excerpt:
      'Ensure 99%+ system uptime and maximize clean energy assets lifespan with 24/7 remote monitoring, preventive servicing, and emergency repairs.',
    description:
      'ACOB provides comprehensive, utility-grade Operations & Maintenance (O&M) services that secure renewable energy investments, ensure warranty compliance, and maximize power production. Using real-time SCADA and IoT sensor arrays, our central operations room monitors critical parameters of mini-grids, hospital systems, and commercial solar plants. Our field technicians carry out routine preventive servicing, panel cleaning, battery balancing, and diagnostic testing. Emergency dispatch teams are available 24/7 with fast response guarantees to rectify faults and limit downtime.\n\nWe have successfully completed routine maintenance projects including:\n• Airport Road Abuja: Routine and preventive maintenance on streetlight infrastructure along Airport Road, Abuja.\n• Bannex Round-About: Specialized maintenance on public lighting infrastructure along Bannex Round-About, Abuja.\n• Active Mini-Grid O&M: 24/7 remote monitoring and monthly physical checkups across our rural mini-grid stations to keep communities powered.',
    image: '/images/services/operations-maintenance.webp',
    icon: 'Shield',
    features: [
      '24/7 remote SCADA and IoT performance tracking',
      'Scheduled preventive cleaning and tightening visits',
      'Thermographic panel inspection and battery testing',
      'Rapid emergency dispatch with strict SLA terms',
      'Detailed monthly production and savings reporting',
    ],
    benefits: [
      'Guaranteed 99%+ system uptime and efficiency',
      'Extended service life of battery and inverter assets',
      'Assured validation of original component warranties',
      'Minimized risk of catastrophic electrical or fire events',
      'Transparent tracking of clean energy generation (kWh)',
    ],
    applications: [
      'Utility mini-grids and rural distribution networks',
      'Hospital and social infrastructure hybrid systems',
      'Commercial office and factory captive power plants',
      'Municipal public lighting and streetlighting layouts',
      'Private estate solar and battery configurations',
    ],
    whyChooseUs: [
      'Dedicated, certified clean-energy O&M technicians',
      'Fully equipped regional emergency service vehicles',
      'Pioneering remote monitoring infrastructure in Nigeria',
      'Customizable, SLA-backed service level agreements',
    ],
    gallery: ['/images/services/operations-maintenance.webp'],
    category: 'Power Solutions',
  },
];

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(service => service.slug === slug);
};

export const getServicesByCategory = (category: string): ServiceData[] => {
  return servicesData.filter(service => service.category === category);
};
