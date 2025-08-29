import { NextResponse } from 'next/server';
import { getUpdatePost } from '@/sanity/lib/client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const post = await getUpdatePost(slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Update not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching update:', error);
    return NextResponse.json(
      { error: 'Failed to fetch update' },
      { status: 500 }
    );
  }
}
