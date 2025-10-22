# Strapi Permissions Setup

## Fix "Forbidden" Error on Frontend

If you see errors like:
```
Error: Failed to fetch from Strapi: Forbidden
```

This means the **Public role** doesn't have permissions to access the API.

## Quick Fix (Required!)

### 1. Access Strapi Admin

Go to: **http://localhost:1337/admin**

### 2. Navigate to Permissions

1. Click **Settings** (⚙️ icon in the bottom left sidebar)
2. Under "USERS & PERMISSIONS PLUGIN", click **Roles**
3. Click on **Public** role

### 3. Enable API Permissions

Scroll down and enable these permissions:

#### ✅ Blog
- [x] `find` - List/search blogs
- [x] `findOne` - Get single blog

#### ✅ Introduction  
- [x] `find` - Get introduction data

#### ✅ Work-experience
- [x] `find` - List work experiences
- [x] `findOne` - Get single work experience

#### ✅ CV-generator (Optional)
- [x] `generate` - Allow public CV generation

### 4. Save Changes

Click **Save** button in the top right corner.

## Visual Guide

```
Settings → Roles → Public → Scroll Down → Enable Checkboxes → Save
```

**Before (Forbidden):**
```
Blog
  □ find
  □ findOne

Introduction
  □ find

Work-experience
  □ find
  □ findOne
```

**After (Working):**
```
Blog
  ☑ find
  ☑ findOne

Introduction
  ☑ find

Work-experience
  ☑ find
  ☑ findOne
```

## Verify It's Working

After saving, refresh your frontend: **http://localhost:3000**

You should now see:
- ✅ Your introduction and personal info
- ✅ Work experiences
- ✅ Blog posts

## Still Getting Errors?

### Check Content is Published

1. Go to **Content Manager**
2. Make sure your content has **"Published"** status (green dot)
3. If it says **"Draft"**, click the entry and click **Publish**

### Check Strapi is Running

Make sure Strapi backend is running:
```bash
# Check if Strapi is accessible
curl http://localhost:1337/api/blogs

# Should return JSON, not an error
```

### Clear Browser Cache

Sometimes browsers cache the error:
```
1. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. Or open in Incognito/Private mode
```

## Understanding Permissions

### Public Role
- Used for **unauthenticated** users (your website visitors)
- Should have **read-only** access (`find`, `findOne`)
- **Never** enable `create`, `update`, or `delete` for public!

### Authenticated Role
- Used for **logged-in** users
- Can have more permissions
- Not needed for this portfolio website

## API Endpoints

After setting permissions, these endpoints become accessible:

```
GET  /api/introduction              # Get your introduction
GET  /api/work-experiences          # List work experiences  
GET  /api/work-experiences/:id      # Get single experience
GET  /api/blogs                     # List blog posts
GET  /api/blogs/:id                 # Get single blog post
POST /api/cv-generator/generate     # Generate CV (if enabled)
```

## Security Note

✅ **Safe to enable:**
- `find` - Lists published content
- `findOne` - Gets single published content

❌ **Don't enable for Public:**
- `create` - Would let anyone create content
- `update` - Would let anyone modify content
- `delete` - Would let anyone delete content

## Troubleshooting

### "Cannot read property 'find'"

The content type doesn't exist yet. Make sure:
1. You've run `yarn dev` at least once
2. Strapi has created all content types
3. Check **Content-Type Builder** in Strapi admin

### "Not Found" instead of "Forbidden"

The API route doesn't exist. Check:
1. Content types are created
2. Strapi server restarted after creating types
3. URL is correct (e.g., `/api/blogs` not `/api/blog`)

### Network Errors

Check:
1. Strapi is running on port 1337
2. Frontend `.env.local` has correct URL
3. No firewall blocking localhost

## Quick Test

Test permissions with curl:

```bash
# Should work (200 OK):
curl http://localhost:1337/api/introduction

# Should work (200 OK):
curl http://localhost:1337/api/blogs

# Should fail if not enabled (403 Forbidden):
curl -X POST http://localhost:1337/api/blogs
```

## Done! 🎉

Once permissions are set:
1. ✅ Frontend can read data
2. ✅ No more "Forbidden" errors
3. ✅ Website displays your content

Remember: You only need to do this **once** when first setting up Strapi!

