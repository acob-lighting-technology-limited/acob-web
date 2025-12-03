import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let filter = '*[_type == "product"';
    if (category) {
      filter += ` && category == "${category}"`;
    }
    filter += ']';

    const query = `${filter} | order(_createdAt desc) {
      _id,
      "title": general.title,
      slug,
      category,
      "availability": general.availability,
      "description": general.description,
      "productImage": media.productImage{
        asset->{
          _id,
          url
        },
        alt
      },
      "productImages": media.productImages[]{
        _type,
        asset->{
          _id,
          url
        },
        alt,
        title
      },
      "datasheet": media.datasheet{
        asset->{
          _id,
          url,
          originalFilename
        }
      },
      technical
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
