/**
 * Form Data Types
 *
 * Type definitions for form data structures.
 */

// ============================================================================
// CONTACT FORM
// ============================================================================

/**
 * Contact form submission data
 */
export interface ContactFormData {
  /** Contact name */
  name: string;
  /** Contact email */
  email: string;
  /** Contact phone (optional) */
  phone?: string;
  /** Company name (optional) */
  company?: string;
  /** Message content */
  message: string;
  /** Service of interest (optional) */
  service?: string;
}

// ============================================================================
// COMMENT FORM
// ============================================================================

/**
 * Comment on a post or project
 */
export interface Comment {
  /** Unique comment ID */
  _id: string;
  /** Commenter name */
  name: string;
  /** Comment text */
  comment: string;
  /** Comment creation date */
  createdAt: string;
  /** Commenter website (optional) */
  website?: string;
}

/**
 * Comment form submission data
 */
export interface CommentFormData {
  /** Commenter name */
  name: string;
  /** Commenter email */
  email: string;
  /** Comment text */
  comment: string;
  /** Post/Project ID to comment on */
  postId: string;
}

// ============================================================================
// NEWSLETTER SUBSCRIPTION
// ============================================================================

/**
 * Newsletter subscription data
 */
export interface NewsletterSubscriptionData {
  /** Subscriber email */
  email: string;
  /** Subscriber name (optional) */
  name?: string;
}

// ============================================================================
// JOB APPLICATION
// ============================================================================

/**
 * Job application form data
 */
export interface JobApplicationData {
  /** Applicant name */
  name: string;
  /** Applicant email */
  email: string;
  /** Applicant phone */
  phone: string;
  /** Job position applying for */
  position: string;
  /** Cover letter */
  coverLetter: string;
  /** Resume/CV file (as File object in browser) */
  resume?: globalThis.File | null;
  /** LinkedIn profile URL (optional) */
  linkedinUrl?: string;
}

// ============================================================================
// QUOTE REQUEST
// ============================================================================

/**
 * Quote request form data
 */
export interface QuoteRequestData {
  /** Client name */
  name: string;
  /** Client email */
  email: string;
  /** Client phone */
  phone: string;
  /** Company name (optional) */
  company?: string;
  /** Service type */
  serviceType: string;
  /** Project location */
  location: string;
  /** Estimated budget range (optional) */
  budgetRange?: string;
  /** Project description */
  projectDescription: string;
  /** Preferred contact method */
  preferredContact?: 'email' | 'phone' | 'whatsapp';
}
