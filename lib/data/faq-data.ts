export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  // General Questions
  {
    question: 'What is solar energy and how does it work?',
    answer:
      "Solar energy is power derived from the sun's radiation. Solar panels (photovoltaic cells) convert sunlight directly into electricity through the photovoltaic effect. When sunlight hits the solar cells, it knocks electrons loose from their atoms, creating an electrical current that can power homes, businesses, and other applications.",
    category: 'General',
  },
  {
    question: 'Why should I invest in solar energy in Nigeria?',
    answer:
      'Nigeria receives abundant sunlight year-round, making solar energy highly effective. Benefits include: reduced electricity bills, protection against grid power outages, long-term cost savings (25+ years), environmental benefits, increased property value, and energy independence. With frequent grid failures, solar provides reliable backup power.',
    category: 'General',
  },
  {
    question: 'How long do solar panels last?',
    answer:
      'Quality solar panels typically last 25-30 years or more. Most manufacturers provide a 25-year performance warranty, guaranteeing at least 80% efficiency after 25 years. The panels continue to produce electricity beyond this period, though at slightly reduced efficiency. Other system components like inverters may need replacement after 10-15 years.',
    category: 'General',
  },

  // Installation
  {
    question: 'How long does it take to install a solar system?',
    answer:
      'Installation time depends on system size. For residential systems (3-10kW), installation typically takes 2-5 days. Commercial systems (20-100kW) may take 1-3 weeks. This includes mounting, wiring, inverter installation, and system testing. Proper site assessment and design happen before installation begins.',
    category: 'Installation',
  },
  {
    question: 'Do I need permission to install solar panels on my roof?',
    answer:
      "For most residential installations in Nigeria, you don't need special permits for rooftop solar. However, for grid-tied systems, you'll need approval from your electricity distribution company (DISCO). Commercial installations may require building permits. ACOB Lighting handles all necessary paperwork and approvals.",
    category: 'Installation',
  },
  {
    question: 'What type of roof is best for solar panels?',
    answer:
      'Solar panels can be installed on most roof types including metal sheets, concrete slabs, and tiles. The key requirements are: structurally sound roof that can support the weight (typically 15-20 kg per panel), minimal shading, and sufficient space. South-facing roofs with 10-30° tilt are optimal in Nigeria, but east-west orientations also work well.',
    category: 'Installation',
  },
  {
    question: 'Can solar panels be installed on the ground?',
    answer:
      'Yes, ground-mounted systems are an excellent alternative when roofs are unsuitable. They offer advantages like easier maintenance, optimal tilt angle adjustment, and better cooling (improving efficiency). Ground mounts require adequate land space and secure fencing to prevent theft or damage.',
    category: 'Installation',
  },

  // Cost & Savings
  {
    question: 'How much does a solar system cost in Nigeria?',
    answer:
      'Costs vary by system size and components. A typical 5kW residential system (suitable for average Nigerian homes) costs ₦3-5 million. Commercial systems (50kW+) range from ₦25-50 million. Factors affecting cost include: panel quality, battery storage capacity, inverter type, and installation complexity. We provide free customized quotes based on your specific needs.',
    category: 'Cost & Savings',
  },
  {
    question: 'How much can I save on electricity bills?',
    answer:
      "Savings depend on your current electricity consumption and system size. Most clients see 70-100% reduction in grid electricity costs. A properly sized system typically pays for itself in 4-7 years through savings. With Nigeria's rising electricity tariffs and fuel costs, the payback period is getting shorter.",
    category: 'Cost & Savings',
  },
  {
    question: 'Are there financing options available?',
    answer:
      'Yes, we work with several financing partners offering payment plans for solar installations. Options include: bank loans, asset financing, lease-to-own programs, and installment plans. Some organizations offer special renewable energy loans with competitive interest rates. Contact us to discuss financing options suitable for your situation.',
    category: 'Cost & Savings',
  },
  {
    question: 'Is battery storage necessary?',
    answer:
      'Battery storage is optional for grid-tied systems but highly recommended in Nigeria due to unreliable grid power. Batteries store excess solar energy for use at night or during outages, providing true energy independence. For off-grid systems, batteries are essential. The battery capacity needed depends on your nighttime power consumption and desired backup duration.',
    category: 'Cost & Savings',
  },

  // System Performance
  {
    question: 'Will solar panels work on cloudy days?',
    answer:
      "Yes, solar panels still generate electricity on cloudy days, though at reduced capacity (typically 10-25% of peak output). Nigeria's tropical climate provides strong sunlight most of the year. Even on overcast days, diffused sunlight produces usable power. Battery storage systems ensure continuous power supply regardless of weather.",
    category: 'System Performance',
  },
  {
    question: 'How much electricity can a solar panel generate?',
    answer:
      "In Nigeria's climate, a 550W solar panel typically generates 2.0-2.5 kWh per day (depending on location and season). A 5kW system (9 panels) produces about 18-22 kWh daily, enough for an average household. Performance varies by: panel orientation, shading, dust accumulation, and temperature.",
    category: 'System Performance',
  },
  {
    question: 'What happens during power outages?',
    answer:
      'If you have a hybrid system with battery storage, your solar system continues providing power during grid outages seamlessly. The system automatically switches to battery power within milliseconds. Without batteries, grid-tied systems automatically shut down during outages for safety reasons (to protect utility workers).',
    category: 'System Performance',
  },
  {
    question: 'Can I expand my solar system later?',
    answer:
      'Yes, properly designed systems can be expanded. When planning your initial installation, we consider future expansion needs. You can add more panels (if inverter capacity allows), upgrade to a larger inverter, or add more battery storage. Modular system design makes expansion straightforward and cost-effective.',
    category: 'System Performance',
  },

  // Maintenance
  {
    question: 'How do I maintain my solar panels?',
    answer:
      'Solar systems require minimal maintenance. Key tasks include: cleaning panels 2-4 times yearly (more in dusty areas), checking connections annually, monitoring system performance, and trimming nearby trees if they create shade. Most maintenance involves keeping panels clean - rain naturally cleans panels, but manual cleaning with water and soft cloth improves efficiency in dry seasons.',
    category: 'Maintenance',
  },
  {
    question: 'What warranty coverage is provided?',
    answer:
      'ACOB Lighting provides comprehensive warranties: Solar panels - 25 years performance warranty (minimum 80% efficiency) and 12 years product warranty. Inverters - 5-10 years (extendable). Batteries - 5-10 years depending on type. Installation workmanship - 2 years. We also offer extended warranty options and maintenance packages.',
    category: 'Maintenance',
  },
  {
    question: 'What if something breaks or stops working?',
    answer:
      'ACOB Lighting provides ongoing support. We offer 24/7 monitoring for commercial systems and responsive service for all clients. Common issues are diagnosed remotely. If on-site service is needed, our technical team responds promptly. Warranty coverage handles defective components. We stock spare parts for quick replacements.',
    category: 'Maintenance',
  },

  // Technical
  {
    question: "What's the difference between on-grid and off-grid systems?",
    answer:
      "On-grid (grid-tied) systems connect to the utility grid, allowing you to sell excess power and draw grid power when needed. They don't work during outages unless paired with batteries. Off-grid systems are completely independent, relying solely on solar and batteries. Hybrid systems combine both, offering grid connection with battery backup - most popular in Nigeria due to unreliable grid power.",
    category: 'Technical',
  },
  {
    question: 'What size system do I need?',
    answer:
      'System size depends on your electricity consumption. To calculate: review your monthly kWh usage on electricity bills, identify peak usage periods, decide on battery backup hours needed, and consider future consumption growth. A typical Nigerian home uses 10-20 kWh daily, requiring a 3-7kW system. We provide free load assessments and system sizing.',
    category: 'Technical',
  },
  {
    question: 'Can I run air conditioning on solar power?',
    answer:
      "Yes, but AC units consume significant power (1-2.5kW per unit). A 5kW system can run 1-2 AC units along with other appliances during the day. For continuous AC operation including nighttime, you'll need adequate battery storage. We recommend energy-efficient inverter AC units for solar systems, which consume 40-60% less power than standard units.",
    category: 'Technical',
  },
  {
    question:
      "What's the difference between monocrystalline and polycrystalline panels?",
    answer:
      'Monocrystalline panels are more efficient (20-22%) and perform better in low light, but cost slightly more. They have a uniform black appearance. Polycrystalline panels (17-19% efficiency) are more affordable with a blue speckled appearance. Both last 25+ years. For limited roof space, monocrystalline is better. For ample space and budget constraints, polycrystalline offers great value.',
    category: 'Technical',
  },
];

export const faqCategories = [
  'General',
  'Installation',
  'Cost & Savings',
  'System Performance',
  'Maintenance',
  'Technical',
];
