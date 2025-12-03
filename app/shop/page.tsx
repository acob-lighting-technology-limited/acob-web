import { ProductCatalog } from '@/components/products/product-catalog';

export default async function ShopPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Shop' }];

  return <ProductCatalog breadcrumbItems={breadcrumbItems} />;
}
