/**
 * Image Optimization Script
 * Compresses large images while maintaining quality
 *
 * Usage:
 *   node scripts/optimize-images.js
 *
 * Features:
 * - Reduces file sizes for faster loading
 * - Maintains high quality (80-85) for clarity
 * - Preserves aspect ratios
 * - Creates backups before optimization
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public/images');
const BACKUP_DIR = path.join(__dirname, '../.image-backups');
const TARGET_MAX_SIZE = 500 * 1024; // 500KB target

// Quality settings based on image type
const QUALITY_SETTINGS = {
  // Hero/carousel images - high quality
  hero: { quality: 88, maxWidth: 1920 },

  // Contact/large images - high quality
  large: { quality: 85, maxWidth: 1920 },

  // Gallery images - very high quality (for lightbox)
  gallery: { quality: 95, maxWidth: 2400 },

  // Default - high quality
  default: { quality: 85, maxWidth: 1920 },
};

// Files that should be treated as gallery/lightbox images (high quality)
const GALLERY_PATTERNS = ['gallery', 'project', 'update', 'lightbox'];

// Files that should be treated as hero images
const HERO_PATTERNS = ['hero', 'olooji', 'adebayo', 'community', 'airport'];

function getQualitySettings(filePath) {
  const fileName = path.basename(filePath).toLowerCase();

  // Check if it's a gallery image
  if (GALLERY_PATTERNS.some(pattern => fileName.includes(pattern))) {
    return QUALITY_SETTINGS.gallery;
  }

  // Check if it's a hero image
  if (HERO_PATTERNS.some(pattern => fileName.includes(pattern))) {
    return QUALITY_SETTINGS.hero;
  }

  // Check if it's in contact folder (large images)
  if (filePath.includes('/contact/')) {
    return QUALITY_SETTINGS.large;
  }

  return QUALITY_SETTINGS.default;
}

async function createBackup(filePath) {
  const relativePath = path.relative(PUBLIC_DIR, filePath);
  const backupPath = path.join(BACKUP_DIR, relativePath);
  const backupDir = path.dirname(backupPath);

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Only backup if not already backed up
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`  📦 Backed up to: ${relativePath}`);
  }
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) {
    return;
  }

  const stats = fs.statSync(filePath);
  const originalSize = stats.size;

  // Skip files already under 500KB
  if (originalSize < TARGET_MAX_SIZE) {
    console.log(
      `⏭️  Skipping ${path.basename(filePath)} (already optimized: ${(originalSize / 1024).toFixed(0)}KB)`,
    );
    return;
  }

  console.log(`\n🖼️  Optimizing: ${path.relative(PUBLIC_DIR, filePath)}`);
  console.log(`   Original size: ${(originalSize / 1024).toFixed(0)}KB`);

  // Create backup first
  await createBackup(filePath);

  const settings = getQualitySettings(filePath);
  console.log(
    `   Settings: quality=${settings.quality}, maxWidth=${settings.maxWidth}`,
  );

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if too large
    if (metadata.width > settings.maxWidth) {
      image.resize(settings.maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
      console.log(`   Resizing: ${metadata.width}px → ${settings.maxWidth}px`);
    }

    // Optimize based on file type
    const tempPath = `${filePath}.tmp`;

    if (ext === '.webp') {
      await image
        .webp({ quality: settings.quality, effort: 6 })
        .toFile(tempPath);
    } else if (['.jpg', '.jpeg'].includes(ext)) {
      await image
        .jpeg({ quality: settings.quality, progressive: true, mozjpeg: true })
        .toFile(tempPath);
    } else if (ext === '.png') {
      await image
        .png({ compressionLevel: 9, quality: settings.quality })
        .toFile(tempPath);
    }

    // Check new size
    const newStats = fs.statSync(tempPath);
    const newSize = newStats.size;
    const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(
      1,
    );

    if (newSize < originalSize) {
      // Replace original with optimized version
      fs.renameSync(tempPath, filePath);
      console.log(
        `   ✅ Optimized: ${(newSize / 1024).toFixed(0)}KB (${reduction}% reduction)`,
      );
    } else {
      // Keep original if optimization didn't help
      fs.unlinkSync(tempPath);
      console.log("   ⏭️  Kept original (optimization didn't reduce size)");
    }
  } catch (error) {
    console.error(`   ❌ Error optimizing ${filePath}:`, error.message);
  }
}

// Recursively optimize all images
async function walkDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await walkDir(filePath);
    } else {
      await optimizeImage(filePath);
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`📁 Directory: ${PUBLIC_DIR}`);
  console.log(`💾 Backups: ${BACKUP_DIR}\n`);

  // Create backup directory
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  await walkDir(PUBLIC_DIR);

  console.log('\n✨ Image optimization complete!');
  console.log(`💡 Tip: Backups are stored in ${BACKUP_DIR}`);
}

main().catch(console.error);
