# Deployment

Use Vercel for the production app.

## Production: Vercel

The repository root is the Vercel project. The root `vercel.json` builds the Next.js app in `apps/web` and exposes the FastAPI backend through `api/index.py`.

Follow [VERCEL.md](./VERCEL.md).

## Database

The app uses Supabase Postgres. Run migrations from `apps/api` before using a new deployment:

```powershell
cd apps/api
$env:DATABASE_URL="postgresql+psycopg://postgres:<password>@<host>:5432/postgres"
alembic upgrade head
```

Use Supabase's direct/session database connection for migrations.

## Legacy Render Blueprint

`render.yaml` is kept for the older three-service Render deployment. It uses the FastAPI backend plus the legacy Vite dashboard and customer apps under `legacy/`.
