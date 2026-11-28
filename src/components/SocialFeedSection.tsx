import type { SocialFeedPost } from '@/lib/social-feed';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

/** UTC calendar date, built from parts. `toLocaleDateString` disagrees
 *  between the Fly server and the browser (timezone day, and sometimes the
 *  space character), which throws React #425/#418 on the homepage. */
function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

function PlatformIcon({ platform }: { platform: 'facebook' | 'instagram' }) {
  if (platform === 'instagram') {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.5v3.2h2.7V21h3.3z" />
    </svg>
  );
}

export default function SocialFeedSection({ posts }: { posts: SocialFeedPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-lake-paper border-t border-lake-line" aria-labelledby="social-feed-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lake-spruce mb-2">
              Live From the Field
            </p>
            <h2
              id="social-feed-heading"
              className="font-lake-serif text-3xl sm:text-4xl text-lake-ink tracking-tight"
            >
              Updates From Our Parks &amp; Campgrounds
            </h2>
          </div>
          <a
            href="https://www.facebook.com/canalbridgecampground"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-lake-spruce hover:text-lake-spruce-dark transition-colors min-h-[44px]"
          >
            Follow Our Parks
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl border border-lake-line overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[4/3] w-full overflow-hidden bg-lake-tint"
              >
                <img
                  src={post.image}
                  alt={post.accountName}
                  width={post.width}
                  height={post.height}
                  loading="eager"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-lake-ink text-xs font-semibold shadow-sm">
                  <PlatformIcon platform={post.platform} />
                  {post.platform === 'instagram' ? 'Instagram' : 'Facebook'}
                </span>
              </a>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 text-xs text-lake-mute mb-2">
                  <span className="font-semibold text-lake-spruce truncate">{post.accountName}</span>
                  {post.timestamp && <time dateTime={post.timestamp} className="shrink-0">{formatPostDate(post.timestamp)}</time>}
                </div>

                <h3 className="sr-only">{post.accountName} update</h3>
                <p className="text-sm text-lake-ink/85 leading-relaxed line-clamp-3 mb-4 flex-1">
                  {post.caption}
                </p>

                <div className="pt-3 border-t border-lake-line/70 flex items-center justify-between gap-2">
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-lake-spruce hover:text-lake-spruce-dark transition-colors py-1"
                  >
                    View Post
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href={post.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-lake-mute hover:text-lake-ink transition-colors py-1"
                  >
                    Follow
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
