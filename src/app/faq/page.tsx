import FaqItem from "@/components/FaqItem";

const faqs = [
  {
    question: "What is RepoMedia?",
    answer:
      "RepoMedia helps you discover movies, TV shows, and web series, and shows you exactly where to watch them — along with trailers, cast info, and a way to share what you find.",
  },
  {
    question: "How do I find something to watch?",
    answer:
      "Use the 'What are you in the mood for?' box on the home page to describe what you feel like watching in your own words, or pick genres you enjoy under 'For You' to get tailored recommendations.",
  },
  {
    question: "Why isn't a title available on the platform it says?",
    answer:
      "Streaming availability changes often and varies by region. RepoMedia shows the platforms a title is currently available on where we have data, along with a link to search for it directly on that platform.",
  },
  {
    question: "Where does the movie and show data come from?",
    answer:
      "All data — posters, descriptions, cast, and trailers — comes from The Movie Database (TMDB), a community-driven movie and TV database.",
  },
  {
    question: "Can I share a title with friends?",
    answer:
      "Yes — every title page has a Share button. On mobile it opens your device's native share sheet; on desktop it copies a direct link to your clipboard.",
  },
  {
    question: "Is RepoMedia free to use?",
    answer: "Yes, RepoMedia is completely free to use.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h1>
      <p className="mb-8 text-sm text-zinc-400">
        Everything you need to know about using RepoMedia.
      </p>
      <div>
        {faqs.map((f) => (
          <FaqItem key={f.question} question={f.question} answer={f.answer} />
        ))}
      </div>
    </div>
  );
}