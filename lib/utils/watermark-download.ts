/**
 * Utility functions for watermarked image downloads
 */

/**
 * Generates a download URL for an image with ACOB watermark
 * @param imageUrl - The original image URL (can be Sanity, Cloudinary, or local)
 * @returns API endpoint URL that will serve watermarked image
 */
export function getWatermarkedDownloadUrl(imageUrl: string): string {
  return `/api/download?url=${encodeURIComponent(imageUrl)}`;
}

/**
 * Triggers download of watermarked image
 * @param imageUrl - The original image URL
 * @param filename - Optional custom filename (without extension)
 */
export async function downloadWatermarkedImage(
  imageUrl: string,
  filename?: string,
): Promise<void> {
  try {
    const downloadUrl = getWatermarkedDownloadUrl(imageUrl);

    // Fetch the watermarked image
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    // Create blob and trigger download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Generate filename from URL if not provided
    const defaultFilename = imageUrl.split('/').pop()?.split('?')[0] || 'image';
    a.download = filename
      ? `${filename}.jpg`
      : `${defaultFilename.replace(/\.[^/.]+$/, '')}.jpg`;

    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Failed to download watermarked image:', error);
    throw error;
  }
}

/**
 * Prevents right-click image save and redirects to watermarked download
 * @param imageUrl - The original image URL
 * @returns Event handler for onContextMenu
 */
export function preventDirectSave(imageUrl: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    downloadWatermarkedImage(imageUrl).catch(err => {
      console.error('Download failed:', err);
      window.alert('Failed to download image. Please try again.');
    });
  };
}
