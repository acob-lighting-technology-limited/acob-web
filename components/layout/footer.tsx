import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { MapPin } from 'lucide-react';
import {
  footerLinks,
  socialLinks,
  contactInfo,
  companyInfo,
} from '@/lib/data/footer-data';

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
                  {contactInfo.phones.map((phone, index) => (
                    <p key={index} className="text-2xl font-bold">
                      {phone}
                      {index < contactInfo.phones.length - 1 && ','}
                    </p>
                  ))}
                </div>

                <div>
                  <p className="text-sm text-zinc-400">Email:</p>
                  <div className="space-y-1">
                    <Link
                      href={`mailto:${contactInfo.email}`}
                      className="text-primary hover:text-primary/80 transition-colors block"
                    >
                      {contactInfo.email}
                    </Link>
                    <Link
                      href="mailto:infoacob@gmail.com"
                      className="text-primary hover:text-primary/80 transition-colors block"
                    >
                      infoacob@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-zinc-300">
                  <div>
                    <p className="text-zinc-400 font-medium mb-1">
                      {contactInfo.offices.headOffice.title}
                    </p>
                    <p>{contactInfo.offices.headOffice.address}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 font-medium mb-1">
                      {contactInfo.offices.branchOffice.title}
                    </p>
                    <p>{contactInfo.offices.branchOffice.address}</p>
                  </div>
                </div>

                <div>
                  <Link
                    href={contactInfo.directions.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white hover:text-primary transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {contactInfo.directions.label}
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-zinc-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-zinc-400 mb-4 md:mb-0">
                {companyInfo.copyright}
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
