import Link from "next/link";
import { Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-8 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold text-red-500">
            Repo<span className="text-zinc-100">Media</span>
          </span>
          <p className="max-w-xs text-sm text-zinc-500">
            Find where to watch your next favorite movie, show, or web series — with trailers and
            streaming links, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-zinc-300">Explore</h3>
            <Link href="/" className="text-sm text-zinc-500 hover:text-red-500">
              Trending
            </Link>
            <Link href="/faq" className="text-sm text-zinc-500 hover:text-red-500">
              FAQ
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-zinc-300">Data</h3>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-red-500"
            >
              Powered by TMDB
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-zinc-300">Connect</h3>
            <div className="flex gap-3">
              <a href="mailto:hello@repomedia.app" aria-label="Email">
                <Mail size={18} className="text-zinc-500 hover:text-red-500" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={18} className="text-zinc-500 hover:text-red-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-900 px-4 py-4 text-center text-xs text-zinc-600 sm:px-8">
        © {new Date().getFullYear()} RepoMedia. This product uses the TMDB API but is not
        endorsed or certified by TMDB.
      </div>
    </footer>
  );
}