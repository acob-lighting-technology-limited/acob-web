'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/ui/error-state';

interface SiteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Catches page errors inside the site layout, so the header, footer and
// navigation stay usable instead of the whole screen being replaced by the
// root error page.
export default function SiteError({ error, reset }: SiteErrorProps) {
  useEffect(() => {
    console.error('Site page error:', error);
  }, [error]);

  return (
    <Container className="px-4 pt-28 pb-16">
      <h1 className="sr-only">Something went wrong</h1>
      <ErrorState
        title="This page couldn’t load"
        message="Try again in a moment. If it keeps happening, go back home or contact support."
        retry={reset}
      />
      <div className="flex justify-center">
        <Button asChild variant="ghost">
          <Link href="/">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
        </Button>
      </div>
    </Container>
  );
}
