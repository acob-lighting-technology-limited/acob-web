'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink, X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function CompanyProfilePage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Company Profile' },
  ];

  const heroImages = [
    { src: '/images/about/company-profile.webp', alt: 'ACOB Company Profile' },
  ];

  useEffect(() => {
    const container = pdfContainerRef.current;
    if (!container) {
      return;
    }

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isFullscreen) {
        return;
      }

      if (!isScrolling && e.deltaY > 10) {
        isScrolling = true;
        setIsFullscreen(true);
        setShowHint(false);

        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isFullscreen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isFullscreen]);

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

  const exitFullscreen = () => {
    setIsFullscreen(false);
  };

  const enterFullscreen = () => {
    setIsFullscreen(true);
    setShowHint(false);
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

        <div className="flex h-[calc(100vh-300px)] min-h-[600px] w-full flex-col rounded-3xl border border-border bg-surface shadow-lg overflow-hidden relative">
          <div className="border-b border-border bg-surface/95 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-lg font-bold text-foreground md:text-xl">
                ACOB Company Profile Document
              </h2>
              <div className="flex gap-2">
                <Button
                  onClick={enterFullscreen}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  title="Fullscreen View"
                >
                  <Maximize2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </Button>
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

          {showHint && !isFullscreen && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="bg-primary/90 text-primary-foreground px-6 py-3 rounded-full shadow-lg animate-pulse">
                <p className="text-sm font-medium flex items-center gap-2">
                  <Maximize2 className="h-4 w-4" />
                  Scroll on PDF to zoom fullscreen
                </p>
              </div>
            </div>
          )}

          <div ref={pdfContainerRef} className="flex-1 cursor-pointer">
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

      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          style={{
            animation: 'fadeIn 0.5s ease-out',
          }}
        >
          <button
            onClick={exitFullscreen}
            className="absolute top-4 right-4 z-50 bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
            aria-label="Exit fullscreen"
          >
            <X className="h-6 w-6" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1 rounded text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Exit Fullscreen (ESC)
            </span>
          </button>

          <div className="absolute top-4 left-4 z-50 flex gap-2">
            <Button
              onClick={handleDownload}
              size="sm"
              className="gap-2 shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button
              onClick={handleOpenNewTab}
              variant="outline"
              size="sm"
              className="gap-2 shadow-lg bg-background/90"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">New Tab</span>
            </Button>
          </div>

          <div className="h-full w-full p-4">
            <object
              data="/documents/acob-company-profile.pdf"
              type="application/pdf"
              className="h-full w-full rounded-lg shadow-2xl"
              style={{
                animation: 'zoomIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              aria-label="ACOB Company Profile PDF - Fullscreen"
            >
              <div className="flex h-full items-center justify-center bg-muted/20 rounded-lg p-8">
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
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
