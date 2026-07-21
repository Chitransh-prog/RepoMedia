import { Star } from "lucide-react";

export default function RatingBadge({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-medium text-yellow-400">
      <Star size={12} fill="currentColor" />
      {rating.toFixed(1)}
    </div>
  );
}