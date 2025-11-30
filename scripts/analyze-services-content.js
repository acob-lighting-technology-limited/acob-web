import { getProjects, getProducts } from '../sanity/lib/client.ts';

async function analyzeServicesContent() {
  try {
    console.log('Fetching data from Sanity...\n');

    const [projects, products] = await Promise.all([
      getProjects(),
      getProducts(),
    ]);

    console.log('='.repeat(80));
    console.log('SANITY DATA ANALYSIS FOR SERVICE IMPROVEMENT');
    console.log('='.repeat(80));
    console.log('\n');

    // Analyze Projects
    console.log('📊 PROJECTS ANALYSIS');
    console.log('-'.repeat(80));
    console.log(`Total Projects: ${projects.length}\n`);

    // Group by category
    const projectsByCategory = {};
    const projectsByState = {};

    projects.forEach(project => {
      const category = project.category || 'Uncategorized';
      const state = project.state || 'Unknown';

      if (!projectsByCategory[category]) {
        projectsByCategory[category] = [];
      }
      if (!projectsByState[state]) {
        projectsByState[state] = [];
      }

      projectsByCategory[category].push(project.title);
      projectsByState[state].push(project.title);
    });

    console.log('Projects by Category:');
    Object.entries(projectsByCategory).forEach(([category, projs]) => {
      console.log(`  ${category}: ${projs.length} projects`);
      projs.slice(0, 3).forEach(title => console.log(`    - ${title}`));
      if (projs.length > 3) {
        console.log(`    ... and ${projs.length - 3} more`);
      }
    });

    console.log('\nProjects by State:');
    Object.entries(projectsByState)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 10)
      .forEach(([state, projs]) => {
        console.log(`  ${state}: ${projs.length} projects`);
      });

    console.log('\n');

    // Analyze Products
    console.log('📦 PRODUCTS ANALYSIS');
    console.log('-'.repeat(80));
    console.log(`Total Products: ${products.length}\n`);

    const productsByCategory = {};
    products.forEach(product => {
      const category = product.category || 'Uncategorized';
      if (!productsByCategory[category]) {
        productsByCategory[category] = [];
      }
      productsByCategory[category].push(product.title);
    });

    console.log('Products by Category:');
    Object.entries(productsByCategory).forEach(([category, prods]) => {
      console.log(`  ${category}: ${prods.length} products`);
      prods.forEach(title => console.log(`    - ${title}`));
    });

    console.log('\n');

    // Service Mapping Analysis
    console.log('🔗 SERVICE MAPPING RECOMMENDATIONS');
    console.log('-'.repeat(80));
    console.log('\n');

    // Mini-Grid Solutions
    console.log('1. MINI-GRID SOLUTIONS');
    const miniGridProjects = projects.filter(
      p =>
        p.category?.toLowerCase().includes('mini-grid') ||
        p.category?.toLowerCase().includes('minigrid') ||
        p.title?.toLowerCase().includes('mini-grid') ||
        p.title?.toLowerCase().includes('minigrid'),
    );
    console.log(`   Related Projects (${miniGridProjects.length}):`);
    miniGridProjects.forEach(p =>
      console.log(`     - ${p.title} (${p.state || 'N/A'})`),
    );

    console.log(
      '   Related Products: Solar panels, Batteries, Inverters, Smart meters',
    );
    console.log('\n');

    // Captive Power
    console.log('2. CAPTIVE POWER SOLUTIONS');
    const captiveProjects = projects.filter(
      p =>
        p.category?.toLowerCase().includes('commercial') ||
        p.category?.toLowerCase().includes('industrial') ||
        p.category?.toLowerCase().includes('hospital') ||
        p.category?.toLowerCase().includes('healthcare'),
    );
    console.log(`   Related Projects (${captiveProjects.length}):`);
    captiveProjects.forEach(p =>
      console.log(`     - ${p.title} (${p.state || 'N/A'})`),
    );
    console.log('\n');

    // Streetlighting
    console.log('3. STREETLIGHTING INFRASTRUCTURE');
    const streetlightProjects = projects.filter(
      p =>
        p.category?.toLowerCase().includes('street') ||
        p.title?.toLowerCase().includes('street') ||
        p.title?.toLowerCase().includes('lighting'),
    );
    console.log(`   Related Projects (${streetlightProjects.length}):`);
    streetlightProjects.forEach(p =>
      console.log(`     - ${p.title} (${p.state || 'N/A'})`),
    );
    console.log('\n');

    // Agriculture
    console.log('4. AGRICULTURAL SOLUTIONS (Potential New Service)');
    const agriProjects = projects.filter(
      p =>
        p.category?.toLowerCase().includes('agric') ||
        p.title?.toLowerCase().includes('farm') ||
        p.title?.toLowerCase().includes('palm') ||
        p.title?.toLowerCase().includes('mill'),
    );
    console.log(`   Related Projects (${agriProjects.length}):`);
    agriProjects.forEach(p =>
      console.log(`     - ${p.title} (${p.state || 'N/A'})`),
    );
    console.log('\n');

    console.log('='.repeat(80));
    console.log('END OF ANALYSIS');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('Error analyzing services:', error);
  }
}

analyzeServicesContent();
