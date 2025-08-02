'use client';

import React from 'react';

interface SilentErrorBoundaryState {
  hasError: boolean;
  isNetworkError: boolean;
}

interface SilentErrorBoundaryProps {
  children: React.ReactNode;
}

export class SilentErrorBoundary extends React.Component<
  SilentErrorBoundaryProps,
  SilentErrorBoundaryState
> {
  constructor(props: SilentErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      isNetworkError: false,
    };
  }

  static getDerivedStateFromError(error: Error): SilentErrorBoundaryState {
    // Check if it's a network-related error
    const isNetworkError =
      error.message.includes('fetch failed') ||
      error.message.includes('NetworkError') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('ERR_NETWORK') ||
      error.message.includes('TypeError: fetch failed') ||
      error.message.includes('react-server-dom-webpack') ||
      error.message.includes('layout-router') ||
      error.message.includes('resolveErrorDev') ||
      error.message.includes('processFullStringRow') ||
      error.message.includes('processFullBinaryRow') ||
      error.stack?.includes('webpack-internal') ||
      error.stack?.includes('next/dist/') ||
      error.stack?.includes('react-server-dom-webpack');

    // Check if it's a NextAuth error
    const isNextAuthError =
      error.message.includes('next-auth') ||
      error.message.includes('CLIENT_FETCH_ERROR');

    // If it's a network error or NextAuth error, suppress it
    if (isNetworkError || isNextAuthError) {
      console.log(
        '🔇 Silent Error Boundary: Suppressed network error:',
        error.message
      );
      return {
        hasError: false, // Don't show error UI
        isNetworkError: true,
      };
    }

    // For other errors, show them
    return {
      hasError: true,
      isNetworkError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Check if it's a network-related error
    const isNetworkError =
      error.message.includes('fetch failed') ||
      error.message.includes('NetworkError') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('ERR_NETWORK') ||
      error.message.includes('TypeError: fetch failed') ||
      error.message.includes('react-server-dom-webpack') ||
      error.message.includes('layout-router') ||
      error.message.includes('resolveErrorDev') ||
      error.stack?.includes('webpack-internal') ||
      error.stack?.includes('next/dist/') ||
      error.stack?.includes('react-server-dom-webpack');

    // Check if it's a NextAuth error
    const isNextAuthError =
      error.message.includes('next-auth') ||
      error.message.includes('CLIENT_FETCH_ERROR');

    // If it's a network error or NextAuth error, suppress it
    if (isNetworkError || isNextAuthError) {
      console.log(
        '🔇 Silent Error Boundary: Suppressed network error in componentDidCatch:',
        error.message
      );
      return;
    }

    // For other errors, log them
    console.error('Silent Error Boundary caught an error:', error, errorInfo);
  }

  componentDidMount() {
    // Add global error listeners to catch unhandled errors
    window.addEventListener('error', this.handleGlobalError);
    window.addEventListener(
      'unhandledrejection',
      this.handleUnhandledRejection
    );
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleGlobalError);
    window.removeEventListener(
      'unhandledrejection',
      this.handleUnhandledRejection
    );
  }

  handleGlobalError = (event: ErrorEvent) => {
    const error = event.error;

    // Check if it's a network-related error
    const isNetworkError =
      error?.message?.includes('fetch failed') ||
      error?.message?.includes('NetworkError') ||
      error?.message?.includes('Failed to fetch') ||
      error?.message?.includes('ERR_NETWORK') ||
      error?.message?.includes('TypeError: fetch failed') ||
      error?.message?.includes('react-server-dom-webpack') ||
      error?.message?.includes('layout-router') ||
      error?.message?.includes('resolveErrorDev') ||
      error?.stack?.includes('webpack-internal') ||
      error?.stack?.includes('next/dist/') ||
      error?.stack?.includes('react-server-dom-webpack');

    // Check if it's a NextAuth error
    const isNextAuthError =
      error?.message?.includes('next-auth') ||
      error?.message?.includes('CLIENT_FETCH_ERROR');

    // If it's a network error or NextAuth error, suppress it
    if (isNetworkError || isNextAuthError) {
      console.log(
        '🔇 Silent Error Boundary: Suppressed global network error:',
        error?.message
      );
      event.preventDefault();
      return;
    }
  };

  handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;

    // Check if it's a network-related error
    const isNetworkError =
      reason?.message?.includes('fetch failed') ||
      reason?.message?.includes('NetworkError') ||
      reason?.message?.includes('Failed to fetch') ||
      reason?.message?.includes('ERR_NETWORK') ||
      reason?.message?.includes('TypeError: fetch failed') ||
      reason?.message?.includes('react-server-dom-webpack') ||
      reason?.message?.includes('layout-router') ||
      reason?.message?.includes('resolveErrorDev') ||
      reason?.stack?.includes('webpack-internal') ||
      reason?.stack?.includes('next/dist/') ||
      reason?.stack?.includes('react-server-dom-webpack');

    // Check if it's a NextAuth error
    const isNextAuthError =
      reason?.message?.includes('next-auth') ||
      reason?.message?.includes('CLIENT_FETCH_ERROR');

    // If it's a network error or NextAuth error, suppress it
    if (isNetworkError || isNextAuthError) {
      console.log(
        '🔇 Silent Error Boundary: Suppressed unhandled network rejection:',
        reason?.message
      );
      event.preventDefault();
      return;
    }
  };

  render() {
    // If there's a non-network error, show it
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Something went wrong!
              </h1>
              <p className="text-muted-foreground">
                An unexpected error occurred. Please try again.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    // For network errors, render children normally (let your offline page handle it)
    return this.props.children;
  }
}
