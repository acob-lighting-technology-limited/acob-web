import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export const footerLinks = {
  quickLinks: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/about/team', label: 'Meet Our Team' },
    { href: '/updates', label: 'Updates & Media' },
    { href: '/projects', label: 'Our Projects' },
    { href: '/contact', label: 'Contacts' },
    { href: '/services', label: 'Services' },
  ],
  services: [
    { href: '/services/mini-grid', label: 'Mini-Grid Solutions' },
    { href: '/services/captive-power', label: 'Captive Power Solutions' },
    { href: '/services/energy-audit', label: 'Professional Energy Audit' },
    {
      href: '/services/engineering',
      label: 'Engineering Procurement & Construction',
    },
  ],
  support: [
    { href: '/terms-of-service', label: 'Terms & Conditions' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/contact/support', label: 'Support' },
    { href: '/contact/quote', label: 'Get Quote' },
  ],
};

export const socialLinks = [
  {
    href: 'https://www.facebook.com/acoblightingtechltd',
    icon: Facebook,
    label: 'Facebook',
  },
  {
    href: 'https://x.com/acoblimited?s=21&t=NMnANy7CG_nzCYaBcUg6gw',
    icon: Twitter,
    label: 'Twitter',
  },
  {
    href: 'https://www.linkedin.com/company/acob-lighting-technology-limited/',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://www.instagram.com/acob_lighting/?hl=en',
    icon: Instagram,
    label: 'Instagram',
  },
];

export const contactInfo = {
  phones: ['+234 704 920 2634', '+234 803 290 2825'],
  email: 'info@acoblighting.com',
  additionalEmail: 'infoacob@gmail.com',
  offices: {
    headOffice: {
      title: 'HEAD OFFICE:',
      address:
        'Plot 2. Block 14 Extension, Federal Ministry of Works And Housing Sites and Services Scheme, Setraco Gate, Gwarinpa.',
    },
    branchOffice: {
      title: 'BRANCH OFFICE:',
      address:
        '1st Floor, Rochas Plaza, 26 Herbert Macaulay Way, Abuja, Nigeria',
    },
  },
  directions: {
    href: 'https://www.google.com/maps/dir/?api=1&destination=ACOB+LIGHTING+TECHNOLOGY+LIMITED,+Plot+2,+Ministry+of+Works+And+Housing+Sites+and+Service+Scheme,+Setraco+Gate,+behind+Clifford+Mall,+Gwarinpa,+Federal+Capital+Territory',
    label: 'Get Directions',
  },
};

export const companyInfo = {
  name: 'ACOB LIGHTING TECHNOLOGY LIMITED',
  copyright: `©${new Date().getFullYear()} ACOB LIGHTING TECHNOLOGY LIMITED All Rights Reserved`,
};
