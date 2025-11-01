import { NextResponse } from 'next/server';
import { getProjects, testSanityConnection } from '@/sanity/lib/client';

export async function GET() {
  try {
    console.log('🧪 Testing Sanity connection...');

    // Test basic connection
    const connectionTest = await testSanityConnection();

    // Get projects data
    const projects = await getProjects();

    // Log detailed information
    console.log('📊 Projects count:', projects.length);

    if (projects.length > 0) {
      console.log('📝 First project structure:', JSON.stringify(projects[0], null, 2));

      // Check for images in projects
      const projectsWithImages = projects.filter((project: typeof projects[0]) =>
        project.projectImage || (project.images && project.images.length > 0),
      );

      console.log('🖼️ Projects with images:', projectsWithImages.length);

      return NextResponse.json({
        success: true,
        connectionTest,
        projectsCount: projects.length,
        projectsWithImages: projectsWithImages.length,
        firstProject: projects[0],
        sampleImages: projectsWithImages.slice(0, 3).map((p: typeof projects[0]) => ({
          title: p.title,
          projectImage: p.projectImage,
          imagesCount: p.images?.length || 0,
        })),
      });
    } else {
      return NextResponse.json({
        success: true,
        connectionTest,
        projectsCount: 0,
        message: 'No projects found in Sanity',
      });
    }

  } catch (error) {
    console.error('❌ Sanity test failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
