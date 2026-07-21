import Link from "next/link";
import Image from "next/image";
import { MediaItem } from "@/types/media";
import { posterUrl } from "@/lib/tmdb";
import RatingBadge from "./RatingBadge";

export default function MovieCard({ item }: { item: MediaItem }) {
  return (
    <Link
      href={`/title/${item.type}/${item.id}`}
      className="group relative block overflow-hidden rounded-xl bg-zinc-900 transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={posterUrl(item.posterPath)}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 45vw, 200px"
          className="object-cover"
        />
        <div className="absolute right-2 top-2">
          <RatingBadge rating={item.rating} />
        </div>
      </div>
      <div className="p-2">
        <p className="truncate text-sm font-medium text-zinc-100">{item.title}</p>
        <p className="text-xs text-zinc-500">{item.releaseDate?.slice(0, 4) || "—"}</p>
      </div>
    </Link>
  );
}