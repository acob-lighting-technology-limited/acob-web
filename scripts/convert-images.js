import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');
const NON_WEBP_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

// Find all non-webp images
async function findNonWebpImages() {
  const images = [];
  const files = await glob('**/*', { cwd: IMAGES_DIR, absolute: true });

  for (const file of files) {
    const ext = path.extname(file);
    if (NON_WEBP_EXTENSIONS.includes(ext) && fs.statSync(file).isFile()) {
      images.push(file);
    }
  }

  return images;
}

// Find all image references in code
async function findImageReferences() {
  const codeFiles = await glob('**/*.{ts,tsx,js,jsx,json}', {
    cwd: path.join(__dirname, '..'),
    ignore: ['node_modules/**', 'dist/**', '.next/**', 'scripts/**'],
  });

  const references = new Set();

  for (const file of codeFiles) {
    const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf-8');
    // Match image paths like /images/... or images/...
    const matches = content.matchAll(/['"`]([^'"`]*\/images\/[^'"`?]+)['"`]/g);
    for (const match of matches) {
      let imagePath = match[1];
      // Remove query params
      imagePath = imagePath.split('?')[0];
      // Normalize path
      if (!imagePath.startsWith('/')) {
        imagePath = `/${imagePath}`;
      }
      references.add(imagePath);
    }
  }

  return references;
}

// Convert image to webp
async function convertToWebp(inputPath, outputPath) {
  try {
    await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);
    console.log(
      `✓ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`,
    );
    return true;
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}:`, error.message);
    return false;
  }
}

// Update references in code
async function updateReferences(oldPath, newPath) {
  const codeFiles = await glob('**/*.{ts,tsx,js,jsx,json}', {
    cwd: path.join(__dirname, '..'),
    ignore: ['node_modules/**', 'dist/**', '.next/**', 'scripts/**'],
  });

  let updated = 0;

  for (const file of codeFiles) {
    const filePath = path.join(__dirname, '..', file);
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // Replace references (with and without query params)
    const patterns = [
      new RegExp(
        `(['"\`])${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?[^'"\`]*)?(['"\`])`,
        'g',
      ),
      new RegExp(
        `(['"\`])${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?[^'"\`]*)?(['"\`])`,
        'g',
      ),
    ];

    for (const pattern of patterns) {
      content = content.replace(pattern, (match, quote1, query, quote2) => {
        return `${quote1}${newPath}${query || ''}${quote2 || quote1}`;
      });
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      updated++;
      console.log(`  Updated: ${file}`);
    }
  }

  return updated;
}

// Main function
async function main() {
  console.log('🔍 Finding non-webp images...\n');
  const nonWebpImages = await findNonWebpImages();

  if (nonWebpImages.length === 0) {
    console.log('✓ No non-webp images found!\n');
  } else {
    console.log(`Found ${nonWebpImages.length} non-webp image(s):\n`);
    nonWebpImages.forEach(img =>
      console.log(`  - ${path.relative(IMAGES_DIR, img)}`),
    );
    console.log('\n🔄 Converting to webp...\n');

    for (const imagePath of nonWebpImages) {
      const ext = path.extname(imagePath);
      const webpPath = imagePath.replace(ext, '.webp');

      const success = await convertToWebp(imagePath, webpPath);
      if (success) {
        const relativeOldPath = `/images/${path.relative(IMAGES_DIR, imagePath)}`;
        const relativeNewPath = `/images/${path.relative(IMAGES_DIR, webpPath)}`;

        console.log(
          `  Updating references: ${relativeOldPath} → ${relativeNewPath}`,
        );
        await updateReferences(relativeOldPath, relativeNewPath);

        // Delete original
        fs.unlinkSync(imagePath);
        console.log(`  Deleted: ${path.basename(imagePath)}\n`);
      }
    }
  }

  console.log('\n🔍 Finding unused images...\n');
  const references = await findImageReferences();
  const allImages = await glob('**/*.{webp,svg,png,jpg,jpeg,JPG,JPEG,PNG}', {
    cwd: IMAGES_DIR,
    absolute: true,
  });

  const usedImages = new Set();
  references.forEach(ref => {
    // Try to match with actual file paths
    const normalizedRef = ref.replace(/^\/images\//, '');
    allImages.forEach(img => {
      const relativePath = path.relative(IMAGES_DIR, img);
      if (
        relativePath === normalizedRef ||
        relativePath.replace(/\.[^.]+$/, '') ===
          normalizedRef.replace(/\.[^.]+$/, '')
      ) {
        usedImages.add(img);
      }
    });
  });

  const unusedImages = allImages.filter(
    img => !usedImages.has(img) && !img.includes('.DS_Store'),
  );

  if (unusedImages.length > 0) {
    console.log(`Found ${unusedImages.length} unused image(s):\n`);
    unusedImages.forEach(img =>
      console.log(`  - ${path.relative(IMAGES_DIR, img)}`),
    );
    console.log('\n🗑️  Deleting unused images...\n');
    unusedImages.forEach(img => {
      fs.unlinkSync(img);
      console.log(`  Deleted: ${path.relative(IMAGES_DIR, img)}`);
    });
  } else {
    console.log('✓ No unused images found!\n');
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);
