/**
 * Update/Blog Post Queries
 *
 * All Sanity queries related to update posts (formerly blog posts).
 * Handles fetching, filtering, and pagination of update content.
 */

import { client } from '../config';
import { PAGINATION } from '@/lib/constants/app.constants';
import type { UpdatePost, PaginatedUpdatesResponse } from '@/lib/types';

// ============================================================================
// GET ALL UPDATE POSTS
// ============================================================================

/**
 * Get all update posts ordered by publish date
 *
 * @returns Array of all update posts with full content
 *
 * @example
 * ```typescript
 * const posts = await getUpdatePosts();
 * ```
 */
export async function getUpdatePosts(): Promise<UpdatePost[]> {
  return await client.fetch(`
    *[_type == "updatePost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      category,
      tags,
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=95",
      content[] {
        ...,
        _type == "file" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        },
        _type == "video" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        }
      }
    }
  `);
}

// ============================================================================
// GET UPDATE POSTS WITH PAGINATION
// ============================================================================

/**
 * Get update posts with pagination and search filtering
 *
 * @param options - Pagination and filter options
 * @param options.page - Page number (1-indexed)
 * @param options.limit - Number of items per page
 * @param options.search - Search query (searches title, excerpt, author, category, content)
 * @returns Paginated update posts with metadata
 *
 * @example
 * ```typescript
 * const result = await getUpdatePostsPaginated({
 *   page: 1,
 *   limit: 12,
 *   search: 'solar energy'
 * });
 * ```
 */
export async function getUpdatePostsPaginated({
  page = 1,
  limit = PAGINATION.UPDATES_PER_PAGE,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedUpdatesResponse<UpdatePost>> {
  try {
    const offset = (page - 1) * limit;

    // Build the base query
    let query = '*[_type == "updatePost"';
    const params: Record<string, string | number> = {};

    // Add search filter
    if (search.trim()) {
      query += ` && (
        title match $search ||
        excerpt match $search ||
        author match $search ||
        category match $search ||
        pt::text(content) match $search
      )`;
      params.search = `*${search}*`;
    }

    // Complete the query with ordering and pagination
    query += `] | order(publishedAt desc)[${offset}...${offset + limit}] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      category,
      tags,
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=95",
      content[] {
        ...,
        _type == "file" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        },
        _type == "video" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        }
      }
    }`;

    // Get total count for pagination
    let countQuery = 'count(*[_type == "updatePost"';
    if (search.trim()) {
      countQuery += ` && (
        title match $search ||
        excerpt match $search ||
        author match $search ||
        category match $search ||
        pt::text(content) match $search
      )`;
    }
    countQuery += '])';

    // Execute both queries
    const [posts, totalCount] = await Promise.all([
      client.fetch(query, params),
      client.fetch(countQuery, params),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Error fetching paginated update posts from Sanity:',
        error,
      );
    }
    return {
      posts: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        limit,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}

// ============================================================================
// GET SINGLE UPDATE POST
// ============================================================================

/**
 * Get a single update post by slug
 *
 * @param slug - Update post slug
 * @returns Update post details or null if not found
 *
 * @example
 * ```typescript
 * const post = await getUpdatePost('new-solar-project-launch');
 * ```
 */
export async function getUpdatePost(slug: string): Promise<UpdatePost | null> {
  return await client.fetch(
    `
    *[_type == "updatePost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      category,
      tags,
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=95",
      content[] {
        ...,
        _type == "file" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        },
        _type == "video" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        }
      }
    }
  `,
    { slug },
  );
}

// ============================================================================
// GET RELATED UPDATE POSTS
// ============================================================================

/**
 * Get related update posts by category (excluding current post)
 *
 * @param category - Post category
 * @param currentSlug - Current post slug to exclude
 * @param limit - Maximum number of related posts
 * @returns Array of related update posts
 *
 * @example
 * ```typescript
 * const related = await getRelatedUpdatePosts('News', 'current-post', 3);
 * ```
 */
export async function getRelatedUpdatePosts(
  category: string,
  currentSlug: string,
  limit: number = 3,
): Promise<UpdatePost[]> {
  return await client.fetch(
    `
    *[_type == "updatePost" && category == $category && slug.current != $currentSlug]
      | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      category,
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=75"
    }
  `,
    { category, currentSlug, limit },
  );
}
