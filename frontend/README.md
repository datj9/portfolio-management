# Portfolio Frontend - Next.js

A modern, responsive Next.js frontend for the Strapi portfolio management system.

## Features

- 🎨 **Modern Design**: Beautiful UI with Tailwind CSS
- ⚡ **Fast Performance**: Built with Next.js 14 App Router
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🔄 **Auto-Revalidation**: Content updates from Strapi every 60 seconds
- 🖼️ **Image Optimization**: Automatic image optimization with Next.js Image
- 📝 **Rich Content**: Support for markdown and rich text from Strapi
- 🎯 **SEO Friendly**: Optimized metadata for search engines

## Pages

- **Home** (`/`): Introduction, skills, recent experience, and blog posts
- **Experience** (`/experience`): Complete work history
- **Blog** (`/blog`): Blog post listings
- **Blog Post** (`/blog/[slug]`): Individual blog post details
- **CV** (`/cv`): Embedded auto-generated CV from Strapi

## Prerequisites

- Node.js 18+ or 20+
- Strapi backend running on `http://localhost:1337`
- npm or yarn package manager

## Installation

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install
```

## Environment Setup

Create a `.env.local` file in the frontend directory:

```bash
# Strapi API URL
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

For production, update these URLs to your production Strapi instance.

## Development

```bash
# Start the development server
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:3000`

## Building for Production

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

## Project Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── experience/
│   │   └── page.tsx         # Work experience page
│   ├── blog/
│   │   ├── page.tsx         # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx     # Individual blog post
│   └── cv/
│       └── page.tsx         # CV page
├── components/               # Reusable components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── WorkExperienceCard.tsx
│   └── BlogCard.tsx
├── lib/                      # Utilities and API functions
│   ├── strapi.ts            # Strapi API integration
│   └── utils.ts             # Helper functions
├── types/                    # TypeScript types
│   └── strapi.ts            # Strapi content types
├── public/                   # Static assets
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## Key Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Markdown**: Markdown rendering for blog posts

## API Integration

The app fetches data from Strapi using the following endpoints:

- `GET /api/introduction` - Personal introduction data
- `GET /api/work-experiences` - Work experience entries
- `GET /api/blogs` - Blog post listings
- `GET /api/blogs?filters[slug][$eq]=slug` - Individual blog post
- `GET /cv.html` - Generated CV

## Revalidation Strategy

Pages use Next.js Incremental Static Regeneration (ISR) with a 60-second revalidation period:

```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

This means:
- Pages are statically generated at build time
- After 60 seconds, the next request triggers a background revalidation
- Users always see fast, cached content

## Customization

### Changing Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    500: '#667eea',  // Change primary color
    // ... other shades
  },
  secondary: {
    500: '#764ba2',  // Change secondary color
  },
}
```

### Modifying Layout

- Edit `app/layout.tsx` to change the overall layout
- Edit `components/Navigation.tsx` to customize the navigation bar
- Edit `components/Footer.tsx` to update the footer

### Adding New Pages

1. Create a new directory in `app/`
2. Add a `page.tsx` file
3. Update navigation in `components/Navigation.tsx`

Example:

```typescript
// app/projects/page.tsx
export default function ProjectsPage() {
  return <div>Projects Page</div>
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The frontend can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Digital Ocean
- Self-hosted with Docker

Make sure to:
1. Set the correct environment variables
2. Build the app with `npm run build`
3. Start with `npm start` or use a static export

## Troubleshooting

### Images Not Loading

Make sure your `next.config.js` includes the Strapi domain in `remotePatterns`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '1337',
      pathname: '/uploads/**',
    },
  ],
},
```

### API Errors

1. Check that Strapi is running
2. Verify environment variables are set correctly
3. Ensure Strapi permissions are configured for Public role
4. Check browser console for error messages

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try building again
npm run build
```

## Performance Optimization

- Images are automatically optimized by Next.js
- Pages use ISR for fast loading
- CSS is automatically purged by Tailwind
- Bundle size is optimized automatically

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

When adding new features:

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Follow the component naming conventions
4. Test on multiple screen sizes

## License

MIT

