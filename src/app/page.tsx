import { getTrending } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import SmartRecommend from "@/components/SmartRecommend";
import ForYou from "@/components/ForYou";

export const revalidate = 3600;

export default async function HomePage() {
  const trending = await getTrending();

  return (
    <div className="flex flex-col gap-10">
      <SmartRecommend />
      <ForYou />

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Trending This Week</h1>
          <p className="text-sm text-zinc-400">Movies and shows everyone's watching right now.</p>
        </div>
        <MovieGrid items={trending} />
      </div>
    </div>
  );
}