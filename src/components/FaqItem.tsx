"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800 py-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-medium text-zinc-100">{question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-zinc-400">{answer}</p>}
    </div>
  );
}