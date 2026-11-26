import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const namedCrawlers = [
  'Googlebot',
  'Google-Extended',
  'Bingbot',
  'DuckDuckBot',
  'DuckAssistBot',
  'Applebot',
  'Applebot-Extended',
  'OAI-SearchBot',
  'ChatGPT-User',
  'OAI-AdsBot',
  'GPTBot',
  'PerplexityBot',
  'Perplexity-User',
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  'Amazonbot',
  'Amzn-SearchBot',
  'Amzn-User',
  'Meta-WebIndexer',
  'meta-externalagent',
  'Meta-ExternalFetcher',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: namedCrawlers, allow: '/', disallow: '/api/' },
      { userAgent: '*', allow: '/', disallow: '/api/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
