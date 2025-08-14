export const quoteFormFields = [
  {
    id: 'installer',
    label: 'Who will install system?',
    type: 'select',
    options: ['Local contractor', 'Foreign contractor'],
    placeholder: 'Local contractor',
    half: true,
  },
  {
    id: 'completionTime',
    label: 'System completed by?',
    type: 'select',
    options: ['3-6 months', '6-12 months', '12-24 months'],
    placeholder: '3-6 months',
    half: true,
  },
  {
    id: 'monthlyUsage',
    label: 'Monthly electric usage in kWh?',
    type: 'text',
    placeholder: '',
    half: true,
  },
  {
    id: 'systemType',
    label: 'Solar system type?',
    type: 'select',
    options: ['Offgrid', 'Ongrid'],
    placeholder: 'Offgrid',
    half: true,
  },
  {
    id: 'panelPlace',
    label: 'Solar panels place?',
    type: 'select',
    options: ['Huge farm', 'Small farm'],
    placeholder: 'Huge farm',
    half: true,
  },
  {
    id: 'roofMaterial',
    label: 'Materials on your roof?',
    type: 'select',
    options: ['Comp shingle', 'Roof shingle'],
    placeholder: 'Comp shingle',
    half: true,
  },
  {
    id: 'additionalInfo',
    label: 'Additional Information',
    type: 'textarea',
    placeholder: 'Please provide any additional details about your project...',
    rows: 4,
  },
];

export const contactMethodOptions = [
  { id: 'all', label: 'All', value: 'all' },
  { id: 'email', label: 'Email', value: 'email' },
  { id: 'phone', label: 'Phone', value: 'phone' },
];
