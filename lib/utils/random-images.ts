import { getProjects } from '@/sanity/lib/client';

export interface RandomImage {
  url: string;
  alt: string;
  projectTitle: string;
}

interface SanityProject {
  title: string;
  location: string;
  images: Array<{
    asset: {
      url: string;
    };
  }>;
}

export async function getRandomProjectImages(
  count: number = 4
): Promise<RandomImage[]> {
  try {
    const projects = await getProjects();

    // Flatten all images from all projects into a single array
    const allImages: RandomImage[] = [];

    projects.forEach((project: SanityProject) => {
      if (project.images && project.images.length > 0) {
        project.images.forEach(image => {
          if (image?.asset?.url) {
            allImages.push({
              url: image.asset.url,
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
        url: '/images/obadore-ondo-optimized.webp',
        alt: 'Solar Installation',
        projectTitle: 'Fallback Image',
      },
      {
        url: '/images/makami-kaduna-optimized.webp',
        alt: 'Team at Work',
        projectTitle: 'Fallback Image',
      },
      {
        url: '/images/olooji-community-optimized.webp',
        alt: 'Solar Panels',
        projectTitle: 'Fallback Image',
      },
      {
        url: '/images/adebayo-community-optimized.webp',
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

    projects.forEach((project: SanityProject) => {
      if (project.images && project.images.length > 0) {
        project.images.forEach(image => {
          if (image?.asset?.url) {
            allImages.push(image.asset.url);
          }
        });
      }
    });

    // Return a random image or fallback
    if (allImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * allImages.length);
      return allImages[randomIndex];
    }

    return '/images/transition-bg-optimized.webp'; // Fallback
  } catch (error) {
    console.error('Error fetching random background image:', error);
    return '/images/transition-bg-optimized.webp'; // Fallback
  }
}
