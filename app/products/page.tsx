import { ComingSoon } from '@/components/ui/coming-soon';

export default async function ProductsPage() {
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Products' }];

  return (
    <ComingSoon
      title="Product Catalog"
      description="We're updating our product catalog. This page will be available soon!"
      breadcrumbItems={breadcrumbItems}
      backgroundImage="/images/products/deye.jpeg"
    />
  );
}
