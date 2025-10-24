# CV Generation Guide

## How CV Generation Works

Your CV is **automatically generated** as a static HTML file from your Strapi content.

### When CV is Generated

The CV regenerates automatically when you:
- ✅ Create, update, or delete **Introduction**
- ✅ Create, update, or delete **Work Experience**

### Where CV is Stored

The CV is saved as: `backend/public/cv.html`

This file is served at:
- **Frontend**: http://localhost:3000/cv
- **Direct**: http://localhost:1337/cv.html

## Manual Generation

### Method 1: Via Frontend (Easiest)

1. Go to http://localhost:3000/cv
2. Click **"Regenerate CV"** button
3. Wait a moment
4. CV will reload automatically

### Method 2: Via API

```bash
curl -X POST http://localhost:1337/api/cv-generator/generate
```

### Method 3: Via Strapi Admin

Add or update any content in Strapi, and the CV generates automatically!

## Troubleshooting

### "CV Not Generated Yet" Message

**Causes:**
1. No content added yet
2. Content is in Draft (not Published)
3. Backend hasn't run lifecycle hooks yet

**Solutions:**

1. **Add Content:**
   - Go to Strapi admin (http://localhost:1337/admin)
   - Add Introduction (personal info)
   - Add at least one Work Experience
   - Make sure to click **Publish**

2. **Generate Manually:**
   ```bash
   curl -X POST http://localhost:1337/api/cv-generator/generate
   ```

3. **Check Logs:**
   Look at Strapi terminal for errors during generation

### CV is Blank/Empty

**Cause:** No published content

**Solution:**
1. Check Content Manager in Strapi
2. Make sure content is **Published** (not Draft)
3. Look for green "Published" badge
4. If content is draft, click entry → Publish

### CV Not Updating

**Cause:** Cache or lifecycle hooks not triggering

**Solutions:**

1. **Manual Regenerate:**
   - Use "Regenerate CV" button on frontend
   - Or use API: `curl -X POST http://localhost:1337/api/cv-generator/generate`

2. **Clear Browser Cache:**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Or open in Incognito mode

3. **Restart Strapi:**
   ```bash
   # Stop Strapi (Ctrl+C)
   yarn dev:backend
   ```

4. **Check File Permissions:**
   ```bash
   # Make sure backend/public is writable
   ls -la backend/public/cv.html
   ```

### Iframe Not Loading

**Causes:**
1. CV file doesn't exist
2. CORS issues (unlikely with localhost)
3. Strapi not serving static files

**Solutions:**

1. **Check if CV exists:**
   ```bash
   ls -la backend/public/cv.html
   
   # If missing, generate it:
   curl -X POST http://localhost:1337/api/cv-generator/generate
   ```

2. **Access directly:**
   - Try: http://localhost:1337/cv.html
   - Should show your CV
   - If 404, file doesn't exist

3. **Check Strapi logs:**
   - Look for errors when accessing /cv.html
   - Check if public folder is configured correctly

### "Permission Denied" When Generating

**Cause:** `backend/public` folder not writable

**Solution:**
```bash
# Make public folder writable
chmod 755 backend/public

# Or if folder doesn't exist:
mkdir -p backend/public
chmod 755 backend/public
```

## CV Content

### What's Included

The generated CV includes:

1. **Header**
   - Full name
   - Professional title
   - Contact information (email, phone, location)
   - Social links (website, LinkedIn, GitHub)

2. **Summary**
   - Professional summary/bio from Introduction

3. **Skills**
   - Skills array from Introduction
   - Displayed as tags

4. **Work Experience**
   - All published work experiences
   - Sorted by order (descending)
   - Company, position, dates
   - Description and achievements
   - Technologies used

### What's NOT Included

- Draft content (only published content)
- Unpublished work experiences
- Blog posts (CVs focus on work experience and skills)
- Media files larger than reasonable size
- Private/internal notes

## Customizing CV

### Edit Template

The CV template is in:
```
backend/src/api/cv-generator/services/cv-generator.js
```

Look for the `generateHTMLTemplate()` method.

### Change Styling

Edit the `<style>` section in the template:

```javascript
// Change colors
.company {
  color: #0284c7;  // Change this
}

// Change fonts
body {
  font-family: 'Your Font', sans-serif;
}

// Change layout
.container {
  max-width: 800px;  // Adjust width
}
```

### Add/Remove Sections

In `generateHTMLTemplate()`, you can:
- Add new sections
- Remove sections (like blog posts)
- Reorder sections
- Change content

After editing, save the file and regenerate the CV.

## API Endpoint

### Generate CV

```bash
POST http://localhost:1337/api/cv-generator/generate
```

**Response (Success):**
```json
{
  "success": true,
  "message": "CV generated successfully",
  "data": {
    "success": true,
    "path": "/path/to/backend/public/cv.html",
    "url": "/cv.html"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Failed to generate CV",
  "error": "Error message"
}
```

### Permissions

To allow public CV generation:
1. Go to Strapi Settings → Roles → Public
2. Enable: **CV-generator** → `generate`
3. Click Save

**Note:** Usually not needed as you can generate via admin or lifecycle hooks.

## Lifecycle Hooks

CV generation is triggered by lifecycle hooks in:

- `backend/src/api/introduction/content-types/introduction/lifecycles.js`
- `backend/src/api/work-experience/content-types/work-experience/lifecycles.js`

These trigger `afterCreate`, `afterUpdate`, and `afterDelete`.

**Note:** Blog posts do not trigger CV regeneration as they are not included in the CV.

## Print/Download CV

### From Frontend

1. Go to http://localhost:3000/cv
2. Click "Open in New Tab"
3. In new tab, use browser's Print function (Cmd+P / Ctrl+P)
4. Choose "Save as PDF"

### Direct Download

```bash
# Download CV HTML
curl http://localhost:1337/cv.html -o my-cv.html

# Open in browser
open my-cv.html
```

### Print-Optimized

The CV includes print-specific CSS:

```css
@media print {
  /* Removes shadows and backgrounds */
  /* Ensures proper page breaks */
  /* Optimizes for paper */
}
```

## Production Deployment

In production:

1. **Static CV:** The `cv.html` file is served statically
2. **Auto-regeneration:** Works the same way via lifecycle hooks
3. **Manual regeneration:** Use the API endpoint
4. **CDN:** Can be cached by CDN for faster access

## Tips

✅ **Keep content updated:** CV regenerates automatically  
✅ **Test regularly:** Check CV after adding content  
✅ **Use meaningful order:** Set `order` field on work experiences  
✅ **Publish content:** Only published content appears  
✅ **Mobile-friendly:** CV is responsive and looks good on mobile  
✅ **Print-ready:** Optimized for printing to PDF  

## Common Workflows

### First Time Setup

1. Add Introduction in Strapi
2. Add Work Experiences (published)
3. Add Blog posts (optional)
4. Visit http://localhost:3000/cv
5. CV generates automatically

### Updating CV

1. Update content in Strapi
2. Click Publish/Save
3. CV regenerates automatically
4. Refresh frontend to see changes

### Before Job Application

1. Review all content in Strapi
2. Make sure everything is published
3. Click "Regenerate CV" on frontend
4. Open in new tab
5. Print to PDF
6. Send PDF to employer

## Need Help?

If CV generation isn't working:

1. ✅ Check Strapi logs for errors
2. ✅ Verify content is published
3. ✅ Try manual generation via API
4. ✅ Check file permissions on `backend/public/`
5. ✅ Ensure Strapi is running

Still stuck? Check the logs and share the error message!

