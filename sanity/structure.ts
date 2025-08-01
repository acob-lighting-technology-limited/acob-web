import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Updates')
        .child(S.documentTypeList('updatePost').title('Updates')), // Renamed from Blog Posts
      S.listItem()
        .title('Projects')
        .child(S.documentTypeList('project').title('Projects')), // Added Projects
      S.listItem()
        .title('Categories')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Comments')
        .child(S.documentTypeList('comment').title('Comments')),
    ]);
