# 🚀 Get Started in 3 Steps

Welcome! This guide will get your portfolio up and running in minutes.

## What You're Building

A complete portfolio system with:
- ✅ **Strapi CMS** for content management (in `backend/`)
- ✅ **Next.js Frontend** for your public portfolio (in `frontend/`)
- ✅ **Auto-generated CV** in beautiful HTML

## Prerequisites

- Node.js 18+ installed ([Download here](https://nodejs.org/))
- Yarn package manager ([Install with](https://yarnpkg.com/): `npm install -g yarn`)
- PostgreSQL 12+ ([See setup guide](./POSTGRES_SETUP.md))
- A terminal/command prompt
- A web browser

## Quick Start (Recommended)

**1. Setup PostgreSQL:**

**Option A - Docker (Easiest):**
```bash
docker run -d --name portfolio-postgres \
  -e POSTGRES_DB=portfolio \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5433:5432 postgres:14-alpine
```

**Option B - macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
createdb -h 127.0.0.1 -p 5433 -U postgres portfolio
```

See [POSTGRES_SETUP.md](./POSTGRES_SETUP.md) for other platforms.

**2. Install and Run:**
```bash
# Install all dependencies (uses yarn workspaces)
yarn install

# Start both backend and frontend
yarn dev
```

That's it! Open:
- **Frontend**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin

## Step-by-Step Setup

### Step 1: Start the Services (2 minutes)

**From project root:**
```bash
# Install dependencies for both backend and frontend
yarn install

# Start both services
yarn dev
```

**Or start individually:**
```bash
yarn dev:backend    # Backend only
yarn dev:frontend   # Frontend only
```

**What happens:**
- Backend (Strapi) starts on `http://localhost:1337`
- Frontend (Next.js) starts on `http://localhost:3000`
- Admin panel opens automatically in your browser

**Create your admin account:**
1. Fill in Email, Password, First Name, Last Name
2. Click "Let's start"
3. You're in! 🎉

### Step 2: Set Permissions (Important!) (1 minute)

**This fixes the "Forbidden" error on the frontend!**

1. Go to `http://localhost:1337/admin`
2. Click **Settings** (⚙️ bottom left) → **Roles** (under Users & Permissions)
3. Click **Public** role
4. Scroll down and enable these checkboxes:
   - ✅ **Blog** → `find` + `findOne`
   - ✅ **Introduction** → `find`
   - ✅ **Work-experience** → `find` + `findOne`
5. Click **Save** (top right)

**Without this step, the frontend will show "Forbidden" errors!**

See [PERMISSIONS_SETUP.md](./PERMISSIONS_SETUP.md) for detailed guide with screenshots.

### Step 3: Add Your Content (5 minutes)

#### 3.1 Add Your Introduction

1. Click **Content Manager** (top left)
2. Click **Introduction** (under Single Types)
3. Click **"Create new entry"** or edit existing
4. Fill in your information:

   ```
   Full Name: John Doe
   Title: Full Stack Developer
   Email: john@example.com
   Phone: +1 234 567 8900
   Location: San Francisco, CA
   LinkedIn: https://linkedin.com/in/johndoe
   GitHub: https://github.com/johndoe
   Summary: Passionate software engineer with 5+ years...
   ```

5. For **Skills**, click and add as JSON:
   ```json
   ["JavaScript", "React", "Node.js", "Python", "AWS"]
   ```

6. Click **Save** (top right)

#### 3.2 Add Work Experience

1. Click **Work Experience** (under Collection Types)
2. Click **"Create new entry"**
3. Fill in details:

   ```
   Company: Tech Corp
   Position: Senior Developer
   Location: San Francisco, CA
   Start Date: 2020-01-01
   Current: ☑️ (check this box)
   Description: Led development of...
   Order: 1
   ```

4. For **Achievements**, add as JSON:
   ```json
   [
     "Led team of 5 developers",
     "Improved app performance by 40%",
     "Implemented CI/CD pipeline"
   ]
   ```

5. For **Technologies**, add as JSON:
   ```json
   ["React", "TypeScript", "AWS", "Docker"]
   ```

6. Click **Save** (top right)
7. Click **Publish** (top right) - **Important!**

#### 3.3 Add a Blog Post (Optional)

1. Click **Blog** (under Collection Types)
2. Click **"Create new entry"**
3. Fill in:

   ```
   Title: My First Blog Post
   Description: A short introduction to this blog
   Content: Welcome to my blog! Today I want to share...
   Published Date: 2024-01-15
   ```

4. For **Tags**, add as JSON:
   ```json
   ["Tutorial", "JavaScript"]
   ```

5. Click **Save** and then **Publish**

## View Your Portfolio! 🎉

1. Go to `http://localhost:3000`
2. Refresh the page if needed
3. You should now see:
   - ✅ Your introduction and photo
   - ✅ Your skills
   - ✅ Work experience
   - ✅ Blog posts (if added)

### Explore Your Site

- **Home**: `http://localhost:3000/`
- **Experience**: `http://localhost:3000/experience`
- **Blog**: `http://localhost:3000/blog`
- **CV**: `http://localhost:3000/cv`

## What's Next?

### Customize Your Portfolio

1. **Change Colors**: Edit `frontend/tailwind.config.ts`
2. **Modify Layout**: Edit files in `frontend/components/`
3. **Add More Content**: Keep adding experiences and blog posts

### Deploy to Production

See [README.md](./README.md) for deployment instructions to:
- Vercel (Frontend)
- Heroku, Railway, or Render (Backend)

## Troubleshooting

### Content not showing?

**Solution 1**: Make sure you clicked **Publish** (not just Save)  
**Solution 2**: Check permissions are set correctly (Step 2)  
**Solution 3**: Wait 60 seconds or hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### "Failed to fetch from Strapi" error?

**Check:**
1. ✅ Backend is running on `http://localhost:1337`
2. ✅ Permissions are set for Public role
3. ✅ Content is published (not draft)

### Port already in use?

```bash
# Kill process on port 1337 (backend)
lsof -ti:1337 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Yarn not installed?

```bash
npm install -g yarn
```

## Easy Startup Script

Instead of running commands, use the startup script:

```bash
# Make script executable (first time only)
chmod +x start-dev.sh

# Run both services
./start-dev.sh
```

This starts both backend and frontend together!

## Quick Tips

### JSON Arrays

When adding skills, tags, achievements, or technologies:

✅ **Correct:**
```json
["Item 1", "Item 2", "Item 3"]
```

❌ **Wrong:**
```
Item 1, Item 2, Item 3
```

### Publishing Content

- **Draft**: Only you can see it in Strapi
- **Published**: Appears on your public website

Always click **Publish** after saving!

### CV Generation

Your CV is automatically generated and available at:
- **View**: `http://localhost:3000/cv`
- **Direct**: `http://localhost:1337/cv.html`
- **File**: `backend/public/cv.html`

It updates automatically whenever you change content!

## Documentation

For more detailed information:

- **[README.md](./README.md)** - Complete project overview
- **[PORTFOLIO_SETUP.md](./PORTFOLIO_SETUP.md)** - Backend details
- **[FRONTEND_SETUP.md](./FRONTEND_SETUP.md)** - Frontend details

## Need Help?

1. Check the documentation files above
2. Review error messages in terminal
3. Check browser console (F12) for errors
4. Verify Strapi is running and accessible

## Congratulations! 🎊

You now have a fully functional portfolio system!

Keep adding content, customize the design, and when you're ready, deploy to production.

Happy portfolio building! 🚀

---

**Quick Commands Reference:**

```bash
# Install everything (yarn workspaces)
yarn install

# Start both services
yarn dev

# Or start individually:
yarn dev:backend    # Backend only
yarn dev:frontend   # Frontend only

# Or use the script
./start-dev.sh

# Build for production
yarn build
```

**Project Structure:**
```
portfolio-management/
├── backend/      # Strapi CMS
├── frontend/     # Next.js app
└── package.json  # Workspace config
```

**URLs:**
- Strapi Admin: `http://localhost:1337/admin`
- Frontend: `http://localhost:3000`
- CV: `http://localhost:3000/cv`
