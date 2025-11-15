export interface Product {
  id: string;
  name: string;
  category: 'solar-panels' | 'inverters' | 'batteries' | 'accessories';
  description: string;
  specifications: {
    label: string;
    value: string;
  }[];
  features: string[];
  image: string;
  warranty: string;
  applications: string[];
}

export const productsData: Product[] = [
  // Solar Panels
  {
    id: 'monocrystalline-550w',
    name: 'Monocrystalline Solar Panel 550W',
    category: 'solar-panels',
    description:
      'High-efficiency monocrystalline solar panel with exceptional performance in low-light conditions. Perfect for residential and commercial installations.',
    specifications: [
      { label: 'Power Output', value: '550W' },
      { label: 'Efficiency', value: '21.5%' },
      { label: 'Cell Type', value: 'Monocrystalline PERC' },
      { label: 'Dimensions', value: '2278mm x 1134mm x 35mm' },
      { label: 'Weight', value: '28.5 kg' },
      { label: 'Max System Voltage', value: '1500V DC' },
      { label: 'Operating Temperature', value: '-40°C to +85°C' },
      { label: 'Frame', value: 'Anodized Aluminum Alloy' },
    ],
    features: [
      'High conversion efficiency up to 21.5%',
      'Excellent performance in low-light conditions',
      'Anti-reflective coating for maximum light absorption',
      'Resistant to harsh weather conditions',
      'PID resistant for long-term reliability',
      'Lower temperature coefficient for better performance',
    ],
    image: '/images/products/solar-panel-mono.webp',
    warranty: '25 years performance warranty, 12 years product warranty',
    applications: [
      'Residential rooftop systems',
      'Commercial installations',
      'Off-grid power systems',
      'Grid-tied systems',
    ],
  },
  {
    id: 'polycrystalline-450w',
    name: 'Polycrystalline Solar Panel 450W',
    category: 'solar-panels',
    description:
      'Cost-effective polycrystalline solar panel ideal for large-scale installations. Reliable performance with excellent value for money.',
    specifications: [
      { label: 'Power Output', value: '450W' },
      { label: 'Efficiency', value: '18.5%' },
      { label: 'Cell Type', value: 'Polycrystalline' },
      { label: 'Dimensions', value: '2094mm x 1038mm x 35mm' },
      { label: 'Weight', value: '24.5 kg' },
      { label: 'Max System Voltage', value: '1000V DC' },
      { label: 'Operating Temperature', value: '-40°C to +85°C' },
      { label: 'Frame', value: 'Anodized Aluminum Alloy' },
    ],
    features: [
      'High quality at competitive price',
      'Robust construction for durability',
      'Good performance in diverse weather conditions',
      'Easy installation and maintenance',
      'Certified to international standards',
    ],
    image: '/images/products/solar-panel-poly.webp',
    warranty: '25 years performance warranty, 10 years product warranty',
    applications: [
      'Large-scale commercial projects',
      'Industrial installations',
      'Mini-grid systems',
      'Agricultural applications',
    ],
  },

  // Inverters
  {
    id: 'hybrid-inverter-10kw',
    name: 'Hybrid Solar Inverter 10kW',
    category: 'inverters',
    description:
      'Advanced hybrid inverter with battery storage capability. Seamlessly switches between grid, solar, and battery power for uninterrupted energy supply.',
    specifications: [
      { label: 'Power Rating', value: '10kW' },
      { label: 'Input Voltage (DC)', value: '120V-500V' },
      { label: 'Output Voltage (AC)', value: '220V/230V' },
      { label: 'Efficiency', value: '97.6%' },
      { label: 'MPPT Trackers', value: '2' },
      { label: 'Battery Voltage Range', value: '48V DC' },
      { label: 'Display', value: 'LCD Touch Screen' },
      { label: 'Protection', value: 'IP65' },
    ],
    features: [
      'Dual MPPT for maximum solar energy harvest',
      'Built-in battery management system',
      'Smart load management',
      'Remote monitoring via WiFi/Mobile app',
      'Automatic grid/solar/battery switching',
      'Parallel operation support up to 6 units',
    ],
    image: '/images/products/hybrid-inverter.webp',
    warranty: '5 years standard warranty, extendable to 10 years',
    applications: [
      'Residential backup systems',
      'Commercial applications',
      'Hybrid solar systems',
      'Off-grid with battery storage',
    ],
  },
  {
    id: 'string-inverter-50kw',
    name: 'String Inverter 50kW',
    category: 'inverters',
    description:
      'High-power string inverter designed for commercial and industrial applications. Superior efficiency with advanced grid support features.',
    specifications: [
      { label: 'Power Rating', value: '50kW' },
      { label: 'Input Voltage (DC)', value: '200V-1000V' },
      { label: 'Output Voltage (AC)', value: '3-Phase 400V' },
      { label: 'Efficiency', value: '98.5%' },
      { label: 'MPPT Trackers', value: '4' },
      { label: 'Max Input Current', value: '40A per MPPT' },
      { label: 'Communication', value: 'RS485, Ethernet, WiFi' },
      { label: 'Protection', value: 'IP65' },
    ],
    features: [
      'Industry-leading 98.5% efficiency',
      'Four independent MPPT trackers',
      'Active and reactive power control',
      'Advanced grid support functions',
      'Integrated DC switch',
      'Real-time monitoring and diagnostics',
    ],
    image: '/images/products/string-inverter.webp',
    warranty: '5 years standard warranty, extendable to 20 years',
    applications: [
      'Commercial rooftop systems',
      'Industrial installations',
      'Large-scale solar farms',
      'Grid-tied applications',
    ],
  },

  // Batteries
  {
    id: 'lithium-battery-5kwh',
    name: 'Lithium Iron Phosphate Battery 5kWh',
    category: 'batteries',
    description:
      'Long-lasting LiFePO4 battery with superior safety and cycle life. Modular design allows easy expansion for increased storage capacity.',
    specifications: [
      { label: 'Capacity', value: '5kWh (100Ah)' },
      { label: 'Voltage', value: '51.2V' },
      { label: 'Chemistry', value: 'LiFePO4 (Lithium Iron Phosphate)' },
      { label: 'Cycle Life', value: '6000+ cycles @80% DOD' },
      { label: 'Charge/Discharge Rate', value: '1C' },
      { label: 'Operating Temperature', value: '-10°C to +50°C' },
      { label: 'Protection Rating', value: 'IP54' },
      { label: 'Weight', value: '45 kg' },
    ],
    features: [
      'Ultra-long cycle life (6000+ cycles)',
      'High safety with built-in BMS',
      'Modular and stackable design',
      'Wide temperature operating range',
      'Maintenance-free operation',
      'Compatible with most hybrid inverters',
    ],
    image: '/images/products/lithium-battery.webp',
    warranty: '10 years or 6000 cycles warranty',
    applications: [
      'Residential energy storage',
      'Off-grid solar systems',
      'Backup power systems',
      'Peak shaving applications',
    ],
  },
  {
    id: 'gel-battery-200ah',
    name: 'Deep Cycle Gel Battery 200Ah',
    category: 'batteries',
    description:
      'Maintenance-free gel battery with excellent deep discharge recovery. Ideal for daily cycling applications in solar energy systems.',
    specifications: [
      { label: 'Capacity', value: '200Ah @ C10' },
      { label: 'Voltage', value: '12V' },
      { label: 'Chemistry', value: 'Gel (VRLA)' },
      { label: 'Cycle Life', value: '1200 cycles @50% DOD' },
      { label: 'Operating Temperature', value: '-15°C to +50°C' },
      { label: 'Self-Discharge', value: '<3% per month @ 25°C' },
      { label: 'Dimensions', value: '522mm x 238mm x 218mm' },
      { label: 'Weight', value: '62 kg' },
    ],
    features: [
      'Maintenance-free (sealed construction)',
      'Excellent deep discharge recovery',
      'Low self-discharge rate',
      'Spill-proof and leak-proof design',
      'Vibration and shock resistant',
      'Long service life in cycling applications',
    ],
    image: '/images/products/gel-battery.webp',
    warranty: '3 years warranty',
    applications: [
      'Solar energy storage',
      'Backup power systems',
      'Telecommunications',
      'Off-grid installations',
    ],
  },

  // Accessories
  {
    id: 'solar-mounting-system',
    name: 'Aluminum Solar Mounting System',
    category: 'accessories',
    description:
      'Durable aluminum mounting structure for rooftop solar installations. Pre-assembled components for quick and easy installation.',
    specifications: [
      { label: 'Material', value: 'Anodized Aluminum AL6005-T5' },
      { label: 'Panel Capacity', value: 'Up to 30 panels' },
      { label: 'Tilt Angle', value: '10-30° adjustable' },
      { label: 'Wind Load', value: 'Up to 60 m/s' },
      { label: 'Snow Load', value: 'Up to 2.0 kN/m²' },
      { label: 'Roof Type', value: 'Tin, Concrete, Tile' },
      { label: 'Corrosion Resistance', value: 'C5-M (Marine Grade)' },
    ],
    features: [
      'Pre-assembled for fast installation',
      'Corrosion-resistant aluminum construction',
      'Adjustable tilt angle for optimal performance',
      'Compatible with all standard panel sizes',
      'Certified to international standards',
      'Includes all necessary hardware',
    ],
    image: '/images/products/mounting-system.webp',
    warranty: '15 years structural warranty',
    applications: [
      'Rooftop installations',
      'Ground-mounted systems',
      'Carport structures',
      'Commercial buildings',
    ],
  },
  {
    id: 'solar-cable-kit',
    name: 'Solar Cable and Connector Kit',
    category: 'accessories',
    description:
      'High-quality UV-resistant solar cables with MC4 connectors. Designed for outdoor use with excellent weather resistance.',
    specifications: [
      { label: 'Cable Size', value: '4mm² (12 AWG)' },
      { label: 'Conductor', value: 'Tinned Copper' },
      { label: 'Insulation', value: 'XLPE (Cross-linked Polyethylene)' },
      { label: 'Voltage Rating', value: '1000V DC / 600V AC' },
      { label: 'Temperature Range', value: '-40°C to +90°C' },
      { label: 'UV Resistance', value: 'Yes' },
      { label: 'Connector Type', value: 'MC4' },
      { label: 'Length Options', value: '10m, 20m, 50m, 100m' },
    ],
    features: [
      'UV and weather resistant',
      'TUV certified MC4 connectors',
      'Low voltage drop',
      'Flame retardant insulation',
      'Easy to install and maintain',
      'Compatible with all solar panels',
    ],
    image: '/images/products/solar-cable.webp',
    warranty: '10 years warranty',
    applications: [
      'Solar panel connections',
      'String wiring',
      'Array to inverter connections',
      'All outdoor solar applications',
    ],
  },
];

export const productCategories = [
  {
    id: 'solar-panels',
    name: 'Solar Panels',
    description: 'High-efficiency photovoltaic panels for all applications',
    icon: 'Sun',
  },
  {
    id: 'inverters',
    name: 'Inverters',
    description: 'Advanced power conversion systems',
    icon: 'Zap',
  },
  {
    id: 'batteries',
    name: 'Batteries',
    description: 'Reliable energy storage solutions',
    icon: 'Battery',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Essential components and mounting systems',
    icon: 'Settings',
  },
];
