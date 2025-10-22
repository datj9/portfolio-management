# Portfolio Management System with Strapi

This is a Strapi-based portfolio management system that automatically generates a static HTML CV from your content.

## Features

- **Content Management**: Manage all your portfolio content through Strapi's admin panel
- **Automatic CV Generation**: CV is automatically regenerated whenever content is updated
- **Content Types**:
  - **Introduction** (Single Type): Personal information, contact details, summary, skills
  - **Work Experience** (Collection Type): Professional work history with achievements
  - **Blog** (Collection Type): Blog posts and articles

## Content Types

### 1. Introduction (Single Type)
Store your personal information and introduction:
- Full Name
- Professional Title
- Email
- Phone
- Location
- Website URL
- LinkedIn URL
- GitHub URL
- Professional Summary
- Avatar Image
- Skills (as JSON array)

**Example Skills JSON:**
```json
["JavaScript", "React", "Node.js", "Python", "AWS"]
```

### 2. Work Experience (Collection Type)
Add your professional work experiences:
- Company Name
- Position/Role
- Location
- Start Date
- End Date
- Current Position (checkbox)
- Description (Rich Text)
- Achievements (JSON array)
- Technologies (JSON array)
- Order (for sorting)

**Example Achievements JSON:**
```json
[
  "Led team of 5 developers to deliver project 2 weeks ahead of schedule",
  "Improved application performance by 40%",
  "Implemented CI/CD pipeline reducing deployment time by 60%"
]
```

**Example Technologies JSON:**
```json
["React", "TypeScript", "AWS", "Docker", "PostgreSQL"]
```

### 3. Blog (Collection Type)
Publish blog posts:
- Title
- Slug (auto-generated from title)
- Description
- Content (Rich Text)
- Featured Image
- Published Date
- Tags (JSON array)
- Author
- Reading Time (in minutes)

**Example Tags JSON:**
```json
["JavaScript", "Tutorial", "Web Development"]
```

## Setup Instructions

### 1. Install Dependencies
```bash
yarn install
# or
npm install
```

### 2. Configure Environment
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

### 3. Start Strapi
```bash
# Development mode
yarn develop

# Production mode
yarn start
```

### 4. Access Admin Panel
1. Navigate to `http://localhost:1337/admin`
2. Create your admin account
3. Start adding content!

## CV Generation

### Automatic Generation
The CV is automatically regenerated whenever you:
- Create, update, or delete an Introduction entry
- Create, update, or delete a Work Experience entry
- Create, update, or delete a Blog post

The generated CV is saved at: `backend/public/cv.html`

### Manual Generation
You can also manually trigger CV generation by making a POST request:

```bash
curl -X POST http://localhost:1337/api/cv-generator/generate
```

Or use the Strapi admin panel to make the request through any HTTP client.

### Accessing Your CV
Once generated, your CV is accessible at:
```
http://localhost:1337/cv.html
```

In production, it will be at:
```
https://yourdomain.com/cv.html
```

## Content Permissions

To make your CV publicly accessible, you need to set permissions:

1. Go to **Settings** → **Users & Permissions plugin** → **Roles** → **Public**
2. Enable the following permissions:
   - **Introduction**: `find`
   - **Work-experience**: `find`
   - **Blog**: `find`
   - **CV-generator**: `generate` (if you want to allow public CV regeneration)

## API Endpoints

### Introduction
- `GET /api/introduction` - Get introduction data

### Work Experience
- `GET /api/work-experiences` - List all work experiences
- `GET /api/work-experiences/:id` - Get single work experience

### Blog
- `GET /api/blogs` - List all blog posts
- `GET /api/blogs/:id` - Get single blog post

### CV Generator
- `POST /api/cv-generator/generate` - Manually trigger CV generation

## Customizing the CV Template

The CV template can be customized by editing:
```
backend/src/api/cv-generator/services/cv-generator.js
```

The `generateHTMLTemplate()` method contains the HTML and CSS for the CV.

### Customization Options:
- Modify CSS styles in the `<style>` tag
- Change the layout structure
- Add or remove sections
- Customize colors and fonts

## Production Deployment

### Build for Production
```bash
yarn build
```

### Environment Variables
Make sure to set these in production:
- `HOST`
- `PORT`
- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `JWT_SECRET`

### Serving Static Files
The `cv.html` file is served from the `public` folder. Ensure your web server is configured to serve static files from this directory.

## Tips

### Work Experience Ordering
Use the `order` field to control the display order of work experiences. Higher numbers appear first.

### Draft and Publish
Use Strapi's built-in draft/publish feature to work on content before making it live. Only published content appears in the generated CV.

### Rich Text Content
When adding descriptions and content, use Strapi's rich text editor. The CV generator will strip HTML tags for clean display.

### Image Uploads
Upload images through Strapi's media library. They'll be automatically linked in your content.

## Troubleshooting

### CV Not Generating
1. Check Strapi logs for errors: `console` or log files
2. Verify the `backend/public` folder is writable
3. Ensure all content types have published entries

### Permissions Issues
Make sure the Public role has appropriate permissions in Settings → Users & Permissions plugin.

### Missing Content
Verify that:
- Content is published (not in draft state)
- Dates are properly formatted
- JSON fields are valid JSON arrays

## Architecture

```
backend/
├── src/
│   └── api/
│       ├── introduction/           # Introduction content type
│       │   ├── content-types/
│       │   │   └── introduction/
│       │   │       ├── schema.json
│       │   │       └── lifecycles.js
│       │   ├── controllers/
│       │   ├── services/
│       │   └── routes/
│       ├── work-experience/        # Work Experience content type
│       │   ├── content-types/
│       │   │   └── work-experience/
│       │   │       ├── schema.json
│       │   │       └── lifecycles.js
│       │   ├── controllers/
│       │   ├── services/
│       │   └── routes/
│       ├── blog/                   # Blog content type
│       │   ├── content-types/
│       │   │   └── blog/
│       │   │       ├── schema.json
│       │   │       └── lifecycles.js
│       │   ├── controllers/
│       │   ├── services/
│       │   └── routes/
│       └── cv-generator/           # CV Generator service
│           ├── controllers/
│           │   └── cv-generator.js
│           ├── services/
│           │   └── cv-generator.js
│           └── routes/
│               └── cv-generator.js
├── public/
│   └── cv.html                     # Generated CV (auto-created)
├── config/                         # Strapi configuration
└── database/                       # SQLite database
```

## Support

For issues or questions:
1. Check Strapi documentation: https://docs.strapi.io
2. Review this README
3. Check the application logs

## License

MIT

