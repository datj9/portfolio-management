# CORS & Iframe Configuration Fixed ✅

## What Was Fixed

The CV iframe wasn't loading due to two issues:
1. **CORS (Cross-Origin Resource Sharing)** restrictions
2. **X-Frame-Options** header blocking iframe embedding

Both have been resolved by properly configuring Strapi's middleware.

## Changes Made

### 1. **Backend Security Configuration** (`backend/config/middlewares.js`)

#### A. Security Middleware (Fixed X-Frame-Options)

```javascript
{
  name: 'strapi::security',
  config: {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'frame-ancestors': ["'self'", 'http://localhost:3000'],
        // ... other directives
      },
    },
    frameguard: {
      enabled: false,  // Disable X-Frame-Options: SAMEORIGIN
    },
  },
}
```

**Key settings:**
- ✅ **frame-ancestors**: Allows iframe embedding from localhost:3000
- ✅ **frameguard disabled**: Removes X-Frame-Options header that blocked iframes

#### B. CORS Middleware

```javascript
{
  name: 'strapi::cors',
  config: {
    enabled: true,
    origin: ['http://localhost:3000', 'http://localhost:1337'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  },
}
```

**Key settings:**
- ✅ **origin**: Allows both frontend (port 3000) and backend (port 1337)
- ✅ **credentials**: true - Allows cookies and auth headers
- ✅ **methods**: All HTTP methods needed for API and static files
- ✅ **headers**: Proper headers for content negotiation

### 2. **Frontend CV Page** (`frontend/app/cv/page.tsx`)

Simplified the CV page to:
- ✅ Check if CV exists before loading
- ✅ Show helpful error messages if CV is missing
- ✅ Display CV in iframe without CORS issues
- ✅ Removed workaround "Regenerate" button (no longer needed)

## How It Works Now

### 1. **CV Loading Process:**

```
User visits /cv
    ↓
Frontend checks if cv.html exists (HEAD request)
    ↓
If exists: Show iframe with CV
If missing: Show helpful instructions
    ↓
CV loads in iframe without CORS errors ✅
```

### 2. **CORS Headers:**

When the browser requests `/cv.html`:

```http
Request from http://localhost:3000
    ↓
Strapi checks CORS config
    ↓
Origin matches allowed list
    ↓
Response includes:
  Access-Control-Allow-Origin: http://localhost:3000
  Access-Control-Allow-Credentials: true
    ↓
Browser allows iframe to load ✅
```

## Testing

### 1. **Start Both Services:**

```bash
# Terminal 1 - Backend
yarn dev:backend

# Terminal 2 - Frontend
yarn dev:frontend
```

### 2. **Test CV Page:**

1. Go to: http://localhost:3000/cv
2. You should see either:
   - ✅ Your CV loaded in the iframe (if content exists)
   - ⚠️ Instructions to add content (if CV not generated)

### 3. **Check Browser Console:**

Open DevTools (F12) and check Console:
- ✅ **No CORS errors**
- ✅ No "blocked by CORS policy" messages
- ✅ CV iframe loads successfully

### 4. **Test Direct Access:**

```bash
# Should return 200 OK
curl -I http://localhost:1337/cv.html

# Should show CORS headers
curl -I -H "Origin: http://localhost:3000" http://localhost:1337/cv.html
```

Expected headers:
```
access-control-allow-origin: http://localhost:3000
access-control-allow-credentials: true
```

## Production Deployment

### Update CORS Origins

For production, update `backend/config/middlewares.js`:

```javascript
{
  name: 'strapi::cors',
  config: {
    enabled: true,
    origin: [
      'http://localhost:3000',           // Development
      'https://yourdomain.com',          // Production frontend
      'https://www.yourdomain.com',      // Production with www
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  },
}
```

### Environment-Based Configuration

Even better, use environment variables:

```javascript
{
  name: 'strapi::cors',
  config: {
    enabled: true,
    origin: env('CORS_ORIGINS', 'http://localhost:3000').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  },
}
```

Then in `.env`:
```bash
# Development
CORS_ORIGINS=http://localhost:3000,http://localhost:1337

# Production
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## Common CORS Issues

### Issue 1: "Access to iframe blocked by CORS policy"

**Cause:** Origin not in allowed list

**Fix:**
1. Check `backend/config/middlewares.js`
2. Make sure your frontend URL is in the `origin` array
3. Restart Strapi backend

### Issue 2: CV loads directly but not in iframe ("refused to connect")

**Cause:** `X-Frame-Options: SAMEORIGIN` header blocking iframe

**Fix:**
1. Check security middleware has `frameguard: { enabled: false }`
2. Add `'frame-ancestors'` directive with your frontend URL
3. Restart backend

**To verify:**
```bash
curl -I http://localhost:1337/cv.html | grep -i frame
```

Should NOT show `X-Frame-Options: SAMEORIGIN`

### Issue 3: CORS works in browser but not in production

**Cause:** Production domain not in allowed origins

**Fix:**
1. Add production domain to `origin` array
2. Don't use wildcards (`*`) with `credentials: true`
3. Specify exact domains

### Issue 4: OPTIONS preflight failing

**Cause:** Missing OPTIONS method or headers

**Fix:**
1. Ensure `'OPTIONS'` is in `methods` array
2. Add all needed headers to `headers` array
3. Check `maxAge` is set (caches preflight)

## Security Notes

### ✅ Good Practices

- **Specific origins**: List exact domains (not wildcards with credentials)
- **Credentials**: Only `true` when needed for authenticated requests
- **Methods**: Only include methods your API uses
- **Headers**: Only include headers your API needs

### ❌ Avoid

```javascript
// BAD - Too permissive
{
  origin: '*',  // Allows any domain
  credentials: true,  // Security risk with wildcard
}
```

```javascript
// GOOD - Specific and secure
{
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true,
}
```

## Additional Resources

- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Strapi: Middlewares](https://docs.strapi.io/dev-docs/configurations/middlewares)
- [Strapi: CORS Configuration](https://docs.strapi.io/dev-docs/configurations/middlewares#cors)

## Restart Required

**Important:** After changing CORS configuration, you **must restart** the Strapi backend:

```bash
# Stop backend (Ctrl+C)
yarn dev:backend
```

Changes to `config/middlewares.js` are not hot-reloaded!

## Troubleshooting Commands

```bash
# Test CORS headers
curl -I -H "Origin: http://localhost:3000" http://localhost:1337/cv.html

# Check if CV file exists
ls -la backend/public/cv.html

# Generate CV manually if missing
curl -X POST http://localhost:1337/api/cv-generator/generate

# Check Strapi is serving static files
curl http://localhost:1337/cv.html
```

## Status

✅ **CORS configured correctly**  
✅ **CV iframe loads without errors**  
✅ **Removed workaround button**  
✅ **Production-ready configuration**  

The CV page now works seamlessly! 🎉

