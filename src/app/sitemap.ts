import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://baserves.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/experiences`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/refund_returns`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/sms-terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/leave-a-review`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/rewards`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Dedicated location pages ([slug])
  const locationSlugs = [
    'hoosier-national-forest',
    'tipsaw-lake-recreation-area',
    'hardin-ridge-recreation-area',
    'indian-celina-lakes-recreation-area',
    'yankee-springs-recreation-area',
    'monongahela-national-forest',
    'washington-state-park',
    'long-lake-outdoor-center',
    'chief-noonday-outdoor-center',
    'bankhead-national-forest',
  ];

  const locationPages: MetadataRoute.Sitemap = locationSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic service pages (services/[slug])
  const serviceSlugs = [
    'campground-park-maintenance',
    'landscaping-and-groundskeeping',
    'rest-area-cleaning-and-upkeep',
    'preventive-maintenance-and-repairs',
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dedicated experience pages (experiences/[slug])
  const experienceSlugs = [
    'canal-bridge',
    'corinth-recreation-area',
    'meramec-state-park',
    'celina-lakes-recreation-area',
    'clear-creek-recreation-area',
    'burlingame-state-park',
  ];

  const experiencePages: MetadataRoute.Sitemap = experienceSlugs.map((slug) => ({
    url: `${baseUrl}/experiences/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Dynamic category pages (experiences/categories/[category])
  const categorySlugs = [
    'kayak-and-watercraft-rentals',
    'campground-rentals',
    'hiking',
    'scenic-drives',
    'conference-center-rentals',
    'lookout-pavillions',
  ];

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${baseUrl}/experiences/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...locationPages,
    ...servicePages,
    ...experiencePages,
    ...categoryPages,
  ];
}
