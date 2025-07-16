import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getBlogPosts, client } from "@/sanity/lib/client"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  try {
    let posts
    if (id) {
      // Fetch a single post by ID
      posts = await client.fetch(
        `
        *[_type == "blogPost" && _id == $id][0] {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          author,
          category,
          tags,
          featuredImage, // Fetch the raw image object for editing
          content
        }
      `,
        { id },
      )
    } else {
      // Fetch all posts
      posts = await getBlogPosts()
    }
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    const doc = {
      _type: "blogPost",
      title: body.title,
      slug: {
        _type: "slug",
        current: body.slug,
      },
      excerpt: body.excerpt,
      content: body.content,
      author: body.author || "ACOB LIGHTING",
      publishedAt: body.publishedAt || new Date().toISOString(),
      status: body.status || "published",
      tags: body.tags || [],
      featuredImage: body.featuredImage, // Include featuredImage if provided
    }

    const result = await client.create(doc)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
