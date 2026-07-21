import { MediaDetail, MediaItem, MediaType } from "@/types/media";

const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

const API_KEY = process.env.TMDB_API_KEY;

async function tmdbFetch(path: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY!);
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) {
    console.log("TMDB REQUEST FAILED:", res.status, path);
    throw new Error(`TMDB request failed: ${res.status} for ${path}`);
  }
  return res.json();
}

// For secondary data (credits/videos/providers) — a missing/404 result
// here shouldn't take down the whole page, so we fall back to null.
async function tmdbFetchSafe(path: string, params: Record<string, string> = {}) {
  try {
    return await tmdbFetch(path, params);
  } catch (err) {
    console.log("Non-critical TMDB call failed, continuing:", path);
    return null;
  }
}

export function posterUrl(path: string | null, size: "w342" | "w500" = "w342") {
  return path ? `${IMG_BASE}/${size}${path}` : "/logo.svg";
}

export function backdropUrl(path: string | null) {
  return path ? `${IMG_BASE}/w1280${path}` : null;
}

function normalize(item: any, type: MediaType): MediaItem {
  return {
    id: item.id,
    type,
    title: item.title ?? item.name,
    overview: item.overview,
    posterPath: item.poster_path,
    backdropPath: item.backdrop_path,
    rating: item.vote_average,
    releaseDate: item.release_date ?? item.first_air_date ?? "",
  };
}

export async function getTrending(): Promise<MediaItem[]> {
  const data = await tmdbFetch("/trending/all/week");
  return data.results
    .filter((r: any) => r.media_type === "movie" || r.media_type === "tv")
    .map((r: any) => normalize(r, r.media_type));
}

export async function searchMulti(query: string): Promise<MediaItem[]> {
  const data = await tmdbFetch("/search/multi", { query });
  return data.results
    .filter((r: any) => r.media_type === "movie" || r.media_type === "tv")
    .map((r: any) => normalize(r, r.media_type));
}
export interface GenreOption {
  name: string;
  movieId?: number;
  tvId?: number;
}

export async function getGenres(type: MediaType): Promise<{ id: number; name: string }[]> {
  const data = await tmdbFetch(`/genre/${type}/list`);
  return data.genres;
}

export async function getMergedGenres(): Promise<GenreOption[]> {
  const [movieGenres, tvGenres] = await Promise.all([getGenres("movie"), getGenres("tv")]);
  const map = new Map<string, GenreOption>();
  movieGenres.forEach((g) => map.set(g.name, { name: g.name, movieId: g.id }));
  tvGenres.forEach((g) => {
    const existing = map.get(g.name);
    if (existing) existing.tvId = g.id;
    else map.set(g.name, { name: g.name, tvId: g.id });
  });
  return Array.from(map.values());
}

export async function discoverByGenre(type: MediaType, genreIds: number[]): Promise<MediaItem[]> {
  if (!genreIds.length) return [];
  const data = await tmdbFetch(`/discover/${type}`, {
    with_genres: genreIds.join(","),
    sort_by: "popularity.desc",
  });
  return data.results.map((r: any) => normalize(r, type));
}

export async function getDetail(type: MediaType, id: string): Promise<MediaDetail> {
  // Core call — if this fails, the title genuinely doesn't exist for this type/id.
  const detail = await tmdbFetch(`/${type}/${id}`);

  // Secondary calls — allowed to fail individually without breaking the page.
  const [credits, videos, providers] = await Promise.all([
    tmdbFetchSafe(`/${type}/${id}/credits`),
    tmdbFetchSafe(`/${type}/${id}/videos`),
    tmdbFetchSafe(`/${type}/${id}/watch/providers`),
  ]);

  const trailer =
    videos?.results?.find((v: any) => v.site === "YouTube" && v.type === "Trailer") ??
    videos?.results?.find((v: any) => v.site === "YouTube") ??
    null;

  const region = providers?.results?.US ?? providers?.results?.IN ?? null;

  return {
    ...normalize(detail, type),
    genres: detail.genres?.map((g: any) => g.name) ?? [],
    runtime: detail.runtime,
    numberOfSeasons: detail.number_of_seasons,
    cast:
      credits?.cast?.slice(0, 8).map((c: any) => ({
        name: c.name,
        character: c.character,
        profilePath: c.profile_path,
      })) ?? [],
    trailer: trailer
      ? { key: trailer.key, name: trailer.name, site: trailer.site, type: trailer.type }
      : null,
    watchProviders: region
      ? {
          link: region.link ?? null,
          flatrate: region.flatrate ?? [],
          rent: region.rent ?? [],
          buy: region.buy ?? [],
        }
      : null,
  };
}