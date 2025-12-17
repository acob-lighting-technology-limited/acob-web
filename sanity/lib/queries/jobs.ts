/**
 * Job Posting Queries
 *
 * All Sanity queries related to job postings.
 * Handles fetching active job listings and counts.
 */

import { client } from '../config';

// ============================================================================
// JOB POSTING TYPE
// ============================================================================

interface JobPosting {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string;
  applicationDeadline: string;
  publishedAt: string;
  slug: {
    current: string;
  };
}

// ============================================================================
// GET ACTIVE JOB POSTINGS
// ============================================================================

/**
 * Get all active job postings
 *
 * @returns Array of active job postings ordered by publish date
 *
 * @example
 * ```typescript
 * const jobs = await getJobPostings();
 * ```
 */
export async function getJobPostings(): Promise<JobPosting[]> {
  try {
    const jobs = await client.fetch(`
      *[_type == "jobPosting" && isActive == true] | order(publishedAt desc) {
        _id,
        title,
        department,
        location,
        employmentType,
        description,
        requirements,
        applicationDeadline,
        publishedAt,
        slug
      }
    `);
    return jobs;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching job postings from Sanity:', error);
    }
    return [];
  }
}

// ============================================================================
// GET SINGLE JOB POSTING
// ============================================================================

/**
 * Get a single active job posting by slug
 *
 * @param slug - Job posting slug
 * @returns Job posting details or null if not found/inactive
 *
 * @example
 * ```typescript
 * const job = await getJobPosting('solar-engineer-lagos');
 * ```
 */
export async function getJobPosting(slug: string): Promise<JobPosting | null> {
  try {
    const job = await client.fetch(
      `
      *[_type == "jobPosting" && slug.current == $slug && isActive == true][0] {
        _id,
        title,
        department,
        location,
        employmentType,
        description,
        requirements,
        applicationDeadline,
        publishedAt,
        slug
      }
    `,
      { slug },
    );

    if (!job) {
      if (process.env.NODE_ENV === 'development') {
        // Job not found
      }
      return null;
    }

    return job;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching job posting from Sanity:', error);
    }
    return null;
  }
}

// ============================================================================
// GET ACTIVE JOB COUNT
// ============================================================================

/**
 * Get count of active job postings
 *
 * @returns Number of active job postings
 *
 * @example
 * ```typescript
 * const count = await getActiveJobCount();
 * // 5
 * ```
 */
export async function getActiveJobCount(): Promise<number> {
  try {
    const count = await client.fetch(`
      count(*[_type == "jobPosting" && isActive == true])
    `);
    return count || 0;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching job count from Sanity:', error);
    }
    return 0;
  }
}
