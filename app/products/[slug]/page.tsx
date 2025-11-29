import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { Container } from '@/components/ui/container';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { ProductDetailClient } from './product-detail-client';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
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
    productImages[]{
      _type,
      asset->{
        _id,
        url
      },
      alt,
      title
    },
    panelSpecifications,
    batterySpecifications,
    inverterSpecifications
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
                  <dt className="text-muted-foreground font-medium">SKU</dt>
                  <dd className="font-semibold">{product.sku}</dd>
                </div>
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
                {/* Specifications */}
                {product.category === 'solar-panel' &&
                  product.panelSpecifications && (
                    <>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Power Rating
                        </dt>
                        <dd className="font-semibold">
                          {product.panelSpecifications.powerRatingWatts}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Efficiency
                        </dt>
                        <dd className="font-semibold">
                          {product.panelSpecifications.efficiencyPercent}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Voltage (Vmp / Voc)
                        </dt>
                        <dd className="font-semibold">
                          {product.panelSpecifications.voltageVmpVoc}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Dimensions
                        </dt>
                        <dd className="font-semibold">
                          {product.panelSpecifications.dimensionsMm}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Warranty
                        </dt>
                        <dd className="font-semibold">
                          {product.panelSpecifications.warranty}
                        </dd>
                      </div>
                    </>
                  )}
                {product.category === 'battery' &&
                  product.batterySpecifications && (
                    <>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Capacity
                        </dt>
                        <dd className="font-semibold">
                          {product.batterySpecifications.capacityAhOrKwh}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Battery Type
                        </dt>
                        <dd className="font-semibold">
                          {product.batterySpecifications.batteryType}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Cycle Life
                        </dt>
                        <dd className="font-semibold">
                          {product.batterySpecifications.cycleLife}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Voltage
                        </dt>
                        <dd className="font-semibold">
                          {product.batterySpecifications.voltage}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Warranty
                        </dt>
                        <dd className="font-semibold">
                          {product.batterySpecifications.warranty}
                        </dd>
                      </div>
                    </>
                  )}
                {product.category === 'inverter' &&
                  product.inverterSpecifications && (
                    <>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Power Rating
                        </dt>
                        <dd className="font-semibold">
                          {product.inverterSpecifications.powerRatingKvaKw}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Input Voltage
                        </dt>
                        <dd className="font-semibold">
                          {product.inverterSpecifications.inputVoltage}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Output Voltage
                        </dt>
                        <dd className="font-semibold">
                          {product.inverterSpecifications.outputVoltage}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Efficiency
                        </dt>
                        <dd className="font-semibold">
                          {product.inverterSpecifications.efficiencyPercent}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <dt className="text-muted-foreground font-medium">
                          Warranty
                        </dt>
                        <dd className="font-semibold">
                          {product.inverterSpecifications.warranty}
                        </dd>
                      </div>
                    </>
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
