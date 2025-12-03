import { defineField, defineType } from 'sanity';
import { PackageIcon } from '@sanity/icons';
import { ProductTitleFieldWithGenerate } from '../components/ProductTitleFieldWithGenerate';
import { ProductDescriptionFieldWithGenerate } from '../components/ProductDescriptionFieldWithGenerate';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    // Category - hidden, set automatically based on which category list item was clicked
    // The category is determined by which list (Solar Panel, Battery, Inverter) the user creates from
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'string',
      hidden: true,
      initialValue: 'solar-panel', // Default, should be set when creating from category list
      validation: Rule => Rule.required(),
    }),
    // Slug - auto-generated, hidden
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      hidden: true,
      options: {
        source: 'general.title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    // General Section
    defineField({
      name: 'general',
      title: 'General',
      type: 'object',
      fields: [
        defineField({
          name: 'availability',
          title: 'Availability',
          type: 'string',
          description: 'Product availability status',
          options: {
            list: [
              { title: 'In Stock', value: 'in-stock' },
              { title: 'Out of Stock', value: 'out-of-stock' },
              { title: 'Pre-Order', value: 'pre-order' },
              { title: 'Coming Soon', value: 'coming-soon' },
            ],
          },
          initialValue: 'in-stock',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Title (Auto-generated)',
          type: 'string',
          description:
            'Product title is auto-generated from technical details. Click "Generate" to update.',
          readOnly: true,
          validation: Rule => Rule.required(),
          components: {
            input: ProductTitleFieldWithGenerate,
          },
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 5,
          description:
            'Product description (click "Generate" to auto-generate or enter custom description)',
          validation: Rule => Rule.required(),
          components: {
            input: ProductDescriptionFieldWithGenerate,
          },
        }),
        defineField({
          name: 'useCustomDescription',
          title: 'Use Custom Description',
          type: 'boolean',
          description:
            'Toggle to use custom description instead of auto-generated',
          initialValue: false,
        }),
      ],
    }),
    // Media Section
    defineField({
      name: 'media',
      title: 'Media',
      type: 'object',
      fields: [
        defineField({
          name: 'productImage',
          title: 'Main Product Image',
          type: 'image',
          description: 'Main image for the product card',
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
          name: 'productImages',
          title: 'Product Images/Videos Gallery',
          type: 'array',
          description:
            'Additional product images and videos for the detail page',
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
                  description: 'Describe the image for accessibility',
                },
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
                {
                  name: 'title',
                  type: 'string',
                  title: 'Video Title',
                  description: 'Optional title for the video',
                },
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description: 'Describe the video for accessibility',
                },
              ],
            },
          ],
        }),
        defineField({
          name: 'datasheet',
          title: 'Datasheet',
          type: 'file',
          description: 'Upload product datasheet as PDF',
          options: {
            accept: '.pdf',
          },
        }),
      ],
    }),
    // Technical Section - Solar Panel
    defineField({
      name: 'technical',
      title: 'Technical',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          description: 'Product name',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'model',
          title: 'Model',
          type: 'string',
          description: 'Product model number',
          validation: Rule => Rule.required(),
        }),
        // Solar Panel specific fields
        defineField({
          name: 'capacity',
          title: 'Capacity (Watts)',
          type: 'string',
          description: 'Power rating in watts (e.g., 450W)',
          validation: Rule =>
            Rule.custom((value, context) => {
              const category = context.document?.category as string | undefined;
              if (category === 'solar-panel' && !value) {
                return 'Capacity is required for solar panels';
              }
              return true;
            }),
        }),
        defineField({
          name: 'type',
          title: 'Type',
          type: 'string',
          description: 'Panel type',
          options: {
            list: [
              { title: 'Monofacial', value: 'monofacial' },
              { title: 'Bifacial', value: 'bifacial' },
            ],
          },
          hidden: ({ document }) => document?.category !== 'solar-panel',
          validation: Rule =>
            Rule.custom((value, context) => {
              const category = context.document?.category as string | undefined;
              if (category === 'solar-panel' && !value) {
                return 'Type is required for solar panels';
              }
              return true;
            }),
        }),
        // Battery specific fields
        defineField({
          name: 'capacityAhOrKwh',
          title: 'Capacity (Ah or kWh)',
          type: 'string',
          description: 'Battery capacity (e.g., 200Ah or 5.12kWh)',
          hidden: ({ document }) => document?.category !== 'battery',
          validation: Rule =>
            Rule.custom((value, context) => {
              const category = context.document?.category as string | undefined;
              if (category === 'battery' && !value) {
                return 'Capacity is required for batteries';
              }
              return true;
            }),
        }),
        defineField({
          name: 'batteryType',
          title: 'Battery Type',
          type: 'string',
          description: 'Type of battery (e.g., Lithium LiFePO4)',
          hidden: ({ document }) => document?.category !== 'battery',
          validation: Rule =>
            Rule.custom((value, context) => {
              const category = context.document?.category as string | undefined;
              if (category === 'battery' && !value) {
                return 'Battery type is required';
              }
              return true;
            }),
        }),
        defineField({
          name: 'cycleLife',
          title: 'Cycle Life',
          type: 'string',
          description: 'Cycle life (e.g., 6000 cycles @ 80% DOD)',
          hidden: ({ document }) => document?.category !== 'battery',
          validation: Rule =>
            Rule.custom((value, context) => {
              const category = context.document?.category as string | undefined;
              if (category === 'battery' && !value) {
                return 'Cycle life is required for batteries';
              }
              return true;
            }),
        }),
        defineField({
          name: 'voltage',
          title: 'Voltage',
          type: 'string',
          description: 'Battery voltage (e.g., 48V)',
          hidden: ({ document }) => document?.category !== 'battery',
          validation: Rule =>
            Rule.custom((value, context) => {
              const category = context.document?.category as string | undefined;
              if (category === 'battery' && !value) {
                return 'Voltage is required for batteries';
              }
              return true;
            }),
        }),
        // Inverter specific fields
        defineField({
          name: 'capacityKvaKw',
          title: 'Capacity (kVA / kW)',
          type: 'string',
          description: 'Power rating (e.g., 5kVA / 4kW)',
          hidden: ({ document }) => document?.category !== 'inverter',
          validation: Rule =>
            Rule.custom((value, context) => {
              const category = context.document?.category as string | undefined;
              if (category === 'inverter' && !value) {
                return 'Capacity is required for inverters';
              }
              return true;
            }),
        }),
        defineField({
          name: 'phaseVoltage',
          title: 'Phase Voltage',
          type: 'string',
          description: 'Phase voltage specification',
          hidden: ({ document }) => document?.category !== 'inverter',
          validation: Rule =>
            Rule.custom((value, context) => {
              const category = context.document?.category as string | undefined;
              if (category === 'inverter' && !value) {
                return 'Phase voltage is required for inverters';
              }
              return true;
            }),
        }),
        defineField({
          name: 'inverterType',
          title: 'Inverter Type',
          type: 'string',
          description: 'Type of inverter',
          options: {
            list: [
              { title: 'Hybrid', value: 'hybrid' },
              { title: 'Non-Hybrid', value: 'non-hybrid' },
            ],
          },
          hidden: ({ document }) => document?.category !== 'inverter',
          validation: Rule =>
            Rule.custom((value, context) => {
              const category = context.document?.category as string | undefined;
              if (category === 'inverter' && !value) {
                return 'Inverter type is required';
              }
              return true;
            }),
        }),
        defineField({
          name: 'efficiency',
          title: 'Efficiency (%)',
          type: 'string',
          description: 'Efficiency percentage (e.g., 97%)',
          hidden: ({ document }) => document?.category !== 'inverter',
          validation: Rule =>
            Rule.custom((value, context) => {
              const category = context.document?.category as string | undefined;
              if (category === 'inverter' && !value) {
                return 'Efficiency is required for inverters';
              }
              return true;
            }),
        }),
        defineField({
          name: 'ipRatings',
          title: 'IP Ratings',
          type: 'string',
          description: 'IP protection rating (e.g., IP65)',
          hidden: ({ document }) => document?.category !== 'inverter',
          validation: Rule =>
            Rule.custom((value, context) => {
              const category = context.document?.category as string | undefined;
              if (category === 'inverter' && !value) {
                return 'IP ratings is required for inverters';
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      description:
        'Toggle to feature this product in the announcement banner (shows "New products available!")',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'general.title',
      category: 'category',
      availability: 'general.availability',
      media: 'media.productImage',
    },
    prepare({ title, category, availability, media }) {
      const availabilityLabels: Record<string, string> = {
        'in-stock': '✓ In Stock',
        'out-of-stock': '✗ Out of Stock',
        'pre-order': '⏳ Pre-Order',
        'coming-soon': '🔜 Coming Soon',
      };

      const categoryLabels: Record<string, string> = {
        'solar-panel': '☀️ Solar Panel',
        battery: '🔋 Battery',
        inverter: '⚡ Inverter',
      };

      return {
        title: title,
        subtitle: `${categoryLabels[category] || category} • ${availabilityLabels[availability] || availability}`,
        media: media,
      };
    },
  },
});
