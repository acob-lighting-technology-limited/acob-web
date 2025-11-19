# ACOB Watermark Download System

This system ensures that all images downloaded from `/projects`, `/updates`, and `/services` have the ACOB logo watermark applied automatically.

## How It Works

1. **Clean Display**: Images display normally on the website without watermarks
2. **Protected Downloads**: When users download images (right-click save or download button), the ACOB logo is automatically added
3. **Transparent Processing**: The watermark is applied server-side via the `/api/download` endpoint

## Implementation

### Option 1: Using the DownloadableImage Component (Recommended)

Replace standard Next.js `Image` components with `DownloadableImage`:

```tsx
import { DownloadableImage } from '@/components/ui/downloadable-image';

// Before:
<Image
  src={imageUrl}
  alt="Project image"
  width={800}
  height={600}
  className="rounded-lg"
/>

// After:
<DownloadableImage
  src={imageUrl}
  alt="Project image"
  width={800}
  height={600}
  className="rounded-lg"
  showDownloadButton={true} // Shows download icon on hover
/>
```

**Features:**

- Hover shows download button with loading state
- Right-click triggers watermarked download
- Prevents direct image save

### Option 2: Using Utility Functions

For custom implementations, use the utility functions:

```tsx
import { downloadWatermarkedImage, preventDirectSave } from '@/lib/utils/watermark-download';

// Add download button
<button onClick={() => downloadWatermarkedImage(imageUrl, 'project-name')}>
  Download with Watermark
</button>

// Prevent right-click save
<img
  src={imageUrl}
  onContextMenu={preventDirectSave(imageUrl)}
  alt="Protected image"
/>
```

### Option 3: Direct API Usage

For manual integration or external systems:

```tsx
// Generate watermarked download URL
const downloadUrl = `/api/download?url=${encodeURIComponent(imageUrl)}`;

<a href={downloadUrl} download>
  Download Image
</a>;
```

## Where to Apply

### Priority Areas:

1. **Project Gallery Images** (`app/projects/[slug]/project-content.tsx`)
2. **Update Post Images** (`app/updates/[slug]/update-content.tsx`)
3. **Service Gallery Images** (`app/services/[slug]`)

### Files to Update:

- `app/projects/[slug]/project-content.tsx` - Project detail images
- `app/projects/projects-client.tsx` - Project cards
- `app/updates/[slug]/update-content.tsx` - Update post images
- `app/updates/updates-client.tsx` - Update cards
- Service-related image components

## Watermark Configuration

Current settings in `/app/api/download/route.ts`:

- **Logo**: `/public/images/acob-logo-dark.webp`
- **Position**: Bottom-right corner
- **Size**: 15% of image width (max 300px)
- **Opacity**: 50% (semi-transparent)
- **Padding**: 20px from edges

### Customization:

To adjust watermark appearance, edit `app/api/download/route.ts`:

```typescript
// Change size (percentage of image width)
const watermarkWidth = Math.min(Math.floor(imageWidth * 0.15), 300);
//                                                        ^^^^ Change this

// Change opacity (0-255, where 128 = 50%)
input: Buffer.from([255, 255, 255, 128]),
//                                  ^^^ Change this

// Change position
const left = imageWidth - (watermarkMetadata.width || 100) - 20;  // Right padding
const top = imageHeight - watermarkHeight - 20;                    // Bottom padding
```

### Position Presets:

**Bottom-right (current):**

```typescript
const left = imageWidth - watermarkWidth - 20;
const top = imageHeight - watermarkHeight - 20;
```

**Bottom-center:**

```typescript
const left = (imageWidth - watermarkWidth) / 2;
const top = imageHeight - watermarkHeight - 20;
```

**Top-right:**

```typescript
const left = imageWidth - watermarkWidth - 20;
const top = 20;
```

**Center (tiled/overlay):**

```typescript
const left = (imageWidth - watermarkWidth) / 2;
const top = (imageHeight - watermarkHeight) / 2;
```

## Testing

1. Start the development server:

```bash
npm run dev
```

2. Test with a direct API call:

```
http://localhost:3000/api/download?url=https://cdn.sanity.io/images/...
```

3. Test with static images:

```
http://localhost:3000/api/download?url=/images/services/mini-grid-solutions.webp
```

4. Test in browser:
   - Navigate to a project/update page
   - Right-click on an image and save
   - Verify watermark appears in downloaded file

## Performance Considerations

- Images are processed on-demand (not pre-watermarked)
- Sharp library provides fast image processing
- Download endpoint includes cache headers for CDN support
- Consider adding Redis caching for frequently downloaded images

## Security

- Original images remain accessible via direct URLs
- This system encourages proper attribution rather than absolute protection
- For maximum security, consider serving all images through the watermark API

## Future Enhancements

1. **Batch Downloads**: Watermark multiple images in a zip file
2. **Custom Watermarks**: Allow different watermarks per content type
3. **Analytics**: Track which images are downloaded most
4. **CDN Integration**: Pre-generate watermarked versions for Cloudinary/CDN
5. **Admin Controls**: Toggle watermarking per project/update via Sanity
