import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { JobApplicationForm } from '@/components/job-application-form';
import { getJobPosting } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ApplyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobPosting(slug);

  if (!job) {
    return {
      title: 'Job Not Found - ACOB Lighting Technology Limited',
      description: 'The requested job posting could not be found.',
    };
  }

  return {
    title: `Apply for ${job.title} - ACOB Lighting Technology Limited`,
    description: `Submit your application for the ${job.title} position at ACOB Lighting Technology Limited. Join our team and be part of Nigeria's energy access revolution.`,
    robots: {
      index: false,
      follow: true,
    },
  };
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
