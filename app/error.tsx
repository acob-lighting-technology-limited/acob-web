'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants/app.constants';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Next.js Error Page:', error);
  }, [error]);

  const isNetworkError =
    error.message.includes('fetch failed') ||
    error.message.includes('NetworkError') ||
    error.message.includes('Failed to fetch') ||
    error.message.includes('ERR_NETWORK') ||
    error.message.includes('TypeError: fetch failed');

  // For network errors, render full-page offline content that bypasses layout
  if (isNetworkError) {
    return (
      <div className="fixed inset-0 z-[9999] bg-background">
        <div className="h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-3xl mx-auto w-full">
            <div className="text-center space-y-8">
              {/* Icon and Title */}
              <div className="space-y-4">
                <WifiOff className="h-20 w-20 mx-auto text-muted-foreground" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-3">
                    You&apos;re Offline
                  </h1>
                  <p className="text-base text-muted-foreground">
                    It looks like you&apos;ve lost your internet connection.
                    Please check your network and try again.
                  </p>
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-muted/40 rounded-lg p-6 text-left">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  About ACOB Lighting Technology Limited
                </h2>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">
                      Leading supplier of solar materials and renewable energy
                      solutions in Nigeria.
                    </strong>
                  </p>
                  <p>
                    We specialize in providing sustainable energy solutions that
                    power communities and drive economic growth across Nigeria.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                    <div>
                      <h3 className="font-medium text-foreground mb-3">
                        Our Services
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>• Mini-Grid Solutions</li>
                        <li>• Captive Power Solutions</li>
                        <li>• Professional Energy Audit</li>
                        <li>• Solar Installation</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-3">
                        Contact Information
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li>📞 {CONTACT_INFO.phone.primary}</li>
                        <li>📧 {CONTACT_INFO.email.support}</li>
                        <li>📧 {CONTACT_INFO.email.secondary}</li>
                        <li>📍 Gwarinpa, FCT, Nigeria</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="default"
                    className="flex-1"
                    size="lg"
                  >
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Try Again
                  </Button>

                  <Link href="/" className="flex-1">
                    <Button variant="outline" className="w-full" size="lg">
                      <Home className="h-5 w-5 mr-2" />
                      Back to Home
                    </Button>
                  </Link>
                </div>

                <p className="text-sm text-muted-foreground">
                  If the problem persists, please check your internet connection
                  and refresh the page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For non-network errors, show a generic error page
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Something went wrong!
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            An unexpected error occurred. Please try again.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={reset}
            variant="default"
            className="w-full"
            size="lg"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>

          <p className="text-sm text-muted-foreground">
            If the problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
