import { getDetail, posterUrl, backdropUrl } from "@/lib/tmdb";
import { MediaType } from "@/types/media";
import TrailerPlayer from "@/components/TrailerPlayer";
import WatchProviders from "@/components/WatchProviders";
import ShareButton from "@/components/ShareButton";
import Image from "next/image";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ type: MediaType; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, id } = await params;
  const detail = await getDetail(type, id);
  const image = backdropUrl(detail.backdropPath) ?? posterUrl(detail.posterPath, "w500");

  return {
    title: `${detail.title} — RepoMedia`,
    description: detail.overview,
    openGraph: {
      title: detail.title,
      description: detail.overview,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: detail.title,
      description: detail.overview,
      images: [image],
    },
  };
}

export default async function TitlePage({ params }: Props) {
  const { type, id } = await params;
  const detail = await getDetail(type, id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const shareUrl = `${siteUrl}/title/${type}/${id}`;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="relative mx-auto aspect-[2/3] w-48 shrink-0 overflow-hidden rounded-xl md:mx-0 md:w-64">
          <Image src={posterUrl(detail.posterPath, "w500")} alt={detail.title} fill className="object-cover" />
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <h1 className="text-3xl font-bold">{detail.title}</h1>
          <div className="flex flex-wrap gap-2 text-sm text-zinc-400">
            <span>{detail.releaseDate?.slice(0, 4)}</span>
            <span>•</span>
            <span>{detail.genres.join(", ")}</span>
            {detail.runtime && (
              <>
                <span>•</span>
                <span>{detail.runtime} min</span>
              </>
            )}
            {detail.numberOfSeasons && (
              <>
                <span>•</span>
                <span>{detail.numberOfSeasons} season{detail.numberOfSeasons > 1 ? "s" : ""}</span>
              </>
            )}
          </div>
          <p className="text-zinc-300">{detail.overview}</p>

          <div className="mt-2 flex items-center gap-3">
            <ShareButton title={detail.title} url={shareUrl} />
          </div>

          <div className="mt-4">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
              Available On
            </h2>
            <WatchProviders data={detail.watchProviders} title={detail.title} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Trailer</h2>
        <TrailerPlayer trailer={detail.trailer} />
        {detail.trailer && (
          <a
            href={`https://www.youtube.com/watch?v=${detail.trailer.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-red-500 underline"
          >
            Watch on YouTube
          </a>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Cast</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {detail.cast.map((c) => (
            <div key={c.name} className="w-24 shrink-0 text-center">
              <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full bg-zinc-800">
                {c.profilePath && (
                  <Image src={posterUrl(c.profilePath)} alt={c.name} fill className="object-cover" />
                )}
              </div>
              <p className="mt-1 truncate text-xs font-medium">{c.name}</p>
              <p className="truncate text-xs text-zinc-500">{c.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}