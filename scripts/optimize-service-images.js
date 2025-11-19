import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const SERVICES_DIR = 'public/images/services';

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = await stat(inputPath);
    const originalSize = stats.size;

    // Optimize WebP with quality 80 and smart compression
    await sharp(inputPath).webp({ quality: 80, effort: 6 }).toFile(outputPath);

    const newStats = await stat(outputPath);
    const newSize = newStats.size;
    const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(
      1,
    );

    console.log(
      `${inputPath}: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${reduction}% reduction)`,
    );

    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  try {
    const files = await readdir(SERVICES_DIR);
    const webpFiles = files.filter(file => file.endsWith('.webp'));

    console.log(`Found ${webpFiles.length} WebP images to optimize...\n`);

    let totalOriginal = 0;
    let totalNew = 0;

    for (const file of webpFiles) {
      const inputPath = join(SERVICES_DIR, file);
      const outputPath = join(SERVICES_DIR, `${file}.tmp`);

      const result = await optimizeImage(inputPath, outputPath);

      if (result) {
        totalOriginal += result.originalSize;
        totalNew += result.newSize;

        // Replace original with optimized version
        const { rename } = await import('fs/promises');
        await rename(outputPath, inputPath);
      }
    }

    const totalReduction = (
      ((totalOriginal - totalNew) / totalOriginal) *
      100
    ).toFixed(1);
    console.log(
      `\nTotal: ${(totalOriginal / 1024).toFixed(1)}KB → ${(totalNew / 1024).toFixed(1)}KB (${totalReduction}% reduction)`,
    );
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
