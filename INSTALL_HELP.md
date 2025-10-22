# Installation Help

## If Yarn Install Fails

### Option 1: Try Again with Python 3.12 (Most Common Fix)

I've created `.npmrc` files to use Python 3.12. Try installing again:

```bash
# Clean everything first
rm -rf node_modules backend/node_modules frontend/node_modules yarn.lock

# Set Python 3.12 for this session
export PYTHON=/opt/homebrew/bin/python3.12

# Try installing again
yarn install
```

### Option 2: Use Xcode Command Line Tools

If you haven't updated Xcode tools recently:

```bash
# Update Xcode command line tools
xcode-select --install

# Or if already installed, reset it
sudo xcode-select --reset

# Then try yarn install again
yarn install
```

### Option 3: Install Only Frontend (Quick Start)

If backend keeps failing, start with just the frontend:

```bash
cd frontend
yarn install
yarn dev
```

The frontend will work without the backend running. You can fix the backend separately.

### Option 4: Use PostgreSQL Instead of SQLite

SQLite's `better-sqlite3` is what's failing. Switch to PostgreSQL:

1. **Install PostgreSQL:**
   ```bash
   brew install postgresql@14
   brew services start postgresql@14
   ```

2. **Update `backend/package.json`:**
   Replace `better-sqlite3` with `pg`:
   ```json
   "dependencies": {
     "@strapi/strapi": "4.10.7",
     "@strapi/plugin-users-permissions": "4.10.7",
     "@strapi/plugin-i18n": "4.10.7",
     "pg": "^8.8.0",
     "react": "^17.0.2",
     "react-dom": "^17.0.2",
     "react-is": "^17.0.2",
     "react-router-dom": "^5.3.4",
     "styled-components": "^5.3.11"
   }
   ```

3. **Update `backend/config/database.js`:**
   ```javascript
   module.exports = ({ env }) => ({
     connection: {
       client: 'postgres',
       connection: {
         host: env('DATABASE_HOST', '127.0.0.1'),
         port: env.int('DATABASE_PORT', 5432),
         database: env('DATABASE_NAME', 'portfolio'),
         user: env('DATABASE_USERNAME', 'postgres'),
         password: env('DATABASE_PASSWORD', ''),
         ssl: env.bool('DATABASE_SSL', false),
       },
     },
   });
   ```

4. **Try installing:**
   ```bash
   yarn install
   ```

### Option 5: Try Node 18 Instead of Node 20

Strapi 4.10.7 officially supports Node 18, not Node 20:

```bash
# Install Node 18
nvm install 18
nvm use 18

# Clean and install
rm -rf node_modules backend/node_modules frontend/node_modules yarn.lock
yarn install
```

### Option 6: Skip better-sqlite3 Build

Add this to your `.yarnrc.yml`:

```yaml
nodeLinker: node-modules

nmMode: hardlinks-local

# Ignore optional dependencies
enableScripts: false
```

Then manually install without scripts:

```bash
yarn install --ignore-scripts

# Then manually build only what's needed
cd node_modules/better-sqlite3
npx node-gyp rebuild
cd ../..
```

## Recommended: Option 1 + Option 5

The most likely to work combination:

```bash
# Switch to Node 18
nvm use 18

# Clean everything
rm -rf node_modules backend/node_modules frontend/node_modules yarn.lock

# Set Python 3.12
export PYTHON=/opt/homebrew/bin/python3.12

# Install
yarn install
```

## Still Having Issues?

If all else fails, you can:

1. **Use the frontend only** for now
2. **Deploy backend to a service** that handles the build (like Railway, Heroku)
3. **Use Docker** to avoid local build issues

Let me know which option you'd like to try!

