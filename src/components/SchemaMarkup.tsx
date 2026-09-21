// src/components/SchemaMarkup.tsx — the ONLY JSON-LD emitter. Render exactly once per page.
// Base nodes (business + states + website + compact Service nodes) are always included so every page carries the entity.
import {
  business,
  stateNodes,
  serviceNodes,
  website,
  webPage,
  breadcrumb,
  graph,
  jsonLd,
  type GraphOptions,
  type NodeInput,
  type PageMeta,
} from '@/lib/schema';
import { lastmod } from '@/lib/lastmod';

type Props = GraphOptions & { nodes?: NodeInput[] };

export default function SchemaMarkup({ nodes = [], showReviews, pageText, allowSearchAction }: Props) {
  const g = graph([business(), ...stateNodes(), website(), ...serviceNodes(), ...nodes], { pageText, showReviews, allowSearchAction });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(g) }} />;
}

export type Crumb = { name: string; url: string };

type PageProps = Omit<PageMeta, 'breadcrumb' | 'dateModified'> & {
  /** Breadcrumb trail EXCLUDING Home and the page itself (both are added). Omit on the home page. */
  crumbs?: Crumb[];
  /** Short breadcrumb label for this page (defaults to `name`). */
  crumbName?: string;
  /** lastmod.json route key (e.g. "/services/[slug]"); defaults to the page url path. */
  routeKey?: string;
  /** Extra data-file keys for dateModified (e.g. "src/data/utah-rest-areas.ts"). */
  dataKeys?: string[];
  nodes?: NodeInput[];
  showReviews?: boolean;
};

/** WebPage (+ BreadcrumbList on inner pages) + any route-specific nodes, in one graph. */
export function PageSchema({ crumbs, crumbName, routeKey, dataKeys = [], nodes = [], showReviews, ...meta }: PageProps) {
  const path = meta.url.replace(/^https?:\/\/[^/]+/, '') || '/';
  const isHome = path === '/';
  const dateModified = lastmod(routeKey ?? path, ...dataKeys).toISOString().slice(0, 10);
  const trail = isHome ? null : breadcrumb([{ name: 'Home', url: '/' }, ...(crumbs ?? []), { name: crumbName ?? meta.name, url: path }]);
  return (
    <SchemaMarkup
      showReviews={showReviews}
      nodes={[webPage({ ...meta, dateModified, breadcrumb: !isHome }), trail, ...nodes]}
    />
  );
}
