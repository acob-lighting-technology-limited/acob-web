/**
 * Application Constants
 *
 * Central location for all application-wide constants.
 * Organized by domain for easy maintenance.
 */

// ============================================================================
// COMPANY INFORMATION
// ============================================================================

export const COMPANY_INFO = {
  name: 'ACOB Lighting Technology Limited',
  legalName: 'ACOB Lighting Technology Limited',
  tagline: 'Lighting Up Nigeria with Advanced Solar Solutions',
  foundedYear: 2016,
  ceo: 'Mr. Alexander Chinedu Obiechina',
  registrationNumber: 'RC 1234567', // Update with actual RC number
} as const;

export const CONTACT_INFO = {
  phone: {
    primary: '+234 704 920 2634',
    secondary: '+234 803 290 2825',
    formatted: {
      primary: '+234 704 920 2634',
      secondary: '+234 803 290 2825',
    },
  },
  email: {
    general: 'info@acoblighting.com',
    support: 'support@acoblighting.com',
    sales: 'sales@acoblighting.com',
    careers: 'careers@acoblighting.com',
  },
  address: {
    street: 'Plot 2, Block 14 Extension',
    area: 'Federal Ministry of Works & Housing Sites and Service Scheme',
    landmark: 'Setraco Gate',
    city: 'Gwarinpa',
    state: 'Abuja',
    country: 'Nigeria',
    full: 'Plot 2, Block 14 Extension, Federal Ministry of Works & Housing Sites and Service Scheme, Setraco Gate, Gwarinpa, Abuja, Nigeria',
  },
  workHours: {
    weekdays: 'Monday – Friday, 8:00 AM – 5:00 PM',
    weekends: 'Closed',
  },
  website: 'https://www.acoblighting.com',
} as const;

export const SOCIAL_MEDIA = {
  facebook: {
    url: 'https://www.facebook.com/acoblightingtechltd',
    handle: '@acoblightingtechltd',
  },
  twitter: {
    url: 'https://x.com/acoblimited',
    handle: '@acoblimited',
  },
  linkedin: {
    url: 'https://www.linkedin.com/company/acob-lighting-technology-limited/',
    handle: 'ACOB Lighting Technology Limited',
  },
  instagram: {
    url: 'https://www.instagram.com/acob_lighting/',
    handle: '@acob_lighting',
  },
} as const;

// ============================================================================
// STATISTICS & METRICS
// ============================================================================

export const COMPANY_STATISTICS = {
  projectsCompleted: 120,
  totalCapacityInstalled: '10MW+',
  communitiesServed: 100,
  yearsOfExperience: 10,
  statesServed: 15,
  teamSize: 50,
} as const;

// ============================================================================
// PAGINATION
// ============================================================================

export const PAGINATION = {
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
  PROJECTS_PER_PAGE: 12,
  UPDATES_PER_PAGE: 12,
  PRODUCTS_PER_PAGE: 12,
  SEARCH_RESULTS_PER_PAGE: 20,
} as const;

// ============================================================================
// REVALIDATION (ISR)
// ============================================================================

export const REVALIDATION = {
  /** Static pages that rarely change (1 hour) */
  STATIC_PAGES: 3600,
  /** Dynamic pages with regular updates (5 minutes) */
  DYNAMIC_PAGES: 300,
  /** Frequently updated content (1 minute) */
  FREQUENTLY_UPDATED: 60,
  /** Real-time content (no cache) */
  REAL_TIME: 0,
  /** Long-term cache (1 day) */
  LONG_TERM: 86400,
} as const;

// ============================================================================
// Z-INDEX LAYERS
// ============================================================================

export const Z_INDEX = {
  /** Lightbox, modals, and overlays */
  MODAL: 9999,
  /** Dropdown menus */
  DROPDOWN: 1000,
  /** Sticky header */
  HEADER: 100,
  /** Tooltips */
  TOOLTIP: 50,
  /** Default layer */
  BASE: 1,
  /** Behind content */
  BEHIND: -1,
} as const;

// ============================================================================
// ANIMATION DURATIONS (milliseconds)
// ============================================================================

export const ANIMATION = {
  /** Fast animations (button hover, etc.) */
  FAST: 150,
  /** Normal animations (modals, dropdowns) */
  NORMAL: 300,
  /** Slow animations (page transitions) */
  SLOW: 500,
  /** Extra slow (complex animations) */
  EXTRA_SLOW: 800,
  /** Slide transition duration */
  SLIDE_DURATION: 500,
  /** Fade transition duration */
  FADE_DURATION: 300,
} as const;

// ============================================================================
// BREAKPOINTS (matches Tailwind config)
// ============================================================================

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// ============================================================================
// IMAGE OPTIMIZATION
// ============================================================================

export const IMAGE_QUALITY = {
  THUMBNAIL: 60,
  CARD: 75,
  HERO: 85,
  LIGHTBOX: 95,
  FULL: 98,
} as const;

export const IMAGE_SIZES = {
  THUMBNAIL: { width: 150, height: 150 },
  CARD: { width: 400, height: 300 },
  HERO: { width: 1920, height: 1080 },
  LIGHTBOX: { width: 2560, height: 1440 },
} as const;

// ============================================================================
// API RATE LIMITING
// ============================================================================

export const RATE_LIMITS = {
  CONTACT_FORM: {
    requests: 5,
    windowMs: 3600000, // 1 hour
  },
  CHAT_API: {
    requests: 20,
    windowMs: 3600000, // 1 hour
  },
  SEARCH_API: {
    requests: 100,
    windowMs: 3600000, // 1 hour
  },
  JOB_APPLICATION: {
    requests: 3,
    windowMs: 86400000, // 24 hours
  },
} as const;

// ============================================================================
// FORM VALIDATION
// ============================================================================

export const VALIDATION = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  EMAIL: {
    MAX_LENGTH: 255,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 20,
  },
  MESSAGE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
  },
  COMMENT: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 500,
  },
} as const;

// ============================================================================
// PROJECT CATEGORIES
// ============================================================================

export const PROJECT_CATEGORIES = {
  MINI_GRID: 'Mini-Grid',
  STREET_LIGHTING: 'Street Lighting',
  SOLAR_HOME_SYSTEM: 'Solar Home System',
  COMMERCIAL: 'Commercial Solar',
  INDUSTRIAL: 'Industrial Solar',
  AGRICULTURAL: 'Agricultural Solar',
  EDUCATIONAL: 'Educational Institution',
  HEALTHCARE: 'Healthcare Facility',
  GOVERNMENT: 'Government Project',
  RESIDENTIAL: 'Residential',
} as const;

// ============================================================================
// PRODUCT CATEGORIES
// ============================================================================

export const PRODUCT_CATEGORIES = {
  SOLAR_PANEL: 'solar-panel',
  BATTERY: 'battery',
  INVERTER: 'inverter',
  CHARGE_CONTROLLER: 'charge-controller',
  ACCESSORIES: 'accessories',
} as const;

export const PRODUCT_AVAILABILITY = {
  IN_STOCK: 'in-stock',
  OUT_OF_STOCK: 'out-of-stock',
  PRE_ORDER: 'pre-order',
  COMING_SOON: 'coming-soon',
} as const;

// ============================================================================
// UPDATE/BLOG CATEGORIES
// ============================================================================

export const UPDATE_CATEGORIES = {
  NEWS: 'News',
  PROJECT_UPDATE: 'Project Update',
  COMPANY_NEWS: 'Company News',
  INDUSTRY_INSIGHTS: 'Industry Insights',
  SUSTAINABILITY: 'Sustainability',
  TECHNOLOGY: 'Technology',
  CASE_STUDY: 'Case Study',
  ANNOUNCEMENT: 'Announcement',
} as const;

// ============================================================================
// JOB TYPES
// ============================================================================

export const JOB_TYPES = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship',
  REMOTE: 'Remote',
} as const;

export const JOB_DEPARTMENTS = {
  ENGINEERING: 'Engineering',
  SALES: 'Sales & Marketing',
  OPERATIONS: 'Operations',
  FINANCE: 'Finance & Accounting',
  HR: 'Human Resources',
  IT: 'Information Technology',
  ADMIN: 'Administration',
} as const;

// ============================================================================
// NIGERIAN STATES
// ============================================================================

export const NIGERIAN_STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
] as const;

// ============================================================================
// SEO & METADATA
// ============================================================================

export const SEO = {
  DEFAULT_TITLE:
    'ACOB Lighting Technology Limited - Leading Solar Energy Solutions',
  TITLE_TEMPLATE: '%s | ACOB Lighting',
  DEFAULT_DESCRIPTION:
    'ACOB Lighting Technology Limited is a leading supplier of solar materials for manufacturers, installers & contractors. We provide mini-grid solutions, street lighting infrastructure, and comprehensive solar energy services across Nigeria.',
  DEFAULT_OG_IMAGE: '/images/og-image.jpg',
  TWITTER_HANDLE: '@acoblimited',
  SITE_NAME: 'ACOB Lighting Technology Limited',
} as const;

// ============================================================================
// EXTERNAL LINKS
// ============================================================================

export const EXTERNAL_LINKS = {
  SANITY_STUDIO: '/studio',
  VERCEL_ANALYTICS: 'https://vercel.com/analytics',
  GOOGLE_MAPS: 'https://maps.google.com/?q=ACOB+Lighting+Gwarinpa+Abuja',
} as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  VALIDATION: 'Please check your input and try again.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  CONTACT_FORM: 'Thank you for contacting us! We will get back to you soon.',
  JOB_APPLICATION: 'Your application has been submitted successfully!',
  SUBSCRIPTION: 'You have been subscribed to our newsletter!',
  COMMENT_SUBMITTED: 'Your comment has been submitted for review.',
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURES = {
  CHAT_BOT: true,
  DARK_MODE: true,
  NEWSLETTER: true,
  COMMENTS: true,
  JOB_APPLICATIONS: true,
  PRODUCT_SHOP: false, // Coming soon
  MULTI_LANGUAGE: false, // Future feature
} as const;

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  CHAT: '/api/chat',
  REVALIDATE: '/api/revalidate',
  SUBSCRIBE: '/api/subscribe',
  JOB_APPLICATION: '/api/job-application',
  COMMENT: '/api/comment',
} as const;

// ============================================================================
// CACHE KEYS
// ============================================================================

export const CACHE_KEYS = {
  PROJECTS: 'projects',
  FEATURED_PROJECTS: 'featured-projects',
  UPDATES: 'updates',
  PRODUCTS: 'products',
  JOBS: 'jobs',
} as const;

// ============================================================================
// TYPE EXPORTS (for TypeScript)
// ============================================================================

export type ProjectCategory = keyof typeof PROJECT_CATEGORIES;
export type ProductCategory =
  (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];
export type ProductAvailability =
  (typeof PRODUCT_AVAILABILITY)[keyof typeof PRODUCT_AVAILABILITY];
export type UpdateCategory =
  (typeof UPDATE_CATEGORIES)[keyof typeof UPDATE_CATEGORIES];
export type JobType = (typeof JOB_TYPES)[keyof typeof JOB_TYPES];
export type JobDepartment =
  (typeof JOB_DEPARTMENTS)[keyof typeof JOB_DEPARTMENTS];
export type NigerianState = (typeof NIGERIAN_STATES)[number];
