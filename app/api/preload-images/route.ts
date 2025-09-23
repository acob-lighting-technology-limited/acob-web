import { NextRequest, NextResponse } from 'next/server';
import { getAllProjectImages, selectImages, getBackgroundImage } from '@/lib/utils/static-images';

export async function GET(request: NextRequest) {
  try {
    // This endpoint can be called during build time to preload images
    const allImages = await getAllProjectImages();
    const selectedImages = selectImages(allImages, 4);
    const backgroundImage = getBackgroundImage(allImages);

    return NextResponse.json({
      success: true,
      images: selectedImages,
      backgroundImage,
      count: selectedImages.length,
    });
  } catch (error) {
    console.error('Error preloading images:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to preload images',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
