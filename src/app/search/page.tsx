import { searchMulti } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";
  const results = query ? await searchMulti(query) : [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">
        Results for <span className="text-red-500">&quot;{query}&quot;</span>
      </h1>
      <MovieGrid items={results} />
    </div>
  );
}