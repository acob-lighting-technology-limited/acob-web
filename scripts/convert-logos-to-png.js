import sharp from 'sharp';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGES_DIR = join(__dirname, '../public/images');

async function convertLogoToPng(webpPath, pngPath) {
  try {
    if (!existsSync(webpPath)) {
      console.error(`❌ Source file not found: ${webpPath}`);
      return false;
    }

    console.log(`🔄 Converting ${webpPath} → ${pngPath}...`);

    // Convert WebP to PNG with high quality
    await sharp(webpPath)
      .png({
        compressionLevel: 9,
        quality: 100,
        palette: true,
      })
      .toFile(pngPath);

    console.log(`✅ Successfully converted: ${pngPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error converting ${webpPath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔄 Converting logo files from WebP to PNG...\n');

  const logos = [
    {
      webp: join(IMAGES_DIR, 'acob-logo-light.webp'),
      png: join(IMAGES_DIR, 'acob-logo-light.png'),
    },
    {
      webp: join(IMAGES_DIR, 'acob-logo-dark.webp'),
      png: join(IMAGES_DIR, 'acob-logo-dark.png'),
    },
  ];

  let successCount = 0;
  for (const logo of logos) {
    const success = await convertLogoToPng(logo.webp, logo.png);
    if (success) {
      successCount++;
    }
  }

  console.log(
    `\n✨ Conversion complete! ${successCount}/${logos.length} logos converted.`,
  );
}

main().catch(console.error);
