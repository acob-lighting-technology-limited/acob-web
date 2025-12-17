/**
 * Comment Queries
 *
 * All Sanity queries related to comments.
 * Handles fetching approved comments for posts.
 */

import { client } from '../config';
import type { Comment } from '@/lib/types';

// ============================================================================
// GET APPROVED COMMENTS FOR POST
// ============================================================================

/**
 * Get all approved comments for a specific post
 *
 * @param postId - The post ID to fetch comments for
 * @returns Array of approved comments ordered by date (newest first)
 *
 * @example
 * ```typescript
 * const comments = await getApprovedCommentsForPost('post-id-123');
 * ```
 */
export async function getApprovedCommentsForPost(
  postId: string,
): Promise<Comment[]> {
  return await client.fetch(
    `
    *[_type == "comment" && postId == $postId && isApproved == true] | order(createdAt desc) {
      _id,
      name,
      comment,
      createdAt,
      website
    }
  `,
    { postId },
  );
}
