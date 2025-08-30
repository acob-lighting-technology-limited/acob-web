export default async function TestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return (
    <div className="p-8">
      <h1>Test Page</h1>
      <p>Slug: {slug}</p>
      <p>This page is working!</p>
    </div>
  );
}
