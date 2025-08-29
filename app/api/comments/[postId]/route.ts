import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    
    const query = `*[_type == "comment" && updatePost._ref == $postId && approved == true] | order(createdAt desc) {
      _id,
      name,
      comment,
      createdAt,
      updatePost->{
        _id,
        title
      }
    }`;
    
    const comments = await client.fetch(query, { postId });
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
