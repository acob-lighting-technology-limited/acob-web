import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { JobApplicationForm } from '@/components/job-application-form';
import { getJobPosting } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';

interface ApplyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { slug } = await params;
  const job = await getJobPosting(slug);

  if (!job) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/contact/careers' },
    { label: job.title, href: `/contact/careers/${slug}` },
    { label: 'Apply' },
  ];

  return (
    <>
      <PageHero
        title="Apply Now"
        description={job.title}
        backgroundImage="/images/contact/careers.webp?height=400&width=1200"
      />

      <div className="pt-8">
        <Container className="px-4">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
        </Container>
        <JobApplicationForm jobTitle={job.title} jobSlug={slug} />
      </div>
    </>
  );
}
