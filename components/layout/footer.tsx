import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/team', label: 'Meet Our Team' },
    { href: '/updates', label: 'Updates & Media' },
    { href: '/projects', label: 'Our Projects' },
    { href: '/contact', label: 'Contacts' },
    { href: '/shop', label: 'Shop' },
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
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/shipping', label: 'Shipping Policy' },
    { href: '/delivery', label: 'Delivery Tips' },
    { href: '/returns', label: 'Returns' },
  ],
};

const socialLinks = [
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

const linkClass = 'text-zinc-300 hover:text-white transition-colors text-sm';

export function Footer() {
  return (
    <div
      className="relative h-[65vh]"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="fixed bottom-0 h-[65vh] w-full">
        <footer className="bg-black text-white">
          <Container className="px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  {footerLinks.quickLinks.map(item => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-6">Services</h3>
                <ul className="space-y-3">
                  {footerLinks.services.map(item => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-6">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map(item => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get In Touch */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg mb-6">Get In Touch</h3>

                <div className="space-y-2">
                  <p className="text-2xl font-bold">0704 920 2634,</p>
                  <p className="text-2xl font-bold">0803 290 2825</p>
                </div>

                <div>
                  <p className="text-sm text-zinc-400">Email:</p>
                  <Link
                    href="mailto:info@acoblighting.com"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    info@acoblighting.com
                  </Link>
                </div>

                <div className="space-y-4 text-sm text-zinc-300">
                  <div>
                    <p className="text-zinc-400 font-medium mb-1">
                      HEAD OFFICE:
                    </p>
                    <p>
                      Plot 2. Block 14 Extension, Federal Ministry of Works And
                      Housing Sites and Service Scheme, Setraco Gate Gwarinpa.
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-400 font-medium mb-1">
                      BRANCH OFFICE:
                    </p>
                    <p>
                      1st Floor, Rochas Plaza, 26 Herbert Macaulay Way, Abuja,
                      Nigeria
                    </p>
                  </div>
                </div>

                <div>
                  <Link
                    href="https://www.google.com/maps/dir/?api=1&destination=ACOB+LIGHTING+TECHNOLOGY+LIMITED,+Plot+2,+Ministry+of+Works+And+Housing+Sites+and+Service+Scheme,+Setraco+Gate,+behind+Clifford+Mall,+Gwarinpa,+Federal+Capital+Territory"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white hover:text-primary transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-zinc-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-zinc-400 mb-4 md:mb-0">
                ©{new Date().getFullYear()} ACOB LIGHTING TECHNOLOGY LIMITED
                All Rights Reserved
              </div>

              <div className="flex space-x-4">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
}
