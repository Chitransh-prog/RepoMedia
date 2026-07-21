"use client";
import { useState } from "react";
import MovieGrid from "./MovieGrid";
import { MediaItem } from "@/types/media";

type Mode = "movie" | "tv" | "both";

export default function SmartRecommend() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("both");
  const [results, setResults] = useState<MediaItem[]>([]);
  const [mood, setMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch("/api/smart-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, mode }),
      });
      const data = await res.json();
      setResults(data.results ?? []);
      setMood(data.interpreted?.mood ?? null);
    } finally {
      setLoading(false);
    }
  }

  const modes: { value: Mode; label: string }[] = [
    { value: "both", label: "Anything" },
    { value: "movie", label: "Movies" },
    { value: "tv", label: "Shows" },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-zinc-900/60 p-5">
      <div>
        <h2 className="text-xl font-bold">What are you in the mood for?</h2>
        <p className="text-sm text-zinc-400">
          Describe it in your own words — e.g. "something like Inception but funnier" or "cozy rainy-day comfort watch"
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tell us what you feel like watching..."
          rows={2}
          className="w-full resize-none rounded-xl bg-zinc-800 p-3 text-sm text-zinc-100 outline-none ring-1 ring-zinc-700 focus:ring-red-500"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {modes.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMode(m.value)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  mode === m.value
                    ? "bg-red-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {loading ? "Thinking..." : "Recommend"}
          </button>
        </div>
      </form>

      {mood && !loading && (
        <p className="text-sm text-zinc-500">
          Because you wanted: <span className="text-zinc-300">{mood}</span>
        </p>
      )}
      {loading && <p className="text-sm text-zinc-500">Finding something good for you...</p>}
      {!loading && searched && results.length === 0 && (
        <p className="text-sm text-zinc-500">Couldn't find a match — try describing it differently.</p>
      )}
      {!loading && results.length > 0 && <MovieGrid items={results} />}
    </div>
  );
}