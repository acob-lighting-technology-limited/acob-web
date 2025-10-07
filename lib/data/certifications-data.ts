import {
  Award,
  FileCheck,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  Leaf,
  Zap,
} from 'lucide-react';

export const certifications = [
  {
    name: 'ISO 9001:2015 Certified',
    description:
      'Demonstrates our commitment to quality management systems and continuous improvement.',
    icon: Award,
  },
  {
    name: 'Renewable Energy Association of Nigeria (REAN) Member',
    description:
      "Active participation in shaping Nigeria's renewable energy policies and standards.",
    icon: Leaf,
  },
  {
    name: 'Certified Solar Installers',
    description:
      'Our technical team holds certifications from leading global solar training institutions.',
    icon: ShieldCheck,
  },
  {
    name: 'Nigerian Electricity Regulatory Commission (NERC) Licensed',
    description:
      'Fully compliant with national electricity regulations for mini-grid operations.',
    icon: Zap,
  },
];

export const recognitions = [
  {
    year: '2024',
    title: 'InfraCredit Green Infrastructure Bond Recipient',
    organizer: 'InfraCredit',
    description:
      'Raised NGN 1.51 billion in green financing to scale productive-use solar mini-grids and hybrid systems.',
    icon: Trophy,
  },
  {
    year: '2023',
    title: 'Rural Electrification Agency Innovation Partner',
    organizer: 'Rural Electrification Agency',
    description:
      'Recognized for pioneering interconnected mini-grid frameworks delivering reliable power to underserved communities.',
    icon: ShieldAlert,
  },
  {
    year: '2022',
    title: 'Sustainable Energy Leadership Award',
    organizer: 'Energy Commission of Nigeria',
    description:
      'Honored for advancing clean energy adoption through bankable public-private partnerships.',
    icon: Award,
  },
  {
    year: '2021',
    title: 'HSE Excellence Certification',
    organizer: 'Nigerian Electricity Regulatory Commission',
    description:
      'Commended for adherence to occupational health, safety, and environmental standards across nationwide project sites.',
    icon: FileCheck,
  },
];
