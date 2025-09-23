'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { MapPin } from 'lucide-react';
import {
  footerLinks,
  socialLinks,
  contactInfo,
  companyInfo,
} from '@/lib/data/footer-data';

export function Footer() {
  return (
    <div
    // className="relative h-[85vh]"
    // style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      {/* <div className="fixed bottom-0 h-[85vh] w-full"> */}
      <div>
        <footer className="bg-black text-white">
          <Container className="px-4 py-12">
            {/* Company Info Section */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Company Info */}
                <div className="space-y-6">
                  <Link href="/" className="inline-block">
                    <Image
                      src="/images/acob-logo-dark.png"
                      alt="ACOB Lighting Technology Limited"
                      width={180}
                      height={48}
                      className="h-14 w-auto"
                      priority
                    />
                  </Link>
                  <p className="text-base text-zinc-300 leading-relaxed max-w-lg">
                    We are committed to providing sustainable energy solutions
                    that transform communities across Nigeria through our
                    expertise in solar technology and mini-grid systems.
                  </p>
                </div>

                {/* Google Map */}
                <div className="bg-zinc-900 rounded-xl shadow-2xl h-96 w-full overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4042.0004937198446!2d7.418824175135592!3d9.11723979094763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b1e73987599%3A0xd8a3ed0c898644c5!2sACOB%20LIGHTING%20TECHNOLOGY%20LIMITED!5e1!3m2!1sen!2sng!4v1752592656509!5m2!1sen!2sng&maptype=satellite"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Office Locations */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-xl text-white">
                    Our Offices
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-primary font-semibold text-sm uppercase tracking-wide">
                        {contactInfo.offices.headOffice.title}
                      </p>
                      <p className="text-zinc-300 leading-relaxed">
                        {contactInfo.offices.headOffice.address}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-primary font-semibold text-sm uppercase tracking-wide">
                        {contactInfo.offices.branchOffice.title}
                      </p>
                      <p className="text-zinc-300 leading-relaxed">
                        {contactInfo.offices.branchOffice.address}
                      </p>
                    </div>
                    <div>
                      <Link
                        href={contactInfo.directions.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        {contactInfo.directions.label}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-xl text-white">
                    Contact Us
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {contactInfo.phones.map((phone, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <a
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="text-xl font-bold text-white hover:text-primary transition-colors"
                          >
                            {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email Addresses */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-xl text-white">Email Us</h3>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="block text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        {contactInfo.email}
                      </a>
                      <a
                        href={`mailto:${contactInfo.additionalEmail}`}
                        className="block text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        {contactInfo.additionalEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links Section */}
            <div className="border-t border-zinc-800 pt-12 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Quick Links */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-xl text-white">
                    Quick Links
                  </h3>
                  <ul className="space-y-4">
                    {footerLinks.quickLinks.map(item => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-zinc-300 hover:text-white transition-colors duration-200 text-base"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-xl text-white">
                    Our Services
                  </h3>
                  <ul className="space-y-4">
                    {footerLinks.services.map(item => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-zinc-300 hover:text-white transition-colors duration-200 text-base"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-xl text-white">Support</h3>
                  <ul className="space-y-4">
                    {footerLinks.support.map(item => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-zinc-300 hover:text-white transition-colors duration-200 text-base"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-zinc-800 pt-8">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                <div className="text-sm text-zinc-400 text-center lg:text-left">
                  {companyInfo.copyright}
                </div>

                <div className="flex items-center space-x-6">
                  <span className="text-sm text-zinc-400">Follow us:</span>
                  <div className="flex space-x-4">
                    {socialLinks.map(({ href, icon: Icon, label }) => (
                      <Link
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-zinc-800"
                        aria-label={label}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
}
