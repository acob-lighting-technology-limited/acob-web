import type { PortableTextBlock } from '@portabletext/types';

// Sanity Types
export interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface SanityImageUrl {
  asset: {
    url: string;
  };
  width?: number;
  height?: number;
}

export interface ProjectImpactMetrics {
  kwp?: number;
  systemType?: string;
  beneficiaries?: number;
  jobsCreatedDirectly?: number;
  jobsCreatedIndirectly?: number;
  annualCO2Reduction?: number;
  annualEnergyOutput?: number;
}

export interface ProjectContent {
  description?: 'description1' | 'description2' | 'description3' | 'custom';
  description1Preview?: string;
  description2Preview?: string;
  description3Preview?: string;
  customDescription?: PortableTextBlock[];
  images?: Array<{
    asset: { url: string };
    alt?: string;
  }>;
}

export interface Project {
  _id: string;
  title: string;
  excerpt?: string;
  description?: string; // Add description field
  slug: {
    current: string;
  };
  category: string;
  projectDate?: string;
  content?: PortableTextBlock[]; // Legacy content (will be deprecated)
  projectContent?: ProjectContent; // New content structure
  location: string;
  lga?: string; // Local Government Area
  state?: string; // Nigerian state where project is located
  projectImage: string; // Single project image URL
  images?: SanityImage[]; // Sanity image references for compatibility
  galleryImages?: string[]; // Add gallery images from content
  isFeatured?: boolean;
  featuredRank?: number;
  impactMetrics?: ProjectImpactMetrics; // Impact metrics for the project
  comments?: ProjectComment[];
  _createdAt: string;
  _updatedAt: string;
}

export interface ProjectComment {
  _key: string;
  author: string;
  email: string;
  commentContent: string;
  createdAt: string;
  isApproved: boolean;
}

export interface UpdatePost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  content: PortableTextBlock[]; // Portable Text
  excerpt: string;
  publishedAt: string;
  author: string;
  category?: string; // Changed from object reference to string
  tags?: string[];
  featuredImage?: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  content: PortableTextBlock[]; // Portable Text
  excerpt: string;
  publishedAt: string;
  author: {
    name: string;
    image?: SanityImageUrl;
  };
  mainImage?: SanityImageUrl;
  categories: string[];
  _createdAt: string;
  _updatedAt: string;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
  gradientFrom: string;
  gradientTo: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service?: string;
}

export interface Comment {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
  website?: string;
}

export interface CommentFormData {
  name: string;
  email: string;
  comment: string;
  postId: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

// API Response Types
export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination Types
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  projects: T[];
  pagination: PaginationInfo;
}

export interface PaginatedUpdatesResponse<T> {
  posts: T[];
  pagination: PaginationInfo;
}

export interface SanityApiResponse<T = Record<string, unknown>> {
  result: T[];
  error?: {
    description: string;
    type: string;
  };
}

// Component Props Types
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
}

// Web Vitals Types
export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
  navigationType: string;
}

// Analytics Types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
