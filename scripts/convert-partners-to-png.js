import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PARTNERS_DIR = path.join(__dirname, '../public/images/partners');

// Convert filename to lowercase with hyphens
function normalizeFileName(filename) {
  return filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Convert image to PNG
async function convertToPng(inputPath, outputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();

    if (ext === '.svg') {
      // SVG needs special handling - convert to PNG
      await sharp(inputPath, { density: 300 }).png().toFile(outputPath);
    } else if (
      ext === '.webp' ||
      ext === '.jpg' ||
      ext === '.jpeg' ||
      ext === '.png'
    ) {
      await sharp(inputPath).png().toFile(outputPath);
    } else {
      console.log(`  ⚠️  Skipping unsupported format: ${inputPath}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`  ❌ Error converting ${inputPath}:`, error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🔄 Converting partner images to PNG...\n');

  const files = fs.readdirSync(PARTNERS_DIR);
  const convertedFiles = new Map();

  for (const file of files) {
    const filePath = path.join(PARTNERS_DIR, file);
    const stat = fs.statSync(filePath);

    if (!stat.isFile()) {
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const normalizedName = normalizeFileName(baseName);
    const outputPath = path.join(PARTNERS_DIR, `${normalizedName}.png`);

    // Skip if already PNG with correct name
    if (ext === '.png' && normalizeFileName(baseName) === normalizedName) {
      console.log(`  ✓ Already PNG: ${file}`);
      convertedFiles.set(normalizedName, normalizedName);
      continue;
    }

    // Skip if PNG already exists with same name
    if (fs.existsSync(outputPath) && ext === '.png') {
      console.log(`  ✓ PNG already exists: ${normalizedName}.png`);
      convertedFiles.set(normalizedName, normalizedName);
      continue;
    }

    // Convert to PNG
    console.log(`  Converting: ${file} → ${normalizedName}.png`);
    const success = await convertToPng(filePath, outputPath);

    if (success) {
      convertedFiles.set(normalizedName, normalizedName);

      // Delete original if it's not the same as output and not locked
      if (filePath !== outputPath) {
        try {
          fs.unlinkSync(filePath);
          console.log(`  ✓ Deleted original: ${file}\n`);
        } catch (error) {
          if (error.code === 'EBUSY') {
            console.log(
              `  ⚠️  Could not delete ${file} (file in use), but PNG created\n`,
            );
          } else {
            console.log(`  ⚠️  Could not delete ${file}: ${error.message}\n`);
          }
        }
      }
    }
  }

  console.log(
    `\n✅ Conversion complete! ${convertedFiles.size} PNG files ready.`,
  );
  console.log('\n📋 Partner names (normalized):');
  convertedFiles.forEach(name => {
    console.log(`  - ${name}`);
  });
}

main().catch(console.error);
