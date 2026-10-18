import { NextRequest, NextResponse } from 'next/server';
import { getProjectsPaginated } from '@/sanity/lib/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract pagination and filter parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '9', 10);
    const search = searchParams.get('search') || '';
    const state = searchParams.get('state') || '';
    const category = searchParams.get('category') || '';

    // Validate parameters
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: 'Page must be greater than 0' },
        { status: 400 },
      );
    }

    if (isNaN(limit) || limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 50' },
        { status: 400 },
      );
    }

    const result = await getProjectsPaginated({
      page,
      limit,
      search,
      state,
      category,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 },
    );
  }
}
