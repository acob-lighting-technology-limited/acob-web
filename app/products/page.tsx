import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProductCatalog } from '@/components/products/product-catalog';

export default function ProductsPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Products' }];

  return (
    <>
      <PageHero
        title="Product Catalog"
        description="Comprehensive range of high-quality solar equipment and components"
        backgroundImage="/images/services/solar-installation.webp"
      />

      <Container className="px-4 py-12">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Premium Solar Energy Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            We supply high-quality solar equipment from leading manufacturers
            worldwide. All products are certified to international standards and
            backed by comprehensive warranties.
          </p>
        </div>

        <ProductCatalog />
      </Container>
    </>
  );
}
