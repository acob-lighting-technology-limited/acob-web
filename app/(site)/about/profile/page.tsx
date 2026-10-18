'use client';

import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SectionEyebrow } from '@/components/animations/SectionEyebrow';

export default function CompanyProfilePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Company Profile' },
  ];

  const heroImages = [
    { src: '/images/about/company-profile.webp', alt: 'ACOB Company Profile' },
  ];

  const handleDownload = async () => {
    try {
      const response = await fetch('/documents/acob-company-profile.pdf');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'ACOB-Lighting-Technology-Limited-Company-Profile.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      window.open('/documents/acob-company-profile.pdf', '_blank');
    }
  };

  const handleOpenNewTab = () => {
    window.open('/documents/acob-company-profile.pdf', '_blank');
  };

  return (
    <>
      <Hero
        image={heroImages}
        title="Company Profile"
        description="The Full Picture."
        titleSize="display"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8 md:mb-12" />

        {/* Standfirst */}
        <div className="max-w-[68ch]">
          <SectionEyebrow>Company profile</SectionEyebrow>
          <p className="mt-4 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            Discover ACOB Lighting Technology — powering Nigeria&apos;s future
            with clean energy.
          </p>
        </div>

        <div className="mt-10 flex h-[calc(100vh-300px)] min-h-[600px] w-full flex-col border border-border bg-surface md:mt-14 rounded-3xl">
          {/* Header bar */}
          <div className="border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground">
                ACOB Company Profile Document
              </h2>
              <div className="flex gap-2">
                <Button
                  onClick={handleOpenNewTab}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="hidden sm:inline">Open in New Tab</span>
                </Button>
                <Button onClick={handleDownload} size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </Button>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1">
            <object
              data="/documents/acob-company-profile.pdf"
              type="application/pdf"
              className="h-full w-full"
              aria-label="ACOB Company Profile PDF"
            >
              <div className="flex h-full items-center justify-center bg-muted/20 p-8">
                <div className="max-w-md text-center">
                  <p className="mb-6 text-lg text-foreground">
                    Your browser doesn&apos;t support embedded PDFs
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button
                      onClick={handleOpenNewTab}
                      size="lg"
                      className="gap-2"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Open PDF
                    </Button>
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      size="lg"
                      className="gap-2"
                    >
                      <Download className="h-5 w-5" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </object>
          </div>
        </div>
      </Container>
    </>
  );
}
