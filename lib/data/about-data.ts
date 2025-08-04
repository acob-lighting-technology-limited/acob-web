import { Lightbulb, Users, Award, BookOpen } from 'lucide-react';

export const aboutSections = [
  {
    title: 'Our Story',
    description:
      'Discover our journey, milestones, and how we became a leader in clean energy.',
    href: '/about/our-story',
    image: '/images/about/acob-team.webp?height=200&width=300',
  },
  {
    title: 'Mission & Vision',
    description:
      'Explore our core values, commitment to sustainability, and future aspirations.',
    href: '/about/mission',
    image: '/images/about/acob-team.webp?height=200&width=300',
  },
  {
    title: 'Meet Our Team',
    description:
      'Get to know the dedicated professionals driving innovation at ACOB Lighting.',
    href: '/about/team',
    image: '/images/about/acob-team.webp?height=200&width=300',
  },
  {
    title: 'Certifications',
    description:
      'View our accreditations and commitment to global quality and safety standards.',
    href: '/about/certifications',
    image: '/images/about/acob-team.webp?height=200&width=300',
  },
];

export const teamMembers = [
  {
    id: '1',
    name: 'Mr. Alex Obiechina',
    position: 'CEO & Founder',
    image: '/placeholder.svg?height=200&width=200',
    bio: 'A visionary leader with over 20 years of experience in renewable energy and sustainable development.',
    linkedin: '#',
    email: 'aminu.bello@acoblighting.com',
  },
  {
    id: '2',
    name: 'Fatima Yusuf',
    position: 'Chief Operations Officer',
    image: '/placeholder.svg?height=200&width=200',
    bio: 'Oversees all operational aspects, ensuring efficiency and project success.',
    linkedin: '#',
    email: 'fatima.yusuf@acoblighting.com',
  },
  {
    id: '3',
    name: 'Engr. David Okoro',
    position: 'Head of Engineering',
    image: '/placeholder.svg?height=200&width=200',
    bio: 'Leads our engineering team, specializing in solar system design and implementation.',
    linkedin: '#',
    email: 'david.okoro@acoblighting.com',
  },
  {
    id: '4',
    name: 'Aisha Mohammed',
    position: 'Community Engagement Manager',
    image: '/placeholder.svg?height=200&width=200',
    bio: 'Connects with communities, ensuring our projects meet local needs and foster empowerment.',
    linkedin: '#',
    email: 'aisha.mohammed@acoblighting.com',
  },
  {
    id: '5',
    name: 'Chukwudi Eze',
    position: 'Project Manager',
    image: '/placeholder.svg?height=200&width=200',
    bio: 'Manages project lifecycles from conception to completion, ensuring timely delivery.',
    linkedin: '#',
    email: 'chukwudi.eze@acoblighting.com',
  },
  {
    id: '6',
    name: 'Grace Adebayo',
    position: 'Head of Finance',
    image: '/placeholder.svg?height=200&width=200',
    bio: 'Manages financial strategies and ensures fiscal responsibility.',
    linkedin: '#',
    email: 'grace.adebayo@acoblighting.com',
  },
];

export const milestones = [
  {
    year: '2018',
    title: 'Company Founded',
    description:
      "ACOB Lighting Technology Limited was established with a vision to transform Nigeria's energy landscape.",
    icon: Lightbulb,
  },
  {
    year: '2019',
    title: 'First Mini-Grid Project',
    description:
      'Successfully completed our first community mini-grid project, bringing reliable power to rural areas.',
    icon: Users,
  },
  {
    year: '2020',
    title: 'Industry Recognition',
    description:
      'Received multiple awards for innovation and community impact in renewable energy.',
    icon: Award,
  },
  {
    year: '2021',
    title: 'Expansion Phase',
    description:
      'Expanded operations across multiple states and launched new service offerings.',
    icon: BookOpen,
  },
  {
    year: '2022',
    title: 'Technology Innovation',
    description:
      'Introduced cutting-edge solar solutions and smart grid technologies.',
    icon: Lightbulb,
  },
  {
    year: '2023',
    title: 'National Impact',
    description:
      'Reached over 50 communities and established partnerships with government agencies.',
    icon: Users,
  },
];

export const sidebarLinks = [
  { label: 'Our Story', href: '/about/our-story', isActive: true },
  { label: 'Mission & Vision', href: '/about/mission', isActive: false },
  { label: 'Meet Our Team', href: '/about/team', isActive: false },
  { label: 'Certifications', href: '/about/certifications', isActive: false },
];
