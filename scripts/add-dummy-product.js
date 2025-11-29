import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2025-07-16',
  token: process.env.SANITY_API_TOKEN,
});

async function uploadImage() {
  try {
    console.log('📤 Uploading product image to Sanity...');

    // Use one of the existing images from the project
    const imagePath = path.join(
      __dirname,
      '../public/images/services/mini-grid-solutions.webp',
    );

    if (!fs.existsSync(imagePath)) {
      console.warn('⚠️  Image not found, creating product without image...');
      return null;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'solar-panel-550w.webp',
    });

    console.log('✅ Image uploaded successfully!');
    return asset._id;
  } catch (error) {
    console.error('❌ Error uploading image:', error.message);
    return null;
  }
}

async function addDummyProduct() {
  try {
    console.log('🚀 Starting dummy product creation...\n');

    // Upload image first
    const imageAssetId = await uploadImage();

    console.log('\n📦 Creating product document...');

    const product = {
      _type: 'product',
      title: 'Premium Monocrystalline Solar Panel 550W',
      slug: {
        _type: 'slug',
        current: 'premium-monocrystalline-solar-panel-550w',
      },
      sku: 'ACOB-SP-550-MONO-001',
      availability: 'in-stock',
      description:
        'High-efficiency monocrystalline solar panel with exceptional performance in low-light conditions. Perfect for residential and commercial installations. This premium panel features advanced PERC technology and comes with a 25-year performance warranty.',
      info1:
        'Power Output: 550W | Efficiency: 21.5% | Ideal for high-performance solar installations requiring maximum energy generation in limited space.',
      info2:
        'Advanced Features: Anti-reflective coating, PID resistant technology, lower temperature coefficient for better performance in hot climates.',
      info3:
        'Durability: Anodized aluminum alloy frame, resistant to harsh weather conditions, tested for wind loads up to 2400 Pa and snow loads up to 5400 Pa.',
      info4:
        'Warranty: 25 years linear performance warranty (80% after 25 years), 12 years product warranty. TUV, IEC, and CE certified.',
      isFeatured: true,
    };

    // Add image reference if upload was successful
    if (imageAssetId) {
      product.productImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId,
        },
        alt: 'Premium Monocrystalline Solar Panel 550W',
      };
    }

    const result = await client.create(product);
    console.log('\n✅ Dummy product created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Product ID:', result._id);
    console.log('Product Title:', result.title);
    console.log('SKU:', result.sku);
    console.log('Availability:', result.availability);
    console.log('Featured:', result.isFeatured ? 'Yes ⭐' : 'No');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🎉 Success! The announcement banner should now be visible!');
    console.log('🌐 Visit http://localhost:3001 to see it in action.');
    console.log(
      '📦 Visit http://localhost:3001/products to see the product page.',
    );
  } catch (error) {
    console.error('\n❌ Error adding dummy product:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    process.exit(1);
  }
}

addDummyProduct();
