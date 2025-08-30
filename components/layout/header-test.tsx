'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Container } from '@/components/ui/container';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Home, 
  Users, 
  Settings, 
  FileText,
  Phone,
  Lightbulb,
  Target,
  Award,
  BookOpen,
  MapPin,
  MessageCircle,
  Briefcase,
  Newspaper
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Navigation data
const navigationItems = [
  {
    name: 'About Us',
    href: '/about',
    icon: Users,
    subItems: [
      {
        name: 'Our Story',
        href: '/about/our-story',
        description: 'Learn about our journey and how we started',
        icon: BookOpen,
      },
      {
        name: 'Mission & Vision',
        href: '/about/mission',
        description: 'Our commitment to sustainable energy',
        icon: Target,
      },
      {
        name: 'Our Team',
        href: '/about/team',
        description: 'Meet the experts behind our success',
        icon: Users,
      },
      {
        name: 'Certifications',
        href: '/about/certifications',
        description: 'Our industry certifications and standards',
        icon: Award,
      },
    ],
  },
  {
    name: 'Services',
    href: '/services',
    icon: Settings,
    subItems: [
      {
        name: 'Mini-Grid Solutions',
        href: '/services/mini-grid-solutions',
        description: 'Scalable power solutions for communities',
        icon: Lightbulb,
      },
      {
        name: 'Captive Power Solutions',
        href: '/services/captive-power-solutions',
        description: 'Dedicated power systems for businesses',
        icon: Settings,
      },
      {
        name: 'Professional Energy Audit',
        href: '/services/professional-energy-audit',
        description: 'Comprehensive energy assessments',
        icon: FileText,
      },
      {
        name: 'Engineering Procurement & Construction',
        href: '/services/engineering-procurement-construction',
        description: 'Complete project management services',
        icon: Briefcase,
      },
      {
        name: 'Streetlighting Infrastructure',
        href: '/services/streetlighting-infrastructure-project-development',
        description: 'Solar-powered LED streetlights',
        icon: Lightbulb,
      },
    ],
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: Briefcase,
    subItems: [
      {
        name: 'All Projects',
        href: '/projects',
        description: 'View our complete project portfolio',
        icon: Briefcase,
      },
      {
        name: 'Case Studies',
        href: '/updates/case-studies',
        description: 'Detailed project analyses and success stories',
        icon: FileText,
      },
    ],
  },
  {
    name: 'Updates',
    href: '/updates',
    icon: Newspaper,
    subItems: [
      {
        name: 'Latest Updates',
        href: '/updates/latest',
        description: 'Recent news and company updates',
        icon: Newspaper,
      },
      {
        name: 'Case Studies',
        href: '/updates/case-studies',
        description: 'Detailed project analyses and success stories',
        icon: FileText,
      },
      {
        name: 'Press Releases',
        href: '/updates/press',
        description: 'Official announcements and media coverage',
        icon: FileText,
      },
      {
        name: 'Gallery',
        href: '/updates/gallery',
        description: 'Visual showcase of our projects',
        icon: Briefcase,
      },
    ],
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: Phone,
    subItems: [
      {
        name: 'Get a Quote',
        href: '/contact/quote',
        description: 'Request personalized quotations',
        icon: MessageCircle,
      },
      {
        name: 'Office Locations',
        href: '/contact/locations',
        description: 'Find our office locations and contact details',
        icon: MapPin,
      },
      {
        name: 'Support',
        href: '/contact/support',
        description: 'Customer support and FAQs',
        icon: MessageCircle,
      },
      {
        name: 'Careers',
        href: '/contact/careers',
        description: 'Job opportunities and company culture',
        icon: Briefcase,
      },
    ],
  },
];

export function HeaderTest() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">ACOB</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.subItems ? (
                      <>
                        <NavigationMenuTrigger 
                          className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            isActive(item.href) && "text-primary"
                          )}
                        >
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.subItems.map((subItem) => {
                              const IconComponent = subItem.icon;
                              return (
                                <li key={subItem.name}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={subItem.href}
                                      className={cn(
                                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                        isActive(subItem.href) && "bg-accent text-accent-foreground"
                                      )}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <IconComponent className="w-4 h-4" />
                                        <div className="text-sm font-medium leading-none">
                                          {subItem.name}
                                        </div>
                                      </div>
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {subItem.description}
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              );
                            })}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "text-sm font-medium transition-colors hover:text-primary",
                            isActive(item.href) && "text-primary"
                          )}
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Get Quote
            </Button>
            <Button size="sm">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Browse our services and pages
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <nav className="space-y-4">
                    {navigationItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={item.name} className="space-y-2">
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                              isActive(item.href)
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            <IconComponent className="w-4 h-4" />
                            <span>{item.name}</span>
                            {item.subItems && <ChevronDown className="w-4 h-4 ml-auto" />}
                          </Link>
                          
                          {item.subItems && (
                            <div className="ml-6 space-y-1">
                              {item.subItems.map((subItem) => {
                                const SubIconComponent = subItem.icon;
                                return (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors",
                                      isActive(subItem.href)
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                    )}
                                  >
                                    <SubIconComponent className="w-4 h-4" />
                                    <span>{subItem.name}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                  
                  <div className="mt-8 space-y-2">
                    <Button className="w-full" size="sm">
                      Get Quote
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Contact Us
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
