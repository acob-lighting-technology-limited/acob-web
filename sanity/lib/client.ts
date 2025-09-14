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
  throw new Error('SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID is required');
}

if (!dataset) {
  throw new Error('SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_DATASET is required');
}

if (!token) {
  console.warn(
    'Sanity API token not found. Some features may not work properly.'
  );
}

// Server-side client (for API routes and SSR)
export const client = createClient({
  projectId,
  dataset,
  useCdn: false, // Disable CDN for server-side requests
  apiVersion: '2024-01-01',
  token: token,
});

// Note: For security, prefer using API routes instead of direct client-side Sanity calls
// This client is only for cases where you absolutely need client-side data fetching
export const clientForBrowser = createClient({
  projectId,
  dataset,
  useCdn: true, // Enable CDN for client-side requests
  apiVersion: '2024-01-01',
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
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=75",
      content
    }
  `);
}

// Helper function to get update posts with pagination and filtering
export async function getUpdatePostsPaginated({
  page = 1,
  limit = 8,
  search = ''
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  try {
    const offset = (page - 1) * limit;
    
    // Build the base query
    let query = `*[_type == "updatePost"`;
    let params: Record<string, any> = {};
    
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
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=75",
      content
    }`;
    
    // Get total count for pagination
    let countQuery = `count(*[_type == "updatePost"`;
    if (search.trim()) {
      countQuery += ` && (
        title match $search ||
        excerpt match $search ||
        author match $search ||
        category match $search ||
        pt::text(content) match $search
      )`;
    }
    countQuery += `])`;
    
    // Execute both queries
    const [posts, totalCount] = await Promise.all([
      client.fetch(query, params),
      client.fetch(countQuery, params)
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
        hasPreviousPage: page > 1
      }
    };
  } catch (error) {
    console.error('Error fetching paginated update posts from Sanity:', error);
    return {
      posts: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        limit,
        hasNextPage: false,
        hasPreviousPage: false
      }
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
      "featuredImage": featuredImage.asset->url + "?w=800&h=600&fit=crop&auto=format&q=75",
      content
    }
  `,
    { slug }
  );
}

// Helper function to get related update posts by category (excluding current slug)
export async function getRelatedUpdatePosts(
  category: string,
  currentSlug: string,
  limit: number = 3
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
    { category, currentSlug, limit }
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
    { postId }
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
        location,
        isFeatured,
        featuredRank,
        "projectImage": projectImage.asset->url,
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
    console.error('Error fetching projects from Sanity:', error);
    return [];
  }
}

// Helper function to get featured projects for hero section
export async function getFeaturedProjects() {
  try {
    const projects = await client.fetch(`
      *[_type == "project" && isFeatured == true] | order(featuredRank asc) {
        _id,
        title,
        excerpt,
        slug,
        category,
        projectDate,
        content,
        location,
        isFeatured,
        featuredRank,
        "projectImage": projectImage.asset->url,
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
    console.error('Error fetching featured projects from Sanity:', error);
    return [];
  }
}

// Helper function to get projects with pagination and filtering
export async function getProjectsPaginated({
  page = 1,
  limit = 6,
  search = '',
  state = ''
}: {
  page?: number;
  limit?: number;
  search?: string;
  state?: string;
}) {
  try {
    const offset = (page - 1) * limit;
    
    // Build the base query
    let query = `*[_type == "project"`;
    let params: Record<string, any> = {};
    
    // Add search filter
    if (search.trim()) {
      query += ` && (
        title match $search ||
        excerpt match $search ||
        location match $search ||
        pt::text(content) match $search
      )`;
      params.search = `*${search}*`;
    }
    
    // Add state filter
    if (state.trim()) {
      query += ` && location match $state`;
      params.state = `*${state}*`;
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
      location,
      isFeatured,
      featuredRank,
      "projectImage": projectImage.asset->url,
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
    let countQuery = `count(*[_type == "project"`;
    if (search.trim()) {
      countQuery += ` && (
        title match $search ||
        excerpt match $search ||
        location match $search ||
        pt::text(content) match $search
      )`;
    }
    if (state.trim()) {
      countQuery += ` && location match $state`;
    }
    countQuery += `])`;
    
    // Execute both queries
    const [projects, totalCount] = await Promise.all([
      client.fetch(query, params),
      client.fetch(countQuery, params)
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
        hasPreviousPage: page > 1
      }
    };
  } catch (error) {
    console.error('Error fetching paginated projects from Sanity:', error);
    return {
      projects: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        limit,
        hasNextPage: false,
        hasPreviousPage: false
      }
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
        location,
        isFeatured,
        featuredRank,
        "projectImage": projectImage.asset->url,
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
      { slug }
    );

    if (!project) return null;

    return project;
  } catch (error) {
    console.error('Error fetching project from Sanity:', error);
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
        "projectImage": projectImage.asset->url,
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
      { category }
    );

    return projects;
  } catch (error) {
    console.error('Error fetching projects by category from Sanity:', error);
    return [];
  }
}

// Helper function to get related projects by category (excluding current slug)
export async function getRelatedProjects(category: string, currentSlug: string, limit: number = 3) {
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
        images[]{
          asset->{url}
        }
      }
    `,
      { category, currentSlug, limit }
    );

    return relatedProjects;
  } catch (error) {
    console.error('Error fetching related projects from Sanity:', error);
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
    console.error('Error fetching job postings from Sanity:', error);
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
      { slug }
    );
    
    if (!job) {
      console.log(`Job posting with slug "${slug}" not found or not active`);
      return null;
    }
    
    return job;
  } catch (error) {
    console.error('Error fetching job posting from Sanity:', error);
    return null;
  }
}

// Test function to verify Sanity connection
export async function testSanityConnection() {
  try {
    const result = await client.fetch('*[_type == "project"][0...1]');
    console.log('Sanity connection successful:', result.length > 0 ? 'Found projects' : 'No projects found');
    return true;
  } catch (error) {
    console.error('Sanity connection failed:', error);
    return false;
  }
}
