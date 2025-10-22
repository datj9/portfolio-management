# Quick Start Guide

## Get Started in 5 Minutes

### 1. Install & Start
```bash
# From project root - installs dependencies for both backend and frontend
yarn install

# Start both backend and frontend
yarn dev
```

Or start separately:
```bash
# Backend only
yarn dev:backend

# Frontend only
yarn dev:frontend
```

### 2. Create Admin Account
1. Open `http://localhost:1337/admin`
2. Fill in the admin registration form
3. Click "Let's start"

### 3. Add Your Content

#### Add Introduction
1. Go to **Content Manager** → **Introduction**
2. Click **"Create new entry"** (or edit if exists)
3. Fill in your details:
   - Full Name: "John Doe"
   - Title: "Full Stack Developer"
   - Email: "john@example.com"
   - Summary: Your professional summary
   - Skills: `["JavaScript", "React", "Node.js", "Python"]`
4. Click **Save**

#### Add Work Experience
1. Go to **Content Manager** → **Work Experience**
2. Click **"Create new entry"**
3. Fill in:
   - Company: "Tech Corp"
   - Position: "Senior Developer"
   - Start Date: 2020-01-01
   - Current: ☑️ (or set End Date)
   - Description: Your job description
   - Achievements: `["Achievement 1", "Achievement 2"]`
   - Technologies: `["React", "Node.js", "AWS"]`
   - Order: 1 (higher numbers appear first)
4. Click **Save** and **Publish**

#### Add Blog Post
1. Go to **Content Manager** → **Blog**
2. Click **"Create new entry"**
3. Fill in:
   - Title: "My First Blog Post"
   - Slug: (auto-generated)
   - Description: Short summary
   - Content: Your blog content
   - Published Date: Today's date
   - Tags: `["JavaScript", "Tutorial"]`
4. Click **Save** and **Publish**

### 4. Set Permissions (Important!)
1. Go to **Settings** → **Users & Permissions plugin** → **Roles**
2. Click **Public**
3. Enable permissions:
   - ✅ Introduction: `find`
   - ✅ Work-experience: `find`
   - ✅ Blog: `find`
4. Click **Save**

### 5. View Your CV
Your CV is automatically generated at: `http://localhost:1337/cv.html`

## Manual CV Generation

If you want to manually regenerate your CV:

```bash
curl -X POST http://localhost:1337/api/cv-generator/generate
```

Or use Postman/Insomnia to send a POST request to:
```
http://localhost:1337/api/cv-generator/generate
```

## What Happens Automatically

✨ **Auto CV Generation**: Your CV is automatically regenerated whenever you:
- Create/update/delete your Introduction
- Create/update/delete any Work Experience
- Create/update/delete any Blog post

The system uses lifecycle hooks to detect changes and regenerate the CV immediately.

## Next Steps

1. **Customize the CV design**: Edit `src/api/cv-generator/services/cv-generator.js`
2. **Add more content**: Keep adding work experiences and blog posts
3. **Deploy to production**: See `PORTFOLIO_SETUP.md` for deployment guide

## Common Issues

### CV not showing?
- Make sure you have at least Introduction content added
- Check that public permissions are set correctly
- Verify `public` folder exists and is writable

### Content not appearing in CV?
- Make sure content is **Published** (not in draft state)
- Check the console logs for any errors

### JSON field errors?
Make sure JSON fields are valid arrays:
- ✅ Good: `["item1", "item2", "item3"]`
- ❌ Bad: `item1, item2, item3`

## File Structure

```
portfolio-management/
├── backend/                      # Strapi CMS
│   ├── src/
│   │   └── api/
│   │       ├── introduction/     # Your personal info
│   │       ├── work-experience/  # Your work history
│   │       ├── blog/             # Your blog posts
│   │       └── cv-generator/     # CV generation service
│   ├── public/
│   │   └── cv.html              # Your generated CV
│   └── package.json
├── frontend/                     # Next.js app
│   ├── app/                     # Pages
│   ├── components/              # UI components
│   └── package.json
├── package.json                  # Workspace config
├── GET_STARTED.md               # Complete getting started guide
├── QUICK_START.md               # This file
└── PORTFOLIO_SETUP.md           # Detailed backend documentation
```

## Need Help?

See `PORTFOLIO_SETUP.md` for detailed documentation on:
- Content type schemas
- API endpoints
- Customization options
- Production deployment
- Troubleshooting

Happy portfolio building! 🚀

