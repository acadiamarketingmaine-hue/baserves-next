export interface SocialFeedPost {
  id: string;
  platform: 'facebook' | 'instagram';
  accountId: string;
  accountName: string;
  handle: string;
  profileUrl: string;
  caption: string;
  timestamp: string;
  permalink: string;
  image: string;
  width: number;
  height: number;
}

const ACCOUNT_IDS = [
  '236832203168671',
  '614241355098396',
  '17841473265673317',
  '286561725389998',
  '384944394893894',
  '2328351563864708',
  '620287621157167',
  '17841473180237435',
  '518902701316351',
  '17841473178047392',
];

export const BUNDLED_SOCIAL_POSTS: SocialFeedPost[] = [
  {
    id: '384944394893894_941500531861324',
    platform: 'facebook',
    accountId: '384944394893894',
    accountName: 'Meramec State Park Concessions',
    handle: '@MeramecStateParkConsessions',
    profileUrl: 'https://www.facebook.com/MeramecStateParkConsessions',
    caption: 'Recent update from Meramec State Park Concessions.',
    timestamp: '2026-04-10T16:52:10+0000',
    permalink: 'https://www.facebook.com/1587721943381931/posts/941500531861324?substory_index=941500531861324',
    image: '/images/social-feed/post-1.webp',
    width: 960,
    height: 720,
  },
  {
    id: '2328351563864708_2387268791697519',
    platform: 'facebook',
    accountId: '2328351563864708',
    accountName: 'Tipsaw Lake Recreation Area',
    handle: '@TipsawRecreationArea',
    profileUrl: 'https://www.facebook.com/TipsawRecreationArea',
    caption: 'Recent update from Tipsaw Lake Recreation Area.',
    timestamp: '2026-04-10T16:50:29+0000',
    permalink: 'https://www.facebook.com/1532501592022344/posts/2387268791697519?substory_index=2387268791697519',
    image: '/images/social-feed/post-2.webp',
    width: 960,
    height: 720,
  },
  {
    id: '286561725389998_2019510518941813',
    platform: 'facebook',
    accountId: '286561725389998',
    accountName: 'Indian-Celina Lakes Recreation Area',
    handle: '@IndianCelinaRecreationArea',
    profileUrl: 'https://www.facebook.com/IndianCelinaRecreationArea',
    caption: 'Recent update from Indian-Celina Lakes Recreation Area.',
    timestamp: '2026-04-10T16:49:30+0000',
    permalink: 'https://www.facebook.com/1770728038396837/posts/2019510518941813?substory_index=2019510518941813',
    image: '/images/social-feed/post-3.webp',
    width: 960,
    height: 720,
  },
  {
    id: '236832203168671_1307141894798565',
    platform: 'facebook',
    accountId: '236832203168671',
    accountName: 'Canal Bridge Campground',
    handle: '@canalbridgecampground',
    profileUrl: 'https://www.facebook.com/canalbridgecampground',
    caption: '“This is your sign to book the camping trip.” www.canalbridgeme.com 2026 camping reservations open now',
    timestamp: '2026-03-15T09:25:23+0000',
    permalink: 'https://www.facebook.com/reel/1488177046236062/',
    image: '/images/social-feed/post-4.webp',
    width: 960,
    height: 720,
  },
];

function stripEmojis(text: string): string {
  return text
    .replace(new RegExp('\\p{Extended_Pictographic}', 'gu'), '')
    .replace(/\uFE0F|\u200D/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function getSocialFeed(): Promise<SocialFeedPost[]> {
  try {
    const url = `https://launchwithlimn.com/api/public/social-feed?accounts=${ACCOUNT_IDS.join(',')}&limit=4`;
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return BUNDLED_SOCIAL_POSTS;
    const data = await res.json();
    const items = Array.isArray(data) ? data : Array.isArray(data?.posts) ? data.posts : [];
    const normalized: SocialFeedPost[] = items
      .filter((item: Record<string, unknown>) => item && typeof item.permalink === 'string' && typeof item.image === 'string')
      .slice(0, 4)
      .map((item: Record<string, unknown>, i: number) => ({
        id: String(item.id ?? `live-${i}`),
        platform: item.platform === 'instagram' ? 'instagram' : 'facebook',
        accountId: String(item.accountId ?? ''),
        accountName: String(item.accountName ?? 'BA Services'),
        handle: String(item.handle ?? '@baserves'),
        profileUrl: String(item.profileUrl ?? 'https://www.facebook.com/canalbridgecampground'),
        caption: stripEmojis(String(item.caption ?? '')),
        timestamp: String(item.timestamp ?? ''),
        permalink: String(item.permalink),
        image: String(item.image),
        width: 960,
        height: 720,
      }));
    return normalized.length > 0 ? normalized : BUNDLED_SOCIAL_POSTS;
  } catch {
    return BUNDLED_SOCIAL_POSTS;
  }
}
