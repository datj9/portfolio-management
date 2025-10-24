# Environment Variables Template

Create a `backend/.env` file with these contents:

```env
# Server
HOST=0.0.0.0
PORT=1337

# Secrets (generate with: openssl rand -base64 32)
APP_KEYS=toBeModified1,toBeModified2
API_TOKEN_SALT=toBeModified
ADMIN_JWT_SECRET=toBeModified
JWT_SECRET=toBeModified

# Database (PostgreSQL on port 5433)
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5433
DATABASE_NAME=portfolio
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=
DATABASE_SSL=false
```

## Generate Random Secrets

Run this command to generate a random secret:

```bash
openssl rand -base64 32
```

Replace each `toBeModified` value with a unique generated secret.

## Quick Setup

```bash
# Copy this template
cat backend/ENV_TEMPLATE.md

# Create .env file
cat > backend/.env << 'EOF'
HOST=0.0.0.0
PORT=1337

APP_KEYS=$(openssl rand -base64 32),$(openssl rand -base64 32)
API_TOKEN_SALT=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)

DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5433
DATABASE_NAME=portfolio
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=
DATABASE_SSL=false
EOF
```

## PostgreSQL on Port 5433

This project uses PostgreSQL on port **5433** (instead of default 5432).

### Start PostgreSQL on Port 5433

**macOS (Homebrew):**
```bash
# If using default port, change it
brew services stop postgresql@14

# Edit postgresql.conf to use port 5433
# Location: /opt/homebrew/var/postgresql@14/postgresql.conf
# Change: port = 5433

brew services start postgresql@14
```

**Or use PostgreSQL.app:**
- Open PostgreSQL.app
- Click Initialize
- In Preferences, set Port to 5433

**Docker (easiest):**
```bash
docker run -d \
  --name portfolio-postgres \
  -e POSTGRES_DB=portfolio \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD= \
  -p 5433:5432 \
  postgres:14-alpine
```

### Connect to Database

```bash
# Connect via psql
psql -h 127.0.0.1 -p 5433 -U postgres -d portfolio

# Create database if needed
createdb -h 127.0.0.1 -p 5433 -U postgres portfolio
```

