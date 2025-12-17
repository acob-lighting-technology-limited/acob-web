/**
 * Component Prop Types
 *
 * Type definitions for React component props.
 */

// ============================================================================
// HERO SECTION
// ============================================================================

/**
 * Hero slide data
 */
export interface HeroSlide {
  /** Unique slide ID */
  id: string;
  /** Slide title */
  title: string;
  /** Slide subtitle */
  subtitle: string;
  /** Slide description */
  description: string;
  /** Background image URL */
  image: string;
  /** Gradient start color */
  gradientFrom: string;
  /** Gradient end color */
  gradientTo: string;
}

// ============================================================================
// SERVICE
// ============================================================================

/**
 * Service information
 */
export interface Service {
  /** Unique service ID */
  id: string;
  /** Service title */
  title: string;
  /** URL slug */
  slug: string;
  /** Service description */
  description: string;
  /** Icon name or path */
  icon: string;
  /** Service features */
  features: string[];
  /** Service image URL */
  image: string;
  /** Gradient start color */
  gradientFrom: string;
  /** Gradient end color */
  gradientTo: string;
}

// ============================================================================
// TESTIMONIAL
// ============================================================================

/**
 * Customer testimonial
 */
export interface Testimonial {
  /** Unique testimonial ID */
  id: string;
  /** Customer name */
  name: string;
  /** Customer role/title */
  role: string;
  /** Company name */
  company: string;
  /** Testimonial content */
  content: string;
  /** Rating (1-5) */
  rating: number;
  /** Customer image URL (optional) */
  image?: string;
}

// ============================================================================
// PARTNER
// ============================================================================

/**
 * Partner/Client logo
 */
export interface Partner {
  /** Unique partner ID */
  id: string;
  /** Partner name */
  name: string;
  /** Logo image URL */
  logo: string;
  /** Partner website URL (optional) */
  url?: string;
}

// ============================================================================
// TEAM MEMBER
// ============================================================================

/**
 * Team member information
 */
export interface TeamMember {
  /** Unique member ID */
  id: string;
  /** Member name */
  name: string;
  /** Job role/title */
  role: string;
  /** Bio/description */
  bio: string;
  /** Profile image URL */
  image: string;
  /** Email address (optional) */
  email?: string;
  /** LinkedIn profile URL (optional) */
  linkedin?: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Make specific properties optional
 *
 * @template T - The base type
 * @template K - Keys to make optional
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 *
 * @template T - The base type
 * @template K - Keys to make required
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
