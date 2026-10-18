'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ChevronDown, ChevronRight, Menu, X, Package } from 'lucide-react';
import { navigationItems } from '@/lib/data/navigation-data';
import { LucideIcons } from '@/lib/data/lucide-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteReveal } from '@/components/loader/site-reveal-provider';
import {
  isChristmasPeriod,
  isTemporary2026LogoPeriod,
} from '@/lib/utils/christmas-period';
import {
  SCROLL_THRESHOLD,
  HEADER_SHOW_THRESHOLD,
  SCROLL_DIFFERENCE_THRESHOLD,
  DROPDOWN_CLOSE_DELAY,
  SCROLL_STOP_TIMEOUT,
} from '@/lib/constants/ui';

const LOGO_2026_VERSION = '3';

interface SubSubItem {
  name: string;
  href: string;
  description?: string;
  icon?: string; // Lucide icon name
}

interface SubItem {
  name: string;
  href: string;
  description: string;
  icon: string; // Lucide icon name
  subItems?: SubSubItem[]; // optional nested sub-categories (e.g. Healthcare → Primary/Tertiary)
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
  useTallAnniversaryLogo: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const pathname = usePathname();

  // Every dropdown opens from the top-left, anchored under its trigger's
  // label (left-2 offsets the trigger's px-2 padding). For items near the
  // right edge, a left-anchored panel can run off-screen, so we measure it
  // once on open and nudge it left just enough to fit — keeping the top-left
  // origin instead of flipping to a right anchor.
  const panelRef = useRef<HTMLDivElement>(null);
  const [shiftX, setShiftX] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setShiftX(0);
      return;
    }
    const el = panelRef.current;
    if (!el || typeof window === 'undefined') {
      return;
    }
    const gutter = 16;
    const overflow =
      el.getBoundingClientRect().right - (window.innerWidth - gutter);
    if (overflow > 0) {
      setShiftX(-(overflow + 8));
    }
  }, [isOpen]);

  const isSubItemActive = (subItemHref: string) => {
    return pathname === subItemHref || pathname.startsWith(`${subItemHref}/`);
  };

  // Which category is showing in the right pane. Defaults to the active
  // route's category, otherwise the first one.
  const activeIndexForPath = Math.max(
    0,
    item.subItems.findIndex(subItem => isSubItemActive(subItem.href)),
  );
  const [activeIndex, setActiveIndex] = useState(activeIndexForPath);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(activeIndexForPath);
    }
  }, [isOpen, activeIndexForPath]);

  const activeSub = item.subItems[activeIndex] ?? item.subItems[0];
  const activeChildren = activeSub?.subItems ?? [];

  // Only Projects has real sub-categories today. Flat menus (About, Services,
  // Updates, Contact) don't need a right pane to reveal anything — show all
  // items in a panel sized to their own content instead (1 column for short
  // lists, 2 for longer ones) rather than forcing every dropdown to match
  // width with the Projects flyout.
  const isHierarchical = item.subItems.some(
    subItem => subItem.subItems && subItem.subItems.length > 0,
  );

  if (!isHierarchical) {
    const useTwoColumns = item.subItems.length > 4;
    const half = Math.ceil(item.subItems.length / 2);
    const columns = useTwoColumns
      ? [item.subItems.slice(0, half), item.subItems.slice(half)]
      : [item.subItems];

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            style={{ marginLeft: shiftX }}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute top-full left-2 mt-2 grid overflow-hidden rounded-xl border-[0.5px] border-border bg-popover p-3 shadow-2xl ${
              useTwoColumns
                ? 'w-[560px] grid-cols-2 gap-x-4'
                : 'w-[300px] grid-cols-1'
            }`}
          >
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-1">
                {column.map(subItem => {
                  const IconComponent = LucideIcons[subItem.icon];
                  const isActive = isSubItemActive(subItem.href);
                  return (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      onClick={onClose}
                      className={`group flex items-start gap-3 rounded-lg p-2.5 transition-all duration-200 ${
                        isActive
                          ? 'bg-accent shadow-sm'
                          : 'hover:bg-accent hover:shadow-sm'
                      }`}
                    >
                      {IconComponent && (
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                          }`}
                        >
                          <IconComponent className="h-[18px] w-[18px]" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-sm font-semibold transition-colors duration-200 ${
                            isActive
                              ? 'text-primary'
                              : 'text-foreground group-hover:text-primary'
                          }`}
                        >
                          {subItem.name}
                        </div>
                        <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {subItem.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          ref={panelRef}
          style={{ marginLeft: shiftX }}
          className="absolute top-full left-2 mt-2 grid w-[720px] grid-cols-[300px_1fr] overflow-hidden rounded-xl border-[0.5px] border-border bg-popover shadow-2xl"
        >
          {/* Left rail: categories */}
          <div className="border-r-[0.5px] border-border bg-muted/30 p-2 rounded-lg">
            {item.subItems.map((subItem, index) => {
              const IconComponent = LucideIcons[subItem.icon];
              const isActive = isSubItemActive(subItem.href);
              const isHighlighted = index === activeIndex;
              const hasChildren =
                subItem.subItems && subItem.subItems.length > 0;
              return (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  onClick={onClose}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group flex items-start gap-3 rounded-lg p-2.5 transition-colors duration-200 ${
                    isHighlighted ? 'bg-accent shadow-sm' : 'hover:bg-accent/60'
                  }`}
                >
                  {IconComponent && (
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                        isHighlighted || isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <IconComponent className="h-[18px] w-[18px]" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-semibold transition-colors duration-200 ${
                          isHighlighted || isActive
                            ? 'text-primary'
                            : 'text-foreground group-hover:text-primary'
                        }`}
                      >
                        {subItem.name}
                      </span>
                      {hasChildren && (
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition-colors duration-200 ${
                            isHighlighted
                              ? 'text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      )}
                    </div>
                    <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {subItem.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right pane: sub-categories or category summary */}
          <div className="p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSub?.name}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {activeSub?.name}
                  </p>
                  <Link
                    href={activeSub?.href ?? item.href}
                    onClick={onClose}
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    View all
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {activeChildren.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {activeChildren.map(child => {
                      const ChildIcon = child.icon
                        ? LucideIcons[child.icon]
                        : undefined;
                      const childActive = isSubItemActive(child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={`group flex flex-col gap-2 rounded-xl border-[0.5px] p-3.5 transition-all duration-200 ${
                            childActive
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md'
                          }`}
                        >
                          {ChildIcon && (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                              <ChildIcon className="h-[18px] w-[18px]" />
                            </div>
                          )}
                          <div className="text-sm font-bold text-foreground group-hover:text-primary">
                            {child.name}
                          </div>
                          {child.description && (
                            <div className="text-xs leading-relaxed text-muted-foreground">
                              {child.description}
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <Link
                    href={activeSub?.href ?? item.href}
                    onClick={onClose}
                    className="group flex h-full flex-col justify-center gap-2 rounded-xl border-[0.5px] border-border p-5 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
                  >
                    <div className="text-sm font-bold text-foreground group-hover:text-primary">
                      {activeSub?.description}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-primary">
                      Explore {activeSub?.name}
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
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
  useTallAnniversaryLogo,
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

  const mobileLogoWidth = useTallAnniversaryLogo ? 184 : 140;
  const mobileLogoHeight = useTallAnniversaryLogo ? 52 : 36;

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
                className={`flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/5 to-primary/10 ${
                  useTallAnniversaryLogo ? 'px-5 py-4' : 'p-6'
                }`}
              >
                <Link href="/" className="flex items-center space-x-2 group">
                  <Image
                    key={logoSrc}
                    src={logoSrc || '/placeholder.svg'}
                    alt="ACOB Lighting Logo"
                    width={mobileLogoWidth}
                    height={mobileLogoHeight}
                    priority
                    data-no-protection="true"
                    className={`w-auto group-hover:scale-105 transition-transform duration-500 ${
                      useTallAnniversaryLogo ? 'h-[52px]' : 'h-9'
                    }`}
                    style={{
                      width: `${mobileLogoWidth}px`,
                      height: `${mobileLogoHeight}px`,
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

                                  {/* Nested sub-categories */}
                                  {subItem.subItems &&
                                    subItem.subItems.length > 0 && (
                                      <div className="ml-8 mt-1 mb-1 flex flex-col border-l border-border pl-3">
                                        {subItem.subItems.map(child => {
                                          const childActive = isSubItemActive(
                                            child.href,
                                          );
                                          return (
                                            <Link
                                              key={child.href}
                                              href={child.href}
                                              onClick={onClose}
                                              className={`group/child relative flex items-center gap-2.5 rounded-md py-2.5 pl-3 pr-2 text-sm font-medium transition-all duration-300 ${
                                                childActive
                                                  ? 'bg-primary/10 text-primary'
                                                  : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                                              }`}
                                            >
                                              <span
                                                className={`absolute -left-[13px] h-px w-3 transition-colors duration-300 ${
                                                  childActive
                                                    ? 'bg-primary'
                                                    : 'bg-border'
                                                }`}
                                              />
                                              <span
                                                className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                                                  childActive
                                                    ? 'bg-primary'
                                                    : 'bg-muted-foreground/40'
                                                }`}
                                              />
                                              <span className="flex-1">
                                                {child.name}
                                              </span>
                                              <ChevronRight
                                                className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                                                  childActive
                                                    ? 'translate-x-0 opacity-100'
                                                    : 'opacity-40'
                                                }`}
                                              />
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    )}
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
                  href="/products"
                  onClick={onClose}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-lg transition-all duration-500 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group"
                >
                  <Package className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  Products
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
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  // Check if we're in Christmas period
  const isChristmas = isChristmasPeriod();
  const use2026Logo = isTemporary2026LogoPeriod();
  const useTallAnniversaryLogo = use2026Logo && !isChristmas;
  const hasSolidHeader =
    isScrolled || isHeaderHovered || Boolean(activeDropdown);
  const logoTheme = hasSolidHeader ? resolvedTheme : 'dark';

  // Default to hero-safe logo for SSR to prevent hydration mismatch
  const logoSrc = !mounted
    ? isChristmas
      ? '/images/acob-logo-dark-christmas.png'
      : use2026Logo
        ? `/images/acob-logo-dark-2026.png?v=${LOGO_2026_VERSION}`
        : '/images/acob-logo-dark.png'
    : isChristmas
      ? logoTheme === 'dark'
        ? '/images/acob-logo-dark-christmas.png'
        : '/images/acob-logo-light-christmas.png'
      : logoTheme === 'dark'
        ? use2026Logo
          ? `/images/acob-logo-dark-2026.png?v=${LOGO_2026_VERSION}`
          : '/images/acob-logo-dark.png'
        : use2026Logo
          ? `/images/acob-logo-light-2026.png?v=${LOGO_2026_VERSION}`
          : '/images/acob-logo-light.png';
  const [showHeader, setShowHeader] = useState(true);
  const { revealed } = useSiteReveal();
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isActiveRoute = (item: NavigationItem) => {
    if (pathname === item.href) {
      return true;
    }

    return item.subItems.some(subItem => pathname.startsWith(subItem.href));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // The header lives in the shared (site) layout, which Next.js does NOT
  // remount between page navigations — only `pathname` changes. isScrolled
  // otherwise only updates from a 'scroll' event, so if the previous page
  // left it "solid" (or "transparent") and the new page's actual scroll
  // position disagrees, the header can show the wrong state until the user
  // scrolls again. Resync directly against window.scrollY on every route
  // change so each page always starts from its own real scroll position.
  useEffect(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 10);
    setLastScrollY(currentScrollY);
    setShowHeader(true);
  }, [pathname]);

  // isHeaderHovered has the same staleness problem, for a different reason:
  // mouseenter/mouseleave only fire when the pointer *moves*, but what sits
  // under a stationary pointer changes whenever this subtree does. Clicking a
  // link inside a dropdown unmounts the panel under the cursor, so the pointer
  // ends up over page content while the header — having received no mouseleave —
  // stays "hovered", and therefore solid, indefinitely.
  //
  // So don't treat the events as the state. mouseenter/mouseleave stay as the
  // fast path, and this re-reads the truth from the DOM — :hover is maintained
  // by the browser and matches on ancestors, so the header reads as hovered
  // while a dropdown panel (its descendant) is hovered too — whenever the
  // subtree changes shape under a possibly-stationary pointer.
  const syncHeaderHover = useCallback(() => {
    const el = headerRef.current;
    // Touch browsers leave :hover stuck on whatever was last tapped, and a
    // solid-on-hover header is meaningless without a real pointer anyway.
    const canHover = window.matchMedia('(hover: hover)').matches;
    setIsHeaderHovered(canHover && Boolean(el?.matches(':hover')));
  }, []);

  useEffect(() => {
    // A close timer armed on the page we just left must not fire into the new
    // one and clear a dropdown the user has since reopened.
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(null);
    // Links inside the mobile menu close it themselves, but back/forward and
    // any other navigation that doesn't originate from one would otherwise
    // leave it open — with body scroll still locked — over the new page.
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const lastPathRef = useRef(pathname);

  useEffect(() => {
    const navigated = lastPathRef.current !== pathname;
    lastPathRef.current = pathname;

    if (navigated) {
      // A hard reset, not a re-read. Nothing observable is trustworthy this
      // early: the panel is still mounted (AnimatePresence is animating it out)
      // and Chrome still reports the header as :hover until the next hit-test.
      // Both would say "hovered" — which is the bug. A new page must never
      // inherit the previous page's hover state.
      setIsHeaderHovered(false);
    } else if (!activeDropdown) {
      // A panel just closed without navigating (the active route's own link,
      // Escape, the close delay). Re-read rather than force false, so a pointer
      // genuinely resting on the header doesn't flicker to transparent.
      syncHeaderHover();
    }

    // Either way, the next pointer movement gives the browser a hit-test to
    // settle :hover against — read it once more then, so a cursor left sitting
    // on the header comes back solid and one left off it stays transparent.
    const onPointerMove = () => syncHeaderHover();
    window.addEventListener('pointermove', onPointerMove, {
      once: true,
      passive: true,
    });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [pathname, activeDropdown, syncHeaderHover]);

  // Nothing else clears the dropdown close timer, so a pending one outlives the
  // component on unmount.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // The announcement banner sits in normal flow above this fixed header. Pin the
  // header's top to the banner's current bottom edge so it renders just below the
  // banner and rises to the top as the banner scrolls out of view.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) {
      return;
    }

    let raf = 0;
    const measure = () => {
      raf = 0;
      const banner = document.querySelector('[data-announcement-banner]');
      const bottom = banner
        ? Math.max(0, banner.getBoundingClientRect().bottom)
        : 0;
      el.style.top = `${bottom}px`;
    };
    const schedule = () => {
      if (!raf) {
        raf = requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    /* eslint-disable no-undef */
    let resizeObserver: ResizeObserver | undefined;
    const banner = document.querySelector('[data-announcement-banner]');
    if (banner && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(banner);
    }
    /* eslint-enable no-undef */

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) {
        cancelAnimationFrame(raf);
      }
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Ignore scroll events fired by a body-scroll-lock (chat bot / mobile
      // menu). Those set body to position:fixed with a negative top, which
      // momentarily resets window.scrollY to 0 — without this guard the header
      // would read 0 and drop to its transparent (at-top) state even when the
      // page is scrolled down behind the overlay. Freeze the scrolled state
      // while locked; it recomputes when the lock is released and scroll is
      // restored.
      if (document.body.style.position === 'fixed') {
        return;
      }

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
        ref={headerRef}
        className={`
          fixed inset-x-0 top-0 z-40 w-full transition-all duration-500 ease-out
          ${showHeader && revealed ? 'translate-y-0' : '-translate-y-full'}
          ${
            hasSolidHeader
              ? ' border-b border-border/50 backdrop-blur-xl bg-background/95 shadow-sm '
              : ' border-b border-transparent bg-transparent '
          }
        `}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      >
        <Container noPadding className="px-4">
          <div
            className={`flex items-center justify-between ${
              useTallAnniversaryLogo ? 'h-[68px]' : 'h-16'
            }`}
          >
            <div>
              <Link href="/" className="flex items-center space-x-2 group">
                <Image
                  key={logoSrc}
                  src={logoSrc || '/placeholder.svg'}
                  alt="ACOB Lighting Logo"
                  width={useTallAnniversaryLogo ? 228 : 180}
                  height={useTallAnniversaryLogo ? 58 : 40}
                  priority
                  data-no-protection="true"
                  className={`w-auto group-hover:scale-105 transition-transform duration-500 ${
                    useTallAnniversaryLogo ? 'h-[58px]' : 'h-12'
                  }`}
                  style={{
                    width: useTallAnniversaryLogo ? '228px' : '180px',
                    height: useTallAnniversaryLogo ? '58px' : '40px',
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
                        ${
                          // Over a hero photo, green text has no contrast:
                          // stay white and let the underline mark the page.
                          hasSolidHeader
                            ? isActive
                              ? 'text-primary'
                              : 'text-foreground hover:text-primary'
                            : isActive
                              ? 'text-white'
                              : 'text-white hover:text-white/75'
                        }
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
              <Link href="/products">
                <button className="bg-primary hover:bg-primary text-white font-medium py-2 px-4 rounded-lg hover:shadow-lg flex items-center transition-transform duration-200 hover:scale-105 active:scale-95">
                  <Package className="mr-2 h-4 w-4" />
                  Products
                </button>
              </Link>
              <div className={hasSolidHeader ? undefined : 'text-white'}>
                <ThemeToggle />
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 active:scale-90 ${
                hasSolidHeader
                  ? 'hover:bg-muted'
                  : 'text-white hover:bg-white/10'
              }`}
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
        useTallAnniversaryLogo={useTallAnniversaryLogo}
      />
    </>
  );
}
