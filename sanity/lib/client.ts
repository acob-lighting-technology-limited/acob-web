import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

// Validate required environment variables
if (!projectId) {
  console.warn('Sanity project ID not found. Using fallback value.');
}

if (!dataset) {
  console.warn('Sanity dataset not found. Using fallback value.');
}

if (!token) {
  console.warn(
    'Sanity API token not found. Some features may not work properly.'
  );
}

export const client = createClient({
  projectId: projectId || 'x16t7huo',
  dataset: dataset || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: token,
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
      category,
      tags,
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=75",
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
      category,
      tags,
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=75",
      content
    }
  `,
    { slug }
  );
}

// Helper function to get related update posts by category (excluding current slug)
export async function getRelatedUpdatePosts(
  categorySlug: string,
  excludeSlug: string,
  limit: number = 3
) {
  return await client.fetch(
    `
    *[_type == "updatePost" && category == $categorySlug && slug.current != $excludeSlug]
      | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      publishedAt,
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=75"
    }
  `,
    { categorySlug, excludeSlug, limit }
  );
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
    const projects = await client.fetch(`
      *[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        description,
        location,
        images[]{
          asset->{url}
        }
      }
    `);

    // Filter out projects with null assets and log issues
    const validProjects = projects.map((project: any) => {
      const validImages =
        project.images?.filter((img: any) => img?.asset?.url) || [];

      if (project.images?.length > 0 && validImages.length === 0) {
        console.warn(
          `Project "${project.title}" has images but all assets are null/undefined`
        );
      }

      return {
        ...project,
        images: validImages,
      };
    });

    return validProjects;
  } catch (error) {
    console.error('Error fetching projects from Sanity:', error);
    return [];
  }
}

// NEW: Helper function to get single project
export async function getProject(slug: string) {
  try {
    const project = await client.fetch(
      `
      *[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        location,
        images[]{
          asset->{url}
        }
      }
    `,
      { slug }
    );

    if (!project) return null;

    // Filter out null assets
    const validImages =
      project.images?.filter((img: any) => img?.asset?.url) || [];

    return {
      ...project,
      images: validImages,
    };
  } catch (error) {
    console.error('Error fetching project from Sanity:', error);
    return null;
  }
}

// Test function to verify Sanity connection
export async function testSanityConnection() {
  try {
    await client.fetch('*[_type == "project"][0...1]');
    console.log('✅ Sanity connection successful');
    return true;
  } catch (error) {
    console.error('❌ Sanity connection failed:', error);
    return false;
  }
}
