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
        'Toggle to feature this project in the hero section (maximum 8 projects). Use "Featured Projects Order" in the sidebar to drag and reorder.',
      initialValue: false,
      validation: Rule =>
        Rule.custom(async (value, context) => {
          if (!value) {
            return true;
          } // If not featured, no validation needed

          const { getClient } = context;
          const client = getClient({ apiVersion: '2024-01-01' });

          // Count currently featured projects
          const featuredCount = await client.fetch(
            'count(*[_type == "project" && isFeatured == true && _id != $currentId])',
            { currentId: context.document?._id },
          );

          if (featuredCount >= 8) {
            return 'Maximum of 8 featured projects allowed. Please unfeature another project first.';
          }

          return true;
        }),
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              { title: 'Description Template 4', value: 'description4' },
              { title: 'Description Template 5', value: 'description5' },
              { title: 'Description Template 6', value: 'description6' },
              { title: 'Description Template 7', value: 'description7' },
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
          initialValue: `The {kwp} kWp {systemType} installation delivered by ACOB Lighting Technology Limited in the {location} community, {lga} LGA of {state} State, is part of our expanding portfolio of distributed renewable energy assets designed to enable energy security, economic development, and long-term sustainability across Nigeria.

This project provides clean power to {beneficiaries}+ beneficiaries and strengthens the local economic landscape by supporting productive activities in households, micro-enterprises, and commercial users. {jobsDirect}+ direct and {jobsIndirect}+ indirect jobs were generated, highlighting our commitment to creating local value and fostering inclusive growth.

As part of ACOB Lighting Technology's clean energy investments, this project demonstrates our dedication to scaling impactful, reliable, and climate-aligned energy infrastructure across emerging markets.`,
        },
        {
          name: 'description4Preview',
          title: '📄 Template 4 Preview (Read-Only)',
          type: 'text',
          readOnly: true,
          rows: 12,
          initialValue: `Situated in the {location} community within {lga} LGA of {state} State, this {kwp} kWp {systemType} project exemplifies ACOB Lighting Technology's commitment to community empowerment through sustainable energy access. The installation was designed to address critical energy poverty while catalyzing socio-economic development in the region.

The project now serves {beneficiaries} beneficiaries, providing consistent electricity that enables children to study after dark, healthcare facilities to operate effectively, and local entrepreneurs to expand their businesses beyond daylight hours. The deployment process prioritized local participation, creating {jobsDirect} direct employment opportunities and {jobsIndirect} indirect jobs that strengthened community capacity and technical expertise.

With an annual generation capacity of {annualEnergyOutput} kWh, the system eliminates the need for polluting diesel generators, resulting in annual CO₂ emission reductions of approximately {annualCO2Reduction} tonnes. This contributes to improved air quality and public health outcomes for the community.

This project reflects ACOB Lighting Technology's holistic approach to energy development—one that prioritizes people, planet, and prosperity in equal measure.`,
        },
        {
          name: 'description5Preview',
          title: '📄 Template 5 Preview (Read-Only)',
          type: 'text',
          readOnly: true,
          rows: 12,
          initialValue: `ACOB Lighting Technology deployed a state-of-the-art {kwp} kWp {systemType} in {location} community within {lga} LGA, {state} State, leveraging advanced photovoltaic technology and smart energy management systems to deliver optimal performance and reliability. This installation represents a benchmark in distributed renewable energy infrastructure across Nigeria.

The system is engineered to generate approximately {annualEnergyOutput} kWh annually, providing uninterrupted power to {beneficiaries}+ users while maintaining industry-leading efficiency standards. Advanced monitoring and control systems ensure maximum uptime and enable predictive maintenance, guaranteeing long-term operational excellence.

Beyond technical performance, the project delivered measurable socio-economic benefits: {jobsDirect} skilled technicians and engineers were directly employed during installation and commissioning, while {jobsIndirect} additional jobs were created across the value chain. The system's clean energy output displaces fossil fuel consumption, achieving annual emissions avoidance of {annualCO2Reduction} tonnes of CO₂.

This project showcases ACOB's technical capabilities and unwavering commitment to deploying world-class renewable energy solutions that drive sustainable development and climate resilience.`,
        },
        {
          name: 'description6Preview',
          title: '📄 Template 6 Preview (Read-Only)',
          type: 'text',
          readOnly: true,
          rows: 12,
          initialValue: `The {kwp} kWp {systemType} project in the community of {location}, {lga} LGA of {state} State, was delivered through a collaborative approach that brought together ACOB Lighting Technology's technical expertise, community leadership, and strategic stakeholders committed to advancing energy access and sustainable development.

This initiative was designed to address the energy needs of {beneficiaries} residents while creating pathways for economic growth and social progress. Through close engagement with local authorities, traditional leaders, and community representatives, the project ensured that the system's design and deployment aligned with the unique needs and priorities of the host community.

The project generated {jobsDirect} direct jobs and {jobsIndirect} indirect employment opportunities, fostering skills transfer and building local technical capacity that will support long-term maintenance and sustainability. With an annual output of {annualEnergyOutput} kWh, the installation displaces fossil fuel dependency and avoids approximately {annualCO2Reduction} tonnes of CO₂ emissions each year.

ACOB Lighting Technology remains committed to partnership-driven energy solutions that deliver shared value, empower communities, and contribute to Nigeria's renewable energy transition.`,
        },
        {
          name: 'description7Preview',
          title: '📄 Template 7 Preview (Read-Only)',
          type: 'text',
          readOnly: true,
          rows: 12,
          initialValue: `As part of ACOB Lighting Technology's climate action portfolio, the {kwp} kWp {systemType} installed in {location}, a community in {lga} LGA, {state} State, represents a significant contribution to Nigeria's decarbonization efforts and environmental sustainability goals. This project was designed to deliver clean, reliable energy while minimizing ecological impact and advancing climate resilience.

Generating approximately {annualEnergyOutput} kWh annually, the system provides electricity to {beneficiaries}+ beneficiaries without relying on carbon-intensive fossil fuels. This results in an annual CO₂ emissions reduction of around {annualCO2Reduction} tonnes, directly supporting national and global climate commitments under the Paris Agreement and Nigeria's Nationally Determined Contributions (NDCs).

Beyond environmental benefits, the project created {jobsDirect} direct jobs and {jobsIndirect} indirect jobs, demonstrating that climate action and economic development are mutually reinforcing. The installation also reduces local air and noise pollution, improving public health and quality of life for surrounding communities.

This project underscores ACOB Lighting Technology's leadership in deploying renewable energy infrastructure that protects the environment, supports livelihoods, and builds a sustainable future for all Nigerians.`,
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
          title: 'Project Images/Videos',
          type: 'array',
          description:
            'Upload multiple project images and videos for the gallery',
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'commentContent',
              title: 'Comment',
              type: 'text',
              rows: 3,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prepare(selection: Record<string, any>) {
              const { title, subtitle, media } = selection as {
                title: string;
                subtitle: string;
                media: boolean;
              };
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
