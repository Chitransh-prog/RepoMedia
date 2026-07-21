const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export interface InterpretedPreference {
  genres: string[];
  type: "movie" | "tv" | "both";
  mood: string;
}

export async function interpretPreference(
  query: string,
  availableGenres: string[]
): Promise<InterpretedPreference> {
  const systemPrompt = `You are a movie/TV recommendation assistant. A user will describe what they feel like watching in free text — mood, genre, similar titles, occasion, etc.

Respond with ONLY valid JSON, no markdown fences, no explanation, in exactly this shape:
{"genres": ["..."], "type": "movie" | "tv" | "both", "mood": "..."}

Rules:
- "genres" must be 1-3 items chosen ONLY from this exact list: ${availableGenres.join(", ")}
- "type" is "movie" only if they clearly want a movie, "tv" only if they clearly want a show/series, otherwise "both"
- "mood" is a short 3-6 word human-readable summary of what they're after`;

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query },
      ],
      temperature: 0.3,
      max_tokens: 200,
    }),
  });

  if (!res.ok) {
    console.log("Groq request failed:", res.status);
    throw new Error(`Groq request failed: ${res.status}`);
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content ?? "{}";
  const cleaned = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return { genres: [], type: "both", mood: query };
  }
}