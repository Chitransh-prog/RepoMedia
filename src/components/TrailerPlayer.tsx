import { Video } from "@/types/media";

export default function TrailerPlayer({ trailer }: { trailer: Video | null }) {
  if (!trailer) {
    return <p className="text-sm text-zinc-500">No trailer available.</p>;
  }
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title={trailer.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}