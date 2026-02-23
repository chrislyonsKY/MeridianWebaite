# The Meridian

> **News, neutrally synthesized.**

The Meridian is a public-facing news platform that ingests articles from across the political spectrum, clusters them by story using AI, and produces neutral, fact-first summaries — showing where sources agree and where they diverge.

---

## Features

- **Multi-source ingestion** — Pulls articles from 15+ outlets spanning the political spectrum (left to right)
- **AI-powered clustering** — Groups articles covering the same underlying event using LLM intelligence
- **Neutrality Engine** — Produces fact-first summaries with banned emotional language, clearly attributing disagreements to their sources
- **Divergence Tracking** — Highlights exactly how different outlets framed the same event
- **Bias Indicators** — Displays editorial lean ratings for every source
- **Topic filtering** — Browse stories by category (Politics, Technology, World, Business, Health, etc.)
- **User accounts** — Personalized topic preferences and email digest subscriptions via Replit Auth
- **Admin panel** — Pipeline trigger and content management

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Express (Node.js) + React (Vite) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | PostgreSQL via Drizzle ORM |
| Auth | Replit Auth (OpenID Connect) |
| LLM | OpenAI |
| Animations | Framer Motion |

---

## Project Structure

```
├── client/               # React frontend (Vite)
│   └── src/
│       ├── components/   # UI components (Navbar, Footer, StoryCard, BiasBadge)
│       ├── hooks/        # use-auth, use-stories, use-sources
│       ├── pages/        # LandingPage, FeedPage, StoryPage, MethodologyPage, AdminPage
│       └── lib/          # Query client, auth utilities
├── server/               # Express backend
│   ├── routes.ts         # API route handlers + database seed
│   ├── storage.ts        # Database access layer
│   ├── db.ts             # Drizzle ORM connection
│   └── replit_integrations/  # Auth, audio, image, chat, batch integrations
├── shared/               # Shared types and contracts
│   ├── schema.ts         # Drizzle schema (sources, articles, stories, story_articles)
│   └── routes.ts         # Typed API route definitions
└── script/
    └── build.ts          # Production build script
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Environment Variables

Create a `.env` file with the following variables:

```
DATABASE_URL=postgresql://...
SESSION_SECRET=<random-string>
REPL_ID=<your-replit-id>
ISSUER_URL=https://replit.com/oidc
```

### Install & Run

```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Start development server
npm run dev
```

The app will be available at `http://localhost:5000`.

### Build for Production

```bash
npm run build
npm run start
```

---

## API Routes

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/stories` | List published stories (supports `?topic=`, `?page=`, `?limit=`) |
| `GET` | `/api/stories/:id` | Get a single story with its linked articles |
| `GET` | `/api/sources` | List all tracked news sources |
| `POST` | `/api/pipeline/trigger` | Trigger the ingestion pipeline |
| `GET` | `/api/login` | Initiate Replit Auth login |
| `GET` | `/api/logout` | Log out current user |
| `GET` | `/api/auth/user` | Get current authenticated user |

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/feed` | Main news feed with topic filtering |
| `/story/:id` | Individual story detail with source breakdown |
| `/methodology` | How The Meridian works |
| `/admin` | Admin panel (authenticated users only) |

---

## Database Schema

- **sources** — News outlets with name, URL, and bias rating (`left`, `center-left`, `center`, `center-right`, `right`)
- **articles** — Individual articles with title, URL, snippet, author, and publication date
- **stories** — Clustered, AI-summarized story groups with headline, summary, key facts, and divergence summary
- **story_articles** — Junction table linking stories to articles, with a per-source snippet describing each outlet's angle

---

## License

MIT
