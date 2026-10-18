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
// SHARED PROJECTIONS
// ============================================================================

/**
 * Core field set shared by the full-detail project queries
 */
const PROJECT_CORE_FIELDS = `
  _id,
  title,
  excerpt,
  description,
  slug,
  categories,
  tags,
  subcategory,
  "projectDate": publishedAt,
  publishedAt,
  descriptionTemplate,
  content,
  gallery[] {
    ...,
    "asset": asset->{
      url,
      _ref
    }
  },
  location,
  lga,
  state,
  latitude,
  longitude,
  isFeatured,
  featuredRank,
  "projectImage": coverImage.asset->url,
  "coverImage": coverImage.asset->url,
  impactMetrics,
  customMetrics,
  seo
`;

/** Trimmed field set for card/listing surfaces that don't need full content. */
const PROJECT_LISTING_FIELDS = `
  _id,
  title,
  excerpt,
  slug,
  categories,
  tags,
  location,
  state,
  latitude,
  longitude,
  "projectImage": coverImage.asset->url,
  "coverImage": coverImage.asset->url
`;

// ============================================================================
// GET ALL PROJECTS
// ============================================================================

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(`
      *[_type == "project" && defined(coverImage)] | order(publishedAt desc, _createdAt desc) {
        ${PROJECT_CORE_FIELDS}
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
// GET PROJECTS FOR LISTING (trimmed fields for card/grid surfaces)
// ============================================================================

export async function getProjectsForListing(): Promise<Project[]> {
  try {
    const projects = await client.fetch(`
      *[_type == "project" && defined(coverImage)] | order(publishedAt desc, _createdAt desc) {
        ${PROJECT_LISTING_FIELDS}
      }
    `);
    return projects;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching projects for listing from Sanity:', error);
    }
    return [];
  }
}

// ============================================================================
// GET PROJECTS WITH PAGINATION
// ============================================================================

export async function getProjectsPaginated({
  page = 1,
  limit = PAGINATION.PROJECTS_PER_PAGE,
  search = '',
  state = '',
  category = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
  state?: string;
  /** A category slug; `categories` is a multi-select array on the project. */
  category?: string;
} = {}): Promise<PaginatedResponse<Project>> {
  try {
    const offset = (page - 1) * limit;
    const params: Record<string, string | number> = {};

    let query = '*[_type == "project" && defined(coverImage)';

    // Search filter
    if (search.trim()) {
      query += ` && (
        title match $search || 
        excerpt match $search || 
        location match $search || 
        state match $search
      )`;
      params.search = `*${search}*`;
    }

    // State filter
    if (state.trim()) {
      query += ' && state == $state';
      params.state = state;
    }

    // Category filter
    if (category.trim()) {
      query += ' && $category in categories';
      params.category = category;
    }

    query += `] | order(publishedAt desc, _createdAt desc)[${offset}...${offset + limit}] {
      ${PROJECT_LISTING_FIELDS}
    }`;

    let countQuery = 'count(*[_type == "project" && defined(coverImage)';
    if (search.trim()) {
      countQuery += ` && (
        title match $search || 
        excerpt match $search || 
        location match $search || 
        state match $search
      )`;
    }
    if (state.trim()) {
      countQuery += ' && state == $state';
    }
    if (category.trim()) {
      countQuery += ' && $category in categories';
    }
    countQuery += '])';

    const [projects, totalItems] = await Promise.all([
      client.fetch(query, params),
      client.fetch(countQuery, params),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: totalItems,
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

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await client.fetch(
      `
      *[_type == "project" && slug.current == $slug][0] {
        ${PROJECT_CORE_FIELDS},
        comments[] | order(createdAt desc) {
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

    return project || null;
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

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(`
      *[_type == "project" && isFeatured == true && defined(coverImage)] | order(orderRank)[0...10] {
        ${PROJECT_CORE_FIELDS},
        orderRank
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

export async function getProjectsByCategoryPaginated({
  category,
  page = 1,
  limit = PAGINATION.PROJECTS_PER_PAGE,
  search = '',
}: {
  category: string;
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<Project>> {
  try {
    const offset = (page - 1) * limit;

    let query =
      '*[_type == "project" && defined(coverImage) && $category in categories';
    const params: Record<string, string | number> = { category };

    if (search.trim()) {
      query +=
        ' && (title match $search || excerpt match $search || location match $search)';
      params.search = `*${search}*`;
    }

    query += `] | order(publishedAt desc, _createdAt desc)[${offset}...${offset + limit}] {
      ${PROJECT_LISTING_FIELDS}
    }`;

    let countQuery =
      'count(*[_type == "project" && defined(coverImage) && $category in categories';
    if (search.trim()) {
      countQuery +=
        ' && (title match $search || excerpt match $search || location match $search)';
    }
    countQuery += '])';

    const [projects, totalItems] = await Promise.all([
      client.fetch(query, params),
      client.fetch(countQuery, params),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: totalItems,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (error) {
    console.error('Error fetching projects by category from Sanity:', error);
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
// GET PROJECTS BY CATEGORY AND SUB-CATEGORY
// ============================================================================

export async function getProjectsBySubcategoryPaginated({
  category,
  subcategory,
  page = 1,
  limit = PAGINATION.PROJECTS_PER_PAGE,
  search = '',
}: {
  category: string;
  subcategory: string;
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<Project>> {
  try {
    const offset = (page - 1) * limit;

    let baseQuery =
      '*[_type == "project" && defined(coverImage) && $category in categories && subcategory == $subcategory';
    const params: Record<string, string | number> = { category, subcategory };

    if (search.trim()) {
      baseQuery +=
        ' && (title match $search || excerpt match $search || location match $search)';
      params.search = `*${search}*`;
    }

    const paginatedQuery = `${baseQuery}] | order(publishedAt desc, _createdAt desc)[${offset}...${offset + limit}] {
      ${PROJECT_LISTING_FIELDS}
    }`;

    const countQuery = `count(${baseQuery}])`;

    const [projects, totalItems] = await Promise.all([
      client.fetch(paginatedQuery, params),
      client.fetch(countQuery, params),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: totalItems,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (error) {
    console.error(
      'Error fetching projects by sub-category from Sanity:',
      error,
    );
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
// GET RELATED PROJECTS
// ============================================================================

export async function getRelatedProjects(
  category: string,
  currentSlug: string,
  limit: number = 3,
): Promise<Project[]> {
  try {
    const projects = await client.fetch(
      `*[_type == "project" && defined(coverImage) && $category in categories && slug.current != $currentSlug] | order(publishedAt desc, _createdAt desc)[0...$limit] {
        ${PROJECT_LISTING_FIELDS}
      }`,
      { category, currentSlug, limit },
    );
    return projects;
  } catch (error) {
    console.error('Error fetching related projects from Sanity:', error);
    return [];
  }
}

// ============================================================================
// GET UNIQUE STATES
// ============================================================================

export async function getUniqueProjectStates(): Promise<string[]> {
  try {
    const states = await client.fetch(`
      array::unique(*[_type == "project" && defined(coverImage) && defined(state)].state) | order(@)
    `);
    return states;
  } catch (error) {
    console.error('Error fetching unique project states from Sanity:', error);
    return [];
  }
}

// ============================================================================
// GET RECENT PROJECT IMAGES FOR FOOTER/GALLERY
// ============================================================================

export async function getRecentProjectImages(limit: number = 5) {
  try {
    const projects = await client.fetch(
      `
      *[_type == "project" && defined(coverImage)] | order(publishedAt desc, _createdAt desc)[0...$limit] {
        _id,
        title,
        slug,
        "projectImage": coverImage.asset->url
      }
    `,
      { limit },
    );
    return projects;
  } catch (error) {
    console.error('Error fetching recent project images from Sanity:', error);
    return [];
  }
}

// ============================================================================
// GET PROJECT GALLERY IMAGES (ALL IMAGES EXCLUDING PLACEHOLDERS)
// ============================================================================

export async function getProjectGalleryImages(): Promise<
  Array<{ src: string; alt: string; category: string }>
> {
  try {
    const projects = await getProjects();
    const allImages: Array<{ src: string; alt: string; category: string }> = [];

    projects.forEach(project => {
      const categoryName = project.categories?.[0] || 'Other';

      // 1. Add coverImage
      if (project.coverImage) {
        allImages.push({
          src: project.coverImage,
          alt: project.title,
          category: categoryName,
        });
      }

      // 2. Add gallery items
      if (project.gallery && Array.isArray(project.gallery)) {
        project.gallery.forEach(img => {
          if (img._type === 'image' && img.asset && img.asset.url) {
            allImages.push({
              src: img.asset.url,
              alt: img.alt || project.title,
              category: categoryName,
            });
          }
        });
      }
    });

    return allImages;
  } catch (error) {
    console.error('Error in getProjectGalleryImages:', error);
    return [];
  }
}
