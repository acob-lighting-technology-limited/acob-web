import { getProjects } from '@/sanity/lib/client';
import type { Project } from '@/lib/types';

export interface StaticImage {
  url: string;
  alt: string;
  projectTitle: string;
  width: number;
  height: number;
}

// Static fallback images with proper dimensions
const FALLBACK_IMAGES: StaticImage[] = [
  {
    url: '/images/obadore-ondo.webp',
    alt: 'Solar Installation Project',
    projectTitle: 'Obadore Ondo Solar Project',
    width: 400,
    height: 300,
  },
  {
    url: '/images/makami-kaduna.webp',
    alt: 'Team Working on Solar Installation',
    projectTitle: 'Makami Kaduna Project',
    width: 400,
    height: 300,
  },
  {
    url: '/images/olooji-community.webp',
    alt: 'Solar Panels Installation',
    projectTitle: 'Olooji Community Project',
    width: 400,
    height: 300,
  },
  {
    url: '/images/adebayo-community.webp',
    alt: 'Community Impact Solar Project',
    projectTitle: 'Adebayo Community Project',
    width: 400,
    height: 300,
  },
];

// Build-time function to get all available images
export async function getAllProjectImages(): Promise<StaticImage[]> {
  try {
    const projects = await getProjects();

    const allImages: StaticImage[] = [];

    projects.forEach((project: Project) => {
      // Add main project image if available
      if (project.projectImage) {
        allImages.push({
          url: project.projectImage,
          alt: `${project.title} - ${project.location}`,
          projectTitle: project.title,
          width: 400,
          height: 300,
        });
      }

      // Add content images if available
      // Note: images from getProjects() have url and metadata structure
      if (
        project.images &&
        Array.isArray(project.images) &&
        project.images.length > 0
      ) {
        project.images.forEach((image: any) => {
          const imageUrl = (image as any)?.url || (image as any)?.asset?.url;
          if (imageUrl) {
            allImages.push({
              url: imageUrl,
              alt: `${project.title} - ${project.location}`,
              projectTitle: project.title,
              width: (image as any)?.metadata?.dimensions?.width || 400,
              height: (image as any)?.metadata?.dimensions?.height || 300,
            });
          }
        });
      }
    });

    // Force return Sanity images for testing
    if (allImages.length > 0) {
      return allImages;
    } else {
      return FALLBACK_IMAGES;
    }
  } catch (error) {
    console.error('❌ Error fetching project images:', error);
    return FALLBACK_IMAGES;
  }
}

// Deterministic selection (not random) for consistent builds
export function selectImages(
  images: StaticImage[],
  count: number = 4,
): StaticImage[] {
  // Use a deterministic approach based on array length
  const step = Math.max(1, Math.floor(images.length / count));
  const selected: StaticImage[] = [];

  for (let i = 0; i < count && i * step < images.length; i++) {
    selected.push(images[i * step]);
  }

  // Fill remaining slots with fallbacks if needed
  while (selected.length < count) {
    const fallbackIndex = selected.length % FALLBACK_IMAGES.length;
    selected.push(FALLBACK_IMAGES[fallbackIndex]);
  }

  return selected;
}

// Get background image (first available or fallback)
export function getBackgroundImage(images: StaticImage[]): string {
  return images.length > 0 ? images[0].url : '/images/transition-bg.webp';
}

// Validate image URL and return fallback if invalid
export function validateImageUrl(url: string): string {
  if (!url || url.includes('undefined') || url.includes('null')) {
    return FALLBACK_IMAGES[0].url;
  }
  return url;
}

// Static images - loaded once at build time
let staticImages: StaticImage[] = [];
let staticBackgroundImage = '/images/transition-bg.webp';

// Check for preloaded images first
function getPreloadedImages(): StaticImage[] | null {
  if (typeof window === 'undefined') {
    return null;
  }

  // In a real implementation, you would fetch from /preloaded-images.json
  // For now, return null to fall back to dynamic loading
  return null;
}

// Initialize static images (called during build or first render)
export async function initializeStaticImages() {
  if (staticImages.length === 0) {
    // First, try to get preloaded images
    const preloaded = getPreloadedImages();
    if (preloaded) {
      staticImages = preloaded;
      return;
    }

    try {
      const allImages = await getAllProjectImages();
      staticImages = selectImages(allImages, 4);
      staticBackgroundImage = validateImageUrl(getBackgroundImage(allImages));
    } catch (error) {
      console.error('❌ Failed to load static images:', error);
      // Use fallback images
      staticImages = FALLBACK_IMAGES;
    }
  }
}

// Get the initialized static images
export function getStaticImages(): StaticImage[] {
  return staticImages;
}

// Get the initialized background image
export function getStaticBackgroundImage(): string {
  return staticBackgroundImage;
}
