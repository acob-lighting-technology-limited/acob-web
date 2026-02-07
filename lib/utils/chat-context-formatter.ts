/**
 * Context Formatting Utilities
 * Formats Sanity data into concise context for AI chatbot responses
 */

import { CONTACT_INFO } from '../constants/app.constants';
import type { Project, UpdatePost, Product } from '@/lib/types';

interface SanityJobPosting {
  title: string;
  department?: string;
  location?: string;
  employmentType?: string;
  applicationDeadline?: string;
  description: string;
}

/**
 * Format projects data for chatbot context
 */
export function formatProjectsContext(projects: Project[]): string {
  if (!projects || projects.length === 0) {
    return 'No projects found matching the query.';
  }

  // Limit to top 5 most relevant projects to avoid token limits
  const limitedProjects = projects.slice(0, 5);

  const formattedProjects = limitedProjects
    .map((project, index) => {
      const parts: string[] = [
        `${index + 1}. **${project.title}**`,
        `   - Location: ${project.location || 'N/A'}${project.state ? `, ${project.state}` : ''}`,
        `   - Category: ${project.category || 'General'}`,
      ];

      if (project.projectDate) {
        parts.push(`   - Date: ${project.projectDate}`);
      }

      if (project.excerpt) {
        parts.push(`   - Description: ${project.excerpt}`);
      }

      if (project.impactMetrics) {
        const metrics: string[] = [];
        if (project.impactMetrics.kwp) {
          metrics.push(`${project.impactMetrics.kwp} kWp capacity`);
        }
        if (project.impactMetrics.beneficiaries) {
          metrics.push(`${project.impactMetrics.beneficiaries} beneficiaries`);
        }
        if (project.impactMetrics.systemType) {
          metrics.push(`${project.impactMetrics.systemType} system`);
        }
        if (metrics.length > 0) {
          parts.push(`   - Impact: ${metrics.join(', ')}`);
        }
      }

      return parts.join('\n');
    })
    .join('\n\n');

  return `**ACOB Projects (${projects.length} total, showing ${limitedProjects.length}):**\n\n${formattedProjects}`;
}

/**
 * Format updates/news data for chatbot context
 */
export function formatUpdatesContext(updates: UpdatePost[]): string {
  if (!updates || updates.length === 0) {
    return 'No recent updates found.';
  }

  // Limit to top 5 most recent updates
  const limitedUpdates = updates.slice(0, 5);

  const formattedUpdates = limitedUpdates
    .map((update, index) => {
      const parts: string[] = [
        `${index + 1}. **${update.title}**`,
        `   - Date: ${new Date(update.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
      ];

      if (update.category) {
        parts.push(`   - Category: ${update.category}`);
      }

      if (update.excerpt) {
        parts.push(`   - Summary: ${update.excerpt}`);
      }

      if (update.author) {
        parts.push(`   - Author: ${update.author}`);
      }

      return parts.join('\n');
    })
    .join('\n\n');

  return `**Latest ACOB Updates (${updates.length} total, showing ${limitedUpdates.length}):**\n\n${formattedUpdates}`;
}

/**
 * Format products data for chatbot context
 */
export function formatProductsContext(products: Product[]): string {
  if (!products || products.length === 0) {
    return 'No products found matching the query.';
  }

  // Limit to top 8 products
  const limitedProducts = products.slice(0, 8);

  const formattedProducts = limitedProducts
    .map((product, index) => {
      const parts: string[] = [
        `${index + 1}. **${product.title}**`,
        `   - Category: ${product.category || 'General'}`,
        `   - Availability: ${product.availability || 'Contact for availability'}`,
      ];

      if (product.sku) {
        parts.push(`   - SKU: ${product.sku}`);
      }

      if (product.description) {
        // Truncate long descriptions
        const desc =
          product.description.length > 150
            ? `${product.description.substring(0, 150)}...`
            : product.description;
        parts.push(`   - Description: ${desc}`);
      }

      // Add relevant specifications based on category
      if (product.specifications?.panelSpecifications) {
        const specs: string[] = [];
        const panel = product.specifications.panelSpecifications;
        if (panel.powerRatingWatts) {
          specs.push(`${panel.powerRatingWatts} capacity`);
        }
        if (panel.efficiencyPercent) {
          specs.push(`${panel.efficiencyPercent} efficiency`);
        }
        if (specs.length > 0) {
          parts.push(`   - Specs: ${specs.join(', ')}`);
        }
      }

      if (product.specifications?.batterySpecifications) {
        const specs: string[] = [];
        const battery = product.specifications.batterySpecifications;
        if (battery.capacityAhOrKwh) {
          specs.push(`${battery.capacityAhOrKwh} capacity`);
        }
        if (battery.voltage) {
          specs.push(`${battery.voltage}V`);
        }
        if (specs.length > 0) {
          parts.push(`   - Specs: ${specs.join(', ')}`);
        }
      }

      if (product.specifications?.inverterSpecifications) {
        const specs: string[] = [];
        const inverter = product.specifications.inverterSpecifications;
        if (inverter.powerRatingKvaKw) {
          specs.push(`${inverter.powerRatingKvaKw} power`);
        }
        // Handle input/output voltage
        const voltages = [];
        if (inverter.inputVoltage) {
          voltages.push(inverter.inputVoltage);
        }
        if (inverter.outputVoltage) {
          voltages.push(inverter.outputVoltage);
        }
        if (voltages.length > 0) {
          specs.push(`${voltages.join('/')}V system`);
        }
        if (specs.length > 0) {
          parts.push(`   - Specs: ${specs.join(', ')}`);
        }
      }

      return parts.join('\n');
    })
    .join('\n\n');

  return `**ACOB Products (${products.length} total, showing ${limitedProducts.length}):**\n\n${formattedProducts}`;
}

/**
 * Format job postings data for chatbot context
 */
export function formatJobsContext(jobs: SanityJobPosting[]): string {
  if (!jobs || jobs.length === 0) {
    return 'No active job openings at the moment. Please check back later or visit our careers page.';
  }

  const formattedJobs = jobs
    .map((job, index) => {
      const parts: string[] = [
        `${index + 1}. **${job.title}**`,
        `   - Department: ${job.department || 'General'}`,
        `   - Location: ${job.location || 'Nigeria'}`,
        `   - Type: ${job.employmentType || 'Full-time'}`,
      ];

      if (job.applicationDeadline) {
        parts.push(
          `   - Deadline: ${new Date(job.applicationDeadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
        );
      }

      if (job.description) {
        // Truncate long descriptions
        const desc =
          job.description.length > 200
            ? `${job.description.substring(0, 200)}...`
            : job.description;
        parts.push(`   - Description: ${desc}`);
      }

      return parts.join('\n');
    })
    .join('\n\n');

  return `**Current Job Openings at ACOB (${jobs.length} positions):**\n\n${formattedJobs}\n\nTo apply, please visit our careers page or contact us at ${CONTACT_INFO.email.careers}`;
}

/**
 * Create context injection message for chatbot
 */
export function createContextMessage(content: string): {
  role: 'system';
  content: string;
} {
  return {
    role: 'system',
    content: `## RELEVANT DATA FROM ACOB DATABASE:\n\n${content}\n\n**CRITICAL INSTRUCTIONS:**
1. Use the EXACT dates shown above - DO NOT change or modify any dates
2. If a date shows 2025, say 2025 (not 2024)
3. Copy dates exactly as they appear in the data
4. Only mention information that's directly relevant to the user's query
5. If the data doesn't fully answer their question, suggest they contact ACOB for more details

**Remember:** The current year is ${new Date().getFullYear()}. Use dates from the data above exactly as shown.`,
  };
}
