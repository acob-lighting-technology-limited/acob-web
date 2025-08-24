/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://acoblighting.com',
  generateRobotsTxt: false, // We already have a custom robots.txt
  generateIndexSitemap: false,
  exclude: [
    '/studio/*',
    '/api/*',
    '/test/*',
    '/test2/*',
    '/test3/*',
    '/test5/*',
    '/_next/*',
    '/404',
    '/500',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio/',
          '/api/',
          '/_next/',
          '/test/',
          '/test2/',
          '/test3/',
          '/test5/',
        ],
      },
    ],
    additionalSitemaps: ['https://acoblighting.com/sitemap.xml'],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority for different page types
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/services/')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/projects/')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.startsWith('/about/')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.startsWith('/contact/')) {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (path.startsWith('/updates/')) {
      priority = 0.6;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
