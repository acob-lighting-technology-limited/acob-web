'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const isNetworkError =
    error.message.includes('fetch failed') ||
    error.message.includes('NetworkError') ||
    error.message.includes('Failed to fetch') ||
    error.message.includes('ERR_NETWORK') ||
    error.message.includes('TypeError: fetch failed');

  if (isNetworkError) {
    return (
      <html>
        <body>
          <div className="min-h-screen bg-background flex items-center justify-center">
            <Container className="text-center px-4">
              <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                  <WifiOff className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
                  <h1 className="text-3xl font-bold text-foreground mb-4">
                    You&apos;re Offline
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    It looks like you&apos;ve lost your internet connection.
                    Please check your network and try again.
                  </p>
                </div>

                {/* Company Information */}
                <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    About ACOB Lighting Technology Limited
                  </h2>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">
                        Leading supplier of solar materials and renewable energy
                        solutions in Nigeria.
                      </strong>
                    </p>
                    <p>
                      We specialize in providing sustainable energy solutions
                      that power communities and drive economic growth across
                      Nigeria.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h3 className="font-medium text-foreground mb-2">
                          Our Services
                        </h3>
                        <ul className="space-y-1 text-sm">
                          <li>• Mini-Grid Solutions</li>
                          <li>• Captive Power Solutions</li>
                          <li>• Professional Energy Audit</li>
                          <li>• Solar Installation</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-2">
                          Contact Information
                        </h3>
                        <ul className="space-y-1 text-sm">
                          <li>📞 +234 704 920 2634</li>
                          <li>📧 info@acoblighting.com</li>
                          <li>📧 infoacob@gmail.com</li>
                          <li>
                            📍 Plot 2. Block 14 Extension, Federal Ministry of
                            Works And Housing Sites and Service Scheme, Setraco
                            Gate Gwarinpa.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => window.location.reload()}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Try Again
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    If the problem persists, please check your internet
                    connection and refresh the page.
                  </p>
                </div>
              </div>
            </Container>
          </div>
        </body>
      </html>
    );
  }

  // For non-network errors, show a generic error page
  return (
    <html>
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Container className="text-center px-4">
            <div className="max-w-md mx-auto">
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
                  className="w-full bg-primary hover:bg-primary/90"
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
          </Container>
        </div>
      </body>
    </html>
  );
}
