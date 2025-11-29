import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { ProductCatalog } from '@/components/products/product-catalog';
import { getProducts } from '@/sanity/lib/client';

export default async function ProductsPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Products' }];

  // Fetch products for carousel images
  const products = await getProducts();

  // Map product images for carousel - filter out products without images
  const productImages = products
    .filter((product: any) => product.productImage?.asset?.url)
    .map((product: any) => ({
      src: product.productImage.asset.url,
      alt: product.productImage.alt || product.title,
      href: `/products/${product.slug?.current}`,
    }));

  return (
    <>
      <Hero
        image={productImages}
        title="Product Catalog"
        description="Comprehensive range of high-quality solar equipment and components"
      />

      <Container className="px-4 py-8">
        <ProductCatalog breadcrumbItems={breadcrumbItems} />
      </Container>
    </>
  );
}
