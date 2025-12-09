import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 },
      );
    }

    // Fetch the original image
    let imageBuffer: Buffer;

    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      // External URL (Sanity, Cloudinary, etc.)
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error('Failed to fetch image');
      }
      imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    } else {
      // Local file from /public
      const imagePath = path.join(process.cwd(), 'public', imageUrl);
      imageBuffer = await fs.readFile(imagePath);
    }

    // Load the watermark logo
    const watermarkPath = path.join(
      process.cwd(),
      'public/images/acob-logo-dark.png',
    );
    const watermarkBuffer = await fs.readFile(watermarkPath);

    // Get original image dimensions
    const imageMetadata = await sharp(imageBuffer).metadata();
    const imageWidth = imageMetadata.width || 1000;
    const imageHeight = imageMetadata.height || 1000;

    // Calculate watermark size (12% of image width, max 250px for better visibility)
    const watermarkWidth = Math.min(Math.floor(imageWidth * 0.12), 250);

    // Resize watermark and add opacity (40% opacity for subtle but visible watermark)
    const resizedWatermark = await sharp(watermarkBuffer)
      .resize(watermarkWidth, null, {
        fit: 'contain',
        withoutEnlargement: true,
      })
      .composite([
        {
          input: Buffer.from([255, 255, 255, 102]), // 40% opacity (102/255 ≈ 0.4)
          raw: {
            width: 1,
            height: 1,
            channels: 4,
          },
          tile: true,
          blend: 'dest-in',
        },
      ])
      .toBuffer();

    const watermarkMetadata = await sharp(resizedWatermark).metadata();
    const watermarkHeight = watermarkMetadata.height || 100;

    // Position watermark at middle-right with 30px padding from right edge
    const left = imageWidth - (watermarkMetadata.width || 100) - 30;
    const top = (imageHeight - watermarkHeight) / 2; // Center vertically

    // Composite watermark onto image
    const watermarkedImage = await sharp(imageBuffer)
      .composite([
        {
          input: resizedWatermark,
          top: top,
          left: left,
        },
      ])
      .toBuffer();

    // Extract filename from URL for download
    const urlPath = new URL(imageUrl, 'http://dummy.com').pathname;
    const filename = path.basename(urlPath) || 'download.jpg';

    // Return watermarked image with download headers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new NextResponse(watermarkedImage as any, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error watermarking image:', error);
    return NextResponse.json(
      { error: 'Failed to process image', details: (error as Error).message },
      { status: 500 },
    );
  }
}
