'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Cookie, Shield, Settings } from 'lucide-react';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    localStorage.setItem('analytics-enabled', 'true');
    localStorage.setItem('marketing-enabled', 'true');
    setShowConsent(false);
    // Reload page to enable analytics
    window.location.reload();
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    localStorage.setItem('analytics-enabled', 'false');
    localStorage.setItem('marketing-enabled', 'false');
    setShowConsent(false);
  };

  const savePreferences = (analytics: boolean, marketing: boolean) => {
    localStorage.setItem('cookie-consent', 'custom');
    localStorage.setItem('analytics-enabled', analytics.toString());
    localStorage.setItem('marketing-enabled', marketing.toString());
    setShowSettings(false);
    setShowConsent(false);
    if (analytics) {
      window.location.reload();
    }
  };

  if (!showConsent) {
    return null;
  }

  return (
    <>
      {/* Main Consent Banner */}
      {!showSettings && (
        <div className="fixed bottom-4 right-2 z-50">
          <Card className="max-w-md !py-0 !rounded-lg">
            <CardContent className="p-4 border-t border-border shadow-lg bg-background rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-1">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    We use cookies to enhance your experience. By continuing,
                    you agree to our{' '}
                    <a
                      href="/privacy-policy"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      onClick={acceptAll}
                      className="bg-primary text-primary-foreground text-xs px-3 py-1 h-8"
                    >
                      Accept All
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowSettings(true)}
                      className="flex items-center gap-1 text-xs px-3 py-1 h-8"
                    >
                      <Settings className="h-3 w-3" />
                      Settings
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={acceptEssential}
                      className="text-muted-foreground text-xs px-3 py-1 h-8"
                    >
                      Essential Only
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={acceptEssential}
                  className="flex-shrink-0 h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="max-w-2xl w-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Cookie Preferences</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Essential Cookies */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Essential Cookies</h3>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">
                          Always Active
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      These cookies are necessary for the website to function
                      properly. They cannot be disabled.
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Analytics Cookies</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="analytics"
                          defaultChecked={true}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors interact with our website
                      by collecting and reporting information anonymously.
                    </p>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Marketing Cookies</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="marketing"
                          defaultChecked={true}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Used to track visitors across websites to display relevant
                      and engaging advertisements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => {
                      const analytics =
                        (
                          document.getElementById(
                            'analytics'
                          ) as HTMLInputElement
                        )?.checked || false;
                      const marketing =
                        (
                          document.getElementById(
                            'marketing'
                          ) as HTMLInputElement
                        )?.checked || false;
                      savePreferences(analytics, marketing);
                    }}
                    className="flex-1"
                  >
                    Save Preferences
                  </Button>
                  <Button
                    variant="outline"
                    onClick={acceptEssential}
                    className="flex-1"
                  >
                    Reject All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
