export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'brochures' | 'specifications' | 'guides' | 'certifications';
  fileType: 'PDF' | 'DOC' | 'XLSX';
  fileSize: string;
  downloadUrl: string;
  icon: string;
  featured?: boolean;
}

export const resourcesData: Resource[] = [
  // Brochures
  {
    id: 'company-brochure',
    title: 'ACOB Lighting Company Brochure',
    description:
      'Comprehensive overview of our solar energy solutions, services, and completed projects across Nigeria.',
    category: 'brochures',
    fileType: 'PDF',
    fileSize: '4.2 MB',
    downloadUrl: '/downloads/brochures/acob-company-brochure.pdf',
    icon: 'Building2',
    featured: true,
  },
  {
    id: 'solar-panels-brochure',
    title: 'Solar Panels Product Catalog',
    description:
      'Detailed information on our range of monocrystalline and polycrystalline solar panels with specifications.',
    category: 'brochures',
    fileType: 'PDF',
    fileSize: '3.8 MB',
    downloadUrl: '/downloads/brochures/solar-panels-catalog.pdf',
    icon: 'Sun',
    featured: true,
  },
  {
    id: 'inverters-brochure',
    title: 'Inverters & Power Systems Brochure',
    description:
      'Complete guide to our hybrid, string, and micro inverters with technical specifications and applications.',
    category: 'brochures',
    fileType: 'PDF',
    fileSize: '2.9 MB',
    downloadUrl: '/downloads/brochures/inverters-brochure.pdf',
    icon: 'Zap',
  },
  {
    id: 'battery-storage-brochure',
    title: 'Energy Storage Solutions Brochure',
    description:
      'Overview of lithium-ion and gel battery options for residential and commercial applications.',
    category: 'brochures',
    fileType: 'PDF',
    fileSize: '2.5 MB',
    downloadUrl: '/downloads/brochures/battery-storage.pdf',
    icon: 'Battery',
  },

  // Technical Specifications
  {
    id: 'mono-550w-spec',
    title: 'Monocrystalline 550W Panel Datasheet',
    description:
      'Detailed technical specifications, performance curves, and mechanical data for 550W panels.',
    category: 'specifications',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    downloadUrl: '/downloads/specifications/mono-550w-datasheet.pdf',
    icon: 'FileText',
  },
  {
    id: 'hybrid-inverter-10kw-spec',
    title: '10kW Hybrid Inverter Specifications',
    description:
      'Complete technical data, wiring diagrams, and installation requirements for 10kW hybrid inverter.',
    category: 'specifications',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    downloadUrl: '/downloads/specifications/hybrid-10kw-spec.pdf',
    icon: 'FileText',
  },
  {
    id: 'lithium-battery-spec',
    title: 'LiFePO4 Battery System Specifications',
    description:
      'Technical documentation for lithium iron phosphate battery systems including BMS details.',
    category: 'specifications',
    fileType: 'PDF',
    fileSize: '1.5 MB',
    downloadUrl: '/downloads/specifications/lifepo4-battery-spec.pdf',
    icon: 'FileText',
  },

  // Installation & User Guides
  {
    id: 'installation-guide',
    title: 'Solar System Installation Guide',
    description:
      'Step-by-step installation procedures, safety guidelines, and commissioning checklist for solar systems.',
    category: 'guides',
    fileType: 'PDF',
    fileSize: '5.4 MB',
    downloadUrl: '/downloads/guides/installation-guide.pdf',
    icon: 'BookOpen',
    featured: true,
  },
  {
    id: 'maintenance-manual',
    title: 'Maintenance & Troubleshooting Manual',
    description:
      'Comprehensive guide for routine maintenance, common issues, and troubleshooting procedures.',
    category: 'guides',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    downloadUrl: '/downloads/guides/maintenance-manual.pdf',
    icon: 'BookOpen',
  },
  {
    id: 'sizing-calculator',
    title: 'Solar System Sizing Calculator',
    description:
      'Excel-based calculator to determine optimal system size based on energy consumption patterns.',
    category: 'guides',
    fileType: 'XLSX',
    fileSize: '850 KB',
    downloadUrl: '/downloads/guides/sizing-calculator.xlsx',
    icon: 'Calculator',
  },
  {
    id: 'roi-calculator',
    title: 'ROI & Payback Period Calculator',
    description:
      'Financial analysis tool to calculate return on investment and payback period for solar installations.',
    category: 'guides',
    fileType: 'XLSX',
    fileSize: '620 KB',
    downloadUrl: '/downloads/guides/roi-calculator.xlsx',
    icon: 'Calculator',
  },

  // Certifications & Compliance
  {
    id: 'iso-9001',
    title: 'ISO 9001:2015 Certification',
    description:
      'Quality Management System certification demonstrating our commitment to quality standards.',
    category: 'certifications',
    fileType: 'PDF',
    fileSize: '450 KB',
    downloadUrl: '/downloads/certifications/iso-9001.pdf',
    icon: 'Award',
    featured: true,
  },
  {
    id: 'iec-certificates',
    title: 'IEC Product Certifications',
    description:
      'International Electrotechnical Commission certifications for our solar products (IEC 61215, IEC 61730).',
    category: 'certifications',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    downloadUrl: '/downloads/certifications/iec-certificates.pdf',
    icon: 'Award',
  },
  {
    id: 'son-certification',
    title: 'SON Quality Mark Certification',
    description:
      'Standards Organisation of Nigeria certification for compliance with Nigerian quality standards.',
    category: 'certifications',
    fileType: 'PDF',
    fileSize: '520 KB',
    downloadUrl: '/downloads/certifications/son-certification.pdf',
    icon: 'Award',
  },
  {
    id: 'nerc-license',
    title: 'NERC Operating License',
    description:
      'Nigerian Electricity Regulatory Commission operating license for mini-grid operations.',
    category: 'certifications',
    fileType: 'PDF',
    fileSize: '380 KB',
    downloadUrl: '/downloads/certifications/nerc-license.pdf',
    icon: 'Award',
  },
];

export const resourceCategories = [
  {
    id: 'brochures',
    name: 'Product Brochures',
    description: 'Comprehensive product catalogs and company information',
    icon: 'BookOpen',
  },
  {
    id: 'specifications',
    name: 'Technical Specifications',
    description: 'Detailed datasheets and technical documentation',
    icon: 'FileText',
  },
  {
    id: 'guides',
    name: 'Installation & User Guides',
    description: 'Step-by-step guides and calculators',
    icon: 'BookOpen',
  },
  {
    id: 'certifications',
    name: 'Certifications & Compliance',
    description: 'Quality certifications and regulatory compliance documents',
    icon: 'Award',
  },
];
