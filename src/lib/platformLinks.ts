// Maps a TMDB provider name to a direct search URL on that platform.
// Extend this map as needed — it covers the most common platforms.
const PLATFORM_SEARCH: Record<string, (title: string) => string> = {
  Netflix: (t) => `https://www.netflix.com/search?q=${encodeURIComponent(t)}`,
  "Amazon Prime Video": (t) =>
    `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${encodeURIComponent(t)}`,
  "Disney Plus": (t) => `https://www.disneyplus.com/search?q=${encodeURIComponent(t)}`,
  "Hotstar": (t) => `https://www.hotstar.com/in/search?q=${encodeURIComponent(t)}`,
  "Apple TV": (t) => `https://tv.apple.com/search?term=${encodeURIComponent(t)}`,
  "Apple TV Plus": (t) => `https://tv.apple.com/search?term=${encodeURIComponent(t)}`,
  "Google Play Movies": (t) =>
    `https://play.google.com/store/search?q=${encodeURIComponent(t)}&c=movies`,
  YouTube: (t) => `https://www.youtube.com/results?search_query=${encodeURIComponent(t)}+full+movie`,
  Hulu: (t) => `https://www.hulu.com/search?q=${encodeURIComponent(t)}`,
  "JioCinema": (t) => `https://www.jiocinema.com/search/${encodeURIComponent(t)}`,
  "SonyLIV": (t) => `https://www.sonyliv.com/search?q=${encodeURIComponent(t)}`,
};

export function getPlatformLink(providerName: string, title: string): string | null {
  const builder = PLATFORM_SEARCH[providerName];
  return builder ? builder(title) : null;
}