import { DocumentActionComponent } from 'sanity';
import { createClient } from '@sanity/client';

const MAX_FEATURED_PROJECTS = 8;

// Create a Sanity client for querying
const client = createClient({
  projectId: 'x16t7huo',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Use false for fresh data in admin context
});

export const limitFeaturedProjects: DocumentActionComponent = props => {
  const { type, draft, published, onComplete } = props;

  // Only apply to project documents
  if (type !== 'project') {
    return null;
  }

  return {
    label: 'Publish',
    onHandle: async () => {
      const isFeatured = draft?.isFeatured || published?.isFeatured;

      // If not trying to feature, allow normal publish
      if (!isFeatured) {
        onComplete();
        return;
      }

      // Check if we're trying to feature this project
      const wasFeatured = published?.isFeatured;
      const willBeFeatured = draft?.isFeatured;

      // If already featured and staying featured, allow
      if (wasFeatured && willBeFeatured) {
        onComplete();
        return;
      }

      // If trying to newly feature, check the count
      if (!wasFeatured && willBeFeatured) {
        const featuredCount = await client.fetch(
          'count(*[_type == "project" && isFeatured == true && _id != $currentId])',
          { currentId: draft?._id || published?._id },
        );

        if (featuredCount >= MAX_FEATURED_PROJECTS) {
          // Show error and prevent publish
          // eslint-disable-next-line no-undef
          alert(
            `Cannot feature this project. Maximum of ${MAX_FEATURED_PROJECTS} featured projects allowed.\n\n` +
              `Currently featured: ${featuredCount}\n\n` +
              'Please unfeature another project first.',
          );
          return;
        }
      }

      // All checks passed, proceed with publish
      onComplete();
    },
  };
};
