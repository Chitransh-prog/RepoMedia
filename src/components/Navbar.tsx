"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link href="/" className="shrink-0 text-xl font-bold text-red-500">
          Repo<span className="text-zinc-100">Media</span>
        </Link>

        {/* Desktop nav + search */}
        <div className="hidden flex-1 items-center justify-end gap-6 md:flex">
          <nav className="flex items-center gap-5 text-sm text-zinc-300">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition hover:text-red-500">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="w-full max-w-xs">
            <SearchBar />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-zinc-300 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-4 md:hidden">
          <div className="mb-4">
            <SearchBar />
          </div>
          <nav className="flex flex-col gap-3 text-sm text-zinc-300">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 transition hover:bg-zinc-900 hover:text-red-500"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}