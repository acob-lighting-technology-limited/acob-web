import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add compression headers
  response.headers.set('Accept-Encoding', 'gzip, deflate, br');

  // Add cache headers for static assets
  if (
    request.nextUrl.pathname.match(
      /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/
    )
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Add cache headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300');
  }

  // Add cache headers for HTML pages
  if (
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.match(
      /^\/(about|services|projects|contact|updates)/
    )
  ) {
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300');
  }

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (to avoid interfering with API calls)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)',
  ],
};
