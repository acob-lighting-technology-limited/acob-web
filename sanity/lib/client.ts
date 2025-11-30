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
  throw new Error(
    'SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID is required',
  );
}

if (!dataset) {
  throw new Error(
    'SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_DATASET is required',
  );
}

if (!token) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'Sanity API token not found. Some features may not work properly.',
    );
  }
}

// Server-side client (for API routes and SSR)
export const client = createClient({
  projectId,
  dataset,
  useCdn: process.env.NODE_ENV === 'production', // Enable CDN in production for faster fetches
  apiVersion: '2025-07-16',
  token: token,
});

// Note: For security, prefer using API routes instead of direct client-side Sanity calls
// This client is only for cases where you absolutely need client-side data fetching
export const clientForBrowser = createClient({
  projectId,
  dataset,
  useCdn: true, // Enable CDN for client-side requests
  apiVersion: '2025-07-16',
  // No token for client-side requests
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
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=95",
      content[] {
        ...,
        _type == "file" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        },
        _type == "video" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        }
      }
    }
  `);
}

// Helper function to get update posts with pagination and filtering
export async function getUpdatePostsPaginated({
  page = 1,
  limit = 12,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  try {
    const offset = (page - 1) * limit;

    // Build the base query
    let query = '*[_type == "updatePost"';
    const params: Record<string, any> = {};

    // Add search filter
    if (search.trim()) {
      query += ` && (
        title match $search ||
        excerpt match $search ||
        author match $search ||
        category match $search ||
        pt::text(content) match $search
      )`;
      params.search = `*${search}*`;
    }

    // Complete the query with ordering and pagination
    query += `] | order(publishedAt desc)[${offset}...${offset + limit}] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      category,
      tags,
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=95",
      content[] {
        ...,
        _type == "file" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        },
        _type == "video" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        }
      }
    }`;

    // Get total count for pagination
    let countQuery = 'count(*[_type == "updatePost"';
    if (search.trim()) {
      countQuery += ` && (
        title match $search ||
        excerpt match $search ||
        author match $search ||
        category match $search ||
        pt::text(content) match $search
      )`;
    }
    countQuery += '])';

    // Execute both queries
    const [posts, totalCount] = await Promise.all([
      client.fetch(query, params),
      client.fetch(countQuery, params),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Error fetching paginated update posts from Sanity:',
        error,
      );
    }
    return {
      posts: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        limit,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
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
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=95",
      content[] {
        ...,
        _type == "file" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        },
        _type == "video" => {
          ...,
          "asset": asset->{
            url,
            _ref
          }
        }
      }
    }
  `,
    { slug },
  );
}

// Helper function to get related update posts by category (excluding current slug)
export async function getRelatedUpdatePosts(
  category: string,
  currentSlug: string,
  limit: number = 3,
) {
  return await client.fetch(
    `
    *[_type == "updatePost" && category == $category && slug.current != $currentSlug]
      | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      author,
      category,
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=75"
    }
  `,
    { category, currentSlug, limit },
  );
}

// Helper function to get approved comments for a post
export async function getApprovedCommentsForPost(postId: string) {
  return await client.fetch(
    `
    *[_type == "comment" && postId == $postId && isApproved == true] | order(createdAt desc) {
      _id,
      name,
      comment,
      createdAt,
      website
    }
  `,
    { postId },
  );
}

// Helper function to get projects
export async function getProjects() {
  try {
    const projects = await client.fetch(`
      *[_type == "project"] | order(projectDate desc, _createdAt desc) {
        _id,
        title,
        excerpt,
        slug,
        category,
        projectDate,
        content,
        projectContent,
        location,
        lga,
        state,
        isFeatured,
        featuredRank,
        "projectImage": projectImage.asset->url,
        "images": content[].asset->{
          url,
          metadata
        },
        impactMetrics,
        comments[]{
          _key,
          author,
          email,
          commentContent,
          createdAt,
          isApproved
        }
      }
    `);

    return projects;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching projects from Sanity:', error);
    }
    return [];
  }
}

export async function getProjectsForGallery() {
  try {
    const projects = await client.fetch(`
      *[_type == "project"] | order(projectDate desc, _createdAt desc) {
        _id,
        title,
        excerpt,
        slug,
        category,
        projectDate,
        content,
        projectContent,
        location,
        lga,
        state,
        isFeatured,
        featuredRank,
        "projectImage": projectImage.asset->url,
        "galleryImages": content[].asset->url,
        impactMetrics
      }
    `);

    // Process the projects to extract images from content
    const processedProjects = projects.map((project: any) => {
      const galleryImages: string[] = [];

      // Add the main project image
      if (project.projectImage) {
        galleryImages.push(project.projectImage);
      }

      // Extract images from content blocks
      if (project.content && Array.isArray(project.content)) {
        project.content.forEach((block: any) => {
          if (block._type === 'image' && block.asset && block.asset.url) {
            galleryImages.push(block.asset.url);
          }
        });
      }

      return {
        ...project,
        galleryImages,
      };
    });

    return processedProjects;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching projects for gallery from Sanity:', error);
    }
    return [];
  }
}

// Helper function to get featured projects for hero section
export async function getFeaturedProjects() {
  try {
    const projects = await client.fetch(`
      *[_type == "project" && isFeatured == true] | order(orderRank) {
        _id,
        title,
        excerpt,
        slug,
        category,
        projectDate,
        content,
        projectContent,
        location,
        lga,
        state,
        isFeatured,
        orderRank,
        "projectImage": projectImage.asset->url,
        impactMetrics,
        comments[]{
          _key,
          author,
          email,
          commentContent,
          createdAt,
          isApproved
        }
      }
    `);

    return projects;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching featured projects from Sanity:', error);
    }
    return [];
  }
}

// Helper function to get projects with pagination and filtering
export async function getProjectsPaginated({
  page = 1,
  limit = 12,
  search = '',
  state = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
  state?: string;
}) {
  try {
    const offset = (page - 1) * limit;

    // Build the base query
    let query = '*[_type == "project"';
    const params: Record<string, any> = {};

    // Add search filter
    if (search.trim()) {
      query += ` && (
        title match $search ||
        excerpt match $search ||
        location match $search ||
        state match $search ||
        pt::text(content) match $search
      )`;
      params.search = `*${search}*`;
    }

    // Add state filter
    if (state.trim()) {
      query += ' && state == $state';
      params.state = state;
    }

    // Complete the query with ordering and pagination
    query += `] | order(projectDate desc, _createdAt desc)[${offset}...${offset + limit}] {
      _id,
      title,
      excerpt,
      slug,
      category,
      projectDate,
      content,
      projectContent,
      location,
      lga,
      state,
      isFeatured,
      featuredRank,
      "projectImage": projectImage.asset->url,
      impactMetrics,
      comments[]{
        _key,
        author,
        email,
        commentContent,
        createdAt,
        isApproved
      }
    }`;

    // Get total count for pagination
    let countQuery = 'count(*[_type == "project"';
    if (search.trim()) {
      countQuery += ` && (
        title match $search ||
        excerpt match $search ||
        location match $search ||
        state match $search ||
        pt::text(content) match $search
      )`;
    }
    if (state.trim()) {
      countQuery += ' && state == $state';
    }
    countQuery += '])';

    // Execute both queries
    const [projects, totalCount] = await Promise.all([
      client.fetch(query, params),
      client.fetch(countQuery, params),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching paginated projects from Sanity:', error);
    }
    return {
      projects: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        limit,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}

// Helper function to get single project
export async function getProject(slug: string) {
  try {
    const project = await client.fetch(
      `
      *[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        excerpt,
        slug,
        category,
        projectDate,
        content,
        projectContent{
          description,
          description1Preview,
          description2Preview,
          description3Preview,
          customDescription,
          images[]{
            _type,
            asset->{
              url
            },
            alt,
            title
          }
        },
        location,
        lga,
        state,
        isFeatured,
        featuredRank,
        "projectImage": projectImage.asset->url,
        impactMetrics,
        comments[]{
          _key,
          author,
          email,
          commentContent,
          createdAt,
          isApproved
        }
      }
    `,
      { slug },
    );

    if (!project) {
      return null;
    }

    return project;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching project from Sanity:', error);
    }
    return null;
  }
}

// Helper function to get projects by category
export async function getProjectsByCategory(category: string) {
  try {
    const projects = await client.fetch(
      `
      *[_type == "project" && category == $category] | order(projectDate desc, _createdAt desc) {
        _id,
        title,
        excerpt,
        slug,
        category,
        projectDate,
        content,
        location,
        state,
        "projectImage": projectImage.asset->url,
        impactMetrics,
        comments[]{
          _key,
          author,
          email,
          commentContent,
          createdAt,
          isApproved
        }
      }
    `,
      { category },
    );

    return projects;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching projects by category from Sanity:', error);
    }
    return [];
  }
}

// Helper function to get related projects by category (excluding current slug)
export async function getRelatedProjects(
  category: string,
  currentSlug: string,
  limit: number = 3,
) {
  try {
    const relatedProjects = await client.fetch(
      `
      *[_type == "project" && category == $category && slug.current != $currentSlug] | order(projectDate desc, _createdAt desc)[0...$limit] {
        _id,
        title,
        excerpt,
        slug,
        category,
        projectDate,
        location,
        state,
        images[]{
          asset->{url}
        }
      }
    `,
      { category, currentSlug, limit },
    );

    return relatedProjects;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching related projects from Sanity:', error);
    }
    return [];
  }
}

// Helper function to get unique states from all projects
export async function getUniqueProjectStates(): Promise<string[]> {
  try {
    const result = await client.fetch(`
      array::unique(*[_type == "project" && defined(state)].state) | order(@)
    `);
    return result || [];
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching unique project states from Sanity:', error);
    }
    return [];
  }
}

// Helper function to get recent project images for carousel
export async function getRecentProjectImages(limit: number = 5) {
  try {
    const projects = await client.fetch(
      `
      *[_type == "project" && defined(projectImage)] | order(projectDate desc, _createdAt desc)[0...$limit] {
        _id,
        title,
        "projectImage": projectImage.asset->url
      }
    `,
      { limit: limit - 1 },
    );
    return projects;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching recent project images from Sanity:', error);
    }
    return [];
  }
}

// Helper function to get active job postings
export async function getJobPostings() {
  try {
    const jobs = await client.fetch(`
      *[_type == "jobPosting" && isActive == true] | order(publishedAt desc) {
        _id,
        title,
        department,
        location,
        employmentType,
        description,
        requirements,
        applicationDeadline,
        publishedAt,
        slug
      }
    `);
    return jobs;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching job postings from Sanity:', error);
    }
    return [];
  }
}

// Helper function to get single job posting
export async function getJobPosting(slug: string) {
  try {
    const job = await client.fetch(
      `
      *[_type == "jobPosting" && slug.current == $slug && isActive == true][0] {
        _id,
        title,
        department,
        location,
        employmentType,
        description,
        requirements,
        applicationDeadline,
        publishedAt,
        slug
      }
    `,
      { slug },
    );

    if (!job) {
      if (process.env.NODE_ENV === 'development') {
        // Job not found
      }
      return null;
    }

    return job;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching job posting from Sanity:', error);
    }
    return null;
  }
}

// Helper function to get active job count
export async function getActiveJobCount(): Promise<number> {
  try {
    const count = await client.fetch(`
      count(*[_type == "jobPosting" && isActive == true])
    `);
    return count || 0;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching job count from Sanity:', error);
    }
    return 0;
  }
}

// Helper function to get featured product count
export async function getFeaturedProductCount(): Promise<number> {
  try {
    const count = await client.fetch(`
      count(*[_type == "product" && isFeatured == true && availability == "in-stock"])
    `);
    return count || 0;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Error fetching featured product count from Sanity:',
        error,
      );
    }
    return 0;
  }
}

// Test function to verify Sanity connection
// Helper function to get products
export async function getProducts() {
  try {
    const products = await client.fetch(`
      *[_type == "product"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        category,
        sku,
        availability,
        description,
        productImage{
          asset->{
            _id,
            url
          },
          alt
        },
        panelSpecifications,
        batterySpecifications,
        inverterSpecifications
      }
    `);

    return products;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching products from Sanity:', error);
    }
    return [];
  }
}

export async function testSanityConnection() {
  try {
    const result = await client.fetch('*[_type == "project"][0...1]');
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Sanity connection successful:',
        result.length > 0 ? 'Found projects' : 'No projects found',
      );
    }
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Sanity connection failed:', error);
    }
    return false;
  }
}
