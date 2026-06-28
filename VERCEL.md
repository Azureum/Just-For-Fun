# Vercel Deployment

This repo is organized for a single Vercel project from the repository root.

## How It Works

- `apps/web/` is the Next.js React TypeScript Tailwind frontend.
- `apps/api/` is the FastAPI backend.
- `api/index.py` imports the FastAPI app for Vercel's Python runtime.
- `vercel.json` builds `apps/web` and rewrites `/api/*` to `api/index.py`.

## Create The Vercel Project

1. Push this repo to GitHub.
2. In Vercel, import the repo.
3. Keep the project root as the repository root.
4. Do not set Root Directory to `apps/web`.
5. Deploy after adding environment variables.

## Environment Variables

Set these in Vercel:

```text
DATABASE_URL=postgresql+psycopg://postgres:<password>@<host>:5432/postgres
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
SUPABASE_JWT_SECRET=<jwt-secret-if-your-project-uses-HS256>
DEEPSEEK_API_KEY=<deepseek-key>
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-chat
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

Leave this unset in Vercel:

```text
NEXT_PUBLIC_API_BASE_URL
```

## Database Migrations

Run migrations against Supabase before using the app:

```powershell
cd apps/api
$env:DATABASE_URL="postgresql+psycopg://postgres:<password>@<host>:5432/postgres"
alembic upgrade head
```

Use the direct/session Supabase database connection for migrations, not the transaction pooler.

## Local Development

Run the backend:

```powershell
cd apps/api
python -m uvicorn app.main:app --reload
```

Run the Next app:

```powershell
cd apps/web
npm install
$env:NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
$env:NEXT_PUBLIC_SUPABASE_URL="https://<project-ref>.supabase.co"
$env:NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"
npm run dev
```
