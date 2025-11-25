import { COMPANY_INFO } from '@/lib/constants';

const currentYear = new Date().getFullYear();
const yearsExperience = Math.max(0, currentYear - 2016);

export const stats = [
  {
    number: COMPANY_INFO.stats.projectsCompleted,
    suffix: '+',
    label: 'Installed Projects',
  },
  {
    number: COMPANY_INFO.stats.totalCapacityMW,
    suffix: 'MW+',
    label: 'Total Capacity Installed',
  },
  {
    number: COMPANY_INFO.stats.communitiesServed,
    suffix: '+',
    label: 'Communities Served',
  },
  { number: yearsExperience, suffix: '+', label: 'Years Experience' },
];
