# Portfolio Worker API

This directory contains the Cloudflare Worker that replaces the Strapi backend APIs.

## Endpoints

All endpoints are prefixed with `/api` to match the existing frontend calls:

- `GET /api/introduction`
- `GET /api/work-experiences`
- `GET /api/generated-profile`
- `GET /api/blogs`
- `GET /api/blogs?filters[slug][$eq]=your-slug`
- `POST /api/contact-requests`
- `POST /api/cv-generator/generate`

## Local development

Install dependencies:

```bash
cd backend-worker
npm install
```

Run the worker locally:

```bash
npm run dev
```

## Database (D1)

Use the schema in `db/schema.sql` to initialize your D1 database.

Example (wrangler):

```bash
wrangler d1 execute portfolio --file db/schema.sql --env dev
```

## R2 (CV storage)

Set `CV_BUCKET` binding in `wrangler.toml` and define `PUBLIC_BASE_URL` so the CV URL is publicly accessible.

## Admin token (optional)

If `ADMIN_TOKEN` is set, `POST /api/cv-generator/generate` requires:

- `Authorization: Bearer <token>` or
- `X-API-KEY: <token>`

## Deployment

Wrangler:

```bash
npm run build
npm run deploy
```

Serverless Framework:

```bash
npm run build
npm run deploy:serverless
```
