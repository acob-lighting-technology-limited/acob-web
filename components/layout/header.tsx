"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, ChevronDown, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import { Container } from "../ui/container";

// Types
interface SubItem {
  name: string;
  href: string;
  description: string;
  icon: string; // Added icon property
}

interface NavigationItem {
  name: string;
  href: string;
  subItems: SubItem[];
}

interface DropdownMenuProps {
  item: NavigationItem;
  isOpen: boolean;
  onClose: () => void;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems: NavigationItem[] = [
  {
    name: "About Us",
    href: "/about",
    subItems: [
      {
        name: "Our Story",
        href: "/about/our-story",
        description: "Learn about our journey and how we started",
        icon: "https://www.svgrepo.com/download/522469/book.svg",
      },
      {
        name: "Mission & Vision",
        href: "/about/mission",
        description: "Our commitment to sustainable energy",
        icon: "https://www.svgrepo.com/download/384034/dart-mission-goal-success.svg",
      },
      {
        name: "Our Team",
        href: "/about/team",
        description: "Meet the experts behind our success",
        icon: "https://www.svgrepo.com/download/60828/team.svg",
      },
      {
        name: "Certifications",
        href: "/about/certifications",
        description: "Our industry certifications and standards",
        icon: "https://www.svgrepo.com/download/121332/certification-file.svg",
      },
    ],
  },
  {
    name: "Services",
    href: "/services",
    subItems: [
      {
        name: "Mini-Grid Solutions",
        href: "/services/mini-grid-solutions",
        description: "Scalable power solutions for communities",
        icon: "https://www.svgrepo.com/download/477730/solar-battery-4.svg",
      },
      {
        name: "Captive Power Solutions",
        href: "/services/captive-power",
        description: "Dedicated power systems for businesses",
        icon: "https://www.svgrepo.com/download/490592/bulb-lighting.svg",
      },
      {
        name: "Professional Energy Audit",
        href: "/services/energy-audit",
        description: "Comprehensive energy efficiency analysis",
        icon: "https://www.svgrepo.com/download/140671/seo-monitoring.svg",
      },
      {
        name: "Installation Services",
        href: "/services/installation",
        description: "Professional setup and configuration",
        icon: "https://www.svgrepo.com/download/435849/energy-distribution.svg",
      },
      {
        name: "Maintenance & Support",
        href: "/services/maintenance",
        description: "Ongoing support and maintenance",
        icon: "https://www.svgrepo.com/download/340556/license-maintenance-draft.svg",
      },
    ],
  },
  // {
  //   name: "Products",
  //   href: "/products",
  //   subItems: [
  //     {
  //       name: "Solar Panels",
  //       href: "/products/solar-panels",
  //       description: "High-efficiency photovoltaic panels",
  //       icon: "https://www.svgrepo.com/download/533289/sun.svg",
  //     },
  //     {
  //       name: "Inverters",
  //       href: "/products/inverters",
  //       description: "Power conversion systems",
  //       icon: "https://www.svgrepo.com/download/533263/cpu.svg",
  //     },
  //     {
  //       name: "Batteries",
  //       href: "/products/batteries",
  //       description: "Energy storage solutions",
  //       icon: "https://www.svgrepo.com/download/533252/battery.svg",
  //     },
  //     {
  //       name: "Accessories",
  //       href: "/products/accessories",
  //       description: "Supporting components and tools",
  //       icon: "https://www.svgrepo.com/download/533283/plug.svg",
  //     },
  //     {
  //       name: "Complete Systems",
  //       href: "/products/systems",
  //       description: "Integrated solar power solutions",
  //       icon: "https://www.svgrepo.com/download/533258/layers.svg",
  //     },
  //   ],
  // },
  {
    name: "Projects",
    href: "/projects",
    subItems: [
      {
        name: "Rural Electrification",
        href: "/projects/rural-electrification",
        description: "Projects bringing power to remote areas",
        icon: "https://www.svgrepo.com/download/533270/home.svg",
      },
      {
        name: "Commercial Installations",
        href: "/projects/commercial-installations",
        description: "Solar solutions for businesses",
        icon: "https://www.svgrepo.com/download/533254/building.svg",
      },
      {
        name: "Street Lighting",
        href: "/projects/street-lighting",
        description: "Public lighting infrastructure projects",
        icon: "https://www.svgrepo.com/download/533274/lightbulb.svg",
      },
      {
        name: "Healthcare Projects",
        href: "/projects/healthcare-projects",
        description: "Powering hospitals and clinics",
        icon: "https://www.svgrepo.com/download/533268/heart.svg",
      },
    ],
  },
  {
    name: "Updates & Media",
    href: "/updates",
    subItems: [
      {
        name: "Latest Updates",
        href: "/updates/latest",
        description: "Stay updated with our recent developments",
        icon: "https://www.svgrepo.com/download/533279/news.svg",
      },
      {
        name: "Press Releases",
        href: "/updates/press",
        description: "Official announcements and updates",
        icon: "https://www.svgrepo.com/download/533280/megaphone.svg",
      },
      {
        name: "Case Studies",
        href: "/updates/case-studies",
        description: "Real-world implementation stories",
        icon: "https://www.svgrepo.com/download/533265/document.svg",
      },
      {
        name: "Media Gallery",
        href: "/updates/gallery",
        description: "Photos and videos from our projects",
        icon: "https://www.svgrepo.com/download/533271/image.svg",
      },
    ],
  },
  {
    name: "Contact Us",
    href: "/contact",
    subItems: [
      {
        name: "Get Quote",
        href: "/contact/quote",
        description: "Request a personalized quote",
        icon: "https://www.svgrepo.com/download/437309/text-quote.svg",
      },
      {
        name: "Office Locations",
        href: "/contact/locations",
        description: "Find our offices near you",
        icon: "https://www.svgrepo.com/download/532539/location-pin.svg",
      },
      {
        name: "Support",
        href: "/contact/support",
        description: "Technical support and assistance",
        icon: "https://www.svgrepo.com/download/486865/support.svg",
      },
      {
        name: "Careers",
        href: "/contact/careers",
        description: "Join our growing team",
        icon: "https://www.svgrepo.com/download/483991/career-2.svg",
      },
    ],
  },
];

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`
              absolute top-full left-0 mt-2 w-full max-w-[600px] min-w-[400px] bg-popover dark:bg-popover rounded-lg shadow-2xl border-[0.5px] border-border 
      transform transition-all duration-300 ease-out origin-top
      ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
    `}
      style={{
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {item.subItems.map((subItem, index) => (
            <Link
              key={subItem.name}
              href={subItem.href}
              onClick={onClose}
              className={`
                group block p-3 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 dark:hover:from-zinc-700 hover:to-primary/10 dark:hover:to-zinc-500 hover:shadow-md
                transform hover:scale-105 hover:-translate-y-1
                animate-fadeInUp
              `}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="flex gap-2 items-start ">
          
                <div className="mt-1 gap-2 ">
                  <div className="w-8 h-8 bg-muted dark:bg-muted group-hover:bg-primary transition-colors duration-200 rounded p-1">
                    <Image
                      src={subItem.icon}
                      alt={`${subItem.name} Icon`}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div>
                  {" "}
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 break-words">
                    {subItem.name}
                  </div>
                  <div className="text-sm text-left text-muted-foreground mt-1 group-hover:text-foreground transition-colors duration-200 break-words">
                    {subItem.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <div
      className={`
      fixed inset-0 z-50 lg:hidden
      transition-all duration-300 ease-out
      ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
    `}
    >
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`
        absolute right-0 top-0 h-full w-80 bg-popover shadow-2xl
        transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white font-bold">
                A
              </div>
              <span className="font-bold text-lg text-foreground">
                ACOB LIGHTING
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <div
                key={item.name}
                className="animate-slideInRight"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-muted rounded-lg transition-colors duration-200"
                >
                  <span className="font-medium text-foreground">{item.name}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${expandedItems[item.name] ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`
                  overflow-hidden transition-all duration-300 ease-out
                  ${expandedItems[item.name] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
                >
                  <div className="pl-4 pt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={onClose}
                        className={`
                          flex items-center space-x-3 p-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md 
                          transition-all duration-200 animate-fadeInUp
                        `}
                        style={{
                          animationDelay: `${subIndex * 50}ms`,
                          animationFillMode: "both",
                        }}
                      >
                        <Image
                          src={subItem.icon}
                          alt={`${subItem.name} Icon`}
                          width={16}
                          height={16}
                        />
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t">
            <Link
              href="/contact/quote"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center"
            >
              <Phone className="mr-2 h-4 w-4" />
              Get Quote
            </Link>
          </div>
          <div className="mt-6 flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownClose = () => {
    setActiveDropdown(null);
  };

  const logoSrc = theme === "dark" ? "/images/ACOB-logo.png" : "/images/ACOB.png";
  return (
    <>
      <header
        className={`
        sticky top-0 z-40 w-full transition-all duration-500 ease-out
        bg-background/95 backdrop-blur-sm border-b-[2px] border-border
        dark:bg-black transition-colors duration-700
        ${
          isScrolled
                    ? "bg-background/75 backdrop-blur-3xl shadow-lg border-b-[1px] border-border dark:bg-background"
        : "bg-background/95 backdrop-blur-sm border-b border-border dark:bg-background"
        }
      `}
      >
        <Container noPadding className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src={logoSrc}
                alt="ACOB Lighting Logo"
                width={120}
                height={32}
                priority
                className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 text-foreground hover:text-primary font-medium transition-all duration-200 hover:scale-105"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""}`}
                    />
                  </Link>

                  <DropdownMenu
                    item={item}
                    isOpen={activeDropdown === item.name}
                    onClose={handleDropdownClose}
                  />
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/contact/quote">
                <button className="bg-primary hover:bg-primary text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Get Quote
                </button>
              </Link>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
