/**
 * Update/Blog Post Types
 *
 * Type definitions for update posts and blog content.
 */

import type { PortableTextBlock } from '@portabletext/types';
import type { SanitySlug, SanityImageUrl } from './sanity.types';

// ============================================================================
// UPDATE POST
// ============================================================================

/**
 * Update post (formerly blog post)
 */
export interface UpdatePost {
  /** Unique post ID */
  _id: string;
  /** Post title */
  title: string;
  /** URL slug */
  slug: SanitySlug;
  /** Post content (Portable Text) */
  content: PortableTextBlock[];
  /** Short excerpt/summary */
  excerpt: string;
  /** Publication date */
  publishedAt: string;
  /** Author name */
  author: string;
  /** Post category */
  category?: string;
  /** Post tags */
  tags?: string[];
  /** Featured image URL */
  featuredImage?: string;
  /** Creation timestamp */
  _createdAt: string;
  /** Last update timestamp */
  _updatedAt: string;
}

// ============================================================================
// BLOG POST (Legacy)
// ============================================================================

/**
 * Blog post (legacy structure)
 */
export interface BlogPost {
  /** Unique post ID */
  _id: string;
  /** Post title */
  title: string;
  /** URL slug */
  slug: SanitySlug;
  /** Post content (Portable Text) */
  content: PortableTextBlock[];
  /** Short excerpt/summary */
  excerpt: string;
  /** Publication date */
  publishedAt: string;
  /** Author information */
  author: {
    /** Author name */
    name: string;
    /** Author image */
    image?: SanityImageUrl;
  };
  /** Main post image */
  mainImage?: SanityImageUrl;
  /** Post categories */
  categories: string[];
  /** Creation timestamp */
  _createdAt: string;
  /** Last update timestamp */
  _updatedAt: string;
}
