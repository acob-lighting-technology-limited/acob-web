import { NextRequest, NextResponse } from 'next/server';
import { getUpdatePostsPaginated } from '@/sanity/lib/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract pagination and filter parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    // Validate parameters
    if (page < 1) {
      return NextResponse.json(
        { error: 'Page must be greater than 0' },
        { status: 400 },
      );
    }

    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 50' },
        { status: 400 },
      );
    }

    // If category is provided, we need to fetch all posts first, then filter
    // This ensures we get all category posts, not just the first page
    if (category) {
      // Fetch a large batch to ensure we get all category posts
      const allPostsResult = await getUpdatePostsPaginated({
        page: 1,
        limit: 1000, // Get a large batch
        search,
      });

      // Filter by category
      const filteredPosts = allPostsResult.posts.filter(
        (post: { category?: string }) => post.category === category,
      );

      // Now paginate the filtered results
      const totalFiltered = filteredPosts.length;
      const totalPages = Math.ceil(totalFiltered / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

      return NextResponse.json({
        posts: paginatedPosts,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount: totalFiltered,
          limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      });
    }

    // No category filter, use normal pagination
    const result = await getUpdatePostsPaginated({
      page,
      limit,
      search,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 },
    );
  }
}
