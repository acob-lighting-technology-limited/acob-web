import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { client } from '@/sanity/lib/client';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await client.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const patchOperations: Record<string, any> = {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      tags: body.tags,
      status: body.status,
    };

    // Only update featuredImage if a new one was provided
    if (body.featuredImage !== undefined) {
      patchOperations.featuredImage = body.featuredImage;
    }

    // Ensure the slug is not updated directly via PUT if it's meant to be immutable
    // For Sanity, slug is part of the document, but often not changed after creation.
    // If you need to change it, you'd typically handle it in the Sanity Studio or a specific API.
    // For this example, we'll assume slug is not updated via this PUT.

    const result = await client.patch(params.id).set(patchOperations).commit();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}
