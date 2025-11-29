'use client';

import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function CompanyProfilePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Company Profile' },
  ];

  const heroImages = [
    { src: '/images/company-team.webp', alt: 'ACOB Team' },
    { src: '/images/acob-team.webp', alt: 'Our Team' },
    { src: '/images/olooji-community.webp', alt: 'Community Projects' },
  ];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/documents/acob-company-profile.pdf';
    link.download = 'ACOB-Lighting-Technology-Limited-Company-Profile.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open('/documents/acob-company-profile.pdf', '_blank');
  };

  return (
    <>
      <Hero
        image={heroImages}
        title="Company Profile"
        description="Discover ACOB Lighting Technology - Powering Nigeria's Future with Clean Energy"
      />

      <Container className="py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <div className="flex h-[calc(100vh-300px)] min-h-[600px] w-full flex-col rounded-3xl border border-border bg-surface shadow-lg overflow-hidden">
          {/* Header Bar */}
          <div className="border-b border-border bg-surface/95 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-lg font-bold text-foreground md:text-xl">
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

          {/* PDF Viewer using object tag - better browser compatibility */}
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
                    Your browser doesn't support embedded PDFs
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
