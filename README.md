# RepoMedia 🎬

**Find where to watch your next favorite movie, show, or web series.**

RepoMedia helps you discover what to watch next — describe what you're in the mood for in plain language, and get back recommendations with streaming availability, trailers, and links, all in one place.

🔗 **Live app:** [main.d2dvbykn32sueo.amplifyapp.com](https://main.d2dvbykn32sueo.amplifyapp.com/)

---

## ✨ Features

- **Natural language search** — describe what you want ("something like Inception but funnier", "cozy rainy-day comfort watch") instead of scrolling filters
- **Filter by type** — Movies, Shows, or Anything
- **Trending this week** — a constantly refreshed grid of popular movies and shows with ratings and release year
- **Title detail pages** — dedicated page per movie/show with rating, year, and more
- **Streaming links** — see where a title is available to watch, with a direct link when possible
- **YouTube trailers** — watch the trailer without leaving the app
- **Shareable** — share recommendations or titles with friends
- **FAQ page** — quick answers for first-time visitors

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Data:** [TMDB API](https://www.themoviedb.org/) (movie/show metadata, ratings, artwork)
- **Hosting:** AWS Amplify

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
git clone https://github.com/<your-username>/repomedia.git
cd repomedia
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
repomedia/
├── app/                # Next.js app router pages
│   ├── page.tsx        # Home — search + trending
│   ├── faq/            # FAQ page
│   └── title/[type]/[id]/  # Title detail pages
├── components/         # Reusable UI components
├── lib/                # TMDB API helpers, utilities
├── public/             # Static assets (logo, icons)
└── styles/              # Tailwind config & globals
```

> Adjust this tree to match your actual folder layout before publishing.

## 🗺️ Roadmap

- [ ] User accounts & watchlists
- [ ] Personalized recommendations based on viewing history
- [ ] More streaming region support
- [ ] Social sharing previews (OG images per title)

## 🙏 Acknowledgements

This product uses the TMDB API but is not endorsed or certified by TMDB.

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Built by **Chitransh Prasad (Chittu)** — [The Growth Media](https://main.d2dvbykn32sueo.amplifyapp.com/)
Email: hello@repomedia.app
