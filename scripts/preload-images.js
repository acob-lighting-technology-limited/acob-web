#!/usr/bin/env node

/**
 * Script to preload images during build time
 * This ensures images are available immediately when the app loads
 */

const fs = require('fs');
const path = require('path');

const IMAGES_CACHE_FILE = path.join(process.cwd(), 'public', 'preloaded-images.json');

async function preloadImages() {
  try {
    console.log('🔄 Preloading images...');
    
    // In a real implementation, you would call your Sanity API here
    // For now, we'll create a fallback structure
    const fallbackImages = {
      images: [
        {
          url: '/images/obadore-ondo.jpg',
          alt: 'Solar Installation Project',
          projectTitle: 'Obadore Ondo Solar Project',
          width: 400,
          height: 300,
        },
        {
          url: '/images/makami-kaduna.jpg',
          alt: 'Team Working on Solar Installation',
          projectTitle: 'Makami Kaduna Project',
          width: 400,
          height: 300,
        },
        {
          url: '/images/olooji-community.jpg',
          alt: 'Solar Panels Installation',
          projectTitle: 'Olooji Community Project',
          width: 400,
          height: 300,
        },
        {
          url: '/images/adebayo-community.jpg',
          alt: 'Community Impact Solar Project',
          projectTitle: 'Adebayo Community Project',
          width: 400,
          height: 300,
        },
      ],
      backgroundImage: '/images/transition-bg.jpg',
      timestamp: Date.now(),
    };

    // Ensure public directory exists
    const publicDir = path.dirname(IMAGES_CACHE_FILE);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write the cache file
    fs.writeFileSync(IMAGES_CACHE_FILE, JSON.stringify(fallbackImages, null, 2));
    
    console.log('✅ Images preloaded successfully');
    console.log(`📁 Cache file created: ${IMAGES_CACHE_FILE}`);
    
  } catch (error) {
    console.error('❌ Error preloading images:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  preloadImages();
}

module.exports = { preloadImages };
