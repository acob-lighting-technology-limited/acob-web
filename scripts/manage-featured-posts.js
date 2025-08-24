import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_TOKEN, // You'll need a token with write permissions
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Function to unfeature all posts except the specified one
export async function unfeatureOtherPosts(keepFeaturedId) {
  try {
    // Find all other featured posts
    const otherFeaturedPosts = await client.fetch(`
      *[_type == "updatePost" && featured == true && _id != $keepFeaturedId] {
        _id,
        title
      }
    `, { keepFeaturedId });

    console.log(`Found ${otherFeaturedPosts.length} other featured posts to unfeature`);

    // Unfeature all other posts
    for (const post of otherFeaturedPosts) {
      await client.patch(post._id)
        .set({ featured: false })
        .commit();
      console.log(`Unfeatured: ${post.title}`);
    }

    console.log('Successfully unfeatured all other posts');
  } catch (error) {
    console.error('Error unfeaturing posts:', error);
  }
}

// Function to set a specific post as featured
export async function setFeaturedPost(postId) {
  try {
    // First unfeature all other posts
    await unfeatureOtherPosts(postId);
    
    // Then feature the specified post
    await client.patch(postId)
      .set({ featured: true })
      .commit();
    
    console.log('Successfully set post as featured');
  } catch (error) {
    console.error('Error setting featured post:', error);
  }
}

// Function to list all featured posts
export async function listFeaturedPosts() {
  try {
    const featuredPosts = await client.fetch(`
      *[_type == "updatePost" && featured == true] {
        _id,
        title,
        publishedAt
      }
    `);
    
    console.log('Currently featured posts:');
    featuredPosts.forEach(post => {
      console.log(`- ${post.title} (${new Date(post.publishedAt).toLocaleDateString()})`);
    });
    
    return featuredPosts;
  } catch (error) {
    console.error('Error listing featured posts:', error);
    return [];
  }
}

// Example usage
if (process.argv[2] === 'list') {
  listFeaturedPosts();
} else if (process.argv[2] === 'set' && process.argv[3]) {
  setFeaturedPost(process.argv[3]);
} else {
  console.log('Usage:');
  console.log('  node manage-featured-posts.js list');
  console.log('  node manage-featured-posts.js set <postId>');
}
