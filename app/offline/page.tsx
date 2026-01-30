'use client';

import { useEffect, useState } from 'react';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants/app.constants';

export default function OfflinePage() {
  const [attemptedRoute, setAttemptedRoute] = useState('');

  useEffect(() => {
    // Get the route they were trying to access
    const referrer = document.referrer;
    if (referrer) {
      try {
        const url = new URL(referrer);
        setAttemptedRoute(url.pathname);
      } catch (_e) {
        // Ignore invalid URLs
      }
    }
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
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
                It looks like you&apos;ve lost your internet connection. Please
                check your network and try again.
              </p>
              {attemptedRoute && attemptedRoute !== '/offline' && (
                <p className="text-sm text-muted-foreground mt-3">
                  You were trying to access:{' '}
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    {attemptedRoute}
                  </code>
                </p>
              )}
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
                onClick={handleRefresh}
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
              If the problem persists, please check your internet connection and
              refresh the page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
