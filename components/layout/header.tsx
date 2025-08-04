'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';
import { navigationItems } from '@/lib/data/navigation-data';
import { LucideIcons } from '@/lib/data/lucide-icons';

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
      fixed inset-0 z-50 lg:hidden
      
      ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
    `}
    >
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/50 backdrop-blur-sm
         =
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`
        absolute right-0 top-0 h-full w-80 bg-popover shadow-2xl
        transform 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        transition-all duration-300 ease-out
      `}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-foreground">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg "
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
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-muted rounded-lg "
                >
                  <span className="font-medium text-foreground">
                    {item.name}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4  ${expandedItems[item.name] ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  className={`
                  overflow-hidden 
                  ${expandedItems[item.name] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
                >
                  <div className="pl-4 pt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => {
                      const IconComponent = LucideIcons[subItem.icon];
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={onClose}
                          className={`
                            flex items-center space-x-3 p-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md 
                             animate-fadeInUp
                          `}
                          style={{
                            animationDelay: `${subIndex * 50}ms`,
                            animationFillMode: 'both',
                          }}
                        >
                          {IconComponent && (
                            <IconComponent className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                          )}
                          <span>{subItem.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t">
            <Link
              href="/contact/quote"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg  hover:shadow-lg hover:scale-105 flex items-center justify-center"
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
  const [logoSrc, setLogoSrc] = useState('/images/ACOB.png'); // Default logo
  const { resolvedTheme } = useTheme();

  // Wait for theme to be resolved on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update logo when theme changes
  useEffect(() => {
    if (mounted && resolvedTheme) {
      const newLogoSrc =
        resolvedTheme === 'dark' ? '/images/ACOB-Logo.png' : '/images/ACOB.png';
      setLogoSrc(newLogoSrc);
    }
  }, [mounted, resolvedTheme]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <>
      <header
        className={`
        sticky top-0 z-40 w-full  ease-out
        bg-background/95 backdrop-blur-sm border-b-[2px] border-border
        dark:bg-black 
        ${
          isScrolled
            ? 'bg-background/75 backdrop-blur-3xl shadow-lg border-b-[1px] border-border dark:bg-background'
            : 'bg-background/95 backdrop-blur-sm border-b border-border dark:bg-background'
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
                className="h-8 w-auto  group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map(item => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 text-foreground hover:text-primary font-medium  hover:scale-105"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`h-4 w-4  ${activeDropdown === item.name ? 'rotate-180' : ''}`}
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
