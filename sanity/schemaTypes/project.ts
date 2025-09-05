import { defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "A short summary of the project (recommended: 150-200 characters)",
      validation: Rule => Rule.max(200).warning("Excerpt should be under 200 characters"),
    }),
    defineField({
      name: 'category',
      title: 'Project Category',
      type: 'string',
      options: {
        list: [
          { title: 'Rural Electrification', value: 'rural-electrification' },
          { title: 'Commercial Installations', value: 'commercial-installations' },
          { title: 'Street Lighting', value: 'street-lighting' },
          { title: 'Healthcare Projects', value: 'healthcare-projects' },
        ],
      },
      initialValue: 'rural-electrification',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "projectDate",
      title: "Project Date",
      type: "date",
      description: "The date when the project was completed or launched",
      options: {
        dateFormat: "MMMM DD, YYYY",
      },
      initialValue: () => new Date().toISOString().split("T")[0],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block"
        },
        {
          type: "image",
          options: {
            hotspot: true
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          type: "object",
          name: "comment",
          fields: [
            {
              name: "author",
              title: "Author",
              type: "string",
              validation: Rule => Rule.required(),
            },
            {
              name: "email",
              title: "Email",
              type: "string",
              validation: Rule => Rule.required(),
            },
            {
              name: "commentContent",
              title: "Comment",
              type: "text",
              rows: 3,
              validation: Rule => Rule.required().min(10),
            },
            {
              name: "createdAt",
              title: "Created At",
              type: "datetime",
              readOnly: true,
              initialValue: () => new Date().toISOString(),
            },
            {
              name: "isApproved",
              title: "Approved",
              type: "boolean",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: "author",
              subtitle: "commentContent",
              media: "isApproved",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title,
                subtitle: subtitle?.substring(0, 50) + (subtitle?.length > 50 ? "..." : ""),
                media: media ? "✓" : "⏳",
              };
            },
          },
        },
      ],
      options: {
        layout: "grid",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "projectDate",
      media: "content.0",
    },
    prepare({ title, date, media }) {
      return {
        title: title,
        subtitle: date ? new Date(date).toISOString().split("T")[0] : "No date set",
        media: media?.asset || media,
      };
    },
  },
  orderings: [
    {
      title: "Project Date, New",
      name: "projectDateDesc",
      by: [
        { field: "projectDate", direction: "desc" }
      ]
    },
    {
      title: "Project Date, Old",
      name: "projectDateAsc",
      by: [
        { field: "projectDate", direction: "asc" }
      ]
    },
    {
      title: "Creation Date, New",
      name: "createdAtDesc",
      by: [
        { field: "_createdAt", direction: "desc" }
      ]
    }
  ],
});
