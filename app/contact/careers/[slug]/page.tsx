import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Briefcase, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJobPosting, getJobPostings } from '@/sanity/lib/client';
import { Metadata } from 'next';

interface JobPostingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Temporarily disabled static generation until job postings exist
// export async function generateStaticParams() {
//   try {
//     const jobs = await getJobPostings();
//     return jobs.map((job: any) => ({
//       slug: job.slug.current,
//     }));
//   } catch (error) {
//     console.error('Error generating static params for job postings:', error);
//     return [];
//   }
// }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobPosting(slug);

  if (!job) {
    return {
      title: 'Job Not Found - ACOB Lighting Technology Limited',
      description: 'The requested job posting could not be found.',
    };
  }

  return {
    title: `${job.title} - ACOB Lighting Technology Limited`,
    description: job.description || `Join ACOB Lighting Technology Limited as ${job.title}. We are looking for talented individuals to be part of Nigeria's energy access revolution in solar energy and mini-grid solutions.`,
    keywords: `${job.title}, ACOB Lighting careers, solar energy jobs, renewable energy careers, Nigeria solar jobs, energy access jobs`,
    openGraph: {
      title: `${job.title} - ACOB Lighting Technology Limited`,
      description: job.description || `Join ACOB Lighting as ${job.title} and be part of Nigeria's energy access revolution.`,
      type: 'website',
      url: `https://acoblighting.com/contact/careers/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} - ACOB Lighting Technology Limited`,
      description: job.description || `Join ACOB Lighting as ${job.title} and be part of Nigeria's energy access revolution.`,
    },
  };
}

export default async function JobPostingPage({ params }: JobPostingPageProps) {
  const { slug } = await params;
  console.log('Job posting page accessed with slug:', slug);
  
  const job = await getJobPosting(slug);
  console.log('Job found:', job ? 'Yes' : 'No');

  if (!job) {
    console.log('Job not found, showing 404');
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/contact/careers' },
    { label: job.title },
  ];

  return (
    <>
      <PageHero
        title={job.title}
        backgroundImage="/images/contact/careers.webp?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 ">
            {/* Job Details */}
            <Card className="border shadow-md border-border bg-surface">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-4 text-foreground">
                    {job.title}
                  </h1>
                  
                  {/* Job Meta Information */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                    {job.department && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.department}</span>
                      </div>
                    )}
                    {job.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    )}
                    {job.employmentType && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{job.employmentType}</span>
                      </div>
                    )}
                  </div>

                  {/* Job Description */}
                  <div className="prose prose-gray max-w-none">
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      Job Description
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {job.description}
                    </p>
                  </div>

                  {/* Requirements */}
                  {job.requirements && job.requirements.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-foreground mb-3">
                        Requirements
                      </h2>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {job.requirements.map((requirement: string, index: number) => (
                          <li key={index} className="leading-relaxed">
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Application Deadline */}
                  {job.applicationDeadline && (
                    <div className="p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          <strong>Application Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  <Link href="/contact/careers">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Careers
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="w-full sm:w-auto">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Quick Contact */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Apply for this Position</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Interested in this role? Get in touch with us to apply.
                </p>
                <div className="space-y-3">
                  <a href="mailto:careers@acoblighting.com" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">careers@acoblighting.com</span>
                  </a>
                  <a href="tel:+2347049202634" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-medium">+234 704 920 2634</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Job Summary */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Job Summary</h3>
                <div className="space-y-3 text-sm">
                  {job.department && (
                    <div>
                      <span className="text-muted-foreground">Department:</span>
                      <p className="font-medium">{job.department}</p>
                    </div>
                  )}
                  {job.location && (
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <p className="font-medium">{job.location}</p>
                    </div>
                  )}
                  {job.employmentType && (
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <p className="font-medium">{job.employmentType}</p>
                    </div>
                  )}
                  {job.publishedAt && (
                    <div>
                      <span className="text-muted-foreground">Posted:</span>
                      <p className="font-medium">{new Date(job.publishedAt).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
