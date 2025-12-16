# Legal Page Images

This directory contains hero images for legal pages.

## Required Images

- `privacy-policy.webp` - Hero image for Privacy Policy page
- `terms-of-service.webp` - Hero image for Terms of Service page

## How to Add Images

1. Create a `download` folder in the project root (if it doesn't exist)
2. Add your source images with names like:
   - `privacy-policy.jpg` or `privacy.jpg` or `privacy policy.png`
   - `terms-of-service.jpg` or `terms.jpg` or `terms of service.png`
3. Run the conversion script:
   ```bash
   node scripts/convert-legal-images.js
   ```

The script will:
- Automatically detect images matching privacy policy and terms of service
- Convert them to optimized WebP format
- Resize to 1200x630 (standard hero image size)
- Optimize for web (80% quality, high compression effort)
- Save them to this directory

## Image Specifications

- Format: WebP
- Dimensions: 1200x630 (16:9 aspect ratio)
- Quality: 80% (optimized for web)
- File size: Should be under 200KB for optimal performance

