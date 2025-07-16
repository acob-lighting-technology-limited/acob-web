import { defineField, defineType } from "sanity"

export default defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      description: "Optional: User's website URL",
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blogPost",
      title: "Blog Post",
      type: "reference",
      to: [{ type: "blogPost" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "Set to true to show comment on the website",
      initialValue: false, // Comments require moderation by default
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      name: "name",
      comment: "comment",
      postTitle: "blogPost.title",
      approved: "approved",
    },
    prepare(selection) {
      const { name, comment, postTitle, approved } = selection
      return {
        title: `${name} on ${postTitle || "No Post"}`,
        subtitle: approved ? comment : `[PENDING] ${comment}`,
      }
    },
  },
})
