const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if ImageMagick is installed
function checkImageMagick() {
  try {
    execSync('magick --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Optimize images using ImageMagick
function optimizeImage(inputPath, outputPath, quality = 75) {
  try {
    const command = `magick "${inputPath}" -quality ${quality} -resize 1920x1080 "${outputPath}"`;
    execSync(command, { stdio: 'ignore' });

    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = (
      ((originalSize - optimizedSize) / originalSize) *
      100
    ).toFixed(1);

    console.log(
      `✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`
    );
    console.log(
      `   ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(optimizedSize / 1024 / 1024).toFixed(1)}MB (${savings}% smaller)`
    );

    return true;
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
    return false;
  }
}

// Main optimization function
function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  if (!checkImageMagick()) {
    console.error('❌ ImageMagick is not installed. Please install it first:');
    console.error('   macOS: brew install imagemagick');
    console.error('   Ubuntu: sudo apt-get install imagemagick');
    console.error('   Windows: Download from https://imagemagick.org/');
    return;
  }

  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  const largeImages = [
    'transition-bg.jpg',
    'olooji-community.jpg',
    'obadore-ondo.jpg',
    'adebayo-community.jpg',
    'makami-kaduna.jpg',
    'hero1.JPG',
    'hero2.JPG',
    'hero3.JPG',
    'hero4.JPG',
    'hero5.JPG',
  ];

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let optimizedCount = 0;

  largeImages.forEach(filename => {
    const inputPath = path.join(imagesDir, filename);
    const outputPath = path.join(
      imagesDir,
      filename.replace(/\.(jpg|jpeg|JPG)$/i, '-optimized.webp')
    );

    if (fs.existsSync(inputPath)) {
      const originalSize = fs.statSync(inputPath).size;
      totalOriginalSize += originalSize;

      if (optimizeImage(inputPath, outputPath, 75)) {
        const optimizedSize = fs.statSync(outputPath).size;
        totalOptimizedSize += optimizedSize;
        optimizedCount++;
      }
    } else {
      console.log(`⚠️  ${filename} not found, skipping...`);
    }
  });

  console.log('\n📊 Optimization Summary:');
  console.log(`   Optimized: ${optimizedCount} images`);
  console.log(
    `   Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(1)}MB`
  );
  console.log(
    `   Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(1)}MB`
  );
  console.log(
    `   Total savings: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(1)}MB`
  );
  console.log(
    `   Percentage saved: ${(((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1)}%`
  );

  console.log('\n🎯 Next steps:');
  console.log(
    '   1. Update image references in your code to use -optimized.webp files'
  );
  console.log('   2. Remove or backup the original large .jpg files');
  console.log('   3. Test the website to ensure images load correctly');
}

// Run the optimization
optimizeImages();
