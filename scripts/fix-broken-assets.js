const { createClient } = require('@sanity/client');

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required');
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('NEXT_PUBLIC_SANITY_DATASET environment variable is required');
}

// Configure Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // We need to bypass CDN to see real-time data
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // You'll need a token with write access
});

async function findBrokenAssets() {
  try {
    console.log('🔍 Searching for projects with broken image assets...\n');

    const projects = await client.fetch(`
      *[_type == "project"] {
        _id,
        title,
        "brokenImages": images[asset == null] {
          _key,
          asset
        },
        "validImages": images[asset != null] {
          _key,
          asset->{url}
        },
        "totalImages": count(images),
        "validImageCount": count(images[asset != null])
      }
    `);

    let hasBrokenAssets = false;

    projects.forEach(project => {
      if (project.brokenImages && project.brokenImages.length > 0) {
        hasBrokenAssets = true;
        console.log(`❌ Project: "${project.title}"`);
        console.log(`   ID: ${project._id}`);
        console.log(`   Total Images: ${project.totalImages}`);
        console.log(`   Valid Images: ${project.validImageCount}`);
        console.log(`   Broken Images: ${project.brokenImages.length}`);
        console.log(
          `   Broken Image Keys: ${project.brokenImages.map(img => img._key).join(', ')}`
        );
        console.log('');
      }
    });

    if (!hasBrokenAssets) {
      console.log('✅ No broken assets found!');
    } else {
      console.log('💡 To fix broken assets:');
      console.log('1. Go to Sanity Studio (http://localhost:3333)');
      console.log('2. Navigate to the projects with broken images');
      console.log('3. Delete the broken image references');
      console.log('4. Upload new images');
      console.log('5. Save the projects');
    }
  } catch (error) {
    console.error('❌ Error finding broken assets:', error);
  }
}

async function cleanBrokenAssets() {
  try {
    console.log('🧹 Cleaning up broken image assets...\n');

    const projects = await client.fetch(`
      *[_type == "project"] {
        _id,
        title,
        images
      }
    `);

    for (const project of projects) {
      const validImages = project.images?.filter(img => img?.asset) || [];

      if (validImages.length !== project.images?.length) {
        console.log(`🔧 Fixing project: "${project.title}"`);
        console.log(`   Before: ${project.images?.length || 0} images`);
        console.log(`   After: ${validImages.length} images`);

        // Update the project to remove broken assets
        await client.patch(project._id).set({ images: validImages }).commit();

        console.log(`   ✅ Fixed!\n`);
      }
    }

    console.log('🎉 All broken assets have been cleaned up!');
  } catch (error) {
    console.error('❌ Error cleaning broken assets:', error);
  }
}

// Run the appropriate function based on command line argument
const command = process.argv[2];

if (command === 'clean') {
  cleanBrokenAssets();
} else {
  findBrokenAssets();
}
