# Fix "Forbidden" Error - Complete Checklist

You're getting 403 Forbidden even after setting permissions. Let's fix this step by step.

## 🔍 Run Diagnostic First

```bash
./test-permissions.sh
```

This will test all API endpoints and show exactly what's wrong.

## ✅ Complete Permissions Checklist

### Step 1: Verify Exact Permissions

Go to: **http://localhost:1337/admin/settings/users-permissions/roles**

Click **Public** and verify **EXACTLY** these checkboxes are enabled:

#### Blog (api::blog.blog)
```
Application controllers and actions:
  ☑ find
  ☑ findOne
```

#### Introduction (api::introduction.introduction)
```
Application controllers and actions:
  ☑ find
```

#### Work-experience (api::work-experience.work-experience)
```
Application controllers and actions:
  ☑ find
  ☑ findOne
```

**IMPORTANT:** Make sure you're checking boxes under **"Application"** section, not "Plugin" section!

### Step 2: Save and Wait

1. Click **Save** button (top right)
2. Wait for the success message
3. **Wait 5 seconds** for Strapi to apply changes

### Step 3: Hard Restart Strapi

Sometimes permissions don't apply until restart:

```bash
# Stop Strapi (Ctrl+C if running)

# Clear cache
rm -rf backend/.cache
rm -rf backend/build

# Restart
yarn dev:backend
```

### Step 4: Test API Directly

```bash
# Should return data, not "Forbidden":
curl http://localhost:1337/api/introduction
curl http://localhost:1337/api/work-experiences
curl http://localhost:1337/api/blogs
```

If you see `"Forbidden"` or `403`, permissions are still not set correctly.

## 🐛 Common Issues

### Issue 1: Looking at Wrong Role

**Problem:** You set permissions on "Authenticated" instead of "Public"

**Solution:** 
- Make sure you're editing **Public** role (not Authenticated)
- Public = unauthenticated users (your website visitors)

### Issue 2: Not Saving

**Problem:** Clicked checkboxes but didn't save

**Solution:**
- Always click **Save** button after enabling permissions
- Look for green success message

### Issue 3: Wrong Content Type Names

**Problem:** Enabling permissions on wrong API

**Solution:** 
Look for these EXACT names:
- `api::blog.blog` (NOT just "blog")
- `api::introduction.introduction` 
- `api::work-experience.work-experience`

### Issue 4: Missing `findOne` Permission

**Problem:** Only enabled `find`, but not `findOne`

**Solution:**
- Enable **BOTH** `find` and `findOne` for:
  - Blog
  - Work-experience

### Issue 5: Draft Content

**Problem:** Content is in draft state

**Solution:**
1. Go to Content Manager
2. Open each entry
3. Click **Publish** button
4. Must see green "Published" badge

### Issue 6: Strapi Cache

**Problem:** Permissions cached, not applying

**Solution:**
```bash
# Clear Strapi cache
rm -rf backend/.cache
rm -rf backend/build

# Restart Strapi
yarn dev:backend
```

## 📸 Visual Guide

### What You Should See:

When editing Public role, scroll down to see:

```
┌─────────────────────────────────────┐
│ APPLICATION                         │
├─────────────────────────────────────┤
│ Blog (api::blog.blog)               │
│   ☑ count                           │
│   ☑ find          ← CHECK THIS     │
│   ☑ findOne       ← CHECK THIS     │
│                                     │
│ Introduction (api::introduction...) │
│   ☑ find          ← CHECK THIS     │
│                                     │
│ Work-experience (api::work-exp...)  │
│   ☑ count                           │
│   ☑ find          ← CHECK THIS     │
│   ☑ findOne       ← CHECK THIS     │
└─────────────────────────────────────┘
```

### Screenshot Location

The permissions are in this exact path:
```
Settings (⚙️) 
  → Users & Permissions plugin
    → Roles
      → Public (click here)
        → Scroll down to "APPLICATION" section
          → Enable checkboxes
            → CLICK SAVE!
```

## 🔄 Nuclear Option: Reset and Redo

If nothing works, reset permissions:

### Method 1: Via Strapi Admin

1. Settings → Roles → Public
2. **Uncheck all** boxes
3. Click Save
4. **Check only the needed** boxes (see Step 1)
5. Click Save
6. Restart Strapi

### Method 2: Delete Role and Recreate

⚠️ **Warning:** This will reset ALL public permissions!

1. In Strapi admin, go to Settings → Roles
2. Delete Public role (if allowed)
3. Recreate it
4. Set permissions from scratch

## 🧪 Debug Commands

### Check Strapi Logs

Look at your Strapi terminal for:
```
[2025-10-22 03:26:15.618] http: GET /api/work-experiences (5 ms) 403
```

If you see `403`, permissions are not set.

### Test Each Endpoint

```bash
# Test Introduction
curl -i http://localhost:1337/api/introduction

# Should see:
# HTTP/1.1 200 OK
# (not 403 Forbidden)

# Test Work Experiences  
curl -i http://localhost:1337/api/work-experiences

# Test Blogs
curl -i http://localhost:1337/api/blogs
```

### Check Database

```bash
# Connect to PostgreSQL
psql -h 127.0.0.1 -p 5433 -U postgres portfolio

# Check if role exists
SELECT * FROM up_roles WHERE type = 'public';

# Should show a row with public role
\q
```

## ✅ Verification Checklist

Mark these when done:

- [ ] Opened http://localhost:1337/admin
- [ ] Clicked Settings → Roles → Public
- [ ] Found "APPLICATION" section (not Plugin)
- [ ] Enabled `find` for Introduction
- [ ] Enabled `find` + `findOne` for Blog
- [ ] Enabled `find` + `findOne` for Work-experience
- [ ] Clicked **Save** button
- [ ] Saw success message
- [ ] Waited 5 seconds
- [ ] Tested with curl (got 200, not 403)
- [ ] Restarted Strapi
- [ ] Tested frontend (no more Forbidden errors)

## 🆘 Still Not Working?

If you've done EVERYTHING above and it still doesn't work:

1. **Share your Strapi logs**: Copy the terminal output when you get 403
2. **Screenshot**: Take a screenshot of your Public role permissions page
3. **Test output**: Share the output of `./test-permissions.sh`

Common final issues:
- Firewall blocking localhost
- Wrong port (check if Strapi is on 1337)
- CORS issues (unlikely with localhost)
- Strapi version incompatibility
- Database connection issues

## 📝 Quick Test Script

Run this to test everything at once:

```bash
./test-permissions.sh
```

This will show exactly which endpoint is failing and why.

