'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';
import { navigationItems } from '@/lib/data/navigation-data';
import { LucideIcons } from '@/lib/data/lucide-icons';
import { motion, AnimatePresence } from 'framer-motion';

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
  logoSrc: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 mt-2 w-full max-w-[600px] min-w-[400px] bg-popover dark:bg-popover rounded-lg shadow-2xl border-[0.5px] border-border"
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
                  <motion.div
                    key={subItem.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={subItem.href}
                      onClick={onClose}
                      className="group block p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 dark:hover:bg-zinc-950 hover:shadow-md transform hover:scale-105 hover:-translate-y-1 transition-all duration-200"
                    >
                      <div className="flex gap-3 items-start">
                        {IconComponent && (
                          <IconComponent className="w-12 h-auto text-muted-foreground group-hover:text-primary transition-colors duration-200 mt-0.5" />
                        )}
                        <div>
                          <div className="text-sm font-bold text-foreground group-hover:text-primary break-words">
                            {subItem.name}
                          </div>
                          <div className="text-xs text-left text-muted-foreground mt-1 group-hover:text-foreground break-words">
                            {subItem.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  logoSrc,
}) => {
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-80 bg-popover shadow-2xl border-l border-border"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10"
              >
                <Link href="/" className="flex items-center space-x-2 group">
                  <Image
                    key={logoSrc}
                    src={logoSrc || '/placeholder.svg'}
                    alt="ACOB Lighting Logo"
                    width={140}
                    height={36}
                    priority
                    className="h-9 w-auto group-hover:scale-105 transition-transform duration-200"
                    style={{
                      width: '140px',
                      height: '36px',
                      objectFit: 'contain',
                    }}
                  />
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
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
                        <motion.div
                          animate={{
                            rotate: expandedItems[item.name] ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown
                            className={`h-4 w-4 text-muted-foreground ${
                              expandedItems[item.name] ? 'text-primary' : ''
                            }`}
                          />
                        </motion.div>
                      </button>
                    </div>

                    {/* Sub Items */}
                    <AnimatePresence>
                      {expandedItems[item.name] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden mt-2"
                        >
                          <div className="ml-4 space-y-1 border-l-2 border-primary/20 pl-4">
                            {item.subItems.map((subItem, subIndex) => {
                              const IconComponent = LucideIcons[subItem.icon];
                              return (
                                <motion.div
                                  key={subItem.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.05 }}
                                >
                                  <Link
                                    href={subItem.href}
                                    onClick={onClose}
                                    className="group flex items-start gap-3 p-3 text-sm rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-200 hover:scale-[1.02]"
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
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border-t border-border bg-gradient-to-r from-primary/5 to-primary/10"
              >
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  const logoSrc =
    mounted && resolvedTheme === 'dark'
      ? '/images/acob-logo-dark.webp'
      : '/images/acob-logo-light.webp';

  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActiveRoute = (item: NavigationItem) => {
    if (pathname === item.href) return true;

    return item.subItems.some(subItem => pathname.startsWith(subItem.href));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      if (scrollDifference < 5) return;

      setIsScrolled(currentScrollY > 10);

      const scrollingDown = currentScrollY > lastScrollY;
      setIsScrollingDown(scrollingDown);

      if (currentScrollY < 100) {
        setShowHeader(true);
      } else if (scrollingDown && currentScrollY > lastScrollY) {
        if (scrollDifference > 10) {
          setShowHeader(false);
        }
      } else if (!scrollingDown) {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleScrollStop = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setShowHeader(true);
      }, 1000);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: showHeader ? 0 : -100 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className={`
          fixed top-0 z-40 w-full transition-all duration-300 ease-out
          backdrop-blur-2xl  border-border 
          
          ${
            isScrolled
              ? ' backdrop-blur-3xl bg-white/60 dark:bg-black/60 shadow-lg  border-border '
              : ' backdrop-blur-2xl   border-border '
          }
        `}
      >
        <Container noPadding className="px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center space-x-2 group">
                <Image
                  key={logoSrc}
                  src={logoSrc || '/placeholder.svg'}
                  alt="ACOB Lighting Logo"
                  width={140}
                  height={36}
                  priority
                  className="h-9 w-auto group-hover:scale-105 transition-transform duration-200"
                  style={{
                    width: '140px',
                    height: '36px',
                    objectFit: 'contain',
                  }}
                />
              </Link>
            </motion.div>

            <nav className="hidden lg:flex items-center space-x-8 h-full">
              {navigationItems.map((item, index) => {
                const isActive = isActiveRoute(item);

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={`
                        relative flex items-center space-x-1 h-full font-medium transition-all duration-300 ease-out px-2
                        ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}
                      `}
                    >
                      <span>{item.name}</span>
                      <motion.div
                        animate={{
                          rotate: activeDropdown === item.name ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>

                      <motion.div
                        initial={false}
                        animate={{
                          scaleX: isActive ? 1 : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/80 origin-center"
                      />
                    </Link>

                    <DropdownMenu
                      item={item}
                      isOpen={activeDropdown === item.name}
                      onClose={handleDropdownClose}
                    />
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:flex items-center space-x-4"
            >
              <Link href="/contact/quote">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary hover:bg-primary text-white font-medium py-2 px-4 rounded-lg hover:shadow-lg flex items-center"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Get Quote
                </motion.button>
              </Link>
              <ThemeToggle />
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>
        </Container>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        logoSrc={logoSrc}
      />
    </>
  );
}
