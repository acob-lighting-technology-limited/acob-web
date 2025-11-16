# ACOB Lighting Technology Limited - Official Website

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Sanity CMS](https://img.shields.io/badge/Sanity-CMS-orange)](https://www.sanity.io/)

**Private Repository** - Official website for ACOB Lighting Technology Limited, a leading Nigerian renewable energy company providing solar solutions, mini-grids, and clean energy infrastructure across Nigeria and West Africa.

> ⚠️ **This is a proprietary project owned by ACOB Lighting Technology Limited. Unauthorized access, copying, or distribution is strictly prohibited.**

## 🌟 About ACOB Lighting

ACOB Lighting Technology Limited, founded in 2016 and led by CEO Mr. Alexander Chinedu Obiechina, is headquartered in Gwarinpa, Abuja. The company provides clean, cost-effective, and sustainable power solutions through renewable energy to underserved and unserved communities.

**Company Tagline:** "Lighting Up Nigeria with Advanced Solar Solutions"

### Key Statistics

- **100+** projects completed
- **150MW+** total capacity installed
- **200+** communities served
- **10+** years of experience in renewable energy

## 🚀 Features

- **Modern & Responsive Design** - Fully responsive with dark mode support
- **Content Management** - Integrated Sanity CMS for easy content updates
- **Performance Optimized** - Fast loading times with Next.js 15 and image optimization
- **SEO Ready** - Comprehensive SEO implementation with structured data
- **Accessibility** - WCAG compliant with keyboard navigation and screen reader support
- **Multi-language Support** - Support for English, Igbo, Yoruba, and Hausa
- **Interactive Chatbot** - AI-powered assistant (ACOBot) for customer support
- **Project Showcase** - Dynamic project galleries with filtering and search
- **Blog/Updates System** - Content management for news and updates

## 🛠️ Tech Stack

- **Framework:** Next.js 15.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Sanity Studio
- **UI Components:** Radix UI, shadcn/ui
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Analytics:** Vercel Analytics & Speed Insights

## 📋 Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Sanity account (for CMS)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/ACOB.git
   cd ACOB
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📁 Project Structure

```
ACOB/
├── app/                    # Next.js app directory (pages, layouts, API routes)
│   ├── about/             # About pages
│   ├── contact/           # Contact pages
│   ├── projects/          # Project pages
│   ├── services/          # Service pages
│   ├── updates/           # Blog/updates pages
│   └── studio/            # Sanity Studio
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sections/         # Page sections
│   └── layout/           # Layout components
├── lib/                  # Utility functions and data
│   ├── utils/           # Helper functions
│   └── data/            # Static data
├── sanity/               # Sanity CMS configuration
│   ├── schemaTypes/     # Content schemas
│   └── lib/             # Sanity utilities
├── public/              # Static assets
└── styles/              # Global styles
```

## 🎨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run check-all` - Run lint, format check, and type check
- `npm run sanity:dev` - Start Sanity Studio
- `npm run sanity:build` - Build Sanity Studio
- `npm run sanity:deploy` - Deploy Sanity Studio

## 🌐 Deployment

The website is deployed on [Vercel](https://vercel.com) with automatic deployments from the main branch.

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

## 📝 Content Management

Content is managed through Sanity Studio. Access the studio at:

- **Development:** `http://localhost:3000/studio`
- **Production:** `https://your-domain.com/studio`

### Content Types

- **Projects** - Solar installations and mini-grid projects
- **Updates** - News, blog posts, and company updates
- **Job Postings** - Career opportunities
- **Comments** - User comments and testimonials

## 🔒 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_API_TOKEN=your_api_token

# Optional: Maintenance Mode
NEXT_PUBLIC_MAINTENANCE_MODE=false
MAINTENANCE_BYPASS_TOKEN=your_bypass_token

# Optional: AI Chatbot
GROQ_API_KEY=your_groq_api_key
```

## 🔐 Access & Permissions

This repository is **private and proprietary** to ACOB Lighting Technology Limited. Only authorized team members have access.

### Commit Message Format

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Examples:**

- `feat: add new project showcase feature`
- `fix: resolve mobile navigation issue`
- `docs: update deployment instructions`

## 📄 License & Ownership

**Copyright © 2024 ACOB Lighting Technology Limited. All Rights Reserved.**

This project, including all source code, documentation, and related materials, is the exclusive property of ACOB Lighting Technology Limited.

- **Proprietary Software** - Not open source
- **Confidential** - Internal use only
- **Unauthorized copying, modification, or distribution is strictly prohibited**
- **Access restricted to authorized personnel only**

## 📞 Contact

**ACOB Lighting Technology Limited**

- **Head Office:** Plot 2, Block 14 Extension, Federal Ministry of Works & Housing Sites and Service Scheme, Setraco Gate, Gwarinpa, Abuja, Nigeria
- **Phone:** +234 704 920 2634, +234 803 290 2825
- **Email:** info@acoblighting.com
- **Website:** [www.acoblighting.com](https://www.acoblighting.com)

**Work Hours:** Monday – Friday, 8:00 AM – 5:00 PM (Closed on weekends)

## 🔗 Links

- **Website:** [www.acoblighting.com](https://www.acoblighting.com)
- **Facebook:** [@acoblightingtechltd](https://www.facebook.com/acoblightingtechltd)
- **Twitter/X:** [@acoblimited](https://x.com/acoblimited)
- **LinkedIn:** [ACOB Lighting Technology Limited](https://www.linkedin.com/company/acob-lighting-technology-limited/)
- **Instagram:** [@acob_lighting](https://www.instagram.com/acob_lighting/)

---

Built with ❤️ by the ACOB Lighting Technology team
