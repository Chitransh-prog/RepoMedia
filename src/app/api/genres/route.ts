import { NextResponse } from "next/server";
import { getMergedGenres } from "@/lib/tmdb";

export async function GET() {
  const genres = await getMergedGenres();
  return NextResponse.json({ genres });
}