# Cloudflare Worker Quick Reference

Quick commands and notes for working with the Cloudflare Worker backend.

## Installation

```bash
cd backend-worker
npm install
```

## Local Development

```bash
# Start local development server (uses Wrangler miniflare)
npm run dev

# Worker runs on: http://localhost:8787
# API endpoint: http://localhost:8787/api
```

## Database (D1)

### Initialize Schema
```bash
# Development
wrangler d1 execute portfolio --file db/schema.sql --env dev

# Production
wrangler d1 execute portfolio --file db/schema.sql --env production
```

### Query Database
```bash
# List tables
wrangler d1 execute portfolio --command "SELECT name FROM sqlite_master WHERE type='table'" --env dev

# View data
wrangler d1 execute portfolio --command "SELECT * FROM introductions" --env dev
wrangler d1 execute portfolio --command "SELECT * FROM work_experiences" --env dev
wrangler d1 execute portfolio --command "SELECT * FROM blogs" --env dev
```

### Import Data
```bash
# Create seed_data.sql with your data, then:
wrangler d1 execute portfolio --file seed_data.sql --env dev
```

## Building

```bash
# Type check
npm run typecheck

# Build (compiles TypeScript)
npm run build
```

## Deployment

### Option 1: Wrangler (Direct)
```bash
npm run deploy
```

### Option 2: Serverless Framework
```bash
npm run deploy:serverless
```

### Option 3: GitHub Actions
Push to `main` branch - automatic deployment via `.github/workflows/worker.yml`

## Environment Variables

Set in `wrangler.toml` under `[env.production.vars]` or via dashboard:

- `ADMIN_TOKEN` - Optional token for CV generation endpoint
- `PUBLIC_BASE_URL` - Base URL for public CV links

## Bindings

### D1 Database
- Binding name: `DB`
- Type: D1 database
- Access: `env.DB` in Worker code

### R2 Bucket
- Binding name: `CV_BUCKET`
- Type: R2 bucket
- Access: `env.CV_BUCKET` in Worker code

## API Endpoints

All endpoints mirror Strapi's API format:

```bash
# Health check
GET /api/health

# Introduction (single type)
GET /api/introduction

# Work experiences (collection)
GET /api/work-experiences

# Blogs (collection with filtering)
GET /api/blogs
GET /api/blogs?filters[slug][$eq]=my-post
GET /api/blogs?pagination[page]=1&pagination[pageSize]=10

# Contact form
POST /api/contact-requests
{
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Hello",
    "message": "Message here"
  }
}

# CV generation (optional auth)
POST /api/cv-generator/generate
Headers: Authorization: Bearer <ADMIN_TOKEN>
```

## Testing

### Local Test
```bash
# Terminal 1: Start Worker
cd backend-worker
npm run dev

# Terminal 2: Test endpoints
curl http://localhost:8787/api/health
curl http://localhost:8787/api/introduction
curl http://localhost:8787/api/work-experiences
curl http://localhost:8787/api/blogs
```

### Production Test
```bash
curl https://your-worker.workers.dev/api/health
curl https://your-worker.workers.dev/api/introduction
```

## Logs

```bash
# Tail live logs
wrangler tail <worker-name>

# With filtering
wrangler tail <worker-name> --status error
```

## Frontend Configuration

Update `frontend/.env.local`:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:8787
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:8787/api
```

For production:
```bash
NEXT_PUBLIC_STRAPI_URL=https://your-worker.workers.dev
NEXT_PUBLIC_STRAPI_API_URL=https://your-worker.workers.dev/api
```

## Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run typecheck

# Build
npm run build

# Deploy
npm run deploy

# Initialize D1 schema
wrangler d1 execute portfolio --file db/schema.sql --env dev

# Query D1
wrangler d1 execute portfolio --command "SELECT * FROM introductions" --env dev

# View logs
wrangler tail <worker-name>
```

## File Structure

```
backend-worker/
├── src/
│   ├── index.ts                    # Main app + routes
│   ├── bindings.ts                 # Cloudflare bindings types
│   ├── types.ts                    # Domain types
│   ├── repositories/
│   │   └── portfolioRepository.ts  # D1 data access
│   ├── services/
│   │   └── cvGenerator.ts          # CV generation
│   └── utils/
│       ├── response.ts             # Response helpers
│       └── validation.ts           # Input validation
├── db/
│   └── schema.sql                  # D1 schema
├── wrangler.toml                   # Wrangler config
├── serverless.yml                  # Serverless Framework config
├── package.json
├── tsconfig.json
└── README.md
```

## Troubleshooting

### Worker not deploying
1. Check `wrangler.toml` has correct account_id
2. Verify D1 database exists: `wrangler d1 list`
3. Verify R2 bucket exists: `wrangler r2 bucket list`

### Database empty
1. Run schema: `wrangler d1 execute portfolio --file db/schema.sql --env dev`
2. Import data: See `MIGRATION.md`

### CORS errors
- CORS is enabled by default in `src/index.ts`
- Verify Worker is deployed correctly

### 404 errors
- Check routes in `wrangler.toml`
- Verify Worker name matches deployment

## Resources

- Wrangler docs: https://developers.cloudflare.com/workers/wrangler/
- D1 docs: https://developers.cloudflare.com/d1/
- R2 docs: https://developers.cloudflare.com/r2/
- Hono docs: https://hono.dev/
