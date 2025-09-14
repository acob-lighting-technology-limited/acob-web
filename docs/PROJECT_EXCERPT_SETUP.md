# Project Content & Excerpt Field Setup

This document explains how to set up and use the new excerpt field and updated content field for projects in your ACOB Lighting website.

## What are the Content & Excerpt Fields?

### Content Field (formerly Description)
- **Renamed**: The `description` field has been renamed to `content`
- **Enhanced**: Now supports rich text formatting using Portable Text
- **Features**: 
  - Text blocks with formatting (bold, italic, headings, etc.)
  - Inline images with alt text
  - Lists and other rich content
  - Better content management and presentation

### Excerpt Field
- **New**: A short summary of the project (recommended 150-200 characters)
- **Purpose**: Provides concise overviews for project cards and SEO
- **Benefits**: Cleaner project listings and better social media sharing

## Changes Made

### 1. Sanity Schema Update
- **Renamed**: `description` → `content` in `sanity/schemaTypes/project.ts`
- **Enhanced**: Content field now uses `array` type with Portable Text support
- **Added**: `excerpt` field for short project summaries
- **Content Types**: Supports text blocks and inline images

### 2. TypeScript Types Update
- **Updated**: `Project` interface in `lib/types.ts`
- **Changed**: `description: string` → `content: unknown[]` (Portable Text)
- **Added**: `excerpt?: string` for optional excerpts

### 3. Frontend Updates
- **Project Cards**: Display excerpt if available, fallback to content text
- **Individual Project Pages**: Show excerpt above rich content
- **Search Functionality**: Includes excerpt and content text in search
- **SEO Metadata**: Uses excerpt for meta descriptions when available
- **Rich Content**: Content field now renders with full formatting

### 4. API Updates
- **Updated**: `getProjects()` and `getProject()` functions to fetch content and excerpt
- **Enhanced**: Content field now returns rich text data structure

## How to Use

### For Content Creators
1. **In Sanity Studio**: 
   - Add an excerpt (150-200 characters) for project summaries
   - Use the content field for rich, formatted project descriptions
   - Content field supports text formatting, images, and lists

2. **Content Field Features**:
   - **Text Blocks**: Write formatted text with headings, bold, italic
   - **Images**: Add inline images with alt text
   - **Lists**: Create bulleted or numbered lists
   - **Links**: Add hyperlinks to external resources

3. **Example Excerpt**: "Solar-powered mini-grid installation providing reliable electricity to rural community in Kaduna State."

### For Developers
The content and excerpt fields are automatically integrated into:
- Project listing pages
- Individual project pages
- Search functionality
- SEO meta tags
- Social media sharing

## Migration Script

For existing projects, use the migration script:

```bash
# Install dependencies if needed
npm install dotenv

# Run the migration script
node scripts/add-project-excerpts.js
```

This script will:
- Find all projects without excerpts
- Generate excerpts from existing content (first 150 characters)
- Update projects in Sanity automatically
- Handle both old description and new content fields

## Benefits

1. **Better UX**: 
   - Shorter, digestible project summaries (excerpts)
   - Rich, formatted content for detailed information
   - Clear distinction between overview and details

2. **Improved SEO**: 
   - Better meta descriptions from excerpts
   - Rich content for search engines to index

3. **Content Management**: 
   - Structured content with formatting
   - Better content organization
   - Inline images and media support

4. **Social Sharing**: 
   - More engaging social media previews
   - Better content presentation

## Field Priority

When displaying project information, the system follows this priority:
1. **Excerpt** (if available) - for cards and summaries
2. **Content** (rich text) - for detailed project pages
3. **Default text** (if neither available)

## Validation

- **Excerpt Field**: 
  - Warning if over 200 characters
  - Not mandatory but recommended
  - Plain text only

- **Content Field**: 
  - Required field
  - Supports rich text formatting
  - Portable Text array structure

## Future Enhancements

Consider these potential improvements:
- Character count display in Sanity Studio
- Content templates for different project types
- A/B testing for excerpt effectiveness
- Automated excerpt generation using AI
- Content versioning and approval workflows
