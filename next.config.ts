/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-explicit-any */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ['image/webp'],
    // Cache optimized images for 31 days so they are not regenerated/refetched.
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 828, 1200, 1920],
    qualities: [75, 80, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/images/**',
      },
    ],
    // Allow query strings for local images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
      'date-fns',
    ],
  },
  turbopack: {
    resolveAlias: {
      canvas: { browser: './lib/empty-module.js' },
      encoding: { browser: './lib/empty-module.js' },
      'node:fs': { browser: './lib/empty-module.js' },
      'node:net': { browser: './lib/empty-module.js' },
      'node:tls': { browser: './lib/empty-module.js' },
      'node:path': { browser: './lib/empty-module.js' },
      'node:stream': { browser: './lib/empty-module.js' },
      'node:crypto': { browser: './lib/empty-module.js' },
      'node:http': { browser: './lib/empty-module.js' },
      'node:https': { browser: './lib/empty-module.js' },
      fs: { browser: './lib/empty-module.js' },
      net: { browser: './lib/empty-module.js' },
      tls: { browser: './lib/empty-module.js' },
      http: { browser: './lib/empty-module.js' },
      https: { browser: './lib/empty-module.js' },
    },
  },
  // Improve build performance
  poweredByHeader: false,
  compress: true,
  // Memory optimization
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        http: false,
        https: false,
      };

      config.resolve.alias = {
        ...config.resolve.alias,
        'node:fs': false,
        'node:net': false,
        'node:tls': false,
        'node:path': false,
        'node:stream': false,
        'node:crypto': false,
        'node:http': false,
        'node:https': false,
      };

      config.externals = [
        ...(config.externals || []),
        (
          { request }: { request?: string },
          callback: (error?: null, result?: string) => void,
        ) => {
          if (request && /^node:/.test(request)) {
            return callback(null, '{}');
          }

          callback();
        },
      ];
    }

    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'bundle-report.html',
          openAnalyzer: true,
        }),
      );
    }

    return config;
  },

  // Security headers
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Next.js dev mode requires unsafe-eval; production does not.
              `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://va.vercel-scripts.com https://vitals.vercel-insights.com`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://cdn.sanity.io https://res.cloudinary.com https://www.acoblighting.com",
              "media-src 'self' data: blob: https://cdn.sanity.io https://res.cloudinary.com",
              "connect-src 'self' https://api.resend.com https://api.groq.com https://*.sanity.io https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // Redirects for moved pages
  redirects: async () => {
    return [
      {
        source: '/company-profile',
        destination: '/about/profile',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/contact/faq',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
