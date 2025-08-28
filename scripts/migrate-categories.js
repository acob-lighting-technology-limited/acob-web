import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_TOKEN, // You'll need to create a token with write permissions
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function migrateCategories() {
  try {
    console.log('Starting category migration...');
    
    // Get all update posts
    const posts = await client.fetch(`
      *[_type == "updatePost"] {
        _id,
        title,
        category,
        "oldCategory": category
      }
    `);
    
    console.log(`Found ${posts.length} posts to process`);
    
    for (const post of posts) {
      console.log(`Processing post: ${post.title}`);
      
      // If category is null or undefined, set it to 'news' as default
      const newCategory = post.category || 'news';
      
      // Update the post
      await client.patch(post._id)
        .set({ category: newCategory })
        .commit();
      
      console.log(`Updated ${post.title} with category: ${newCategory}`);
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run the migration
migrateCategories();
