import { NextResponse } from 'next/server';
import { getUpdatePosts } from '@/sanity/lib/client';

export async function GET() {
  try {
    const posts = await getUpdatePosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 }
    );
  }
}
