'use client';

import React, { Component, ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  isOffline: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, isOffline: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if it's a network error or fetch error
    const isNetworkError =
      error.message.includes('fetch failed') ||
      error.message.includes('NetworkError') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('ERR_NETWORK') ||
      error.message.includes('TypeError: fetch failed') ||
      !navigator.onLine;

    return {
      hasError: true,
      isOffline: isNetworkError,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Global Error Boundary caught an error:', error, errorInfo);

    // Check if it's a network-related error
    const isNetworkError =
      error.message.includes('fetch failed') ||
      error.message.includes('NetworkError') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('ERR_NETWORK') ||
      error.message.includes('TypeError: fetch failed');

    if (isNetworkError) {
      this.setState({ hasError: true, isOffline: true, error });
    }
  }

  componentDidMount() {
    // Add global error handlers for unhandled promise rejections
    window.addEventListener(
      'unhandledrejection',
      this.handleUnhandledRejection,
    );

    // Add global error handler for fetch errors
    window.addEventListener('error', this.handleGlobalError);
  }

  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.handleUnhandledRejection,
    );
    window.removeEventListener('error', this.handleGlobalError);
  }

  handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const error = event.reason;
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('fetch failed') ||
        errorMessage.includes('NetworkError')
      ) {
        event.preventDefault();
        this.setState({
          hasError: true,
          isOffline: true,
          error: error as Error,
        });
      }
    }
  };

  handleGlobalError = (event: ErrorEvent) => {
    if (
      event.error &&
      event.error.message &&
      (event.error.message.includes('fetch failed') ||
        event.error.message.includes('NetworkError'))
    ) {
      event.preventDefault();
      this.setState({ hasError: true, isOffline: true, error: event.error });
    }
  };

  handleRetry = () => {
    this.setState({ hasError: false, isOffline: false, error: undefined });
    // Force a page reload to retry
    window.location.reload();
  };

  render() {
    if (this.state.hasError && this.state.isOffline) {
      return <OfflinePage onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

interface OfflinePageProps {
  onRetry: () => void;
}

function OfflinePage({ onRetry }: OfflinePageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Container className="text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <WifiOff className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              You&apos;re Offline
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              It looks like you&apos;ve lost your internet connection. Please
              check your network and try again.
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
                We specialize in providing sustainable energy solutions that
                power communities and drive economic growth across Nigeria.
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
                      📍 Plot 2. Block 14 Extension, Federal Ministry of Works
                      And Housing Sites and Service Scheme, Setraco Gate
                      Gwarinpa.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={onRetry}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </Button>

            <p className="text-sm text-muted-foreground">
              If the problem persists, please check your internet connection and
              refresh the page.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
