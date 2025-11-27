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
import { toast } from 'sonner';

export function Footer() {
  const logoSrc = '/images/acob-logo-dark.webp';

  return (
    <footer
      className="relative bg-primary dark:bg-black/40 text-white border-t border-border transition-colors duration-500 overflow-hidden"
      style={{
        backgroundImage: 'url(/images/footer-pattern.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
      }}
    >
      {/* Color overlay to retain footer color */}
      <div className="absolute inset-0  bg-black/60 pointer-events-none transition-colors duration-500" />
      <Container className="relative px-4 py-12 z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                key={logoSrc}
                src={logoSrc || '/placeholder.svg'}
                alt="ACOB Lighting Technology Limited"
                width={140}
                height={36}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed transition-colors duration-500">
              ACOB Lighting Technology Limited delivers sustainable power
              solutions across Nigeria. We specialize in mini-grid systems,
              solar installations, and energy storage solutions that empower
              homes, businesses, and communities with reliable, clean energy.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors duration-500 p-2 rounded-full hover:bg-zinc-800"
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
              <h3 className="font-semibold text-base text-white transition-colors duration-500">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {footerLinks.quickLinks.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-500"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base text-white transition-colors duration-500">
                Services
              </h3>
              <ul className="space-y-2">
                {footerLinks.services.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-500"
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
            <h3 className="font-semibold text-base text-white transition-colors duration-500">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-zinc-400 transition-colors duration-500">
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      contactInfo.offices.headOffice.address,
                    );
                    toast.success('Address copied to clipboard!', {
                      duration: 2000,
                    });
                  } catch (_err) {
                    toast.error('Failed to copy address', {
                      duration: 2000,
                    });
                  }
                }}
                className="text-left leading-relaxed hover:text-white transition-colors duration-500 cursor-pointer block w-full"
              >
                {contactInfo.offices.headOffice.address}
              </button>
              {contactInfo.phones.map((phone, index) => (
                <a
                  key={index}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="block hover:text-white transition-colors duration-500"
                >
                  {phone}
                </a>
              ))}
              <a
                href={`mailto:${contactInfo.email}`}
                className="block text-yellow-400 hover:text-yellow-300 transition-colors duration-500"
              >
                {contactInfo.email}
              </a>
              <a
                href={`mailto:${contactInfo.additionalEmail}`}
                className="block text-yellow-400 hover:text-yellow-300 transition-colors duration-500"
              >
                {contactInfo.additionalEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8 transition-colors duration-500">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-zinc-400 transition-colors duration-500">
            <p>{companyInfo.copyright}</p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors duration-500"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-white transition-colors duration-500"
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
