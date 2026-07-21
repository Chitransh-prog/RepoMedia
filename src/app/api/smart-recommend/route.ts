import { NextRequest, NextResponse } from "next/server";
import { getMergedGenres, discoverByGenre, searchMulti } from "@/lib/tmdb";
import { interpretPreference } from "@/lib/ai";
import { MediaItem, MediaType } from "@/types/media";
import { InterpretedPreference } from "@/lib/ai";


export async function POST(req: NextRequest) {
  const { query, mode } = await req.json();

  if (!query || !query.trim()) {
    return NextResponse.json({ results: [], interpreted: null });
  }

  const merged = await getMergedGenres();
  const genreNames = merged.map((g) => g.name);

    let interpreted: InterpretedPreference;
    try {
    interpreted = await interpretPreference(query, genreNames);
    } catch (err) {
    console.log("AI interpret failed, falling back to plain search:", err);
    interpreted = { genres: [], type: "both", mood: query };
    }

  // If the user explicitly picked a mode (movie/tv), it overrides the AI's guess.
  const effectiveType: "movie" | "tv" | "both" =
    mode && mode !== "both" ? mode : interpreted.type;

  const movieIds = merged
    .filter((g) => interpreted.genres.includes(g.name) && g.movieId)
    .map((g) => g.movieId!) as number[];
  const tvIds = merged
    .filter((g) => interpreted.genres.includes(g.name) && g.tvId)
    .map((g) => g.tvId!) as number[];

  const wantMovies = effectiveType !== "tv";
  const wantTv = effectiveType !== "movie";

  const [movies, shows] = await Promise.all([
    wantMovies && movieIds.length ? discoverByGenre("movie" as MediaType, movieIds) : Promise.resolve([]),
    wantTv && tvIds.length ? discoverByGenre("tv" as MediaType, tvIds) : Promise.resolve([]),
  ]);

  let results: MediaItem[] = [];
  const max = Math.max(movies.length, shows.length);
  for (let i = 0; i < max; i++) {
    if (movies[i]) results.push(movies[i]);
    if (shows[i]) results.push(shows[i]);
  }

  // Fallback: if the AI's genre picks returned nothing, do a plain keyword search instead.
  if (!results.length) {
    results = await searchMulti(query);
  }

  return NextResponse.json({
    results: results.slice(0, 20),
    interpreted: { ...interpreted, type: effectiveType },
  });
}