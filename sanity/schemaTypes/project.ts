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
      name: "projectImage",
      title: "Project Image",
      type: "image",
      description: "Main image for the project card and hero section",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Describe the image for accessibility",
        },
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
      name: "isFeatured",
      title: "Featured Project",
      type: "boolean",
      description: "Toggle to feature this project in the hero section",
      initialValue: false,
      validation: Rule => 
        Rule.custom(async (value, context) => {
          if (!value) return true; // Skip validation if not featured
          
          const { getClient } = context;
          const client = getClient({ apiVersion: '2025-07-16' });
          
          // Count existing featured projects
          const featuredCount = await client.fetch(
            `count(*[_type == "project" && isFeatured == true && _id != $currentId])`,
            { currentId: context.document?._id }
          );
          
          if (featuredCount >= 6) {
            return "Maximum 6 projects can be featured. Please unfeature another project first.";
          }
          
          return true;
        }),
    }),
    defineField({
      name: "featuredRank",
      title: "Featured Rank",
      type: "number",
      description: "Ranking for featured projects (1-6). Lower numbers appear first in hero section.",
      hidden: ({ document }) => !document?.isFeatured,
      validation: Rule => 
        Rule.custom((value, context) => {
          const isFeatured = context.document?.isFeatured;
          if (!isFeatured) return true; // Skip validation if not featured
          
          if (value === undefined || value === null) {
            return "Featured rank is required when project is featured";
          }
          
          if (value < 1 || value > 6) {
            return "Featured rank must be between 1 and 6";
          }
          
          return true;
        }),
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
      media: "projectImage",
      isFeatured: "isFeatured",
      featuredRank: "featuredRank",
    },
    prepare({ title, date, media, isFeatured, featuredRank }) {
      const subtitle = [
        date ? new Date(date).toISOString().split("T")[0] : "No date set",
        isFeatured ? `⭐ Featured (Rank ${featuredRank})` : null
      ].filter(Boolean).join(" • ");
      
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Featured Projects (by Rank)",
      name: "featuredRankAsc",
      by: [
        { field: "isFeatured", direction: "desc" },
        { field: "featuredRank", direction: "asc" }
      ]
    },
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
