import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  useCdn: true,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to get blog posts
export async function getBlogPosts() {
  return await client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      category->{name, slug}, // Fetch category name and slug
      tags,
      "featuredImage": featuredImage.asset->url,
      content
    }
  `)
}

// Helper function to get single blog post
export async function getBlogPost(slug: string) {
  return await client.fetch(
    `
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      category->{name, slug}, // Fetch category name and slug
      tags,
      "featuredImage": featuredImage.asset->url,
      content
    }
  `,
    { slug },
  )
}

// Helper function to get categories
export async function getCategories() {
  return await client.fetch(`
    *[_type == "category"] | order(name asc) {
      _id,
      name,
      slug,
      description
    }
  `)
}

// NEW: Helper function to get approved comments for a blog post
export async function getApprovedCommentsForPost(postId: string) {
  return await client.fetch(
    `
    *[_type == "comment" && blogPost._ref == $postId && approved == true] | order(createdAt desc) {
      _id,
      name,
      comment,
      createdAt,
      website
    }
  `,
    { postId },
  )
}
