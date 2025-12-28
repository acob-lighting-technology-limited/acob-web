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
  template:
    | 'description1'
    | 'description2'
    | 'description3'
    | 'description4'
    | 'description5'
    | 'description6'
    | 'description7',
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

    description3: `The {kwp} kWp {systemType} installation delivered by ACOB Lighting Technology Limited in the {location} community, {lga} LGA of {state} State in the {region} region of Nigeria, is part of our expanding portfolio of distributed renewable energy assets designed to enable energy security, economic development, and long-term sustainability across Nigeria.

This project provides clean power to {beneficiaries}+ beneficiaries and strengthens the local economic landscape by supporting productive activities in households, micro-enterprises, and commercial users. {jobsDirect}+ direct and {jobsIndirect}+ indirect jobs were generated, highlighting our commitment to creating local value and fostering inclusive growth.

The system produces approximately {annualEnergyOutput} kWh annually, ensuring stable energy delivery while reducing operational costs typically associated with fossil-fuel generators. The project further achieves an annual emissions reduction of around {annualCO2Reduction} tonnes of CO₂, aligning with global ESG standards and national decarbonization targets.

As part of ACOB Lighting Technology's clean energy investments, this project demonstrates our dedication to scaling impactful, reliable, and climate-aligned energy infrastructure across emerging markets.`,

    description4: `Situated in the {location} community within {lga} LGA of {state} State in the {region} region of Nigeria, this {kwp} kWp {systemType} project exemplifies ACOB Lighting Technology's commitment to community empowerment through sustainable energy access. The installation was designed to address critical energy poverty while catalyzing socio-economic development in the region.

The project now serves {beneficiaries} beneficiaries, providing consistent electricity that enables children to study after dark, healthcare facilities to operate effectively, and local entrepreneurs to expand their businesses beyond daylight hours. The deployment process prioritized local participation, creating {jobsDirect} direct employment opportunities and {jobsIndirect} indirect jobs that strengthened community capacity and technical expertise.

With an annual generation capacity of {annualEnergyOutput} kWh, the system eliminates the need for polluting diesel generators, resulting in annual CO₂ emission reductions of approximately {annualCO2Reduction} tonnes. This contributes to improved air quality and public health outcomes for the community.

This project reflects ACOB Lighting Technology's holistic approach to energy development—one that prioritizes people, planet, and prosperity in equal measure.`,

    description5: `ACOB Lighting Technology deployed a state-of-the-art {kwp} kWp {systemType} in {location} community within {lga} LGA, {state} State in the {region} region of Nigeria, leveraging advanced photovoltaic technology and smart energy management systems to deliver optimal performance and reliability. This installation represents a benchmark in distributed renewable energy infrastructure across Nigeria.

The system is engineered to generate approximately {annualEnergyOutput} kWh annually, providing uninterrupted power to {beneficiaries}+ users while maintaining industry-leading efficiency standards. Advanced monitoring and control systems ensure maximum uptime and enable predictive maintenance, guaranteeing long-term operational excellence.

Beyond technical performance, the project delivered measurable socio-economic benefits: {jobsDirect} skilled technicians and engineers were directly employed during installation and commissioning, while {jobsIndirect} additional jobs were created across the value chain. The system's clean energy output displaces fossil fuel consumption, achieving annual emissions avoidance of {annualCO2Reduction} tonnes of CO₂.

This project showcases ACOB's technical capabilities and unwavering commitment to deploying world-class renewable energy solutions that drive sustainable development and climate resilience.`,

    description6: `The {kwp} kWp {systemType} project in the community of {location}, {lga} LGA of {state} State in the {region} region of Nigeria, was delivered through a collaborative approach that brought together ACOB Lighting Technology's technical expertise, community leadership, and strategic stakeholders committed to advancing energy access and sustainable development.

This initiative was designed to address the energy needs of {beneficiaries} residents while creating pathways for economic growth and social progress. Through close engagement with local authorities, traditional leaders, and community representatives, the project ensured that the system's design and deployment aligned with the unique needs and priorities of the host community.

The project generated {jobsDirect} direct jobs and {jobsIndirect} indirect employment opportunities, fostering skills transfer and building local technical capacity that will support long-term maintenance and sustainability. With an annual output of {annualEnergyOutput} kWh, the installation displaces fossil fuel dependency and avoids approximately {annualCO2Reduction} tonnes of CO₂ emissions each year.

ACOB Lighting Technology remains committed to partnership-driven energy solutions that deliver shared value, empower communities, and contribute to Nigeria's renewable energy transition.`,

    description7: `As part of ACOB Lighting Technology's climate action portfolio, the {kwp} kWp {systemType} installed in {location}, a community in {lga} LGA, {state} State in the {region} region of Nigeria, represents a significant contribution to Nigeria's decarbonization efforts and environmental sustainability goals. This project was designed to deliver clean, reliable energy while minimizing ecological impact and advancing climate resilience.

Generating approximately {annualEnergyOutput} kWh annually, the system provides electricity to {beneficiaries}+ beneficiaries without relying on carbon-intensive fossil fuels. This results in an annual CO₂ emissions reduction of around {annualCO2Reduction} tonnes, directly supporting national and global climate commitments under the Paris Agreement and Nigeria's Nationally Determined Contributions (NDCs).

Beyond environmental benefits, the project created {jobsDirect} direct jobs and {jobsIndirect} indirect jobs, demonstrating that climate action and economic development are mutually reinforcing. The installation also reduces local air and noise pollution, improving public health and quality of life for surrounding communities.

This project underscores ACOB Lighting Technology's leadership in deploying renewable energy infrastructure that protects the environment, supports livelihoods, and builds a sustainable future for all Nigerians.`,
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
    `${values.jobsDirect} skilled technicians and engineers were directly employed`, // Template 5
    `${values.kwp} kWp ${values.systemType}`,
    `${values.beneficiaries}+ beneficiaries`, // With plus (must come before without plus)
    `${values.beneficiaries}+ users`, // Template 5
    `${values.beneficiaries} beneficiaries`,
    `${values.beneficiaries} residents`,
    `${values.jobsDirect}+ direct`, // With plus (must come before without plus)
    `${values.jobsDirect} direct employment opportunities`, // Template 4
    `${values.jobsDirect} direct jobs`,
    `${values.jobsDirect} jobs`,
    `${values.jobsDirect} skilled technicians and engineers`, // Template 5
    `${values.jobsIndirect}+ indirect jobs`, // With plus (must come before without plus)
    `${values.jobsIndirect} indirect employment opportunities`, // Template 6
    `${values.jobsIndirect} indirect jobs`,
    `${values.jobsIndirect} more jobs`,
    `${values.jobsIndirect} additional jobs`, // Template 5
    `${values.annualEnergyOutput} kWh`,
    `${values.annualCO2Reduction} tonnes of CO₂`,
    `${values.annualCO2Reduction} tonnes`, // Templates 4, 6, 7
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
