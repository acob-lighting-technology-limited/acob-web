import type { Project, UpdatePost } from '@/lib/types';

// Fallback data for projects
export const fallbackProjects: Project[] = [
  {
    _id: 'fallback-1',
    title: 'Solar Installation Project',
    description: 'Professional solar installation for commercial building',
    location: 'Abuja, Nigeria',
    images: [],
    slug: { current: 'solar-installation-project' },
    gradientFrom: '#3b82f6',
    gradientTo: '#1d4ed8',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  },
  {
    _id: 'fallback-2',
    title: 'Mini-Grid Development',
    description: 'Community mini-grid solution for rural electrification',
    location: 'Kaduna, Nigeria',
    images: [],
    slug: { current: 'mini-grid-development' },
    gradientFrom: '#10b981',
    gradientTo: '#059669',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  },
  {
    _id: 'fallback-3',
    title: 'Energy Audit Project',
    description: 'Comprehensive energy audit for industrial facility',
    location: 'Lagos, Nigeria',
    images: [],
    slug: { current: 'energy-audit-project' },
    gradientFrom: '#f59e0b',
    gradientTo: '#d97706',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  },
];

// Fallback data for updates
export const fallbackUpdates: UpdatePost[] = [
  {
    _id: 'fallback-update-1',
    title: 'ACOB Lighting Technology Limited - Leading Solar Solutions',
    excerpt:
      'We are committed to providing sustainable energy solutions across Nigeria.',
    content: [],
    author: 'ACOB Team',
    publishedAt: new Date().toISOString(),
    slug: { current: 'acob-lighting-technology-limited' },
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  },
  {
    _id: 'fallback-update-2',
    title: 'Solar Energy Solutions for a Brighter Future',
    excerpt: 'Innovative solar technologies driving sustainable development.',
    content: [],
    author: 'ACOB Team',
    publishedAt: new Date().toISOString(),
    slug: { current: 'solar-energy-solutions' },
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  },
];

// Fallback data for services
export const fallbackServices = [
  {
    id: 'fallback-service-1',
    title: 'Mini-Grid Solutions',
    shortDescription:
      'Complete mini-grid solutions for communities and businesses',
    description:
      'Professional mini-grid development and implementation services.',
    image: '/images/services/mini-grid-solutions.webp',
    slug: 'mini-grid-solutions',
  },
  {
    id: 'fallback-service-2',
    title: 'Captive Power Solutions',
    shortDescription:
      'Reliable captive power systems for industrial applications',
    description:
      'Custom captive power solutions for industrial and commercial use.',
    image: '/images/services/captive-power-solutions.webp',
    slug: 'captive-power-solutions',
  },
  {
    id: 'fallback-service-3',
    title: 'Professional Energy Audit',
    shortDescription: 'Comprehensive energy audit and optimization services',
    description: 'Detailed energy audits to identify efficiency improvements.',
    image: '/images/services/professional-energy-audit.webp',
    slug: 'professional-energy-audit',
  },
];

// Fallback data for company info
export const fallbackCompanyInfo = {
  name: 'ACOB Lighting Technology Limited',
  description:
    'Leading supplier of solar materials and renewable energy solutions in Nigeria.',
  mission:
    'To provide sustainable energy solutions that power communities and drive economic growth.',
  vision:
    'A Nigeria powered by clean, reliable, and affordable renewable energy.',
  contact: {
    phone: '0704 920 2634',
    email: 'info@acoblighting.com',
    address:
      'Plot 2. Block 14 Extension, Federal Ministry of Works And Housing Sites and Service Scheme, Setraco Gate Gwarinpa.',
  },
};
