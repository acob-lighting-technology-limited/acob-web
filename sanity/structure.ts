import type { StructureResolver } from "sanity/structure"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Blog Posts").child(S.documentTypeList("blogPost").title("Blog Posts")),
      S.listItem().title("Categories").child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .title("Comments")
        .child(S.documentTypeList("comment").title("Comments")), // Add comments to the structure
    ])
