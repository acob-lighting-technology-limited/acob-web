import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;

export const client = createClient({
  projectId: projectId || 'x16t7huo',
  dataset: dataset || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to get update posts (formerly blog posts)
export async function getUpdatePosts() {
  return await client.fetch(`
    *[_type == "updatePost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      category->{name, slug},
      tags,
      "featuredImage": featuredImage.asset->url,
      content
    }
  `);
}

// Helper function to get single update post (formerly single blog post)
export async function getUpdatePost(slug: string) {
  return await client.fetch(
    `
    *[_type == "updatePost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      category->{name, slug},
      tags,
      "featuredImage": featuredImage.asset->url,
      content
    }
  `,
    { slug }
  );
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
  `);
}

// Helper function to get approved comments for an update post
export async function getApprovedCommentsForPost(postId: string) {
  return await client.fetch(
    `
    *[_type == "comment" && updatePost._ref == $postId && approved == true] | order(createdAt desc) {
      _id,
      name,
      comment,
      createdAt,
      website
    }
  `,
    { postId }
  );
}

// NEW: Helper function to get projects
export async function getProjects() {
  try {
    return await client.fetch(`
      *[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        description,
        location,
        gradientFrom,
        gradientTo,
        images[]{
          asset->{url}
        }
      }
    `);
  } catch (error) {
    console.error('Error fetching projects from Sanity:', error);
    return [];
  }
}

// NEW: Helper function to get single project
export async function getProject(slug: string) {
  try {
    return await client.fetch(
      `
      *[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        location,
        gradientFrom,
        gradientTo,
        images[]{
          asset->{url}
        }
      }
    `,
      { slug }
    );
  } catch (error) {
    console.error('Error fetching project from Sanity:', error);
    return null;
  }
}
