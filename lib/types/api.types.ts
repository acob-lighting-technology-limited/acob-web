/**
 * API Response Types
 *
 * Type definitions for API responses and related structures.
 */

// ============================================================================
// GENERIC API RESPONSE
// ============================================================================

/**
 * Standard API response wrapper
 *
 * @template T - The type of data returned on success
 */
export interface ApiResponse<T = Record<string, unknown>> {
  /** Whether the request was successful */
  success: boolean;
  /** Response data (on success) */
  data?: T;
  /** Error message (on failure) */
  error?: string;
  /** Additional message */
  message?: string;
}

// ============================================================================
// PAGINATION
// ============================================================================

/**
 * Pagination metadata
 */
export interface PaginationInfo {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total count of items */
  totalCount: number;
  /** Items per page */
  limit: number;
  /** Whether there is a next page */
  hasNextPage: boolean;
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
}

/**
 * Paginated response for projects
 *
 * @template T - The type of items in the response
 */
export interface PaginatedResponse<T> {
  /** Array of projects */
  projects: T[];
  /** Pagination metadata */
  pagination: PaginationInfo;
}

/**
 * Paginated response for update posts
 *
 * @template T - The type of items in the response
 */
export interface PaginatedUpdatesResponse<T> {
  /** Array of posts */
  posts: T[];
  /** Pagination metadata */
  pagination: PaginationInfo;
}

// ============================================================================
// SANITY API RESPONSE
// ============================================================================

/**
 * Sanity API response structure
 *
 * @template T - The type of data returned
 */
export interface SanityApiResponse<T = Record<string, unknown>> {
  /** Query result */
  result: T[];
  /** Error information (if any) */
  error?: {
    /** Error description */
    description: string;
    /** Error type */
    type: string;
  };
}

// ============================================================================
// CHAT API
// ============================================================================

/**
 * Chat message
 */
export interface ChatMessage {
  /** Unique message ID */
  id: string;
  /** Message role */
  role: 'user' | 'assistant' | 'system';
  /** Message content */
  content: string;
  /** Message timestamp */
  timestamp?: Date;
}

/**
 * Chat API response
 */
export interface ChatResponse {
  /** Response message */
  message: string;
  /** Error message (if any) */
  error?: string;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

/**
 * Application error
 */
export interface AppError {
  /** Error message */
  message: string;
  /** Error code */
  code?: string;
  /** HTTP status code */
  status?: number;
  /** Additional error details */
  details?: Record<string, unknown>;
}

// ============================================================================
// ANALYTICS
// ============================================================================

/**
 * Analytics event
 */
export interface AnalyticsEvent {
  /** Event action */
  action: string;
  /** Event category */
  category: string;
  /** Event label (optional) */
  label?: string;
  /** Event value (optional) */
  value?: number;
}

/**
 * Web Vitals metric
 */
export interface WebVitalsMetric {
  /** Metric ID */
  id: string;
  /** Metric name */
  name: string;
  /** Metric value */
  value: number;
  /** Metric rating */
  rating: 'good' | 'needs-improvement' | 'poor';
  /** Delta from previous value */
  delta: number;
  /** Performance entries */
  entries: PerformanceEntry[];
  /** Navigation type */
  navigationType: string;
}
