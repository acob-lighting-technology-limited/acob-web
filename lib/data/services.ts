export interface ServiceData {
    id: string
    title: string
    slug: string
    shortDescription: string
    fullDescription: string
    image: string
    icon: string
    features: string[]
    benefits: string[]
    applications: string[]
    whyChooseUs: string[]
    gallery: string[]
    category: string
  }
  
  export const servicesData: ServiceData[] = [
    {
      id: "mini-grid-solutions",
      title: "Mini-Grid Solutions",
      slug: "mini-grid-solutions",
      shortDescription:
        "ACOB provides minigrid solutions that serve a wide range of customers which include private households, commercial businesses such as shops, ice makers and mobile phone chargers, agricultural loads.",
      fullDescription:
        "Our mini-grid solutions are designed to provide reliable, sustainable power to communities and businesses. We specialize in solar-powered mini-grids that can operate independently or in conjunction with the main grid, ensuring continuous power supply even in remote areas.",
      image: "/images/olooji-community.jpg",
      icon: "/images/mini-grid-solutions.webp",
      features: [
        "Scalable power solutions for communities",
        "Hybrid solar and battery systems",
        "Smart grid management technology",
        "Remote monitoring capabilities",
        "Flexible payment systems",
      ],
      benefits: [
        "Reliable 24/7 power supply",
        "Reduced electricity costs",
        "Environmental sustainability",
        "Economic development for communities",
        "Job creation opportunities",
      ],
      applications: [
        "Rural communities",
        "Commercial establishments",
        "Agricultural facilities",
        "Healthcare centers",
        "Educational institutions",
      ],
      whyChooseUs: [
        "Over 10 years of experience in mini-grid development",
        "Proven track record with 100+ successful installations",
        "Local expertise and understanding of Nigerian market",
        "Comprehensive maintenance and support services",
        "Innovative financing solutions",
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      category: "Power Solutions",
    },
    {
      id: "captive-power-solutions",
      title: "Captive Power Solutions",
      slug: "captive-power-solutions",
      shortDescription:
        "ACOB provides Solar and Inverter system to residential customers, commercial customers and for public driven projects. For example, gas stations, banks, schools, business offices and other type of facilities/buildings that require reliable power.",
      fullDescription:
        "Our captive power solutions are tailored for businesses and institutions that require dedicated, reliable power supply. These systems are designed to reduce dependency on the national grid while providing cost-effective and sustainable energy solutions.",
      image: "/images/captive-power-solutions.webp",
      icon: "/images/captive-power-solutions.webp",
      features: [
        "Dedicated power systems for businesses",
        "Solar and battery hybrid solutions",
        "Grid-tie and off-grid options",
        "Load management systems",
        "Energy storage solutions",
      ],
      benefits: [
        "Reduced operational costs",
        "Energy independence",
        "Improved business continuity",
        "Environmental compliance",
        "Long-term cost savings",
      ],
      applications: [
        "Gas stations",
        "Banks and financial institutions",
        "Schools and universities",
        "Business offices",
        "Manufacturing facilities",
      ],
      whyChooseUs: [
        "Customized solutions for each client",
        "High-quality components and materials",
        "Professional installation and commissioning",
        "Ongoing maintenance and support",
        "Competitive pricing and financing options",
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      category: "Power Solutions",
    },
    {
      id: "professional-energy-audit",
      title: "Professional Energy Audit",
      slug: "professional-energy-audit",
      shortDescription:
        "Over the years, ACOB has built competence in Energy Audit for industries, residential buildings, offices and public lighting facilities.",
      fullDescription:
        "Our professional energy audit services help organizations identify energy inefficiencies and opportunities for cost savings. We provide comprehensive assessments and actionable recommendations to optimize energy consumption and reduce operational costs.",
      image: "/images/professional-energy-audit.webp",
      icon: "/images/professional-energy-audit.webp",
      features: [
        "Comprehensive energy assessments",
        "Detailed energy consumption analysis",
        "Cost-benefit analysis",
        "Customized recommendations",
        "Implementation support",
      ],
      benefits: [
        "Reduced energy costs",
        "Improved energy efficiency",
        "Environmental impact reduction",
        "Compliance with regulations",
        "Enhanced operational performance",
      ],
      applications: [
        "Industrial facilities",
        "Residential buildings",
        "Office complexes",
        "Public lighting systems",
        "Commercial establishments",
      ],
      whyChooseUs: [
        "Certified energy auditors",
        "Advanced measurement tools",
        "Detailed reporting and analysis",
        "Implementation guidance",
        "Follow-up support services",
      ],
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      category: "Consulting",
    },
    {
      id: "engineering-procurement-construction",
      title: "Engineering Procurement & Construction",
      slug: "engineering-procurement-construction",
      shortDescription:
        "Complete EPC services for solar power projects, from initial design through construction and commissioning.",
      fullDescription:
        "Our Engineering, Procurement, and Construction (EPC) services provide end-to-end solutions for solar power projects. We handle everything from initial feasibility studies and design through procurement, construction, and commissioning.",
      image: "/placeholder.svg?height=400&width=600",
      icon: "/placeholder.svg?height=80&width=80",
      features: [
        "Complete project management",
        "Engineering design and planning",
        "Equipment procurement",
        "Construction and installation",
        "Testing and commissioning",
      ],
      benefits: [
        "Single point of responsibility",
        "Reduced project risks",
        "Faster project delivery",
        "Quality assurance",
        "Cost optimization",
      ],
      applications: [
        "Utility-scale solar farms",
        "Commercial solar installations",
        "Industrial power systems",
        "Mini-grid projects",
        "Hybrid power systems",
      ],
      whyChooseUs: [
        "Experienced project management team",
        "Proven track record",
        "Quality materials and workmanship",
        "Timely project delivery",
        "Comprehensive warranties",
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      category: "Construction",
    },
    {
      id: "streetlighting-infrastructure",
      title: "Streetlighting Infrastructure Project Development",
      slug: "streetlighting-infrastructure",
      shortDescription:
        "Development and implementation of solar-powered streetlighting infrastructure for urban and rural areas.",
      fullDescription:
        "We specialize in the development of sustainable streetlighting infrastructure using solar technology. Our solutions improve public safety, reduce municipal costs, and contribute to environmental sustainability.",
      image: "/placeholder.svg?height=400&width=600",
      icon: "/placeholder.svg?height=80&width=80",
      features: [
        "Solar-powered LED streetlights",
        "Smart lighting controls",
        "Remote monitoring systems",
        "Weather-resistant designs",
        "Low maintenance requirements",
      ],
      benefits: [
        "Reduced electricity costs",
        "Improved public safety",
        "Environmental sustainability",
        "Low maintenance costs",
        "Enhanced community development",
      ],
      applications: [
        "Urban streets and highways",
        "Rural communities",
        "Parks and recreational areas",
        "Commercial districts",
        "Residential neighborhoods",
      ],
      whyChooseUs: [
        "Specialized streetlighting expertise",
        "High-quality LED technology",
        "Durable and weather-resistant systems",
        "Comprehensive maintenance services",
        "Proven installation experience",
      ],
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      category: "Infrastructure",
    },
  ]
  
  export const getServiceBySlug = (slug: string): ServiceData | undefined => {
    return servicesData.find((service) => service.slug === slug)
  }
  
  export const getServicesByCategory = (category: string): ServiceData[] => {
    return servicesData.filter((service) => service.category === category)
  }
  