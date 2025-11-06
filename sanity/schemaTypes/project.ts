import { defineField, defineType } from 'sanity';
import { PackageIcon } from '@sanity/icons';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: PackageIcon,
  orderings: [
    orderRankOrdering,
    {
      title: 'Project Date, New',
      name: 'projectDateDesc',
      by: [{ field: 'projectDate', direction: 'desc' }],
    },
    {
      title: 'Project Date, Old',
      name: 'projectDateAsc',
      by: [{ field: 'projectDate', direction: 'asc' }],
    },
    {
      title: 'Creation Date, New',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  fields: [
    // Add orderRank field for drag-and-drop functionality
    orderRankField({ type: 'project', hidden: true }),
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description:
        'A short summary of the project (recommended: 150-200 characters)',
      validation: Rule =>
        Rule.max(200).warning('Excerpt should be under 200 characters'),
    }),
    defineField({
      name: 'category',
      title: 'Project Category',
      type: 'string',
      options: {
        list: [
          { title: 'Rural Electrification', value: 'rural-electrification' },
          {
            title: 'Commercial Installations',
            value: 'commercial-installations',
          },
          { title: 'Street Lighting', value: 'street-lighting' },
          { title: 'Healthcare Projects', value: 'healthcare-projects' },
        ],
      },
      initialValue: 'rural-electrification',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'projectDate',
      title: 'Project Date',
      type: 'date',
      description: 'The date when the project was completed or launched',
      options: {
        dateFormat: 'MMMM DD, YYYY',
      },
      initialValue: () => new Date().toISOString().split('T')[0],
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
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'projectImage',
      title: 'Project Image',
      type: 'image',
      description: 'Main image for the project card and hero section',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for accessibility',
        },
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description:
        'Specific location/community name (e.g., "Olooji Community")',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      description: 'The Nigerian state where the project is located',
      options: {
        list: [
          { title: 'Abia', value: 'Abia' },
          { title: 'Adamawa', value: 'Adamawa' },
          { title: 'Akwa Ibom', value: 'Akwa Ibom' },
          { title: 'Anambra', value: 'Anambra' },
          { title: 'Bauchi', value: 'Bauchi' },
          { title: 'Bayelsa', value: 'Bayelsa' },
          { title: 'Benue', value: 'Benue' },
          { title: 'Borno', value: 'Borno' },
          { title: 'Cross River', value: 'Cross River' },
          { title: 'Delta', value: 'Delta' },
          { title: 'Ebonyi', value: 'Ebonyi' },
          { title: 'Edo', value: 'Edo' },
          { title: 'Ekiti', value: 'Ekiti' },
          { title: 'Enugu', value: 'Enugu' },
          { title: 'FCT', value: 'FCT' },
          { title: 'Gombe', value: 'Gombe' },
          { title: 'Imo', value: 'Imo' },
          { title: 'Jigawa', value: 'Jigawa' },
          { title: 'Kaduna', value: 'Kaduna' },
          { title: 'Kano', value: 'Kano' },
          { title: 'Katsina', value: 'Katsina' },
          { title: 'Kebbi', value: 'Kebbi' },
          { title: 'Kogi', value: 'Kogi' },
          { title: 'Kwara', value: 'Kwara' },
          { title: 'Lagos', value: 'Lagos' },
          { title: 'Nasarawa', value: 'Nasarawa' },
          { title: 'Niger', value: 'Niger' },
          { title: 'Ogun', value: 'Ogun' },
          { title: 'Ondo', value: 'Ondo' },
          { title: 'Osun', value: 'Osun' },
          { title: 'Oyo', value: 'Oyo' },
          { title: 'Plateau', value: 'Plateau' },
          { title: 'Rivers', value: 'Rivers' },
          { title: 'Sokoto', value: 'Sokoto' },
          { title: 'Taraba', value: 'Taraba' },
          { title: 'Yobe', value: 'Yobe' },
          { title: 'Zamfara', value: 'Zamfara' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Project',
      type: 'boolean',
      description:
        'Toggle to feature this project in the hero section (maximum 6 projects). Use "Featured Projects Order" in the sidebar to drag and reorder.',
      initialValue: false,
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'comment',
          fields: [
            {
              name: 'author',
              title: 'Author',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'commentContent',
              title: 'Comment',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required().min(10),
            },
            {
              name: 'createdAt',
              title: 'Created At',
              type: 'datetime',
              readOnly: true,
              initialValue: () => new Date().toISOString(),
            },
            {
              name: 'isApproved',
              title: 'Approved',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'commentContent',
              media: 'isApproved',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title,
                subtitle:
                  subtitle?.substring(0, 50) +
                  (subtitle?.length > 50 ? '...' : ''),
                media: media ? '✓' : '⏳',
              };
            },
          },
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'projectDate',
      media: 'projectImage',
      isFeatured: 'isFeatured',
    },
    prepare({ title, date, media, isFeatured }) {
      const subtitle = [
        date ? new Date(date).toISOString().split('T')[0] : 'No date set',
        isFeatured ? '⭐ Featured' : null,
      ]
        .filter(Boolean)
        .join(' • ');

      return {
        title: title,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
