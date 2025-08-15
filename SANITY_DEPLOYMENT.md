# Sanity Studio Deployment Guide

## Option 1: Deploy as Standalone Studio (Recommended)

### Step 1: Deploy to Sanity's Managed Studio

1. **Build and Deploy to Sanity's CDN:**

   ```bash
   npm run sanity:deploy
   ```

2. **Follow the prompts:**
   - Choose your project
   - Set a custom domain (optional)
   - The studio will be available at: `https://your-project-name.sanity.studio`

### Step 2: Set up Custom Domain (Optional)

1. **Add custom domain in Sanity Dashboard:**
   - Go to [manage.sanity.io](https://manage.sanity.io)
   - Select your project
   - Go to "Settings" → "Domains"
   - Add your custom domain (e.g., `studio.yourdomain.com`)

2. **Configure DNS:**
   - Add CNAME record pointing to `your-project-name.sanity.studio`
   - Wait for DNS propagation (can take up to 24 hours)

## Option 2: Deploy to Vercel

### Step 1: Create Studio Directory

```bash
mkdir sanity-studio
cd sanity-studio
```

### Step 2: Initialize Sanity Studio

```bash
npm create sanity@latest -- --template clean --create-project "ACOB Studio" --dataset production
```

### Step 3: Copy Schema Files

Copy your schema files from the main project:

- `sanity/schemaTypes/` → `sanity-studio/schemas/`
- `sanity/structure.ts` → `sanity-studio/structure.ts`

### Step 4: Update Configuration

Update `sanity.config.ts` in the studio directory:

```typescript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { structure } from './structure';

export default defineConfig({
  name: 'default',
  title: 'ACOB Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
```

### Step 5: Deploy to Vercel

1. **Push to GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial Sanity Studio"
   git remote add origin https://github.com/yourusername/acob-studio.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `SANITY_STUDIO_PROJECT_ID`
     - `SANITY_STUDIO_DATASET`
   - Deploy

## Option 3: Deploy to Netlify

### Step 1: Create netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 2: Deploy

1. **Build locally:**

   ```bash
   npm run sanity:build
   ```

2. **Deploy to Netlify:**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository
   - Add environment variables in Netlify dashboard

## Environment Variables

Make sure these are set in your deployment platform:

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

## Security Considerations

1. **CORS Settings:**
   - Update CORS origins in Sanity Dashboard
   - Add your deployed studio URL to allowed origins

2. **API Permissions:**
   - Ensure your API tokens have appropriate permissions
   - Use read-only tokens for public content

## Recommended Approach

**Use Option 1 (Sanity's Managed Studio)** because:

- ✅ Zero configuration
- ✅ Automatic updates
- ✅ Built-in CDN
- ✅ Free hosting
- ✅ Automatic SSL
- ✅ Custom domains supported

## Quick Start (Recommended)

```bash
# Deploy to Sanity's managed studio
npm run sanity:deploy

# Your studio will be available at:
# https://your-project-name.sanity.studio
```

## Troubleshooting

### Common Issues:

1. **Build Errors:**
   - Check environment variables
   - Ensure all schema files are properly exported

2. **CORS Errors:**
   - Update CORS settings in Sanity Dashboard
   - Add your domain to allowed origins

3. **Authentication Issues:**
   - Verify project ID and dataset
   - Check API token permissions

### Support:

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
- [Deployment Guide](https://www.sanity.io/docs/deployment)
