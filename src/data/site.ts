const siteConfig = {
  url: 'https://fullstackhero.net',
  // Home/landing <title> + og:title. Kept in the 50–60 char SEO sweet spot.
  title: 'fullstackhero - Free .NET 10 Starter Kit with React UI',
  // Short brand used as the suffix on composed page titles ("Page — fullstackhero")
  // so deep pages don't blow past ~60 chars.
  name: 'fullstackhero',
  // Default meta/og description. Trimmed to the 110–160 char SEO range.
  description:
    'Free, MIT-licensed .NET 10 starter kit with a React admin + dashboard. Modular monolith, vertical slice, multitenant, with ten ready-to-ship modules.',
  repo: 'https://github.com/fullstackhero/dotnet-starter-kit',
  // This documentation site's own repo — used for the per-page "Edit on GitHub" link.
  docsRepo: 'https://github.com/fullstackhero/docs',
  author: 'Mukesh Murugan',
  // Default social card; per-page cards live at /og/docs/<slug>.jpg (1200×630).
  ogImage: '/logo-fullstackhero.png',
};

export default siteConfig;
