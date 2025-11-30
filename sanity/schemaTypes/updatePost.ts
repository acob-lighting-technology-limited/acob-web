import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const updatePostType = defineType({
  name: 'updatePost', // Renamed from 'post' or 'blogPost'
  title: 'Update Post', // Renamed from 'Post' or 'Blog Post'
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        },
        {
          type: 'file',
          name: 'video',
          title: 'Video',
          options: {
            accept: 'video/*',
          },
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Video Title',
              description: 'Optional title for the video',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Describe the video for accessibility',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'ACOB LIGHTING',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Announcements', value: 'announcements' },
          { title: 'Case Studies', value: 'case-studies' },
          { title: 'Press Releases', value: 'press-releases' },
          { title: 'Events', value: 'events' },
          { title: 'Celebrations', value: 'celebrations' },
        ],
      },
      initialValue: 'announcements',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: 'Solar Energy', value: 'solar-energy' },
          { title: 'Mini-Grid', value: 'mini-grid' },
          { title: 'Street Lighting', value: 'street-lighting' },
          { title: 'Rural Electrification', value: 'rural-electrification' },
          { title: 'Sustainability', value: 'sustainability' },
          { title: 'Renewable Energy', value: 'renewable-energy' },
          { title: 'Community Impact', value: 'community-impact' },
          { title: 'Energy Access', value: 'energy-access' },
          { title: 'Off-Grid', value: 'off-grid' },
          { title: 'Installation', value: 'installation' },
          { title: 'Technology', value: 'technology' },
          { title: 'Innovation', value: 'innovation' },
          { title: 'Partnership', value: 'partnership' },
          { title: 'Training', value: 'training' },
          { title: 'Maintenance', value: 'maintenance' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
