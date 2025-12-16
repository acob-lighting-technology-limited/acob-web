export interface TermsOfServiceSection {
  title: string;
  content: {
    type: 'paragraph' | 'list' | 'paragraphs' | 'contact';
    data?: string | string[] | string[] | ContactInfo;
    intro?: string;
    hasLink?: boolean;
  };
}

export interface ContactInfo {
  description: string;
  email: string;
  phone: string;
  address: string;
}

export const termsOfServiceLastUpdated = 'December 16, 2025';

export const termsOfServiceSections: TermsOfServiceSection[] = [
  {
    title: 'Acceptance of Terms',
    content: {
      type: 'paragraph',
      data: 'By accessing and using the website of ACOB Lighting Technology Limited ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
  },
  {
    title: 'Description of Service',
    content: {
      type: 'list',
      intro:
        'ACOB Lighting Technology Limited provides solar energy solutions including:',
      data: [
        'Mini-grid solutions for communities and businesses',
        'Captive power systems for industrial applications',
        'Professional energy audit services',
        'Solar panel supply and installation',
        'Energy consulting and project management',
      ],
    },
  },
  {
    title: 'User Responsibilities',
    content: {
      type: 'list',
      intro: 'As a user of our website and services, you agree to:',
      data: [
        'Provide accurate and complete information when requested',
        'Maintain the security of your account information',
        'Use our services only for lawful purposes',
        'Not interfere with or disrupt our services',
        'Respect intellectual property rights',
        'Comply with all applicable laws and regulations',
      ],
    },
  },
  {
    title: 'Intellectual Property Rights',
    content: {
      type: 'paragraphs',
      data: [
        'The content on this website, including but not limited to text, graphics, images, logos, and software, is the property of ACOB Lighting Technology Limited and is protected by copyright and other intellectual property laws.',
        'You may not reproduce, distribute, modify, or create derivative works from this content without our express written consent.',
      ],
    },
  },
  {
    title: 'Privacy Policy',
    content: {
      type: 'paragraph',
      data: 'Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.',
      hasLink: true,
    },
  },
  {
    title: 'Service Availability',
    content: {
      type: 'paragraph',
      data: 'We strive to maintain the availability of our website and services, but we do not guarantee uninterrupted access. We may temporarily suspend or restrict access for maintenance, updates, or other operational reasons.',
    },
  },
  {
    title: 'Limitation of Liability',
    content: {
      type: 'list',
      intro:
        'To the maximum extent permitted by law, ACOB Lighting Technology Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:',
      data: [
        'Loss of profits, data, or use',
        'Business interruption',
        'Personal injury or property damage',
        'Any damages arising from the use of our services',
      ],
    },
  },
  {
    title: 'Indemnification',
    content: {
      type: 'paragraph',
      data: 'You agree to indemnify and hold harmless ACOB Lighting Technology Limited, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of these terms.',
    },
  },
  {
    title: 'Disclaimers',
    content: {
      type: 'list',
      intro:
        'Our services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to:',
      data: [
        'Warranties of merchantability',
        'Fitness for a particular purpose',
        'Non-infringement',
        'Accuracy or completeness of information',
      ],
    },
  },
  {
    title: 'Governing Law',
    content: {
      type: 'paragraph',
      data: 'These terms shall be governed by and construed in accordance with the laws of Nigeria. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Nigeria.',
    },
  },
  {
    title: 'Changes to Terms',
    content: {
      type: 'paragraph',
      data: 'We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the new terms.',
    },
  },
  {
    title: 'Severability',
    content: {
      type: 'paragraph',
      data: 'If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these terms will otherwise remain in full force and effect.',
    },
  },
  {
    title: 'Contact Information',
    content: {
      type: 'contact',
      data: {
        description:
          'If you have any questions about these Terms of Service, please contact us:',
        email: 'info@acoblighting.com',
        phone: '+234 704 920 2634',
        address:
          'Plot 2. Block 14 Extension, Federal Ministry of Works And Housing Sites and Services Scheme, Setraco Gate, Gwarinpa, FCT, Nigeria.',
      },
    },
  },
];
