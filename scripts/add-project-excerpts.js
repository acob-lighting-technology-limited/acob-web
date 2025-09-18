/**
 * Script to add excerpts to existing projects
 * This script will create excerpts from the first 150 characters of existing project content
 * Run this after updating your Sanity schema to include the excerpt field
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing required environment variables. Please check your .env file.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2025-07-16',
  token,
});

// Helper function to extract text from Portable Text content
function extractTextFromPortableText(content) {
  if (!Array.isArray(content)) return '';
  
  return content
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map((child) => child.text || '')
          .join('');
      }
      return '';
    })
    .join(' ')
    .trim();
}

async function addProjectExcerpts() {
  try {
    console.log('Fetching existing projects...');
    
    // Get all projects that don't have excerpts
    const projects = await client.fetch(`
      *[_type == "project" && !defined(excerpt)] {
        _id,
        title,
        content
      }
    `);

    if (projects.length === 0) {
      console.log('All projects already have excerpts!');
      return;
    }

    console.log(`Found ${projects.length} projects without excerpts.`);

    for (const project of projects) {
      try {
        // Create excerpt from content (first 150 characters, then find the last complete word)
        let excerpt = extractTextFromPortableText(project.content) || '';
        if (excerpt.length > 150) {
          excerpt = excerpt.substring(0, 150);
          // Find the last complete word
          const lastSpaceIndex = excerpt.lastIndexOf(' ');
          if (lastSpaceIndex > 0) {
            excerpt = excerpt.substring(0, lastSpaceIndex);
          }
          excerpt += '...';
        }

        console.log(`Adding excerpt to "${project.title}": "${excerpt}"`);

        // Update the project with the excerpt
        await client
          .patch(project._id)
          .set({ excerpt })
          .commit();

        console.log(`✓ Updated "${project.title}"`);
      } catch (error) {
        console.error(`✗ Failed to update "${project.title}":`, error.message);
      }
    }

    console.log('\nFinished adding excerpts to projects!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
addProjectExcerpts().catch(console.error);
