import type { StructureResolver } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

export const structure: StructureResolver = (S, context) =>
  S.list()
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
      // Job Postings
      S.listItem()
        .title('Job Postings')
        .child(S.documentTypeList('jobPosting').title('Job Postings')),
      // Comments
      S.listItem()
        .title('Comments')
        .child(S.documentTypeList('comment').title('Comments')),
    ]);
