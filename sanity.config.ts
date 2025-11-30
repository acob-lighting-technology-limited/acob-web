import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'ACOB Lighting Blog',
  projectId: 'x16t7huo',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Featured Projects with drag-and-drop ordering
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Featured Projects Order',
              icon: () => '⭐',
              filter: 'isFeatured == true',
              S,
              context,
            }),
            S.divider(),
            // Updates
            S.listItem()
              .title('Updates')
              .child(S.documentTypeList('updatePost').title('Updates')),
            // All Projects
            S.listItem()
              .title('Projects')
              .child(S.documentTypeList('project').title('Projects')),
            // Products
            S.listItem()
              .title('Products')
              .child(S.documentTypeList('product').title('Products')),
            // Job Postings
            S.listItem()
              .title('Job Postings')
              .child(S.documentTypeList('jobPosting').title('Job Postings')),
            // Comments
            S.listItem()
              .title('Comments')
              .child(S.documentTypeList('comment').title('Comments')),
          ]);
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
