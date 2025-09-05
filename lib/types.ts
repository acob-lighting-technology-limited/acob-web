// NextAuth Types
export interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface ExtendedSession {
  user: ExtendedUser;
  expires: string;
}

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

export interface Project {
  _id: string;
  title: string;
  excerpt?: string;
  slug: {
    current: string;
  };
  category: string;
  projectDate?: string;
  content: unknown[]; // Portable Text for rich formatting
  location: string;
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
  content: unknown[]; // Portable Text
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
  content: unknown[]; // Portable Text
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
export interface ApiResponse<T = unknown> {
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

export interface SanityApiResponse {
  result: unknown[];
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
  details?: unknown;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
