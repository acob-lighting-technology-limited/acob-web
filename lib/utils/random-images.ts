import { getProjects } from '@/sanity/lib/client';
import type { Project } from '@/lib/types';

export interface RandomImage {
  url: string;
  alt: string;
  projectTitle: string;
}

interface FetchableImage {
  url?: string;
  asset?: {
    url: string;
  };
}

export async function getRandomProjectImages(
  count: number = 4,
): Promise<RandomImage[]> {
  try {
    const projects = await getProjects();

    // Flatten all images from all projects into a single array
    const allImages: RandomImage[] = [];

    projects.forEach((project: Project) => {
      // Note: images from getProjects() have url and metadata structure directly
      if (
        project.images &&
        Array.isArray(project.images) &&
        project.images.length > 0
      ) {
        (project.images as any[]).forEach((image: FetchableImage) => {
          const imageUrl = image?.url || image?.asset?.url;
          if (imageUrl) {
            allImages.push({
              url: imageUrl,
              alt: `${project.title} - ${project.location}`,
              projectTitle: project.title,
            });
          }
        });
      }
    });

    // Shuffle the array and take the required number of images
    const shuffled = allImages.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Error fetching random project images:', error);
    // Return fallback images if there's an error
    return [
      {
        url: '/images/obadore-ondo.webp',
        alt: 'Solar Installation',
        projectTitle: 'Fallback Image',
      },
      {
        url: '/images/makami-kaduna.webp',
        alt: 'Team at Work',
        projectTitle: 'Fallback Image',
      },
      {
        url: '/images/olooji-community.webp',
        alt: 'Solar Panels',
        projectTitle: 'Fallback Image',
      },
      {
        url: '/images/adebayo-community.webp',
        alt: 'Community Impact',
        projectTitle: 'Fallback Image',
      },
    ];
  }
}

export async function getRandomBackgroundImage(): Promise<string> {
  try {
    const projects = await getProjects();

    // Get all images from all projects
    const allImages: string[] = [];

    projects.forEach((project: Project) => {
      // Note: images from getProjects() have url and metadata structure directly
      if (
        project.images &&
        Array.isArray(project.images) &&
        project.images.length > 0
      ) {
        (project.images as any[]).forEach((image: FetchableImage) => {
          const imageUrl = image?.url || image?.asset?.url;
          if (imageUrl) {
            allImages.push(imageUrl);
          }
        });
      }
    });

    // Return a random image or fallback
    if (allImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * allImages.length);
      return allImages[randomIndex];
    }

    return '/images/transition-bg.webp'; // Fallback
  } catch (error) {
    console.error('Error fetching random background image:', error);
    return '/images/transition-bg.webp'; // Fallback
  }
}
