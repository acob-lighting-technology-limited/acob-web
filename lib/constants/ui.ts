/**
 * UI Constants
 * Extract magic numbers and strings to named constants for better maintainability
 */

// Carousel & Animation Constants
export const CAROUSEL_AUTOPLAY_DELAY = 6000; // 6 seconds
export const CAROUSEL_SLIDE_DURATION = 300; // ms

// Scroll Constants
export const SCROLL_THRESHOLD = 5; // pixels
export const HEADER_SHOW_THRESHOLD = 100; // pixels
export const SCROLL_DIFFERENCE_THRESHOLD = 10; // pixels

// Timeouts
export const DROPDOWN_CLOSE_DELAY = 150; // ms
export const SCROLL_STOP_TIMEOUT = 1000; // ms
export const VIEWPORT_CHANGE_DELAY = 100; // ms

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
} as const;

// Keyboard Constants
export const KEYBOARD_HEIGHT_THRESHOLD = 150; // pixels

// Rate Limiting
export const RATE_LIMITS = {
  CHAT_API: {
    interval: 60 * 1000, // 1 minute
    maxRequests: 20,
  },
  EMAIL_API: {
    interval: 5 * 60 * 1000, // 5 minutes
    maxRequests: 5,
  },
  GENERAL_API: {
    interval: 60 * 1000, // 1 minute
    maxRequests: 10,
  },
} as const;

// Image Optimization
export const IMAGE_QUALITY = {
  LOW: 50,
  MEDIUM: 75,
  HIGH: 90,
  MAX: 100,
} as const;

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 700,
} as const;

// Z-Index Layers
export const Z_INDEX = {
  DROPDOWN: 10,
  HEADER: 40,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  FLOATING_BUTTONS: 50,
  TOOLTIP: 60,
  NOTIFICATION: 999,
} as const;

// Text Truncation
export const MAX_TITLE_LENGTH = 60;
export const MAX_DESCRIPTION_LENGTH = 200;

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const DEFAULT_PAGE = 1;

// Cache Duration (in seconds)
export const CACHE_DURATION = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const;
