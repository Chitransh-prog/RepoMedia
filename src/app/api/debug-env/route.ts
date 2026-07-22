import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.TMDB_API_KEY;
  return NextResponse.json({
    exists: !!key,
    length: key?.length ?? 0,
    firstChars: key ? key.slice(0, 4) : null,
    lastChars: key ? key.slice(-4) : null,
  });
}