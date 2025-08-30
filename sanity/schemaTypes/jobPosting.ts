export default {
  name: 'jobPosting',
  title: 'Job Posting',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      description: 'Enter the department name (e.g., Engineering, Sales & Marketing, Operations)',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Abuja, Nigeria or Remote',
    },
    {
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of requirements for the position',
    },
    {
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'date',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide this job posting. When OFF, the job will not appear on the website.',
      initialValue: true,
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      location: 'location',
      isActive: 'isActive',
    },
    prepare(selection: any) {
      const { title, department, location, isActive } = selection;
      return {
        title: title,
        subtitle: `${department || 'No Department'} • ${location || 'No Location'} ${!isActive ? '• Inactive' : ''}`,
      };
    },
  },
};
