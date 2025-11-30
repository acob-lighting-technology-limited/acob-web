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

    const result = await getUpdatePostsPaginated({
      page,
      limit,
      search,
    });

    // Filter by category if provided
    if (category) {
      const filteredPosts = result.posts.filter(
        (post: { category?: string }) => post.category === category,
      );
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

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 },
    );
  }
}
