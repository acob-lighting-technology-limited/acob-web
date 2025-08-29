import { type NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: NextRequest) {
  try {
    const { name, email, comment, postId } = await request.json();

    if (!name || !email || !comment || !postId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const doc = {
      _type: 'comment',
      name,
      email,
      comment,
      updatePost: {
        // Changed from blogPost
        _type: 'reference',
        _ref: postId,
      },
      approved: false, // All new comments require moderation
      createdAt: new Date().toISOString(),
    };

    const result = await client.create(doc);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to submit comment' },
      { status: 500 },
    );
  }
}
