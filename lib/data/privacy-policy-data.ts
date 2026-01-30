export interface PrivacyPolicySection {
  title: string;
  content: {
    type: 'paragraph' | 'list' | 'subsections' | 'contact';
    data?: string | string[] | PrivacyPolicySubsection[] | ContactInfo;
    intro?: string;
  };
}

export interface PrivacyPolicySubsection {
  title: string;
  description?: string;
  items: string[];
}

export interface ContactInfo {
  description: string;
  email: string;
  phone: string;
  address: string;
}

import { CONTACT_INFO } from '../constants/app.constants';

export const privacyPolicyLastUpdated = 'December 16, 2025';

export const privacyPolicySections: PrivacyPolicySection[] = [
  {
    title: 'Introduction',
    content: {
      type: 'paragraph',
      data: 'ACOB Lighting Technology Limited ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
    },
  },
  {
    title: 'Information We Collect',
    content: {
      type: 'subsections',
      data: [
        {
          title: 'Personal Information',
          description:
            'We may collect personal information such as your name, email address, phone number, company name, and any other information you provide when you:',
          items: [
            'Fill out contact forms',
            'Request quotes or services',
            'Subscribe to our newsletter',
            'Apply for careers',
            'Contact our support team',
          ],
        },
        {
          title: 'Automatically Collected Information',
          description:
            'We automatically collect certain information when you visit our website, including:',
          items: [
            'IP address and location data',
            'Browser type and version',
            'Operating system',
            'Pages visited and time spent',
            'Referring website',
            'Device information',
          ],
        },
      ],
    },
  },
  {
    title: 'How We Use Your Information',
    content: {
      type: 'list',
      intro: 'We use the information we collect for the following purposes:',
      data: [
        'To provide and maintain our services',
        'To respond to your inquiries and requests',
        'To send you marketing communications (with your consent)',
        'To improve our website and services',
        'To analyze website usage and trends',
        'To comply with legal obligations',
        'To protect against fraud and security threats',
      ],
    },
  },
  {
    title: 'Information Sharing and Disclosure',
    content: {
      type: 'list',
      intro:
        'We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:',
      data: [
        'With your explicit consent',
        'To comply with legal obligations',
        'To protect our rights and safety',
        'With trusted service providers who assist in our operations',
        'In connection with a business transfer or merger',
      ],
    },
  },
  {
    title: 'Data Security',
    content: {
      type: 'paragraph',
      data: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
    },
  },
  {
    title: 'Your Rights',
    content: {
      type: 'list',
      intro:
        'Depending on your location, you may have the following rights regarding your personal information:',
      data: [
        'Right to access your personal information',
        'Right to correct inaccurate information',
        'Right to delete your personal information',
        'Right to restrict processing',
        'Right to data portability',
        'Right to object to processing',
        'Right to withdraw consent',
      ],
    },
  },
  {
    title: 'Data Retention',
    content: {
      type: 'paragraph',
      data: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.',
    },
  },
  {
    title: 'International Data Transfers',
    content: {
      type: 'paragraph',
      data: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.',
    },
  },
  {
    title: "Children's Privacy",
    content: {
      type: 'paragraph',
      data: 'Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.',
    },
  },
  {
    title: 'Changes to This Privacy Policy',
    content: {
      type: 'paragraph',
      data: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.',
    },
  },
  {
    title: 'Contact Us',
    content: {
      type: 'contact',
      data: {
        description:
          'If you have any questions about this Privacy Policy or our data practices, please contact us:',
        email: CONTACT_INFO.email.support,
        phone: CONTACT_INFO.phone.primary,
        address:
          'Plot 2. Block 14 Extension, Federal Ministry of Works And Housing Sites and Services Scheme, Setraco Gate, Gwarinpa, FCT, Nigeria.',
      },
    },
  },
];
