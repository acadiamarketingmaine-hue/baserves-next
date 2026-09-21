/**
 * House schema kit — one @graph per page, one business node site-wide.
 * Every value here comes from the site's own config/data or is printed on the page. Never invent.
 * Rendered by src/components/SchemaMarkup.tsx (the ONLY JSON-LD emitter).
 */
import SCHEMA_TYPES from './schema-types.json';
import IMAGE_DIMS from '@/data/image-dims.json';
import { SITE_URL } from './seo';

export type Node = Record<string, unknown>;
export type NodeInput = Node | null | undefined | false | NodeInput[];

// ───────────────────────── SITE-SPECIFIC ─────────────────────────
export const ORIGIN = SITE_URL;
export const ID = {
  business: `${ORIGIN}/#business`,
  website: `${ORIGIN}/#website`,
  logo: `${ORIGIN}/#logo`,
} as const;

/** Single source for NAP (matches the footer on every page). */
export const SITE = {
  name: 'BA Services, Inc.',
  shortName: 'BA Services',
  legalName: 'BA Services, Inc.',
  telephone: '+1-207-307-7903',
  email: 'email@BAServes.com',
  description:
    'Professional recreation area management company operating campgrounds, national forests, state parks, and DOT rest areas across Alabama, Indiana, Maine, Michigan, Missouri, Rhode Island, West Virginia, Iowa, and Utah.',
  address: { streetAddress: '1157 Hammond Street', addressLocality: 'Bangor', addressRegion: 'ME', postalCode: '04401', addressCountry: 'US' },
  geo: { latitude: 44.8237, longitude: -68.7924 },
  logo: '/images/logo.png',
  /** States served (footer/home copy). Wikipedia sameAs are public identifiers. */
  states: [
    ['Alabama', 'AL'], ['Indiana', 'IN'], ['Maine', 'ME'], ['Michigan', 'MI'], ['Missouri', 'MO'],
    ['Rhode Island', 'RI'], ['West Virginia', 'WV'], ['Iowa', 'IA'], ['Utah', 'UT'],
  ] as [string, string][],
  serviceTypes: [
    'Campground Management',
    'National Forest Recreation Area Management',
    'State Park Management',
    'Rest Area Management',
    'Facility Maintenance',
    'Landscaping & Groundskeeping',
  ],
};

/** Services (slug → route /services/{slug}); names/descriptions mirror the service pages. */
export const SERVICES: { slug: string; name: string; serviceType: string; description: string; image?: string }[] = [
  { slug: 'campground-park-maintenance', name: 'Campground & Park Maintenance', serviceType: 'Facility Maintenance', description: 'Professional maintenance services ensuring pristine facilities and grounds year-round.', image: '/images/DSC_0001-2048x1365.jpg' },
  { slug: 'landscaping-and-groundskeeping', name: 'Landscaping & Groundskeeping', serviceType: 'Landscaping & Groundskeeping', description: 'Expert landscaping services maintaining natural beauty and visitor safety.', image: '/images/DSC_0103-2048x1365.jpg' },
  { slug: 'rest-area-cleaning-and-upkeep', name: 'Rest Area Cleaning & Upkeep', serviceType: 'Rest Area Management', description: 'Thorough cleaning and upkeep ensuring visitor comfort and hygiene.' },
  { slug: 'preventive-maintenance-and-repairs', name: 'Preventive Maintenance & Repairs', serviceType: 'Facility Maintenance', description: 'Preventing issues before they impact your visitors.', image: '/images/Burlingame1-2048x1365.jpg' },
  { slug: 'iowa-dot', name: 'Iowa DOT Rest Area Management', serviceType: 'Rest Area Management', description: 'BA Services manages 2 rest areas along I-29 in Sergeant Bluff, Iowa for the Iowa DOT — 24/7 janitorial, grounds maintenance, and facility management.', image: '/images/iowa-dot-collage.png' },
  { slug: 'utah-dot', name: 'Utah DOT Rest Area Management', serviceType: 'Rest Area Management', description: 'BA Services manages 28 rest areas across Utah for UDOT — statewide coverage on I-15, I-80, I-70, and scenic byways with full facility management services.', image: '/images/utah-welcome-sign.jpg' },
];

export const abs = (p: string) => (/^https?:\/\//.test(p) ? p : `${ORIGIN}${p.startsWith('/') ? '' : '/'}${p}`);
export const ref = (id: string) => ({ '@id': id });
export const serviceId = (slug: string) => `${ORIGIN}/services/${slug}#service`;
export const stateId = (abbr: string) => `${ORIGIN}/#state-${abbr.toLowerCase()}`;

const DIMS = IMAGE_DIMS as unknown as Record<string, [number, number]>;

export function imageObject(
  img: { url: string; width?: number; height?: number; caption?: string; id?: string } | string | null | undefined,
): Node | undefined {
  if (!img) return undefined;
  const i = typeof img === 'string' ? { url: img } : img;
  if (!i.url) return undefined;
  const dims = DIMS[i.url];
  const width = i.width ?? dims?.[0];
  const height = i.height ?? dims?.[1];
  return {
    '@type': 'ImageObject',
    ...(i.id ? { '@id': i.id } : {}),
    contentUrl: abs(i.url),
    url: abs(i.url),
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(i.caption ? { caption: i.caption } : {}),
  };
}

export function state(name: string, abbr: string): Node {
  return {
    '@type': 'State',
    '@id': stateId(abbr),
    name,
    alternateName: abbr,
    sameAs: `https://en.wikipedia.org/wiki/${name.replace(/ /g, '_')}`,
    containedInPlace: { '@type': 'Country', name: 'United States' },
  };
}

export const stateNodes = () => SITE.states.map(([n, a]) => state(n, a));

/** The one business node. No rating: the site prints no review score. */
export function business(): Node {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': ID.business,
    name: SITE.name,
    legalName: SITE.legalName,
    url: ORIGIN,
    telephone: SITE.telephone,
    email: SITE.email,
    description: SITE.description,
    logo: imageObject({ url: SITE.logo, id: ID.logo, caption: 'BA Services logo' }),
    image: ref(ID.logo),
    address: { '@type': 'PostalAddress', ...SITE.address },
    geo: { '@type': 'GeoCoordinates', ...SITE.geo },
    areaServed: SITE.states.map(([, a]) => ref(stateId(a))),
    knowsAbout: SITE.serviceTypes,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Recreation Area & Facility Services',
      itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: ref(serviceId(s.slug)) })),
    },
  };
}

export function website(): Node {
  return { '@type': 'WebSite', '@id': ID.website, url: ORIGIN, name: SITE.shortName, publisher: ref(ID.business), inLanguage: 'en-US' };
}

/** Service node for /services/{slug}. `areaServed` defaults to every state; DOT pages narrow it. */
export function service(slug: string, over: Partial<{ areaServed: string[]; image: string; description: string; name: string; subServices: string[] }> = {}): Node | null {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return null;
  const url = `${ORIGIN}/services/${slug}`;
  const img = over.image ?? s.image;
  return {
    '@type': 'Service',
    '@id': serviceId(slug),
    name: over.name ?? s.name,
    serviceType: s.serviceType,
    description: over.description ?? s.description,
    url,
    provider: ref(ID.business),
    areaServed: (over.areaServed ?? SITE.states.map(([, a]) => a)).map((a) => ref(stateId(a))),
    ...(img ? { image: imageObject(img) } : {}),
    ...(over.subServices?.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${over.name ?? s.name} — what's included`,
            itemListElement: over.subServices.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, provider: ref(ID.business) } })),
          },
        }
      : {}),
  };
}
/** Compact Service nodes for every service, emitted on every page so the business's OfferCatalog @id refs resolve. */
export const serviceNodes = () => SERVICES.map((s) => service(s.slug) as Node);
// ─────────────────────────── GENERIC ───────────────────────────────

export type PageMeta = {
  url: string; // absolute or path
  name: string;
  description?: string;
  type?: 'WebPage' | 'ItemPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ProfilePage';
  image?: { url: string; width?: number; height?: number; caption?: string } | string;
  datePublished?: string;
  dateModified?: string;
  mainEntity?: string; // @id
  breadcrumb?: boolean; // true when a BreadcrumbList with `${url}#breadcrumb` is on the page
  spatialCoverage?: string; // Place @id
};

export function webPage(m: PageMeta): Node {
  const url = abs(m.url);
  return {
    '@type': m.type ?? 'WebPage',
    '@id': url,
    url,
    name: m.name,
    ...(m.description ? { description: m.description } : {}),
    isPartOf: ref(ID.website),
    about: ref(ID.business),
    ...(m.mainEntity ? { mainEntity: ref(m.mainEntity) } : {}),
    ...(m.spatialCoverage ? { spatialCoverage: ref(m.spatialCoverage) } : {}),
    ...(m.image ? { primaryImageOfPage: imageObject(m.image) } : {}),
    ...(m.breadcrumb ? { breadcrumb: ref(`${url}#breadcrumb`) } : {}),
    ...(m.datePublished ? { datePublished: m.datePublished } : {}),
    ...(m.dateModified ? { dateModified: m.dateModified } : {}),
    inLanguage: 'en-US',
  };
}

export function breadcrumb(items: { name: string; url: string }[]): Node {
  const last = abs(items[items.length - 1].url);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${last}#breadcrumb`,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.url) })),
  };
}

export function faq(pageUrl: string, items: { question: string; answer: string }[]): Node | null {
  if (!items?.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${abs(pageUrl)}#faq`,
    mainEntity: items.map((q) => ({ '@type': 'Question', name: q.question, acceptedAnswer: { '@type': 'Answer', text: q.answer } })),
  };
}

/** Review nodes — only for reviews the page renders (text visible). */
export function reviews(list: { author: string; date?: string; rating: number; body: string }[]): Node[] {
  return (list ?? []).filter((r) => r.body && r.author).map((r) => ({
    '@type': 'Review',
    itemReviewed: ref(ID.business),
    author: { '@type': 'Person', name: r.author },
    ...(r.date ? { datePublished: r.date } : {}),
    reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
    reviewBody: r.body,
  }));
}

export function videoObject(v: { url: string; name: string; description: string; thumbnailUrl: string; uploadDate: string; duration?: string; contentUrl?: string; embedUrl?: string }): Node {
  return {
    '@type': 'VideoObject',
    '@id': `${abs(v.url)}#video`,
    name: v.name,
    description: v.description,
    thumbnailUrl: abs(v.thumbnailUrl),
    uploadDate: v.uploadDate,
    ...(v.duration ? { duration: v.duration } : {}),
    ...(v.contentUrl ? { contentUrl: abs(v.contentUrl) } : {}),
    ...(v.embedUrl ? { embedUrl: v.embedUrl } : {}),
    publisher: ref(ID.business),
  };
}

export function jobPosting(j: {
  url: string; title: string; description: string; datePosted: string; validThrough?: string; employmentType?: string | string[];
  locations: { locality?: string; region?: string; postalCode?: string; street?: string; name?: string }[]; slug?: string;
}): Node {
  return {
    '@type': 'JobPosting',
    '@id': `${abs(j.url)}#job-${j.slug ?? j.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: j.title,
    description: j.description,
    datePosted: j.datePosted,
    ...(j.validThrough ? { validThrough: j.validThrough } : {}),
    ...(j.employmentType ? { employmentType: j.employmentType } : {}),
    hiringOrganization: ref(ID.business),
    jobLocation: j.locations.map((l) => ({
      '@type': 'Place',
      ...(l.name ? { name: l.name } : {}),
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        ...(l.locality ? { addressLocality: l.locality } : {}),
        ...(l.region ? { addressRegion: l.region } : {}),
        ...(l.postalCode ? { postalCode: l.postalCode } : {}),
        ...(l.street ? { streetAddress: l.street } : {}),
      },
    })),
    directApply: true,
  };
}

export function offer(o: { name: string; price: string | number; currency?: string; url?: string; description?: string; itemId?: string }): Node {
  return {
    '@type': 'Offer',
    name: o.name,
    price: String(o.price),
    priceCurrency: o.currency ?? 'USD',
    ...(o.url ? { url: abs(o.url) } : {}),
    ...(o.description ? { description: o.description } : {}),
    ...(o.itemId ? { itemOffered: ref(o.itemId) } : {}),
    availability: 'https://schema.org/InStock',
  };
}

// ───────────────────────────── graph() ────────────────────────────────────
const TYPES = new Set<string>(SCHEMA_TYPES as string[]);

export type GraphOptions = {
  /** Visible page text (or the key strings the page renders) — dev asserts phone/street/rating appear in it. */
  pageText?: string;
  /** Set true only on pages that render review cards / the rating. */
  showReviews?: boolean;
  /** Set true only if the site has a real /search route. */
  allowSearchAction?: boolean;
};

function flatten(input: NodeInput[], out: Node[] = []): Node[] {
  for (const n of input) {
    if (!n) continue;
    if (Array.isArray(n)) flatten(n, out);
    else out.push(n);
  }
  return out;
}

function walk(o: unknown, fn: (node: Record<string, unknown>) => void) {
  if (Array.isArray(o)) return o.forEach((x) => walk(x, fn));
  if (o && typeof o === 'object') {
    fn(o as Record<string, unknown>);
    for (const [k, v] of Object.entries(o as Record<string, unknown>)) if (k !== '@context') walk(v, fn);
  }
}

/** Merge nodes to one @graph (base nodes first), dedupe by @id, dev-assert correctness. */
export function graph(nodes: NodeInput[], opts: GraphOptions = {}): { '@context': string; '@graph': Node[] } {
  const all = flatten(nodes);
  const seen = new Map<string, Node>();
  const merged: Node[] = [];
  for (const n of all) {
    const id = n['@id'] as string | undefined;
    if (id && seen.has(id)) {
      const first = seen.get(id)!;
      for (const [k, v] of Object.entries(n)) if (first[k] === undefined && v !== undefined) first[k] = v;
      continue;
    }
    if (id) seen.set(id, n);
    merged.push(n);
  }
  if (process.env.NODE_ENV !== 'production') assertGraph(merged, opts);
  return { '@context': 'https://schema.org', '@graph': merged };
}

function assertGraph(merged: Node[], opts: GraphOptions) {
  const errors: string[] = [];
  const ids = new Set<string>();
  walk(merged, (n) => { if (typeof n['@id'] === 'string' && Object.keys(n).length > 1) ids.add(n['@id'] as string); });
  walk(merged, (n) => {
    const keys = Object.keys(n);
    if (keys.length === 1 && keys[0] === '@id' && !ids.has(n['@id'] as string)) errors.push(`unresolved @id ${n['@id']}`);
    const t = n['@type'];
    if (t) for (const x of ([] as unknown[]).concat(t)) if (!TYPES.has(String(x))) errors.push(`unknown @type ${x}`);
    if (t === 'SearchAction' && !opts.allowSearchAction) errors.push('SearchAction without a search route');
    if ((t === 'Review' || t === 'AggregateRating') && !opts.showReviews) errors.push(`${t} emitted on a page without showReviews`);
  });
  if (opts.pageText) {
    const text = opts.pageText.toLowerCase().replace(/\s+/g, ' ');
    const biz = merged.find((n) => n['@id'] === ID.business) as Node | undefined;
    const digits = (s: unknown) => String(s ?? '').replace(/\D/g, '').slice(-10);
    if (biz?.telephone && !text.replace(/\D/g, '').includes(digits(biz.telephone))) errors.push('telephone not in pageText');
    const street = (biz?.address as Node | undefined)?.streetAddress as string | undefined;
    if (street && !text.includes(street.toLowerCase().slice(0, 12))) errors.push('streetAddress not in pageText');
    const agg = biz?.aggregateRating as Node | undefined;
    if (agg && !(text.includes(String(agg.ratingValue)) && text.includes(String(agg.reviewCount ?? agg.ratingCount ?? '')))) errors.push('aggregateRating not in pageText');
  }
  if (errors.length) throw new Error(`[schema] ${errors.join('; ')}`);
}

export const jsonLd = (g: unknown) => JSON.stringify(g).replace(/</g, '\\u003c');
