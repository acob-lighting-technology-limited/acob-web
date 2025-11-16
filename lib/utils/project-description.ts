// Type imports removed - not needed in this utility file

/**
 * Get Nigerian geopolitical region from state
 */
function getNigerianRegion(state?: string): string {
  if (!state) {
    return '[Region]';
  }

  const stateLower = state.toLowerCase().trim();

  // North Central
  const northCentral = [
    'benue',
    'fct',
    'kogi',
    'kwara',
    'nasarawa',
    'niger',
    'plateau',
  ];
  if (northCentral.includes(stateLower)) {
    return 'North-Central';
  }

  // North East
  const northEast = ['adamawa', 'bauchi', 'borno', 'gombe', 'taraba', 'yobe'];
  if (northEast.includes(stateLower)) {
    return 'North-East';
  }

  // North West
  const northWest = [
    'kaduna',
    'kano',
    'katsina',
    'kebbi',
    'jigawa',
    'sokoto',
    'zamfara',
  ];
  if (northWest.includes(stateLower)) {
    return 'North-West';
  }

  // South East
  const southEast = ['abia', 'anambra', 'ebonyi', 'enugu', 'imo'];
  if (southEast.includes(stateLower)) {
    return 'South-East';
  }

  // South South
  const southSouth = [
    'akwa ibom',
    'bayelsa',
    'cross river',
    'delta',
    'edo',
    'rivers',
  ];
  if (southSouth.includes(stateLower)) {
    return 'South-South';
  }

  // South West
  const southWest = ['ekiti', 'lagos', 'ogun', 'ondo', 'osun', 'oyo'];
  if (southWest.includes(stateLower)) {
    return 'South-West';
  }

  return '[Region]';
}

/**
 * Generate project description from template
 */
export function generateProjectDescription(
  template: 'description1' | 'description2' | 'description3',
  data: {
    kwp?: number;
    systemType?: string;
    location?: string;
    lga?: string;
    state?: string;
    beneficiaries?: number;
    jobsDirect?: number;
    jobsIndirect?: number;
    annualEnergyOutput?: number;
    annualCO2Reduction?: number;
  },
): string {
  const templates = {
    description1: `The {kwp} kWp {systemType} project located in {location}, within {lga} LGA of {state} State in the {region} region of Nigeria, represents a strategic clean energy intervention deployed by ACOB Lighting Technology Limited to improve energy access for underserved populations. The system is engineered to deliver reliable, efficient, and affordable electricity that supports households, small enterprises, and essential community services.

Through this project, over {beneficiaries} beneficiaries now have access to clean electricity. Its implementation created {jobsDirect} direct jobs and over {jobsIndirect} indirect jobs, advancing local employment and technical capacity development within the host community.

Generating an estimated {annualEnergyOutput} kWh annually, the system significantly reduces the dependence on diesel- and petrol-powered generators. This transition avoids approximately {annualCO2Reduction} tonnes of CO₂ emissions every year, contributing to Nigeria's climate action and sustainability goals.

This installation underscores ACOB Lighting Technology Limited's ongoing commitment to deploying resilient, community-centered, and environmentally responsible energy solutions across Nigeria.`,

    description2: `In the community of {location} in {lga} LGA, {state} State in the {region} region of Nigeria, ACOB Lighting Technology Limited developed a {kwp} kWp {systemType} system to transform daily life and support the growth of local businesses. Before this intervention, many residents relied heavily on expensive and unreliable generator power, limiting both economic activities and quality of life.

Today, the project provides clean and stable electricity to over {beneficiaries} residents, enabling households to enjoy reliable lighting, artisans to operate longer hours, and small businesses to grow. In addition, the deployment directly created {jobsDirect} jobs for skilled and semi-skilled workers from the area, while {jobsIndirect} more jobs were indirectly supported through supply chains and local services.

With an annual output of about {annualEnergyOutput} kWh, this renewable energy project not only meets critical energy needs but also reduces harmful emissions by an estimated {annualCO2Reduction} tonnes of CO₂ each year. This ensures a cleaner, healthier environment for future generations.

The project stands as a testament to ACOB's mission to empower communities through sustainable energy and create long-lasting social and economic impact.`,

    description3: `The {kwp} kWp {systemType} installation delivered by ACOB Lighting Technology Limited in {location}, {lga} LGA of {state} State in the {region} region of Nigeria, is part of our expanding portfolio of distributed renewable energy assets designed to enable energy security, economic development, and long-term sustainability across Nigeria.

This project provides clean power to {beneficiaries}+ beneficiaries and strengthens the local economic landscape by supporting productive activities in households, micro-enterprises, and commercial users. {jobsDirect}+ direct and {jobsIndirect}+ indirect jobs were generated, highlighting our commitment to creating local value and fostering inclusive growth.

The system produces approximately {annualEnergyOutput} kWh annually, ensuring stable energy delivery while reducing operational costs typically associated with fossil-fuel generators. The project further achieves an annual emissions reduction of around {annualCO2Reduction} tonnes of CO₂, aligning with global ESG standards and national decarbonization targets.

As part of ACOB Lighting Technology's clean energy investments, this project demonstrates our dedication to scaling impactful, reliable, and climate-aligned energy infrastructure across emerging markets.`,
  };

  // Get region from state
  const region = getNigerianRegion(data.state);

  // Prepare formatted values
  const values = {
    kwp: data.kwp?.toString() || '[kwp]',
    systemType: data.systemType || '[System Type]',
    location: data.location || '[Location]',
    lga: data.lga || '[LGA]',
    state: data.state || '[State]',
    region: region,
    beneficiaries: data.beneficiaries?.toLocaleString() || '[beneficiaries]',
    jobsDirect: data.jobsDirect?.toString() || '[direct jobs]',
    jobsIndirect: data.jobsIndirect?.toString() || '[indirect jobs]',
    annualEnergyOutput:
      data.annualEnergyOutput?.toLocaleString() || '[annual energy output]',
    annualCO2Reduction:
      data.annualCO2Reduction?.toLocaleString() || '[CO₂ reduction]',
  };

  // Simple string replacements for placeholders
  let text = templates[template]
    .replace(/\{kwp\}/g, values.kwp)
    .replace(/\{systemType\}/g, values.systemType)
    .replace(/\{location\}/g, values.location)
    .replace(/\{lga\}/g, values.lga)
    .replace(/\{state\}/g, values.state)
    .replace(/\{region\}/g, values.region)
    .replace(/\{beneficiaries\}/g, values.beneficiaries)
    .replace(/\{jobsDirect\}/g, values.jobsDirect)
    .replace(/\{jobsIndirect\}/g, values.jobsIndirect)
    .replace(/\{annualEnergyOutput\}/g, values.annualEnergyOutput)
    .replace(/\{annualCO2Reduction\}/g, values.annualCO2Reduction);

  // Wrap specific phrases in <strong> tags
  // Order matters: more specific/longer phrases first
  const phrasesToBold = [
    `${values.jobsDirect}+ direct and ${values.jobsIndirect}+ indirect jobs`, // With plus (must come before without plus)
    `${values.jobsDirect} direct and ${values.jobsIndirect} indirect jobs`,
    `${values.kwp} kWp ${values.systemType}`,
    `${values.beneficiaries}+ beneficiaries`, // With plus (must come before without plus)
    `${values.beneficiaries} beneficiaries`,
    `${values.beneficiaries} beneficiaries`,
    `${values.beneficiaries} residents`,
    `${values.jobsDirect}+ direct`, // With plus (must come before without plus)
    `${values.jobsDirect} direct jobs`,
    `${values.jobsDirect} jobs`,
    `${values.jobsIndirect}+ indirect jobs`, // With plus (must come before without plus)
    `${values.jobsIndirect} indirect jobs`,
    `${values.jobsIndirect} indirect jobs`,
    `${values.jobsIndirect} more jobs`,
    `${values.annualEnergyOutput} kWh`,
    `${values.annualEnergyOutput} kWh`,
    `${values.annualCO2Reduction} tonnes of CO₂`,
    `${values.annualCO2Reduction} tonnes of CO₂`,
    `${values.annualCO2Reduction} tonnes of CO₂`,
    `${values.annualCO2Reduction} tonnes of CO₂`,
    `${values.location}`,
    `${values.lga} LGA`,
    `${values.region} region of Nigeria`,
    `${values.state} State`,
  ];

  phrasesToBold.forEach(phrase => {
    text = text.replace(phrase, `<strong>${phrase}</strong>`);
  });

  return text;
}
