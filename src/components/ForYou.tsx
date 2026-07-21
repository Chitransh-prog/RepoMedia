"use client";
import { useEffect, useState } from "react";
import MovieGrid from "./MovieGrid";
import { MediaItem } from "@/types/media";

const STORAGE_KEY = "repomedia_preferred_genres";

interface GenreOption {
  name: string;
  movieId?: number;
  tvId?: number;
}

export default function ForYou() {
  const [allGenres, setAllGenres] = useState<GenreOption[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [results, setResults] = useState<MediaItem[]>([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const res = await fetch("/api/genres");
      const data = await res.json();
      setAllGenres(data.genres);

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        setSelected(parsed);
        await fetchRecommendations(parsed);
      } else {
        setEditing(true);
      }
      setLoading(false);
    }
    init();
  }, []);

  async function fetchRecommendations(genres: string[]) {
    if (!genres.length) {
      setResults([]);
      return;
    }
    const res = await fetch(`/api/recommendations?genres=${encodeURIComponent(genres.join(","))}`);
    const data = await res.json();
    setResults(data.results ?? []);
  }

  function toggleGenre(name: string) {
    setSelected((prev) => (prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]));
  }

  async function savePreferences() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    setEditing(false);
    setLoading(true);
    await fetchRecommendations(selected);
    setLoading(false);
  }

  if (loading) {
    return <p className="text-sm text-zinc-500">Loading your recommendations...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">For You</h2>
        <button onClick={() => setEditing((e) => !e)} className="text-sm text-red-500 underline">
          {editing ? "Cancel" : selected.length ? "Edit preferences" : "Set preferences"}
        </button>
      </div>

      {editing && (
        <div className="flex flex-col gap-3 rounded-xl bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">
            Pick a few genres you enjoy — we'll recommend movies and shows based on them.
          </p>
          <div className="flex flex-wrap gap-2">
            {allGenres.map((g) => (
              <button
                key={g.name}
                onClick={() => toggleGenre(g.name)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  selected.includes(g.name)
                    ? "bg-red-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
          <button
            onClick={savePreferences}
            disabled={!selected.length}
            className="mt-2 w-fit rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Save preferences
          </button>
        </div>
      )}

      {!editing && results.length > 0 && <MovieGrid items={results} />}
      {!editing && results.length === 0 && (
        <p className="text-sm text-zinc-500">No preferences set yet — click "Set preferences" above.</p>
      )}
    </div>
  );
}