import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur sm:px-8">
      <Link href="/" className="shrink-0 text-xl font-bold text-red-500">
        Repo<span className="text-zinc-100">Media</span>
      </Link>
      <SearchBar />
    </header>
  );
}