# Frontend Setup Guide

Quick guide to set up and run the Next.js frontend.

## Prerequisites

1. ✅ Strapi backend is running on `http://localhost:1337`
2. ✅ Node.js 18+ installed
3. ✅ Content added in Strapi (Introduction, Work Experience, Blogs)

## Quick Start

### Step 1: Install Dependencies

From the **root directory**:

```bash
yarn install
```

This uses Yarn workspaces to install dependencies for both backend and frontend at once.

### Step 2: Environment Variables

The `.env.local` file should already be created with default values:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

If deploying to production, update these URLs to point to your production Strapi instance.

### Step 3: Start Development Server

From the **root directory**:

```bash
# Start both backend and frontend
yarn dev

# Or start frontend only
yarn dev:frontend
```

The frontend will start at: **http://localhost:3000**

### Step 4: Open in Browser

Navigate to `http://localhost:3000` and you should see:
- Your introduction and personal information
- Your skills
- Recent work experiences
- Latest blog posts

## Available Pages

Once running, you can access:

| Page | URL | Description |
|------|-----|-------------|
| Home | `http://localhost:3000/` | Overview with intro, skills, recent experience and blogs |
| Experience | `http://localhost:3000/experience` | Complete work history |
| Blog | `http://localhost:3000/blog` | All blog posts |
| Blog Post | `http://localhost:3000/blog/[slug]` | Individual blog post |
| CV | `http://localhost:3000/cv` | Auto-generated CV |

## Development Workflow

### 1. Making Content Changes

1. Update content in Strapi admin (`http://localhost:1337/admin`)
2. Save and publish your changes
3. Wait up to 60 seconds (or refresh the page)
4. See your changes on the frontend

### 2. Customizing the Design

**Change Colors:**

Edit `frontend/tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#667eea',  // Your primary color
  },
}
```

**Modify Layout:**

- Navigation: `frontend/components/Navigation.tsx`
- Footer: `frontend/components/Footer.tsx`
- Global styles: `frontend/app/globals.css`

### 3. Adding New Features

1. Create new components in `frontend/components/`
2. Add new pages in `frontend/app/`
3. Create API functions in `frontend/lib/strapi.ts`
4. Define types in `frontend/types/strapi.ts`

## Production Deployment

### Build for Production

From the **root directory**:

```bash
yarn build:frontend
```

### Test Production Build Locally

```bash
yarn start:frontend
```

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set environment variables:
   - `NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com`
   - `NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-domain.com/api`
5. Deploy!

### Deploy to Other Platforms

The frontend works on any platform that supports Next.js:
- **Netlify**: Use the Netlify CLI or GitHub integration
- **AWS Amplify**: Connect your GitHub repository
- **Digital Ocean**: Use App Platform with Node.js
- **Self-hosted**: Build and run with `npm start`

## Common Issues & Solutions

### Issue: "Failed to fetch from Strapi"

**Solution:**
1. Make sure Strapi is running on `http://localhost:1337`
2. Check that public permissions are set in Strapi
3. Verify `.env.local` has correct URLs

### Issue: Images not displaying

**Solution:**
1. Check `next.config.js` has correct image domains
2. Verify images are uploaded in Strapi
3. Check browser console for CORS errors

### Issue: Content not updating

**Solution:**
1. Wait 60 seconds for revalidation
2. Hard refresh the page (Cmd+Shift+R / Ctrl+Shift+R)
3. Check that content is published in Strapi (not draft)

### Issue: Build fails

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
yarn install
yarn build
```

## Tips for Best Results

### Content in Strapi

1. **Always publish content** - Draft content won't appear
2. **Add featured images** to blog posts for better visual appeal
3. **Use the order field** in work experience to control display order
4. **Fill out all fields** for the best presentation

### Performance

- Images are automatically optimized
- Pages are cached and revalidated every 60 seconds
- Build generates static pages for fast loading

### SEO

Each page has proper metadata. To customize:

```typescript
// In any page.tsx
export const metadata = {
  title: 'Your Title',
  description: 'Your description',
}
```

## Development Tips

### Hot Reload

Changes to files automatically reload the browser. No need to restart the server!

### TypeScript

The project uses TypeScript for type safety. Types are defined in `frontend/types/strapi.ts`.

### Styling

Uses Tailwind CSS utility classes. See [Tailwind docs](https://tailwindcss.com/docs) for available classes.

## Next Steps

1. ✅ Start the frontend development server
2. ✅ Add content in Strapi
3. ✅ Customize colors and styling to match your brand
4. ✅ Add your own content and projects
5. ✅ Deploy to production

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Strapi Docs**: https://docs.strapi.io
- **Frontend README**: See `frontend/README.md` for detailed documentation

## File Structure Reference

```
frontend/
├── app/              # Pages (Next.js App Router)
├── components/       # Reusable UI components
├── lib/             # Utility functions and API calls
├── types/           # TypeScript type definitions
├── public/          # Static files
└── *.config.*       # Configuration files
```

Happy coding! 🚀

