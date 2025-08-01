import { defineField, defineType } from 'sanity';
import { PackageIcon } from '@sanity/icons';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      validation: Rule => Rule.min(1).required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'gradientFrom',
      title: 'Gradient Start Color (Hex)',
      type: 'string',
      description: 'e.g., #08913F',
    }),
    defineField({
      name: 'gradientTo',
      title: 'Gradient End Color (Hex)',
      type: 'string',
      description: 'e.g., #003808',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0', // Use the first image for preview
    },
  },
});
