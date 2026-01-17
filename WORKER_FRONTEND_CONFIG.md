# Cloudflare Worker Backend Configuration

## Overview

This document explains how to configure the frontend to use the Cloudflare Worker backend instead of the traditional Strapi backend.

## Environment Variables

Update your `.env.local` file in the `frontend/` directory:

```bash
# Replace Strapi URLs with your Worker URL
NEXT_PUBLIC_STRAPI_URL=https://your-worker.workers.dev
NEXT_PUBLIC_STRAPI_API_URL=https://your-worker.workers.dev/api
```

**Note**: The variable names remain `NEXT_PUBLIC_STRAPI_URL` and `NEXT_PUBLIC_STRAPI_API_URL` for backward compatibility, but they now point to the Worker endpoints.

## API Compatibility

The Worker backend implements the same API response format as Strapi, so no code changes are required in:
- `frontend/lib/strapi.ts`
- `frontend/types/strapi.ts`
- Any component consuming the API

## Response Format

Both backends return responses in this format:

### Single Type (e.g., Introduction)
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "fullName": "John Doe",
      "title": "Software Engineer",
      ...
    }
  }
}
```

### Collection Type (e.g., Work Experiences, Blogs)
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "company": "Tech Corp",
        ...
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 1,
      "total": 5
    }
  }
}
```

## Deployment Steps

1. **Deploy the Worker**:
   ```bash
   cd backend-worker
   npm install
   npm run build
   npm run deploy
   ```

2. **Update Frontend Environment**:
   - Update `.env.local` with the Worker URL
   - Or set environment variables in your deployment platform (Vercel, Netlify, etc.)

3. **Deploy Frontend**:
   ```bash
   cd frontend
   npm run build
   npm start
   ```

## Testing Locally

1. **Start the Worker locally**:
   ```bash
   cd backend-worker
   npm run dev
   # Worker runs on http://localhost:8787
   ```

2. **Update frontend `.env.local`**:
   ```bash
   NEXT_PUBLIC_STRAPI_URL=http://localhost:8787
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:8787/api
   ```

3. **Start frontend**:
   ```bash
   cd frontend
   npm run dev
   # Frontend runs on http://localhost:3000
   ```

## GitHub Secrets

For CI/CD via `.github/workflows/worker.yml`, configure these secrets in your GitHub repository:

- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: API token with Workers edit permissions
- `CLOUDFLARE_ZONE_ID`: Zone ID if using custom domain routing
- `CLOUDFLARE_D1_ID`: D1 database ID
- `CLOUDFLARE_R2_BUCKET`: R2 bucket name for CV storage
- `CLOUDFLARE_ROUTE`: Custom route/domain (optional)
- `WORKER_NAME`: Name of your worker (e.g., `portfolio-api`)

## Verifying the Switch

After deploying and updating environment variables, verify the frontend is using the Worker:

1. Open browser DevTools → Network tab
2. Navigate to your frontend
3. Check API requests - they should point to your Worker URL (e.g., `https://your-worker.workers.dev/api/...`)
4. Verify responses have the expected data structure

## Troubleshooting

### CORS Issues
- The Worker includes CORS middleware by default (`cors()` in `src/index.ts`)
- If you encounter CORS errors, verify the Worker is deployed correctly

### 404 Errors
- Ensure the Worker route matches your configuration
- Check `wrangler.toml` and `serverless.yml` for route settings

### Data Not Loading
- Verify D1 database has been seeded with data (see `MIGRATION.md`)
- Check Worker logs: `wrangler tail <worker-name>`

## Reverting to Strapi

To switch back to the traditional Strapi backend:

1. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
   ```

2. Ensure Strapi is running
3. Restart the frontend dev server

No code changes required!
