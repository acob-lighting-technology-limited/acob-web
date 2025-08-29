import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // First get the current post to find its category
    const currentPostQuery = `*[_type == "updatePost" && slug.current == $slug][0] {
      _id,
      category,
      title
    }`;
    
    const currentPost = await client.fetch(currentPostQuery, { slug });
    
    if (!currentPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Get related posts with the same category, excluding the current post
    const relatedQuery = `*[_type == "updatePost" && category == $category && slug.current != $slug && publishedAt < now()] | order(publishedAt desc)[0...3] {
      _id,
      title,
      excerpt,
      slug,
      featuredImage,
      publishedAt,
      author,
      category
    }`;
    
    const relatedPosts = await client.fetch(relatedQuery, { 
      category: currentPost.category,
      slug 
    });
    
    return NextResponse.json(relatedPosts);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch related posts' },
      { status: 500 }
    );
  }
}
