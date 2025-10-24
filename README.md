# Portfolio Management System

A complete portfolio management system with **Strapi CMS** backend and **Next.js** frontend. Manage your professional content and automatically generate a beautiful portfolio website and CV.

## 🚀 Features

### Backend (Strapi)
- 📝 **Content Management**: Easy-to-use admin panel
- 👤 **Introduction**: Personal info, skills, contact details
- 💼 **Work Experience**: Professional history with achievements
- 📰 **Blog**: Write and publish articles
- 📄 **Auto CV Generation**: Generates static HTML CV automatically

### Frontend (Next.js)
- 🎨 **Modern Design**: Beautiful, responsive UI with Tailwind CSS
- ⚡ **Fast Performance**: Built with Next.js 14 App Router
- 📱 **Mobile Friendly**: Works perfectly on all devices
- 🔄 **Auto Updates**: Content syncs from Strapi every 60 seconds
- 🖼️ **Optimized Images**: Automatic image optimization

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Content Management](#content-management)
- [Deployment](#deployment)
- [Documentation](#documentation)

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ or 20+
- Yarn package manager
- PostgreSQL 12+ ([Install guide](./POSTGRES_SETUP.md))

### Quick Start (Recommended)

**1. Install PostgreSQL:**
```bash
# macOS
brew install postgresql@14
brew services start postgresql@14

# Create database (on port 5433)
createdb -h 127.0.0.1 -p 5433 -U postgres portfolio
```

**Or use Docker (easiest):**
```bash
docker run -d --name portfolio-postgres \
  -e POSTGRES_DB=portfolio \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5433:5432 postgres:14-alpine
```

See [POSTGRES_SETUP.md](./POSTGRES_SETUP.md) for detailed instructions.

**2. Install and Start:**
```bash
# Install all dependencies for both backend and frontend
yarn install

# Start both services at once
yarn dev
```

**What this does:**
- Uses Yarn workspaces to manage both backend and frontend
- Installs all dependencies in one command
- Starts both services concurrently

**Access your applications:**
- **Strapi Admin**: http://localhost:1337/admin  
- **Frontend**: http://localhost:3000

### 3. Initial Setup

1. **Create Admin Account**
   - Open `http://localhost:1337/admin`
   - Fill in your admin credentials

2. **Set Permissions** (Important - fixes "Forbidden" errors!)
   - Go to: **Settings → Roles → Public**
   - Enable: `find` + `findOne` for Blog, Work-experience
   - Enable: `find` for Introduction
   - Click **Save**
   - See [PERMISSIONS_SETUP.md](./PERMISSIONS_SETUP.md) for details

3. **Add Content**
   - Introduction (your personal info)
   - Work Experience (and click **Publish**)
   - Blog posts (and click **Publish**)

4. **View Your Portfolio**
   - Frontend: `http://localhost:3000`
   - CV: `http://localhost:3000/cv`

## 📁 Project Structure

```
portfolio-management/
├── backend/                   # Strapi CMS (Backend)
│   ├── config/               # Strapi configuration
│   ├── src/                  # Strapi source
│   │   ├── api/
│   │   │   ├── introduction/      # Personal information (single type)
│   │   │   ├── work-experience/   # Work history (collection)
│   │   │   ├── blog/              # Blog posts (collection)
│   │   │   └── cv-generator/      # CV generation service
│   │   └── index.js
│   ├── public/               # Static files & uploads
│   │   └── cv.html          # Auto-generated CV
│   ├── database/             # SQLite database
│   └── package.json
├── frontend/                  # Next.js Frontend
│   ├── app/                  # Pages (App Router)
│   ├── components/           # React components
│   ├── lib/                  # API & utilities
│   ├── types/                # TypeScript types
│   └── package.json
├── package.json              # Root workspace config
├── GET_STARTED.md            # Quick start guide
├── PORTFOLIO_SETUP.md        # Detailed backend docs
├── FRONTEND_SETUP.md         # Detailed frontend docs
└── README.md                 # This file
```

## 🎯 Backend Setup

### Strapi Content Types

#### 1. Introduction (Single Type)
Your personal information and contact details.

**Fields:**
- Full Name, Title, Email, Phone
- Location, Website, LinkedIn, GitHub
- Summary (rich text)
- Skills (JSON array)
- Avatar (image)

**Example Skills:**
```json
["JavaScript", "React", "Node.js", "Python", "AWS"]
```

#### 2. Work Experience (Collection Type)
Your professional work history.

**Fields:**
- Company, Position, Location
- Start Date, End Date, Current (boolean)
- Description (rich text)
- Achievements (JSON array)
- Technologies (JSON array)
- Order (number for sorting)

**Example Achievements:**
```json
[
  "Led team of 5 developers",
  "Improved performance by 40%",
  "Reduced deployment time by 60%"
]
```

#### 3. Blog (Collection Type)
Blog posts and articles.

**Fields:**
- Title, Slug, Description
- Content (rich text)
- Featured Image
- Published Date
- Tags (JSON array)
- Author, Reading Time

### CV Generation

The CV is **automatically generated** when you:
- Create/update/delete Introduction
- Create/update/delete Work Experience
- Create/update/delete Blog posts

Generated CV is saved to: `backend/public/cv.html`

**Manual generation:**
```bash
curl -X POST http://localhost:1337/api/cv-generator/generate
```

## 💻 Frontend Setup

### Pages

| Page | Description |
|------|-------------|
| `/` | Home with introduction, skills, recent work, and blogs |
| `/experience` | Complete work history |
| `/blog` | All blog posts |
| `/blog/[slug]` | Individual blog post |
| `/cv` | Auto-generated CV viewer |

### Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

### Development

```bash
cd frontend
yarn install
yarn dev
```

Visit: **http://localhost:3000**

### Production Build

```bash
cd frontend
yarn build
yarn start
```

## 📝 Content Management

### Adding Content

1. **Log in to Strapi**: `http://localhost:1337/admin`

2. **Add Introduction**:
   - Content Manager → Introduction
   - Fill in your details
   - Save

3. **Add Work Experience**:
   - Content Manager → Work Experience
   - Create new entry
   - Fill in details
   - **Publish** the entry

4. **Add Blog Posts**:
   - Content Manager → Blog
   - Create new entry
   - Write content
   - **Publish** the entry

5. **View Your Site**: Visit `http://localhost:3000`

### Important Notes

- ✅ Always **Publish** content (draft content won't appear)
- ✅ CV regenerates automatically on content changes
- ✅ Frontend updates within 60 seconds
- ✅ Use JSON arrays for skills, tags, achievements, etc.

## 🚀 Deployment

### Backend (Strapi)

**Options:**
- Heroku
- DigitalOcean
- AWS
- Railway
- Render

**Development:**
```bash
cd backend
yarn develop  # Auto-reload on changes
```

**Production with PM2** (recommended):
```bash
cd backend
yarn build     # Build admin panel
yarn pm2:start # Start with PM2 process manager
```

PM2 provides:
- Auto-restart on crashes
- Process monitoring
- Log management
- Memory management

See **[PM2_GUIDE.md](./PM2_GUIDE.md)** for complete PM2 documentation.

**Production Steps:**
1. Set up PostgreSQL database
2. Configure environment variables in `backend/.env`
3. Build: `cd backend && yarn build`
4. Start: `yarn pm2:start` (or `yarn start` without PM2)

### Frontend (Next.js)

**Recommended: Vercel**

1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy!

**Other options:**
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Self-hosted

### Environment Variables for Production

**Backend:**
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
DATABASE_URL=your-database-url
```

**Frontend:**
```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-domain.com/api
```

## 📚 Documentation

Detailed documentation is available in:

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[PORTFOLIO_SETUP.md](./PORTFOLIO_SETUP.md)** - Complete Strapi backend guide
- **[FRONTEND_SETUP.md](./FRONTEND_SETUP.md)** - Complete Next.js frontend guide
- **[PM2_GUIDE.md](./PM2_GUIDE.md)** - PM2 process manager guide
- **[frontend/README.md](./frontend/README.md)** - Frontend technical details

## 🛠️ Tech Stack

### Backend
- **Strapi 4.10.7** - Headless CMS
- **PostgreSQL** - Database
- **PM2** - Process manager (production)
- **Node.js** - Runtime

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Markdown** - Markdown rendering

## 🔧 Common Issues

### Content not showing on frontend?

1. ✅ Check Strapi is running
2. ✅ Verify content is published (not draft)
3. ✅ Check public permissions in Strapi
4. ✅ Wait 60 seconds or hard refresh

### CV not generating?

1. ✅ Check `backend/public` folder exists and is writable
2. ✅ Verify you have published content
3. ✅ Check Strapi logs for errors

### Images not loading?

1. ✅ Check `next.config.js` has correct image domains
2. ✅ Verify images are uploaded in Strapi
3. ✅ Check CORS settings

## 🎨 Customization

### Change Colors

Edit `frontend/tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#667eea',  // Your primary color
  },
}
```

### Modify CV Template

Edit `backend/src/api/cv-generator/services/cv-generator.js`

### Add New Content Types

1. Create new content type in Strapi
2. Add API integration in `frontend/lib/strapi.ts`
3. Create types in `frontend/types/strapi.ts`
4. Build UI components

## 📖 API Endpoints

### Strapi API

```
GET  /api/introduction              # Get introduction
GET  /api/work-experiences          # List work experiences
GET  /api/blogs                     # List blog posts
GET  /api/blogs/:id                 # Get single blog
POST /api/cv-generator/generate     # Generate CV
GET  /cv.html                       # View generated CV
```

## 🤝 Contributing

Feel free to customize and extend this project for your needs!

## 📄 License

MIT

## 🙏 Support

For issues or questions:

1. Check the documentation files
2. Review Strapi docs: https://docs.strapi.io
3. Review Next.js docs: https://nextjs.org/docs

---

Built with ❤️ using Strapi and Next.js
