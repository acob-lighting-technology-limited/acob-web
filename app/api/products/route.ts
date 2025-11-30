import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET() {
  try {
    const query = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      category,
      sku,
      availability,
      description,
      productImage{
        asset->{
          _id,
          url
        },
        alt
      },
      panelSpecifications,
      batterySpecifications,
      inverterSpecifications
    }`;

    const products = await client.fetch(query);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}
