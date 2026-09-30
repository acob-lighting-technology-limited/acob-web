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
import {
  isChristmasPeriod,
  isTemporary2026LogoPeriod,
} from '@/lib/utils/christmas-period';
import { isAnniversaryYear2026 } from '@/lib/constants/anniversary';

const LOGO_2026_VERSION = '3';

// Social Icon Button Component with brand color animation
function SocialIconButton({
  href,
  icon: Icon,
  label,
  brandColor,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  brandColor: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center p-1 text-zinc-400 transition-all duration-300"
      aria-label={label}
    >
      {/* Icon container with animated fill effect */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:scale-110">
        {/* Animated fill effect */}
        <div
          className="absolute inset-0 transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center"
          style={{ backgroundColor: brandColor }}
        />
        {/* Icon */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Icon className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors duration-500" />
        </div>
      </div>
    </Link>
  );
}

export function Footer() {
  const isChristmas = isChristmasPeriod();
  const use2026Logo = isTemporary2026LogoPeriod();
  const showAnniversary = isAnniversaryYear2026();
  const logoSrc = isChristmas
    ? '/images/acob-logo-dark-christmas.png'
    : use2026Logo
      ? `/images/acob-logo-dark-2026.png?v=${LOGO_2026_VERSION}`
      : '/images/acob-logo-dark.png';

  // Brand colors for social media platforms
  const brandColors: Record<string, string> = {
    linkedin: '#0A66C2',
    x: '#000000',
    facebook: '#1877F2',
    instagram: '#E4405F',
    tiktok: '#000000',
  };

  // Get brand color for a social link
  const getBrandColor = (label: string): string => {
    const labelLower = label.toLowerCase();
    if (labelLower.includes('linkedin')) {
      return brandColors.linkedin;
    }
    if (labelLower.includes('x') || labelLower.includes('twitter')) {
      return brandColors.x;
    }
    if (labelLower.includes('facebook')) {
      return brandColors.facebook;
    }
    if (labelLower.includes('instagram')) {
      return brandColors.instagram;
    }
    if (labelLower.includes('tiktok')) {
      return brandColors.tiktok;
    }
    return 'transparent';
  };

  return (
    <footer className="relative h-auto md:h-[60vh] bg-primary dark:bg-black/40 text-white border-t-[0.5px] border-border transition-colors duration-500 overflow-hidden md:[clip-path:polygon(0%_0,100%_0%,100%_100%,0_100%)]">
      <div
        className="relative md:fixed md:bottom-0 w-full h-auto md:h-[60vh] "
        style={{
          backgroundImage: 'url(/images/footer-pattern.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        }}
      >
        {/* Color overlay to retain footer color */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none transition-colors duration-500" />
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
                  width={use2026Logo ? 220 : 140}
                  height={use2026Logo ? 64 : 36}
                  data-no-protection="true"
                  className={use2026Logo ? 'h-16 w-auto' : 'h-10 w-auto'}
                />
              </Link>
              <p className="text-sm text-zinc-400 leading-relaxed transition-colors duration-500">
                {showAnniversary
                  ? 'Celebrating 10 years of impact, ACOB Lighting Technology Limited delivers sustainable power solutions across Nigeria through mini-grid systems, solar installations, and energy storage solutions that empower homes, businesses, and communities with reliable, clean energy.'
                  : 'ACOB Lighting Technology Limited delivers sustainable power solutions across Nigeria. We specialize in mini-grid systems, solar installations, and energy storage solutions that empower homes, businesses, and communities with reliable, clean energy.'}
              </p>
              {/* Social Links */}
              <div className="flex">
                {socialLinks.map(({ href, icon: Icon, label }) => {
                  const brandColor = getBrandColor(label);
                  return (
                    <SocialIconButton
                      key={href}
                      href={href}
                      icon={Icon}
                      label={label}
                      brandColor={brandColor}
                    />
                  );
                })}
              </div>
            </div>

            {/* Supplemental Info - Quick Links, Services, Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:col-span-2 lg:col-span-3">
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

              {/* Contact Info */}
              <div className="space-y-4">
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
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-zinc-800 pt-8 transition-colors duration-500">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-zinc-400 transition-colors duration-500">
              <div className="flex items-center gap-4">
                <p>{companyInfo.copyright}</p>
              </div>
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
      </div>
    </footer>
  );
}
