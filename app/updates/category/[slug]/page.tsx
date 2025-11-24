import { CategoryUpdatesPage } from '@/components/updates/category-updates-page';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const searchParamsData = searchParams ? await searchParams : {};

  return (
    <CategoryUpdatesPage
      category={slug}
      searchParams={Promise.resolve(searchParamsData)}
    />
  );
}
