# Meridian

**The news, neutralized.**

Meridian ingests stories from across the political spectrum, extracts the undeniable facts, and presents a singular, objective narrative — helping readers escape the echo chamber.

## Features

- **Comprehensive Sourcing** — Pulls articles from dozens of verified publishers spanning the full political spectrum (Left, Center-Left, Center, Center-Right, Right).
- **AI Synthesis** — A neutrality engine powered by OpenAI strips away emotional language, adjectives, and partisan framing to surface the overlapping consensus of facts.
- **Divergence Tracking** — Where facts are disputed, the story clearly highlights how different outlets framed the same event.
- **Source Transparency** — Every synthesized story links back to the original articles with the specific snippet each publication used, so you can read the full piece yourself.
- **Authentication** — User accounts via Replit Auth.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Routing | Wouter |
| Styling | Tailwind CSS, shadcn/ui (Radix UI) |
| Animations | Framer Motion |
| Data Fetching | TanStack Query |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL, Drizzle ORM |
| AI | OpenAI API |
| Auth | Replit Auth (OpenID Connect) |

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- OpenAI API key
- Replit Auth credentials (when running on Replit)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chrislyonsKY/MeridianWebaite.git
   cd MeridianWebaite
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set the required environment variables (see [Environment Variables](#environment-variables)).

4. Push the database schema:

   ```bash
   npm run db:push
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5000`.

### Building for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `OPENAI_API_KEY` | OpenAI API key for the neutrality engine |
| `SESSION_SECRET` | Secret used to sign session cookies |
| `REPL_ID` | Replit environment identifier (set automatically on Replit) |
| `ISSUER_URL` | OpenID Connect issuer URL for Replit Auth |

## Project Structure

```
.
├── client/               # React frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── hooks/        # Custom React hooks
│       ├── pages/        # Page-level components
│       └── lib/          # Utility functions
├── server/               # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route handlers
│   ├── storage.ts        # Database access layer
│   └── db.ts             # Drizzle ORM setup
├── shared/               # Shared types & schema
│   ├── schema.ts         # Drizzle table definitions & Zod schemas
│   └── routes.ts         # Typed API route definitions
└── script/               # Build scripts
```

## How It Works

1. **Ingestion** — RSS feeds and sitemaps from 50+ news organizations are monitored continuously. Sources are pre-categorized by political bias.
2. **Clustering** — Semantic similarity groups individual articles about the same event into a single *Story*.
3. **Neutrality Engine** — The GPT-powered engine identifies key facts all sources agree on, strips emotional framing, writes a neutral summary, and surfaces narrative divergence between left- and right-leaning coverage.
4. **Publication** — The synthesized story is published to the feed with full source attribution.

## License

MIT
