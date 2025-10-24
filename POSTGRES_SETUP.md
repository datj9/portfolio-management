# PostgreSQL Setup Guide

The backend now uses PostgreSQL instead of SQLite. This avoids native module compilation issues.

## Quick Setup

### 1. Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
# Connect to PostgreSQL (using port 5433)
psql -h 127.0.0.1 -p 5433 -U postgres

# Create database
CREATE DATABASE portfolio;

# Create user (optional, if you want a specific user)
CREATE USER portfolio_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio TO portfolio_user;

# Exit
\q
```

**Or use command line:**
```bash
createdb -h 127.0.0.1 -p 5433 -U postgres portfolio
```

### 3. Configure Strapi

Create `backend/.env` file (see `backend/ENV_TEMPLATE.md` for full template):

```env
HOST=0.0.0.0
PORT=1337

# Generate random secrets with: openssl rand -base64 32
APP_KEYS=your-random-key-1,your-random-key-2
API_TOKEN_SALT=your-random-salt
ADMIN_JWT_SECRET=your-random-secret
JWT_SECRET=your-random-secret

# Database (using port 5433)
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5433
DATABASE_NAME=portfolio
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=
```

### 4. Install and Run

```bash
# Install dependencies (no more better-sqlite3 issues!)
yarn install

# Start the application
yarn dev
```

## PostgreSQL.app (macOS Alternative)

For a simpler macOS setup, use PostgreSQL.app:

1. Download from [postgresapp.com](https://postgresapp.com/)
2. Install and open PostgreSQL.app
3. Click "Initialize" to create a new server
4. Database will be available at `localhost:5432`

## Using Docker (Cross-platform)

If you prefer Docker (easiest option!):

```bash
# Run PostgreSQL in Docker (mapped to port 5433)
docker run -d \
  --name portfolio-postgres \
  -e POSTGRES_DB=portfolio \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5433:5432 \
  postgres:14-alpine

# Update backend/.env
DATABASE_PORT=5433
DATABASE_PASSWORD=postgres
```

This maps PostgreSQL's internal port 5432 to host port 5433.

## Environment Variables

Create `backend/.env` (copy from `backend/.env.example`):

```env
HOST=0.0.0.0
PORT=1337

# Generate random secrets:
APP_KEYS=generateRandomString1,generateRandomString2
API_TOKEN_SALT=generateRandomString
ADMIN_JWT_SECRET=generateRandomString
JWT_SECRET=generateRandomString

# Database
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=portfolio
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=
```

**Generate random secrets:**
```bash
openssl rand -base64 32
```

## Verify Connection

```bash
# Test PostgreSQL connection (port 5433)
psql -h 127.0.0.1 -p 5433 -U postgres -d portfolio

# Should connect successfully
# Type \q to exit
```

## Common Issues

### "Connection refused"
PostgreSQL is not running. Start it:
```bash
brew services start postgresql@14
# or
sudo systemctl start postgresql
```

### "Database does not exist"
Create the database:
```bash
createdb portfolio
# or
psql postgres -c "CREATE DATABASE portfolio;"
```

### "Password authentication failed"
1. Check your password in `backend/.env`
2. Or reset PostgreSQL password:
   ```bash
   psql postgres
   ALTER USER postgres WITH PASSWORD 'newpassword';
   \q
   ```

## Production Deployment

For production, use managed PostgreSQL services:

- **Heroku**: Heroku Postgres
- **Railway**: Built-in PostgreSQL
- **DigitalOcean**: Managed Databases
- **AWS**: RDS PostgreSQL
- **Google Cloud**: Cloud SQL
- **Supabase**: Free PostgreSQL database

These services provide:
- Automatic backups
- SSL connections
- Monitoring
- Scaling

## Migrating from SQLite (if needed)

If you had data in SQLite:

1. Export from SQLite:
   ```bash
   npm install -g strapi-migrate
   strapi-migrate export
   ```

2. Import to PostgreSQL:
   ```bash
   strapi-migrate import
   ```

Or start fresh - it's usually easier for development!

## Benefits of PostgreSQL

✅ **No compilation issues** - Pure JavaScript driver  
✅ **Production-ready** - Industry standard  
✅ **Better performance** - Especially for larger datasets  
✅ **Advanced features** - Full-text search, JSON fields, etc.  
✅ **Easy deployment** - Managed services available everywhere  

## Next Steps

1. ✅ Install PostgreSQL
2. ✅ Create `portfolio` database
3. ✅ Run `yarn install`
4. ✅ Run `yarn dev`
5. ✅ Create your admin account at http://localhost:1337/admin

That's it! No more compilation issues! 🎉

