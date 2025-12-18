/**
 * Product Queries
 *
 * All Sanity queries related to products.
 * Handles fetching product data and counts.
 */

import { client } from '../config';
import type { Product } from '@/lib/types';

// ============================================================================
// GET ALL PRODUCTS
// ============================================================================

/**
 * Get all products
 *
 * @returns Array of all products with full details
 *
 * @example
 * ```typescript
 * const products = await getProducts();
 * ```
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const products = await client.fetch(`
      *[_type == "product"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        category,
        sku,
        availability,
        description,
        productImage {
          asset-> {
            _id,
            url
          },
          alt
        },
        productImages[] {
          asset-> {
            _id,
            url
          },
          alt
        },
        specifications,
        isFeatured,
        _createdAt,
        _updatedAt
      }
    `);

    return products;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching products from Sanity:', error);
    }
    return [];
  }
}

// ============================================================================
// GET FEATURED PRODUCT COUNT
// ============================================================================

/**
 * Get count of featured products that are in stock
 *
 * @returns Number of featured in-stock products
 *
 * @example
 * ```typescript
 * const count = await getFeaturedProductCount();
 * // 15
 * ```
 */
export async function getFeaturedProductCount(): Promise<number> {
  try {
    const count = await client.fetch(`
      count(*[_type == "product" && isFeatured == true && availability == "in-stock"])
    `);
    return count || 0;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Error fetching featured product count from Sanity:',
        error,
      );
    }
    return 0;
  }
}
