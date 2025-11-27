'use client';

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
import {
  SCROLL_THRESHOLD,
  HEADER_SHOW_THRESHOLD,
  SCROLL_DIFFERENCE_THRESHOLD,
  DROPDOWN_CLOSE_DELAY,
  SCROLL_STOP_TIMEOUT,
} from '@/lib/constants/ui';

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
  const pathname = usePathname();

  const isSubItemActive = (subItemHref: string) => {
    return pathname === subItemHref || pathname.startsWith(`${subItemHref}/`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full left-0 mt-2 w-full max-w-[600px] min-w-[400px] bg-popover dark:bg-popover rounded-lg shadow-2xl border-[0.5px] border-border transition-colors duration-500"
        >
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {item.subItems.map((subItem, index) => {
                const IconComponent = LucideIcons[subItem.icon];
                const isActive = isSubItemActive(subItem.href);
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
                      className={`group block p-3 rounded-lg transition-all duration-500 ${
                        isActive
                          ? 'bg-gradient-to-r from-primary/10 to-primary/15 dark:from-primary/20 dark:to-primary/25 shadow-md scale-105 -translate-y-1 border-l-2 border-primary'
                          : 'hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 dark:hover:bg-zinc-950 hover:shadow-md transform hover:scale-105 hover:-translate-y-1'
                      }`}
                    >
                      <div className="flex gap-3 items-start">
                        {IconComponent && (
                          <div
                            className={`relative w-10 h-10 rounded-full p-2 overflow-hidden transition-all duration-500 flex items-center justify-center ${
                              isActive
                                ? 'bg-primary scale-110'
                                : 'bg-primary/10 group-hover:bg-primary group-hover:scale-110'
                            }`}
                          >
                            {/* Animated fill effect */}
                            {!isActive && (
                              <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                            )}
                            <IconComponent
                              className={`w-5 h-5 relative z-10 transition-colors duration-500 ${
                                isActive
                                  ? 'text-primary-foreground'
                                  : 'text-muted-foreground group-hover:text-primary-foreground'
                              }`}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div
                            className={`text-sm font-bold break-words transition-colors duration-500 ${
                              isActive
                                ? 'text-primary'
                                : 'text-foreground group-hover:text-primary'
                            }`}
                          >
                            {subItem.name}
                          </div>
                          <div
                            className={`text-xs text-left mt-1 break-words transition-colors duration-500 ${
                              isActive
                                ? 'text-foreground'
                                : 'text-muted-foreground group-hover:text-foreground'
                            }`}
                          >
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
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auto-expand parent items if their sub-item is active
  useEffect(() => {
    const autoExpanded: Record<string, boolean> = {};
    navigationItems.forEach(item => {
      const hasActiveSubItem = item.subItems.some(
        subItem =>
          pathname === subItem.href || pathname.startsWith(`${subItem.href}/`),
      );
      if (hasActiveSubItem) {
        autoExpanded[item.name] = true;
      }
    });
    setExpandedItems(autoExpanded);
  }, [pathname]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const isSubItemActive = (subItemHref: string) => {
    return pathname === subItemHref || pathname.startsWith(`${subItemHref}/`);
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
            className="absolute right-0 top-0 h-full w-80 bg-popover shadow-2xl border-l border-border transition-colors duration-500"
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
                    className="h-9 w-auto group-hover:scale-105 transition-transform duration-500"
                    style={{
                      width: '140px',
                      height: '36px',
                      objectFit: 'contain',
                    }}
                  />
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-full transition-all duration-500 hover:scale-110 active:scale-95"
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
                    <div className="flex items-center rounded-lg overflow-hidden border border-transparent hover:border-border/50 transition-all duration-500">
                      {/* Clickable main link */}
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex-1 flex items-center p-3 text-left hover:bg-primary/5 transition-colors duration-500"
                      >
                        <span className="font-medium text-foreground hover:text-primary transition-colors">
                          {item.name}
                        </span>
                      </Link>

                      {/* Expand/collapse button */}
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className="p-3 hover:bg-muted transition-colors duration-500 border-l border-border/20"
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
                              const isActive = isSubItemActive(subItem.href);
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
                                    className={`group flex items-start gap-3 p-3 text-sm rounded-lg transition-all duration-500 ${
                                      isActive
                                        ? 'bg-gradient-to-r from-primary/10 to-primary/15 scale-[1.02] border-l-2 border-primary'
                                        : 'hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:scale-[1.02]'
                                    }`}
                                  >
                                    {IconComponent && (
                                      <div
                                        className={`relative w-8 h-8 rounded-full p-1.5 overflow-hidden transition-all duration-500 flex items-center justify-center flex-shrink-0 ${
                                          isActive
                                            ? 'bg-primary scale-110'
                                            : 'bg-primary/10 group-hover:bg-primary group-hover:scale-110'
                                        }`}
                                      >
                                        {/* Animated fill effect */}
                                        {!isActive && (
                                          <div className="absolute inset-0 bg-primary transform scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-full origin-center" />
                                        )}
                                        <IconComponent
                                          className={`w-4 h-4 relative z-10 transition-colors duration-500 ${
                                            isActive
                                              ? 'text-primary-foreground'
                                              : 'text-muted-foreground group-hover:text-primary-foreground'
                                          }`}
                                        />
                                      </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                      <div
                                        className={`font-medium transition-colors duration-500 break-words ${
                                          isActive
                                            ? 'text-primary'
                                            : 'text-foreground group-hover:text-primary'
                                        }`}
                                      >
                                        {subItem.name}
                                      </div>
                                      <div
                                        className={`text-xs mt-1 break-words leading-relaxed transition-colors duration-500 ${
                                          isActive
                                            ? 'text-foreground/80'
                                            : 'text-muted-foreground group-hover:text-foreground/80'
                                        }`}
                                      >
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
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-lg transition-all duration-500 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group"
                >
                  <Phone className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  Get Quote
                </Link>
                <div className="mt-4 flex justify-center">
                  <ThemeToggle direction="up" />
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

  // Default to light logo for SSR to prevent hydration mismatch
  const logoSrc = !mounted
    ? '/images/acob-logo-light.webp'
    : resolvedTheme === 'dark'
      ? '/images/acob-logo-dark.webp'
      : '/images/acob-logo-light.webp';
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActiveRoute = (item: NavigationItem) => {
    if (pathname === item.href) {
      return true;
    }

    return item.subItems.some(subItem => pathname.startsWith(subItem.href));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      if (scrollDifference < SCROLL_THRESHOLD) {
        return;
      }

      setIsScrolled(currentScrollY > 10);

      const scrollingDown = currentScrollY > lastScrollY;

      if (currentScrollY < HEADER_SHOW_THRESHOLD) {
        setShowHeader(true);
      } else if (scrollingDown && currentScrollY > lastScrollY) {
        if (scrollDifference > SCROLL_DIFFERENCE_THRESHOLD) {
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
      }, SCROLL_STOP_TIMEOUT);
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
    }, DROPDOWN_CLOSE_DELAY);
  };

  const handleDropdownClose = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <header
        className={`
          sticky border-b border-border top-0 z-40 w-full transition-all duration-500 ease-out
          backdrop-blur-md bg-background/80
          ${showHeader ? 'translate-y-0' : '-translate-y-full'}
          ${
            isScrolled
              ? ' backdrop-blur-xl bg-background/95 shadow-lg  border-border '
              : ' backdrop-blur-md bg-background/80  border-border '
          }
        `}
      >
        <Container noPadding className="px-4">
          <div className="flex items-center justify-between h-16">
            <div>
              <Link href="/" className="flex items-center space-x-2 group">
                <Image
                  key={logoSrc}
                  src={logoSrc || '/placeholder.svg'}
                  alt="ACOB Lighting Logo"
                  width={250}
                  height={60}
                  priority
                  className="h-12 w-auto group-hover:scale-105 transition-transform duration-500"
                  style={{
                    width: '180px',
                    height: '40px',
                    objectFit: 'contain',
                  }}
                />
              </Link>
            </div>

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
                        relative flex items-center space-x-1 h-full font-medium transition-all duration-500 ease-out px-2
                        ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}
                      `}
                    >
                      <span>{item.name}</span>
                      <div
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>

                      <div
                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/80 origin-center transition-all duration-300 ease-out ${
                          isActive
                            ? 'scale-x-100 opacity-100'
                            : 'scale-x-0 opacity-0'
                        }`}
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

            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/contact/quote">
                <button className="bg-primary hover:bg-primary text-white font-medium py-2 px-4 rounded-lg hover:shadow-lg flex items-center transition-transform duration-200 hover:scale-105 active:scale-95">
                  <Phone className="mr-2 h-4 w-4" />
                  Get Quote
                </button>
              </Link>
              <ThemeToggle />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-all duration-200 active:scale-90"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        logoSrc={logoSrc}
      />
    </>
  );
}
