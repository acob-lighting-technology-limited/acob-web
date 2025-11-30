import { ProductCatalog } from '@/components/products/product-catalog';
import { ProductPasswordGate } from '@/components/products/product-password-gate';

export default async function ProductsPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Products' }];

  return (
    <ProductPasswordGate>
      <ProductCatalog breadcrumbItems={breadcrumbItems} />
    </ProductPasswordGate>
  );
}
