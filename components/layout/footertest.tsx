"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "../ui/container";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <div>
      <div
        className="relative h-[70vh] "
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 h-[70vh] w-full">
          <footer className="bg-slate-800 text-white">
            <Container className="flex justify-between px-4 py-12 pt-20">
              <div className=" w-1/2 flex flex-col gap-8 max-w-md">
                {" "}
                <Link href="/" className="flex items-center space-x-2 group">
                  <img
                    src="/images/ACOB-Logo.png"
                    alt="ACOB Lighting Logo"
                    className="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
                  />
                </Link>
                <p className="text-lg">
                  ACOB provides mini grid solutions that serve a wide range of
                  customers which include private households, commercial
                  businesses such as shops, ice makers and mobile phone
                  chargers, agricultural loads such as cold storage, productive
                  loads such as grind mills, food processing and wood or metal
                  working shops, and semi-industrials such as telecom towers.
                </p>
              </div>
              <div className=" w-1/2  aspect-video rounded-lg overflow-hidden">
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
            </Container>
          </footer>
          <footer className="bg-slate-800 text-white">
          <Container className="px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/team"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Meet Our Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/updates" // Changed from /news
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Updates & Media {/* Changed from News & Media */}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Our Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Contacts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Shop
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-6">Services</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="/services/mini-grid"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Mini-Grid Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/captive-power"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Captive Power Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/energy-audit"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Professional Energy Audit
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/engineering"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Engineering Procurement & Construction
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-6">Support</h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shipping"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/delivery"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Delivery Tips
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/returns"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Returns
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Get In Touch */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg mb-6">Get In Touch</h3>

                {/* Phone Numbers */}
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">
                    0704 920 2634,
                  </p>
                  <p className="text-2xl font-bold text-white">0803 290 2825</p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-sm text-gray-400">Email:</p>
                  <Link
                    href="mailto:info@acoblighting.com"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    info@acoblighting.com
                  </Link>
                </div>

                {/* Addresses */}
                <div className="space-y-4 text-sm text-gray-300">
                  <div>
                    <p className="text-gray-400 font-medium mb-1">
                      HEAD OFFICE:
                    </p>
                    <p>
                      Plot 2. Block 14 Extension, Federal Ministry of Works And
                      Housing Sites and Service Scheme, Setraco Gate Gwarinpa.
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 font-medium mb-1">
                      BRANCH OFFICE:
                    </p>
                    <p>
                      1st Floor, Rochas Plaza, 26 Herbert Macaulay Way, Abuja,
                      Nigeria
                    </p>
                  </div>
                </div>

                {/* Get Directions */}
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
            <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-400 mb-4 md:mb-0">
                <p>
                  ©{new Date().getFullYear()} ACOB LIGHTING TECHNOLOGY LIMITED
                  All Rights Reserved
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <Link
                  href="https://www.facebook.com/acoblightingtechltd"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="https://x.com/acoblimited?s=21&t=NMnANy7CG_nzCYaBcUg6gw"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">X</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/acob-lighting-technology-limited/"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />

                  <span className="sr-only">Linkedin</span>
                </Link>

                <Link
                  href="https://www.instagram.com/acob_lighting/?hl=en"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </Container>
        </footer>
        </div>
      </div>
     
    </div>
  );
}
