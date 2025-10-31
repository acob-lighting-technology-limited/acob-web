'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import {
  footerLinks,
  socialLinks,
  contactInfo,
  companyInfo,
} from '@/lib/data/footer-data';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container className="px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/acob-logo-dark.webp"
                alt="ACOB Lighting Technology Limited"
                width={140}
                height={36}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              ACOB Lighting Technology Limited delivers sustainable power solutions
              across Nigeria. We specialize in mini-grid systems, solar installations,
              and energy storage solutions that empower communities with reliable,
              clean energy.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-800"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links and Services - 2 columns on mobile */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-2">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base text-white">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.quickLinks.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base text-white">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-base text-white">Contact</h3>
            <div className="space-y-3 text-sm text-zinc-400">
              <p className="leading-relaxed">
                {contactInfo.offices.headOffice.address}
              </p>
              <a
                href={`tel:${contactInfo.phones[0].replace(/\s/g, '')}`}
                className="block hover:text-white transition-colors"
              >
                {contactInfo.phones[0]}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="block text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-zinc-400">
            <p>{companyInfo.copyright}</p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
