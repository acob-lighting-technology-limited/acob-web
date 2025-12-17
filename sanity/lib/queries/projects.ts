/**
 * Project Queries
 *
 * All Sanity queries related to projects.
 * Handles fetching, filtering, and pagination of project data.
 */

import { client } from '../config';
import { PAGINATION } from '@/lib/constants/app.constants';
import type { Project, PaginatedResponse } from '@/lib/types';

// ============================================================================
// GET ALL PROJECTS
// ============================================================================

/**
 * Get all projects ordered by date
 *
 * @returns Array of all projects with full details
 *
 * @example
 * ```typescript
 * const projects = await getProjects();
 * ```
 */
export async function getProjects(): Promise<Project[]> {
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

// ============================================================================
// GET PROJECTS WITH PAGINATION
// ============================================================================

/**
 * Get projects with pagination and filtering
 *
 * @param options - Pagination and filter options
 * @param options.page - Page number (1-indexed)
 * @param options.limit - Number of items per page
 * @param options.search - Search query (searches title, excerpt, location, state, content)
 * @param options.state - Filter by Nigerian state
 * @returns Paginated projects with metadata
 *
 * @example
 * ```typescript
 * const result = await getProjectsPaginated({
 *   page: 1,
 *   limit: 12,
 *   search: 'solar',
 *   state: 'Lagos'
 * });
 * ```
 */
export async function getProjectsPaginated({
  page = 1,
  limit = PAGINATION.PROJECTS_PER_PAGE,
  search = '',
  state = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
  state?: string;
}): Promise<PaginatedResponse<Project>> {
  try {
    const offset = (page - 1) * limit;

    // Build the base query
    let query = '*[_type == "project"';
    const params: Record<string, string | number> = {};

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

// ============================================================================
// GET SINGLE PROJECT
// ============================================================================

/**
 * Get a single project by slug
 *
 * @param slug - Project slug
 * @returns Project details or null if not found
 *
 * @example
 * ```typescript
 * const project = await getProject('solar-mini-grid-lagos');
 * ```
 */
export async function getProject(slug: string): Promise<Project | null> {
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

// ============================================================================
// GET FEATURED PROJECTS
// ============================================================================

/**
 * Get featured projects for hero section
 *
 * @returns Array of featured projects ordered by rank
 *
 * @example
 * ```typescript
 * const featuredProjects = await getFeaturedProjects();
 * ```
 */
export async function getFeaturedProjects(): Promise<Project[]> {
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

// ============================================================================
// GET PROJECTS BY CATEGORY
// ============================================================================

/**
 * Get all projects in a specific category
 *
 * @param category - Project category
 * @returns Array of projects in the category
 *
 * @example
 * ```typescript
 * const miniGrids = await getProjectsByCategory('Mini-Grid');
 * ```
 */
export async function getProjectsByCategory(
  category: string,
): Promise<Project[]> {
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

// ============================================================================
// GET RELATED PROJECTS
// ============================================================================

/**
 * Get related projects by category (excluding current project)
 *
 * @param category - Project category
 * @param currentSlug - Current project slug to exclude
 * @param limit - Maximum number of related projects
 * @returns Array of related projects
 *
 * @example
 * ```typescript
 * const related = await getRelatedProjects('Mini-Grid', 'current-project', 3);
 * ```
 */
export async function getRelatedProjects(
  category: string,
  currentSlug: string,
  limit: number = 3,
): Promise<Project[]> {
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

// ============================================================================
// GET UNIQUE PROJECT STATES
// ============================================================================

/**
 * Get list of unique Nigerian states from all projects
 *
 * @returns Array of state names (sorted alphabetically)
 *
 * @example
 * ```typescript
 * const states = await getUniqueProjectStates();
 * // ['Abuja', 'Lagos', 'Rivers', ...]
 * ```
 */
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

// ============================================================================
// GET RECENT PROJECT IMAGES
// ============================================================================

/**
 * Get recent project images for carousel/gallery
 *
 * @param limit - Maximum number of images
 * @returns Array of projects with images
 *
 * @example
 * ```typescript
 * const recentImages = await getRecentProjectImages(5);
 * ```
 */
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

// ============================================================================
// GET PROJECTS FOR GALLERY
// ============================================================================

/**
 * Get all projects with gallery images extracted
 *
 * @returns Array of projects with galleryImages array
 *
 * @example
 * ```typescript
 * const projects = await getProjectsForGallery();
 * // Each project will have a galleryImages array
 * ```
 */
export async function getProjectsForGallery(): Promise<Project[]> {
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
    const processedProjects = projects.map(
      (project: {
        projectImage?: string;
        content?: Array<{ _type?: string; asset?: { url?: string } }>;
      }) => {
        const galleryImages: string[] = [];

        // Add the main project image
        if (project.projectImage) {
          galleryImages.push(project.projectImage);
        }

        // Extract images from content blocks
        if (project.content && Array.isArray(project.content)) {
          project.content.forEach(block => {
            if (block._type === 'image' && block.asset && block.asset.url) {
              galleryImages.push(block.asset.url);
            }
          });
        }

        return {
          ...project,
          galleryImages,
        };
      },
    );

    return processedProjects;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching projects for gallery from Sanity:', error);
    }
    return [];
  }
}
