/*
  One-time seeder to ensure the two update categories exist:
  - case-studies
  - press-releases

  Usage: node scripts/seed-update-categories.js

  Requires SANITY_API_TOKEN with write access in the environment.
*/

const { createClient } = require('@sanity/client');

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID');
  process.exit(1);
}

if (!token) {
  console.error('Missing SANITY_API_TOKEN (write token required)');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false });

async function ensureCategory(slugCurrent, nameTitle) {
  // Try to find existing by slug
  const existing = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{ _id }`,
    { slug: slugCurrent }
  );

  if (existing?._id) {
    console.log(`Category '${slugCurrent}' already exists: ${existing._id}`);
    return existing._id;
  }

  const doc = {
    _type: 'category',
    name: nameTitle,
    slug: { _type: 'slug', current: slugCurrent },
    description: `${nameTitle} category`,
  };

  const created = await client.create(doc);
  console.log(`Created category '${slugCurrent}': ${created._id}`);
  return created._id;
}

(async () => {
  try {
    await ensureCategory('case-studies', 'Case Studies');
    await ensureCategory('press-releases', 'Press Releases');
    console.log('Done');
  } catch (err) {
    console.error('Failed to seed categories:', err?.message || err);
    process.exit(1);
  }
})();


