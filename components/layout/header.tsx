"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

// Types
interface SubItem {
  name: string
  href: string
  description: string
}

interface NavigationItem {
  name: string
  href: string
  subItems: SubItem[]
}

interface DropdownMenuProps {
  item: NavigationItem
  isOpen: boolean
  onClose: () => void
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}
import Link from "next/link"
import { Menu, Phone, ChevronDown, X } from "lucide-react"

const navigationItems = [
  {
    name: "About Us",
    href: "/about",
    subItems: [
      { name: "Our Story", href: "/about/our-story", description: "Learn about our journey and how we started" },
      { name: "Mission & Vision", href: "/about/mission", description: "Our commitment to sustainable energy" },
      { name: "Our Team", href: "/about/team", description: "Meet the experts behind our success" },
      {
        name: "Certifications",
        href: "/about/certifications",
        description: "Our industry certifications and standards",
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
      },
      {
        name: "Captive Power Solutions",
        href: "/services/captive-power",
        description: "Dedicated power systems for businesses",
      },
      {
        name: "Professional Energy Audit",
        href: "/services/energy-audit",
        description: "Comprehensive energy efficiency analysis",
      },
      {
        name: "Installation Services",
        href: "/services/installation",
        description: "Professional setup and configuration",
      },
      { name: "Maintenance & Support", href: "/services/maintenance", description: "Ongoing support and maintenance" },
    ],
  },
  {
    name: "Products",
    href: "/products",
    subItems: [
      { name: "Solar Panels", href: "/products/solar-panels", description: "High-efficiency photovoltaic panels" },
      { name: "Inverters", href: "/products/inverters", description: "Power conversion systems" },
      { name: "Batteries", href: "/products/batteries", description: "Energy storage solutions" },
      { name: "Accessories", href: "/products/accessories", description: "Supporting components and tools" },
      { name: "Complete Systems", href: "/products/systems", description: "Integrated solar power solutions" },
    ],
  },
  {
    name: "Projects", // Added Projects
    href: "/projects",
    subItems: [
      {
        name: "Rural Electrification",
        href: "/projects/rural-electrification",
        description: "Projects bringing power to remote areas",
      },
      {
        name: "Commercial Installations",
        href: "/projects/commercial-installations",
        description: "Solar solutions for businesses",
      },
      {
        name: "Street Lighting",
        href: "/projects/street-lighting",
        description: "Public lighting infrastructure projects",
      },
      {
        name: "Healthcare Projects",
        href: "/projects/healthcare-projects",
        description: "Powering hospitals and clinics",
      },
    ],
  },
  {
    name: "Updates & Media", // Renamed from News & Media
    href: "/updates", // Changed from /news
    subItems: [
      { name: "Latest Updates", href: "/updates/latest", description: "Stay updated with our recent developments" }, // Changed from Latest News
      { name: "Press Releases", href: "/updates/press", description: "Official announcements and updates" }, // Changed from News
      { name: "Case Studies", href: "/updates/case-studies", description: "Real-world implementation stories" }, // Changed from News
      { name: "Media Gallery", href: "/updates/gallery", description: "Photos and videos from our projects" }, // Changed from News
    ],
  },
  {
    name: "Contact Us",
    href: "/contact",
    subItems: [
      { name: "Get Quote", href: "/contact/quote", description: "Request a personalized quote" },
      { name: "Office Locations", href: "/contact/locations", description: "Find our offices near you" },
      { name: "Support", href: "/contact/support", description: "Technical support and assistance" },
      { name: "Careers", href: "/contact/careers", description: "Join our growing team" },
    ],
  },
]

const DropdownMenu: React.FC<DropdownMenuProps> = ({ item, isOpen, onClose }) => {
  return (
    <div
      className={`
      absolute top-full left-0 mt-2 w-full max-w-[600px] min-w-[400px] bg-white rounded-lg shadow-2xl border border-gray-100 
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
                group block p-3 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:shadow-md
                transform hover:scale-105 hover:-translate-y-1
                animate-fadeInUp
              `}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 break-words">
                {subItem.name}
              </div>
              <div className="text-sm text-gray-500 mt-1 group-hover:text-gray-700 transition-colors duration-200 break-words">
                {subItem.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }))
  }

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
        absolute right-0 top-0 h-full w-80 bg-white shadow-2xl
        transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white font-bold">A</div>
              <span className="font-bold text-lg text-gray-900">ACOB LIGHTING</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="animate-slideInRight" style={{ animationDelay: `${index * 100}ms` }}>
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">{item.name}</span>
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
                          block p-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/10 rounded-md 
                          transition-all duration-200 animate-fadeInUp
                        `}
                        style={{
                          animationDelay: `${subIndex * 50}ms`,
                          animationFillMode: "both",
                        }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t">
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center">
              <Phone className="mr-2 h-4 w-4" />
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(itemName)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const handleDropdownClose = () => {
    setActiveDropdown(null)
  }

  return (
    <>
      <header
        className={`
        sticky top-0 z-40 w-full transition-all duration-500 ease-out
        ${
          isScrolled
            ? "bg-white/75 backdrop-blur-3xl shadow-lg border-b border-gray-200/50"
            : "bg-white/95 backdrop-blur-sm border-b border-gray-100/30"
        }
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <img
                src="/images/ACOB.png"
                alt="ACOB Lighting Logo"
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
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-all duration-200 hover:scale-105"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""}`}
                    />
                  </Link>

                  <DropdownMenu item={item} isOpen={activeDropdown === item.name} onClose={handleDropdownClose} />
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                Get Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
