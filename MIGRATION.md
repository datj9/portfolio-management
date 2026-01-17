# Data Migration Guide: Strapi (Postgres) to Cloudflare D1

This guide explains how to migrate your data from the existing Strapi Postgres database to Cloudflare D1 for the Worker-based backend.

## Prerequisites

- Access to your Postgres database (via command line or a tool like DBeaver/PgAdmin).
- `wrangler` CLI installed and authenticated (`npm install -g wrangler && wrangler login`).
- The D1 database initialized with the schema (see `backend-worker/README.md`).

## 1. Export Data from Postgres

You need to extract data from specific tables in Postgres. Strapi table names might differ slightly (often prefixed or pluralized). Common mappings:

- `introductions` -> `introductions`
- `work_experiences` -> `work_experiences`
- `blogs` -> `blogs`
- `contact_requests` -> `contact_requests`
- `generated_profiles` -> `generated_profiles`

### SQL Export Query (Example)

Run these queries against your Postgres DB to get JSON-formatted data, which is easier to manipulate for D1 import.

#### Introductions
```sql
SELECT json_agg(t) FROM (
  SELECT full_name, title, email, phone, location, website, linkedin, github, summary, skills, 
  (SELECT url FROM files WHERE files.id = introductions.avatar_id) as avatar_url
  FROM introductions
) t;
```

#### Work Experiences
```sql
SELECT json_agg(t) FROM (
  SELECT company, position, location, start_date, end_date, current, description, achievements, technologies, "order", company_url, published_at
  FROM work_experiences
  WHERE published_at IS NOT NULL
) t;
```

#### Blogs
```sql
SELECT json_agg(t) FROM (
  SELECT title, slug, description, content, published_date, tags, author, reading_time, published_at,
  (SELECT url FROM files WHERE files.id = blogs.featured_image_id) as featured_image_url
  FROM blogs
  WHERE published_at IS NOT NULL
) t;
```

## 2. Prepare SQL for D1

Create a file named `seed_data.sql` and format the exported data into INSERT statements compatible with SQLite/D1.

> **Note**: Arrays (skills, tags, etc.) in Postgres might need to be converted to JSON strings or comma-separated strings depending on how you want to store them in SQLite. The Worker expects JSON strings for arrays.

Example `seed_data.sql`:

```sql
-- Introductions
INSERT INTO introductions (full_name, title, email, phone, location, website, linkedin, github, summary, skills, avatar_url) 
VALUES ('John Doe', 'Developer', 'john@example.com', '+1234567890', 'New York', 'https://example.com', 'https://linkedin.com/in/johndoe', 'https://github.com/johndoe', 'Summary here...', '["React","Node.js"]', 'https://your-bucket.r2.dev/avatar.jpg');

-- Work Experiences
INSERT INTO work_experiences (company, position, location, start_date, end_date, current, description, achievements, technologies, "order", company_url, published_at)
VALUES ('Tech Corp', 'Senior Engineer', 'Remote', '2020-01-01', NULL, 1, 'Description...', '["Achievement 1"]', '["Go","Rust"]', 1, 'https://techcorp.com', '2023-01-01T00:00:00Z');

-- Blogs
INSERT INTO blogs (title, slug, description, content, featured_image_url, published_date, tags, author, reading_time, published_at)
VALUES ('My First Post', 'my-first-post', 'Description...', '# Hello World', NULL, '2023-10-01', '["coding"]', 'John Doe', 5, '2023-10-01T00:00:00Z');
```

## 3. Import into D1

Use `wrangler` to execute the SQL file against your D1 database.

**Local (Dev):**
```bash
wrangler d1 execute portfolio --file seed_data.sql --env dev
```

**Production:**
```bash
wrangler d1 execute portfolio --file seed_data.sql --env production
```

## 4. Verify Data

Check if data is loaded correctly:

```bash
wrangler d1 execute portfolio --command "SELECT * FROM introductions" --env dev
```
