import { defineField, defineType } from 'sanity';
import { PackageIcon } from '@sanity/icons';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      description: 'The name of the product',
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
      name: 'category',
      title: 'Product Category',
      type: 'string',
      description: 'Select the product category',
      options: {
        list: [
          { title: 'Solar Panel', value: 'solar-panel' },
          { title: 'Battery', value: 'battery' },
          { title: 'Inverter', value: 'inverter' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Product SKU/Code',
      validation: Rule => Rule.required(),
    }),
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Detailed product description',
      validation: Rule => Rule.required(),
    }),
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
      description: 'Additional product images and videos for the detail page',
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
    // Solar Panel Specifications
    defineField({
      name: 'panelSpecifications',
      title: 'Solar Panel Specifications',
      type: 'object',
      description: 'Specifications for solar panel products',
      fields: [
        defineField({
          name: 'powerRatingWatts',
          title: 'Power Rating (Watts)',
          type: 'string',
          description: 'eg. 450W',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'efficiencyPercent',
          title: 'Efficiency (%)',
          type: 'string',
          description: 'eg. 21%',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'voltageVmpVoc',
          title: 'Voltage (Vmp / Voc)',
          type: 'string',
          description: 'eg. Vmp 41.2V / Voc 49.5V',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'dimensionsMm',
          title: 'Dimensions (mm)',
          type: 'string',
          description: 'eg. 1900 x 1130 x 35 mm',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'warranty',
          title: 'Warranty',
          type: 'string',
          description: 'eg. 25 years performance warranty',
          validation: Rule => Rule.required(),
        }),
      ],
      hidden: ({ parent }) => parent?.category !== 'solar-panel',
      validation: Rule =>
        Rule.custom((value, context) => {
          const category = (context.parent as { category?: string })?.category;
          if (category === 'solar-panel' && !value) {
            return 'Solar panel specifications are required';
          }
          return true;
        }),
    }),
    // Battery Specifications
    defineField({
      name: 'batterySpecifications',
      title: 'Battery Specifications',
      type: 'object',
      description: 'Specifications for battery products',
      fields: [
        defineField({
          name: 'capacityAhOrKwh',
          title: 'Capacity (Ah or kWh)',
          type: 'string',
          description: 'eg. 200Ah or 5.12kWh',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'batteryType',
          title: 'Battery Type',
          type: 'string',
          description: 'eg. Lithium (LiFePO4)',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'cycleLife',
          title: 'Cycle Life',
          type: 'string',
          description: 'eg. 6000 cycles @ 80% DOD',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'voltage',
          title: 'Voltage',
          type: 'string',
          description: 'eg. 48V',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'warranty',
          title: 'Warranty',
          type: 'string',
          description: 'eg. 5 years',
          validation: Rule => Rule.required(),
        }),
      ],
      hidden: ({ parent }) => parent?.category !== 'battery',
      validation: Rule =>
        Rule.custom((value, context) => {
          const category = (context.parent as { category?: string })?.category;
          if (category === 'battery' && !value) {
            return 'Battery specifications are required';
          }
          return true;
        }),
    }),
    // Inverter Specifications
    defineField({
      name: 'inverterSpecifications',
      title: 'Inverter Specifications',
      type: 'object',
      description: 'Specifications for inverter products',
      fields: [
        defineField({
          name: 'powerRatingKvaKw',
          title: 'Power Rating (kVA / kW)',
          type: 'string',
          description: 'eg. 5kVA / 4kW',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'inputVoltage',
          title: 'Input Voltage',
          type: 'string',
          description: 'eg. 48V DC',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'outputVoltage',
          title: 'Output Voltage',
          type: 'string',
          description: 'eg. 230V AC',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'efficiencyPercent',
          title: 'Efficiency (%)',
          type: 'string',
          description: 'eg. 97%',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'warranty',
          title: 'Warranty',
          type: 'string',
          description: 'eg. 2 years',
          validation: Rule => Rule.required(),
        }),
      ],
      hidden: ({ parent }) => parent?.category !== 'inverter',
      validation: Rule =>
        Rule.custom((value, context) => {
          const category = (context.parent as { category?: string })?.category;
          if (category === 'inverter' && !value) {
            return 'Inverter specifications are required';
          }
          return true;
        }),
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
      title: 'title',
      category: 'category',
      sku: 'sku',
      availability: 'availability',
      media: 'productImage',
    },
    prepare({ title, category, sku, availability, media }) {
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
        subtitle: `${categoryLabels[category] || category} • SKU: ${sku} • ${availabilityLabels[availability] || availability}`,
        media: media,
      };
    },
  },
});
