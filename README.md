# AI Host

AI Host is a multi-tenant SaaS platform for restaurants and small businesses. Businesses configure an AI chat agent for their customers, and customers reach it through a QR code, NFC tag, or shared link.

## Production Layout

```text
apps/
  web/              Next.js + React + TypeScript + Tailwind frontend
  api/              FastAPI backend, SQLAlchemy models, Alembic migrations, tests
api/
  index.py          Vercel Python function entrypoint for FastAPI
legacy/
  dashboard-vite/   Old standalone Vite dashboard
  customer-vite/    Old standalone Vite customer app
```

The deployable app is `apps/web` plus `apps/api`. The root `vercel.json` builds `apps/web` and rewrites `/api/*` to the FastAPI app exposed by `api/index.py`.

## Local Setup

1. Copy `.env.example` to `.env` and fill in Supabase and DeepSeek credentials.
2. Run the full local stack:

```powershell
docker compose up
```

This starts:

- Postgres on `:5432`
- FastAPI on `:8000`
- Next.js on `:3000`

## Vercel Deploy

Import the repository root into Vercel. Do not set the Vercel root directory to `apps/web`; the root `vercel.json` already handles the build path.

Set the environment variables listed in `.env.example`, especially:

```text
DATABASE_URL
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_JWT_SECRET
DEEPSEEK_API_KEY
DEEPSEEK_BASE_URL
DEEPSEEK_MODEL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Leave `NEXT_PUBLIC_API_BASE_URL` unset on Vercel so frontend requests use same-origin `/api`.

Run database migrations against Supabase before using the deployed app:

```powershell
cd apps/api
$env:DATABASE_URL="postgresql+psycopg://postgres:<password>@<host>:5432/postgres"
alembic upgrade head
```

Use Supabase's direct/session database connection for migrations, not the transaction pooler.

## Tests

```powershell
cd apps/api
pytest
```
