import { MediaItem } from "@/types/media";
import MovieCard from "./MovieCard";

export default function MovieGrid({ items }: { items: MediaItem[] }) {
  if (!items.length) {
    return <p className="text-zinc-400">No titles found.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {items.map((item) => (
        <MovieCard key={`${item.type}-${item.id}`} item={item} />
      ))}
    </div>
  );
}