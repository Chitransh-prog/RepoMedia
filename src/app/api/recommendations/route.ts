import { NextRequest, NextResponse } from "next/server";
import { getGenres, discoverByGenre } from "@/lib/tmdb";
import { MediaItem } from "@/types/media";

export async function GET(req: NextRequest) {
  const namesParam = req.nextUrl.searchParams.get("genres");
  if (!namesParam) return NextResponse.json({ results: [] });

  const names = namesParam.split(",").map((n) => n.trim()).filter(Boolean);

  const [movieGenres, tvGenres] = await Promise.all([getGenres("movie"), getGenres("tv")]);
  const movieIds = movieGenres.filter((g) => names.includes(g.name)).map((g) => g.id);
  const tvIds = tvGenres.filter((g) => names.includes(g.name)).map((g) => g.id);

  const [movies, shows] = await Promise.all([
    discoverByGenre("movie", movieIds),
    discoverByGenre("tv", tvIds),
  ]);

  // Interleave so it's not all movies then all shows
  const merged: MediaItem[] = [];
  const max = Math.max(movies.length, shows.length);
  for (let i = 0; i < max; i++) {
    if (movies[i]) merged.push(movies[i]);
    if (shows[i]) merged.push(shows[i]);
  }

  return NextResponse.json({ results: merged });
}