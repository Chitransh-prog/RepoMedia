import Image from "next/image";
import { WatchProvidersData } from "@/types/media";
import { getPlatformLink } from "@/lib/platformLinks";

export default function WatchProviders({
  data,
  title,
}: {
  data: WatchProvidersData | null;
  title: string;
}) {
  if (!data || (!data.flatrate.length && !data.rent.length && !data.buy.length)) {
    return <p className="text-sm text-zinc-500">Not currently available on any streaming platform.</p>;
  }

  const all = [...data.flatrate, ...data.rent, ...data.buy];
  const seen = new Set<number>();
  const unique = all.filter((p) => (seen.has(p.provider_id) ? false : seen.add(p.provider_id)));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {unique.map((p) => {
          const link = getPlatformLink(p.provider_name, title) ?? data.link ?? undefined;
          return (
            <a
              key={p.provider_id}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-100 transition hover:bg-zinc-700"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                alt={p.provider_name}
                width={24}
                height={24}
                className="rounded"
              />
              {p.provider_name}
            </a>
          );
        })}
      </div>
      {data.link && (
        <a href={data.link} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 underline">
          See all viewing options
        </a>
      )}
    </div>
  );
}