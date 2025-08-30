import { Phone, Mail } from 'lucide-react';

export const supportMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    description:
      'For immediate assistance, please call our support lines during business hours.',
    contacts: ['+234 704 920 2634', '+234 803 290 2825'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    description:
      'Send us an email with your detailed query, and we will get back to you within 24-48 hours.',
    contacts: ['support@acoblighting.com'],
  },
];

export const faqItems = [
  {
    question: 'How long do solar panels last?',
    answer:
      'Solar panels typically last between 25 to 30 years, often with a performance warranty guaranteeing a certain output percentage after that period.',
  },
  {
    question: 'What is a mini-grid?',
    answer:
      'A mini-grid is an independent electricity distribution network, typically powered by renewable energy, serving a localized group of consumers.',
  },
  {
    question: 'Do you offer installation services?',
    answer:
      'Yes, we provide comprehensive installation services for all our solar and energy solutions.',
  },
];

export const contactLinks = [
  { label: 'Get a Quote', href: '/contact/quote' },
  { label: 'Office Locations', href: '/contact/locations' },
  { label: 'Careers', href: '/contact/careers' },
];
