import { defineField, defineType } from 'sanity';
import { PackageIcon } from '@sanity/icons';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { TitleFieldWithGenerate } from '../components/TitleFieldWithGenerate';
import { ExcerptFieldWithGenerate } from '../components/ExcerptFieldWithGenerate';

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
      description:
        'Project title (click "Generate" to auto-generate from project details)',
      validation: Rule => Rule.required(),
      components: {
        input: TitleFieldWithGenerate,
      },
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
        'A short summary of the project (click "Generate" to auto-generate from project details. Recommended: 150-200 characters)',
      validation: Rule =>
        Rule.max(200).warning('Excerpt should be under 200 characters'),
      components: {
        input: ExcerptFieldWithGenerate,
      },
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
      title: 'Content (Legacy - Will be deprecated)',
      type: 'array',
      description:
        '⚠️ Old content field. Please use "Project Content" below for new projects.',
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
      name: 'lga',
      title: 'LGA (Local Government Area)',
      type: 'string',
      description: 'Local Government Area (e.g., "Karu")',
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
    // Impact Metrics Fields
    defineField({
      name: 'impactMetrics',
      title: 'Impact Metrics',
      type: 'object',
      description: 'Impact metrics and system specifications for the project',
      fields: [
        {
          name: 'kwp',
          title: 'Kilowatts Peak (kWp)',
          type: 'number',
          description: 'System capacity in kilowatts peak (e.g., 150)',
        },
        {
          name: 'systemType',
          title: 'System Type',
          type: 'string',
          description: 'Type of solar system installed',
          options: {
            list: [
              { title: 'Solar Mini-Grid', value: 'Solar Mini-Grid' },
              {
                title: 'Hybrid Solar Mini-Grid',
                value: 'Hybrid Solar Mini-Grid',
              },
              {
                title: 'Solar Home System (SHS)',
                value: 'Solar Home System (SHS)',
              },
              {
                title: 'C&I Solar Rooftop System',
                value: 'C&I Solar Rooftop System',
              },
              {
                title: 'C&I Solar Ground-Mounted System',
                value: 'C&I Solar Ground-Mounted System',
              },
              {
                title: 'Solar + Battery Backup System',
                value: 'Solar + Battery Backup System',
              },
              {
                title: 'Solar Water Pumping System',
                value: 'Solar Water Pumping System',
              },
              {
                title: 'Solar Street Lighting System',
                value: 'Solar Street Lighting System',
              },
              {
                title: 'Solar Borehole System',
                value: 'Solar Borehole System',
              },
              {
                title: 'Solar Cold Storage System',
                value: 'Solar Cold Storage System',
              },
              {
                title: 'Solar Irrigation System',
                value: 'Solar Irrigation System',
              },
              {
                title: 'Institutional Solar System',
                value: 'Institutional Solar System',
              },
            ],
          },
        },
        {
          name: 'beneficiaries',
          title: 'Beneficiaries',
          type: 'number',
          description: 'Number of people benefiting from this project',
        },
        {
          name: 'jobsCreatedDirectly',
          title: 'Jobs Created Directly',
          type: 'number',
          description: 'Number of direct jobs created by this project',
        },
        {
          name: 'jobsCreatedIndirectly',
          title: 'Jobs Created Indirectly',
          type: 'number',
          description: 'Number of indirect jobs created by this project',
        },
        {
          name: 'annualCO2Reduction',
          title: 'Annual CO₂ Reduction (t/yr)',
          type: 'number',
          description: 'Annual CO₂ reduction in tonnes per year',
        },
        {
          name: 'annualEnergyOutput',
          title: 'Annual Energy Output (kWh/yr)',
          type: 'number',
          description: 'Annual energy output in kilowatt-hours per year',
        },
      ],
    } as any),
    // New Project Content Structure
    defineField({
      name: 'projectContent',
      title: 'Project Content',
      type: 'object',
      description: 'New content structure with templates and images',
      fields: [
        {
          name: 'description',
          title: 'Description Template',
          type: 'string',
          description: 'Choose a description template or write custom',
          options: {
            list: [
              { title: 'Description Template 1', value: 'description1' },
              { title: 'Description Template 2', value: 'description2' },
              { title: 'Description Template 3', value: 'description3' },
              { title: 'Custom Description', value: 'custom' },
            ],
          },
          initialValue: 'description1',
        },
        {
          name: 'description1Preview',
          title: '📄 Template 1 Preview (Read-Only)',
          type: 'text',
          readOnly: true,
          rows: 12,
          initialValue: `The {kwp} kWp {systemType} project located in {location}, within {lga} LGA of {state} State, represents a strategic clean energy intervention deployed by ACOB Lighting Technology to improve energy access for underserved populations. The system is engineered to deliver reliable, efficient, and affordable electricity that supports households, small enterprises, and essential community services.

Through this project, approximately {beneficiaries} beneficiaries now have access to clean electricity. Its implementation created {jobsDirect} direct jobs and {jobsIndirect} indirect jobs, advancing local employment and technical capacity development within the host community.

Generating an estimated {annualEnergyOutput} kWh annually, the system significantly reduces the dependence on diesel- and petrol-powered generators. This transition avoids approximately {annualCO2Reduction} tonnes of CO₂ emissions every year, contributing to Nigeria's climate action and sustainability goals.

This installation underscores ACOB Lighting Technology's ongoing commitment to deploying resilient, community-centered, and environmentally responsible energy solutions across Nigeria.`,
        },
        {
          name: 'description2Preview',
          title: '📄 Template 2 Preview (Read-Only)',
          type: 'text',
          readOnly: true,
          rows: 12,
          initialValue: `In the community of {location} in {lga} LGA, {state} State, ACOB Lighting Technology developed a {kwp} kWp {systemType} system to transform daily life and support the growth of local businesses. Before this intervention, many residents relied heavily on expensive and unreliable generator power, limiting both economic activities and quality of life.

Today, the project provides clean and stable electricity to over {beneficiaries} residents, enabling households to enjoy reliable lighting, artisans to operate longer hours, and small businesses to grow. In addition, the deployment directly created {jobsDirect} jobs for skilled and semi-skilled workers from the area, while {jobsIndirect} more jobs were indirectly supported through supply chains and local services.

With an annual output of about {annualEnergyOutput} kWh, this renewable energy project not only meets critical energy needs but also reduces harmful emissions by an estimated {annualCO2Reduction} tonnes of CO₂ each year. This ensures a cleaner, healthier environment for future generations.

The project stands as a testament to ACOB's mission to empower communities through sustainable energy and create long-lasting social and economic impact.`,
        },
        {
          name: 'description3Preview',
          title: '📄 Template 3 Preview (Read-Only)',
          type: 'text',
          readOnly: true,
          rows: 12,
          initialValue: `The {kwp} kWp {systemType} installation delivered by ACOB Lighting Technology in {location}, {lga} LGA of {state} State, is part of our expanding portfolio of distributed renewable energy assets designed to enable energy security, economic development, and long-term sustainability across Nigeria.

This project provides clean power to {beneficiaries}+ beneficiaries and strengthens the local economic landscape by supporting productive activities in households, micro-enterprises, and commercial users. {jobsDirect}+ direct and {jobsIndirect}+ indirect jobs were generated, highlighting our commitment to creating local value and fostering inclusive growth.

The system produces approximately {annualEnergyOutput} kWh annually, ensuring stable energy delivery while reducing operational costs typically associated with fossil-fuel generators. The project further achieves an annual emissions reduction of around {annualCO2Reduction} tonnes of CO₂, aligning with global ESG standards and national decarbonization targets.

As part of ACOB Lighting Technology's clean energy investments, this project demonstrates our dedication to scaling impactful, reliable, and climate-aligned energy infrastructure across emerging markets.`,
        },
        {
          name: 'customDescription',
          title: 'Custom Description',
          type: 'array',
          description:
            'Write your own custom description (only shown if "Custom Description" is selected above)',
          hidden: ({ parent }: { parent?: { description?: string } }) =>
            parent?.description !== 'custom',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'Quote', value: 'blockquote' },
              ],
              lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
              ],
            },
          ],
        },
        {
          name: 'images',
          title: 'Project Images',
          type: 'array',
          description: 'Upload multiple project images for the gallery',
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
          ],
        },
      ],
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
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'commentContent',
              title: 'Comment',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required().min(10),
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
            prepare({
              title,
              subtitle,
              media,
            }: {
              title: string;
              subtitle: string;
              media: boolean;
            }) {
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
