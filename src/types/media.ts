export type MediaType = "movie" | "tv";

export interface MediaItem {
  id: number;
  type: MediaType;
  title: string;          // normalized (movies use `title`, tv uses `name`)
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  rating: number;
  releaseDate: string;
}

export interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface WatchProvidersData {
  link: string | null;
  flatrate: Provider[];
  rent: Provider[];
  buy: Provider[];
}

export interface Video {
  key: string;      // YouTube video key
  name: string;
  site: string;
  type: string;
}

export interface MediaDetail extends MediaItem {
  genres: string[];
  runtime?: number;         // movies
  numberOfSeasons?: number; // tv
  cast: { name: string; character: string; profilePath: string | null }[];
  trailer: Video | null;
  watchProviders: WatchProvidersData | null;
}