"use client";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search movies, shows, web series..."
        className="w-full rounded-full bg-zinc-800 py-2 pl-4 pr-10 text-sm text-zinc-100 outline-none ring-1 ring-zinc-700 focus:ring-red-500"
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
        <Search size={18} />
      </button>
    </form>
  );
}