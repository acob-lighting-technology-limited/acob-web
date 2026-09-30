/**
 * Update/Blog Post Queries
 *
 * All Sanity queries related to update posts.
 * Handles fetching, filtering, and pagination of update content.
 */

import { client } from '../config';
import { PAGINATION } from '@/lib/constants/app.constants';
import type { UpdatePost, PaginatedUpdatesResponse } from '@/lib/types';

// ============================================================================
// SHARED FIELDS PROJECTION
// ============================================================================

const UPDATE_POST_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  author->{
    _id,
    name,
    "avatar": avatar.asset->url,
    bio
  },
  "category": categories[0],
  categories,
  tags,
  "featuredImage": coalesce(coverImage.asset->url, content[_type == "image"][0].asset->url) + "?w=800&h=600&fit=crop&auto=format&q=95",
  "coverImage": coalesce(coverImage.asset->url, content[_type == "image"][0].asset->url) + "?w=800&h=600&fit=crop&auto=format&q=95",
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
`;

const UPDATE_POST_LISTING_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  author->{
    _id,
    name,
    "avatar": avatar.asset->url
  },
  "category": categories[0],
  categories,
  tags,
  "featuredImage": coalesce(coverImage.asset->url, content[_type == "image"][0].asset->url) + "?w=800&h=600&fit=crop&auto=format&q=95",
  "coverImage": coalesce(coverImage.asset->url, content[_type == "image"][0].asset->url) + "?w=800&h=600&fit=crop&auto=format&q=95"
`;

// ============================================================================
// GET ALL UPDATE POSTS
// ============================================================================

export async function getUpdatePosts(): Promise<UpdatePost[]> {
  return await client.fetch(`
    *[_type == "updatePost"] | order(publishedAt desc) {
      ${UPDATE_POST_FIELDS}
    }
  `);
}

// ============================================================================
// GET UPDATE POSTS WITH PAGINATION
// ============================================================================

export async function getUpdatePostsPaginated({
  page = 1,
  limit = PAGINATION.UPDATES_PER_PAGE,
  search = '',
  category = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}): Promise<PaginatedUpdatesResponse<UpdatePost>> {
  try {
    const offset = (page - 1) * limit;

    // Build the base query
    let query = '*[_type == "updatePost"';
    const params: Record<string, string | number> = {};

    // Add category filter
    if (category.trim()) {
      query += ' && $category in categories';
      params.category = category;
    }

    // Add search filter
    if (search.trim()) {
      query += ` && (
        title match $search ||
        excerpt match $search ||
        author->name match $search
      )`;
      params.search = `*${search}*`;
    }

    // Complete the query with ordering and pagination
    query += `] | order(publishedAt desc)[${offset}...${offset + limit}] {
      ${UPDATE_POST_LISTING_FIELDS}
    }`;

    // Get total count for pagination
    let countQuery = 'count(*[_type == "updatePost"';
    if (category.trim()) {
      countQuery += ' && $category in categories';
    }
    if (search.trim()) {
      countQuery += ` && (
        title match $search ||
        excerpt match $search ||
        author->name match $search
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

export async function getUpdatePost(slug: string): Promise<UpdatePost | null> {
  return await client.fetch(
    `
    *[_type == "updatePost" && slug.current == $slug][0] {
      ${UPDATE_POST_FIELDS}
    }
  `,
    { slug },
  );
}

// ============================================================================
// GET RELATED UPDATE POSTS
// ============================================================================

export async function getRelatedUpdatePosts(
  category: string,
  currentSlug: string,
  limit: number = 3,
): Promise<UpdatePost[]> {
  return await client.fetch(
    `
    *[_type == "updatePost" && $category in categories && slug.current != $currentSlug]
      | order(publishedAt desc)[0...$limit] {
      ${UPDATE_POST_LISTING_FIELDS}
    }
  `,
    { category, currentSlug, limit },
  );
}
