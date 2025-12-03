import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ProductDetailClient } from './product-detail-client';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
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

  const product = await client.fetch(query, { slug });
  return product;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.title },
  ];

  const availabilityLabels: Record<
    string,
    { label: string; variant: 'default' | 'secondary' | 'destructive' }
  > = {
    'in-stock': { label: 'In Stock', variant: 'default' },
    'out-of-stock': { label: 'Out of Stock', variant: 'destructive' },
    'pre-order': { label: 'Pre-Order', variant: 'secondary' },
    'coming-soon': { label: 'Coming Soon', variant: 'secondary' },
  };

  const availability = availabilityLabels[product.availability] || {
    label: product.availability,
    variant: 'secondary' as const,
  };

  // Format category for display
  const getCategoryLabel = (category: string) => {
    const categoryLabels: Record<string, string> = {
      'solar-panel': 'Solar Panel',
      battery: 'Battery',
      inverter: 'Inverter',
    };
    return categoryLabels[category] || category;
  };

  // Combine main image with gallery images
  const allImages = [
    product.productImage,
    ...(product.productImages || []),
  ].filter(Boolean);

  // Get datasheet URL if available
  const datasheetUrl = product.datasheet?.asset?.url;
  const datasheetFilename =
    product.datasheet?.asset?.originalFilename || 'datasheet.pdf';

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 py-4 border-b">
        <Container noPadding className="px-4 ">
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      </div>

      <Container className="px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <ProductDetailClient
              images={allImages}
              productTitle={product.title}
              availability={product.availability}
            />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Description */}
            <div>
              <div className="mb-3">
                <Badge variant="outline" className="text-sm font-medium">
                  {getCategoryLabel(product.category)}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                {product.title}
              </h1>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold mb-4">Product Details</h2>
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-muted-foreground font-medium">
                    Availability
                  </dt>
                  <dd>
                    <Badge variant={availability.variant}>
                      {availability.label}
                    </Badge>
                  </dd>
                </div>
                {product.technical?.name && (
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-muted-foreground font-medium">Name</dt>
                    <dd className="font-semibold">{product.technical.name}</dd>
                  </div>
                )}
                {product.technical?.model && (
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-muted-foreground font-medium">Model</dt>
                    <dd className="font-semibold">{product.technical.model}</dd>
                  </div>
                )}
                {/* Technical Specifications */}
                {product.category === 'solar-panel' && product.technical && (
                  <>
                    {product.technical.capacity && (
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Capacity (Watts)
                        </dt>
                        <dd className="font-semibold">
                          {product.technical.capacity}
                        </dd>
                      </div>
                    )}
                    {product.technical.type && (
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Type
                        </dt>
                        <dd className="font-semibold">
                          {product.technical.type === 'monofacial'
                            ? 'Monofacial'
                            : 'Bifacial'}
                        </dd>
                      </div>
                    )}
                  </>
                )}
                {product.category === 'battery' && product.technical && (
                  <>
                    {product.technical.capacityAhOrKwh && (
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Capacity
                        </dt>
                        <dd className="font-semibold">
                          {product.technical.capacityAhOrKwh}
                        </dd>
                      </div>
                    )}
                    {product.technical.batteryType && (
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Battery Type
                        </dt>
                        <dd className="font-semibold">
                          {product.technical.batteryType}
                        </dd>
                      </div>
                    )}
                    {product.technical.cycleLife && (
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Cycle Life
                        </dt>
                        <dd className="font-semibold">
                          {product.technical.cycleLife}
                        </dd>
                      </div>
                    )}
                    {product.technical.voltage && (
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Voltage
                        </dt>
                        <dd className="font-semibold">
                          {product.technical.voltage}
                        </dd>
                      </div>
                    )}
                  </>
                )}
                {product.category === 'inverter' && product.technical && (
                  <>
                    {product.technical.capacityKvaKw && (
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Capacity
                        </dt>
                        <dd className="font-semibold">
                          {product.technical.capacityKvaKw}
                        </dd>
                      </div>
                    )}
                    {product.technical.phaseVoltage && (
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Phase Voltage
                        </dt>
                        <dd className="font-semibold">
                          {product.technical.phaseVoltage}
                        </dd>
                      </div>
                    )}
                    {product.technical.inverterType && (
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Inverter Type
                        </dt>
                        <dd className="font-semibold">
                          {product.technical.inverterType === 'hybrid'
                            ? 'Hybrid'
                            : 'Non-Hybrid'}
                        </dd>
                      </div>
                    )}
                    {product.technical.efficiency && (
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Efficiency
                        </dt>
                        <dd className="font-semibold">
                          {product.technical.efficiency}
                        </dd>
                      </div>
                    )}
                    {product.technical.ipRatings && (
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          IP Ratings
                        </dt>
                        <dd className="font-semibold">
                          {product.technical.ipRatings}
                        </dd>
                      </div>
                    )}
                  </>
                )}
                {/* Datasheet Download */}
                {datasheetUrl && (
                  <div className="mt-4 pt-4 border-t">
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href={datasheetUrl}
                        download={datasheetFilename}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Datasheet
                      </a>
                    </Button>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export async function generateStaticParams() {
  const query = '*[_type == "product"]{ "slug": slug.current }';
  const products = await client.fetch(query);

  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}
