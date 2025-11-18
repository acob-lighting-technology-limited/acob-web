const currentYear = new Date().getFullYear();
const yearsExperience = Math.max(0, currentYear - 2016);

export const stats = [
  { number: 120, suffix: '+', label: 'Installed Projects' },
  { number: 150, suffix: 'MW+', label: 'Total Capacity Installed' },
  { number: 200, suffix: '+', label: 'Communities Served' },
  { number: yearsExperience, suffix: '+', label: 'Years Experience' },
];
