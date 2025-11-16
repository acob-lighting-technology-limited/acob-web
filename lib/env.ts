import { z } from 'zod';

// Define the environment variable schema
const envSchema = z.object({
  // Sanity CMS
  NEXT_PUBLIC_SANITY_PROJECT_ID: z
    .string()
    .min(1, 'Sanity project ID is required'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, 'Sanity dataset is required'),
  SANITY_API_TOKEN: z.string().min(1, 'Sanity API token is required'),

  // API Keys
  RESEND_API_KEY: z.string().min(1, 'Resend API key is required'),
  GROQ_API_KEY: z.string().min(1, 'Groq API key is required'),

  // Site Configuration
  SITE_URL: z.string().url('Site URL must be a valid URL').optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
});

// Validate environment variables
function validateEnv() {
  try {
    const env = envSchema.parse({
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
      SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      GROQ_API_KEY: process.env.GROQ_API_KEY,
      SITE_URL: process.env.SITE_URL,
      NODE_ENV: process.env.NODE_ENV,
    });
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join('\n');
      throw new Error(
        `Environment variable validation failed:\n${errorMessage}`,
      );
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
