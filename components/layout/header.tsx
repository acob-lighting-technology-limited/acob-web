'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';
import { navigationItems } from '@/lib/data/navigation-data';
import { LucideIcons } from '@/lib/data/lucide-icons';
import { HiringAnnouncementBanner } from '../ui/announcement-banner';

interface SubItem {
  name: string;
  href: string;
  description: string;
  icon: string; // Lucide icon name
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

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`
              absolute top-full left-0 mt-2 w-full max-w-[600px] min-w-[400px] bg-popover dark:bg-popover rounded-lg shadow-2xl border-[0.5px] border-border 
      transform  origin-top
      ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
    `}
      style={{
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {item.subItems.map((subItem, index) => {
            const IconComponent = LucideIcons[subItem.icon];
            return (
              <Link
                key={subItem.name}
                href={subItem.href}
                onClick={onClose}
                className={`
                  group block p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 dark:hover:bg-zinc-950 hover:shadow-md
                  transform hover:scale-105 hover:-translate-y-1
                  animate-fadeInUp
                `}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: 'both',
                }}
              >
                <div className="flex gap-3 items-start">
                  {IconComponent && (
                    <IconComponent className="w-12 h-auto text-muted-foreground group-hover:text-primary transition-colors duration-200 mt-0.5" />
                  )}
                  <div>
                    <div className=" text-sm font-bold text-foreground group-hover:text-primary break-words">
                      {subItem.name}
                    </div>
                    <div className="text-xs text-left text-muted-foreground mt-1 group-hover:text-foreground break-words">
                      {subItem.description}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
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
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-out
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
    >
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`
          absolute right-0 top-0 h-full w-80 bg-popover shadow-2xl border-l border-border
          transform transition-all duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
            <h2 className="text-xl font-bold text-foreground">Navigation</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigationItems.map((item, index) => (
              <div
                key={item.name}
                className="animate-slideInRight"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                {/* Main Navigation Item */}
                <div className="flex items-center rounded-lg overflow-hidden border border-transparent hover:border-border/50 transition-all duration-200">
                  {/* Clickable main link */}
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex-1 flex items-center p-3 text-left hover:bg-primary/5 transition-colors duration-200"
                  >
                    <span className="font-medium text-foreground hover:text-primary transition-colors">
                      {item.name}
                    </span>
                  </Link>

                  {/* Expand/collapse button */}
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className="p-3 hover:bg-muted transition-colors duration-200 border-l border-border/20"
                    aria-label={`${expandedItems[item.name] ? 'Collapse' : 'Expand'} ${item.name} menu`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-all duration-200 ${
                        expandedItems[item.name]
                          ? 'rotate-180 text-primary'
                          : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Sub Items */}
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-out
                    ${
                      expandedItems[item.name]
                        ? 'max-h-96 opacity-100 mt-2'
                        : 'max-h-0 opacity-0 mt-0'
                    }
                  `}
                >
                  <div className="ml-4 space-y-1 border-l-2 border-primary/20 pl-4">
                    {item.subItems.map((subItem, subIndex) => {
                      const IconComponent = LucideIcons[subItem.icon];
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={onClose}
                          className={`
                            group flex items-start gap-3 p-3 text-sm rounded-lg
                            hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10
                            transition-all duration-200 hover:scale-[1.02]
                            animate-fadeInUp
                          `}
                          style={{
                            animationDelay: `${index * 100 + subIndex * 50}ms`,
                            animationFillMode: 'both',
                          }}
                        >
                          {IconComponent && (
                            <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-foreground group-hover:text-primary transition-colors break-words">
                              {subItem.name}
                            </div>
                            <div className="text-xs text-muted-foreground group-hover:text-foreground/80 mt-1 break-words leading-relaxed">
                              {subItem.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-gradient-to-r from-primary/5 to-primary/10">
            <Link
              href="/contact/quote"
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group"
            >
              <Phone className="mr-2 h-4 w-4 group-hover:animate-pulse" />
              Get Quote
            </Link>
            <div className="mt-4 flex justify-center">
              <ThemeToggle />
            </div>
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
  const [logoSrc, setLogoSrc] = useState('/images/acob-logo-light.png'); // Default logo
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  // Smart scroll behavior states
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to check if a navigation item is active
  const isActiveRoute = (item: NavigationItem) => {
    // Check if current path exactly matches the main route
    if (pathname === item.href) return true;

    // Check if current path matches any subroute
    return item.subItems.some(subItem => pathname.startsWith(subItem.href));
  };

  // Wait for theme to be resolved on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update logo when theme changes
  useEffect(() => {
    if (mounted && resolvedTheme) {
      const newLogoSrc =
        resolvedTheme === 'dark'
          ? '/images/acob-logo-dark.png'
          : '/images/acob-logo-light.png';
      setLogoSrc(newLogoSrc);
    }
  }, [mounted, resolvedTheme]);

  // Enhanced scroll handling with smart show/hide behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      // Only update if scroll difference is significant (reduces jitter)
      if (scrollDifference < 5) return;

      // Update scroll state for styling
      setIsScrolled(currentScrollY > 10);

      // Determine scroll direction
      const scrollingDown = currentScrollY > lastScrollY;
      setIsScrollingDown(scrollingDown);

      // Show/hide logic
      if (currentScrollY < 100) {
        // Always show header near the top
        setShowHeader(true);
      } else if (scrollingDown && currentScrollY > lastScrollY) {
        // Hide when scrolling down (with threshold to prevent hiding on small movements)
        if (scrollDifference > 10) {
          setShowHeader(false);
        }
      } else if (!scrollingDown) {
        // Show when scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Separate function to handle scroll stop detection
    const handleScrollStop = () => {
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Show header after user stops scrolling for 1 second
      scrollTimeoutRef.current = setTimeout(() => {
        setShowHeader(true);
      }, 1000);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
      // Handle scroll stop detection on every scroll event
      handleScrollStop();
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

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

  return (
    <>
      <header
        className={`
          sticky top-0 z-40 w-full transition-all duration-300 ease-out
          bg-background/95 backdrop-blur-sm border-b-[2px] border-border
          dark:bg-black 
          ${showHeader ? 'translate-y-0' : '-translate-y-full'}
          ${
            isScrolled
              ? 'bg-background/75 backdrop-blur-3xl shadow-lg border-b-[1px] border-border dark:bg-background'
              : 'bg-background/95 backdrop-blur-sm border-b border-border dark:bg-background'
          }
        `}
      >
        <HiringAnnouncementBanner />

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
                className="h-8 w-auto group-hover:scale-105"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 h-full">
              {navigationItems.map(item => {
                const isActive = isActiveRoute(item);

                return (
                  <div
                    key={item.name}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={`
                        relative flex items-center space-x-1 h-full font-medium transition-all duration-300 ease-out px-2
                        ${
                          isActive
                            ? 'text-primary'
                            : 'text-foreground hover:text-primary'
                        }
                      `}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />

                      {/* Active route indicator - smooth animated border */}
                      <div
                        className={`
                          absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/80 
                          transform origin-center transition-all duration-300 ease-out
                          ${
                            isActive
                              ? 'scale-x-100 opacity-100'
                              : 'scale-x-0 opacity-0'
                          }
                        `}
                      />

                      {/* Hover indicator - subtle underline effect */}
                      <div
                        className={`
                          absolute bottom-0 left-0 right-0 h-px bg-primary/30
                          transform origin-center transition-all duration-200 ease-out
                          ${
                            !isActive && activeDropdown !== item.name
                              ? 'hover:scale-x-100 hover:opacity-100 scale-x-0 opacity-0'
                              : 'scale-x-0 opacity-0'
                          }
                        `}
                      />
                    </Link>

                    <DropdownMenu
                      item={item}
                      isOpen={activeDropdown === item.name}
                      onClose={handleDropdownClose}
                    />
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/contact/quote">
                <button className="bg-primary hover:bg-primary text-white font-medium py-2 px-4 rounded-lg  hover:shadow-lg hover:scale-105 flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Get Quote
                </button>
              </Link>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg  hover:scale-105"
              aria-label="Open mobile menu"
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
