# Color Scheme Guide

## Current Color Palette

The portfolio uses a **professional sky blue** color scheme that conveys trust, reliability, and professionalism.

### Primary Colors (Sky Blue)

```
primary-50:  #f0f9ff  (Very light blue - backgrounds)
primary-100: #e0f2fe  (Light blue - subtle backgrounds)
primary-200: #bae6fd  (Soft blue - hover states)
primary-300: #7dd3fc  (Medium light blue)
primary-400: #38bdf8  (Bright blue - accents)
primary-500: #0ea5e9  (Main blue - primary actions) ← Most common
primary-600: #0284c7  (Deep blue - buttons, links) ← Also very common
primary-700: #0369a1  (Dark blue - emphasis)
primary-800: #075985  (Darker blue - text)
primary-900: #0c4a6e  (Darkest blue - headings)
```

### Secondary Colors (Slate/Gray)

```
secondary-50:  #f8fafc  (Very light gray)
secondary-100: #f1f5f9  (Light gray)
secondary-200: #e2e8f0  (Soft gray)
secondary-300: #cbd5e1  (Medium gray)
secondary-400: #94a3b8  (Gray - borders)
secondary-500: #64748b  (Main gray - secondary text)
secondary-600: #475569  (Dark gray)
secondary-700: #334155  (Darker gray)
secondary-800: #1e293b  (Very dark gray)
secondary-900: #0f172a  (Almost black)
```

## Why Sky Blue?

✅ **Trust & Reliability**: Blue is associated with trust, stability, and professionalism  
✅ **Universal Appeal**: Works well across industries and cultures  
✅ **Excellent Readability**: Strong contrast with white backgrounds  
✅ **Modern**: Sky blue (#0284c7) is modern and contemporary  
✅ **Professional**: Used by many tech companies (LinkedIn, Twitter, etc.)  

## Where Colors Are Used

### Frontend (Next.js)

- **Navigation active state**: `primary-600`
- **Buttons**: `primary-600` with `hover:primary-700`
- **Links**: `primary-600` with `hover:primary-700`
- **Headings**: `primary-600` or `gray-900`
- **Backgrounds**: `primary-50` for subtle highlights
- **Tags/Badges**: `primary-100` with `primary-700` text
- **Gradient Header**: `primary-600` to `primary-700`

### Backend CV Generator

- **Header gradient**: `#0284c7` to `#0369a1`
- **Section headings**: `#0284c7`
- **Border accents**: `#0284c7`
- **Links**: `#0284c7`
- **Tags**: `#0284c7` background
- **Tech tags**: `#0369a1` background

## Customizing Colors

### Option 1: Use Another Professional Color

Edit `frontend/tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Use Tailwind's built-in colors:
    // - emerald (green)
    // - violet (purple)
    // - rose (pink)
    // - amber (orange)
    // - cyan (teal)
    // - indigo (deep blue)
    ...colors.emerald,  // Example: professional green
  },
}
```

### Option 2: Custom Color Palette

Use a tool like [UI Colors](https://uicolors.app) to generate a complete palette:

1. Visit https://uicolors.app/create
2. Choose your base color
3. Copy the generated palette
4. Paste into `tailwind.config.ts`

### Option 3: Professional Color Recommendations

**Corporate Blue** (Current):
```typescript
primary-500: '#0ea5e9'  // Sky blue
primary-600: '#0284c7'  // Deep sky blue
```

**Trust Blue** (Navy):
```typescript
primary-500: '#2563eb'  // Royal blue
primary-600: '#1d4ed8'  // Darker blue
```

**Modern Teal**:
```typescript
primary-500: '#14b8a6'  // Teal
primary-600: '#0d9488'  // Deep teal
```

**Professional Emerald**:
```typescript
primary-500: '#10b981'  // Emerald
primary-600: '#059669'  // Deep emerald
```

**Tech Purple**:
```typescript
primary-500: '#8b5cf6'  // Violet
primary-600: '#7c3aed'  // Deep violet
```

## Update All Colors at Once

To change the entire color scheme:

### 1. Update Frontend

Edit `frontend/tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#your-color-50',
    // ... all shades
    900: '#your-color-900',
  },
}
```

### 2. Update CV Generator

Edit `backend/src/api/cv-generator/services/cv-generator.js`:

Search and replace these values:
- `#0284c7` → Your new primary color
- `#0369a1` → Your new darker shade

### 3. Rebuild Frontend

```bash
# The changes take effect immediately in dev mode
# For production:
yarn build:frontend
```

### 4. Regenerate CV

The CV will regenerate automatically when you update content in Strapi.

Or manually trigger:
```bash
curl -X POST http://localhost:1337/api/cv-generator/generate
```

## Color Psychology for Portfolios

### Blue (Current) 
**Best for**: Tech, Finance, Healthcare, Consulting  
**Conveys**: Trust, reliability, professionalism, stability

### Green/Teal
**Best for**: Environment, Health, Finance, Growth-focused  
**Conveys**: Growth, balance, harmony, prosperity

### Purple/Violet
**Best for**: Creative, Tech, Luxury, Innovation  
**Conveys**: Creativity, wisdom, innovation, luxury

### Orange/Amber
**Best for**: Creative, Marketing, Enthusiastic brands  
**Conveys**: Energy, enthusiasm, creativity, warmth

### Red/Rose
**Best for**: Bold, Attention-grabbing, Passionate brands  
**Conveys**: Energy, passion, urgency, confidence

### Gray/Slate
**Best for**: Minimalist, Modern, Professional  
**Conveys**: Sophistication, modernity, neutrality

## Testing Your Colors

After changing colors:

1. Check **contrast ratios** for accessibility:
   - Use https://contrast-ratio.com
   - Aim for 4.5:1 minimum for text

2. Test on **different screens**:
   - Desktop monitor
   - Laptop
   - Mobile device
   - Light and dark environments

3. Check **readability**:
   - Links should be clearly visible
   - Buttons should stand out
   - Text should be easy to read

## Quick Color Swap

To quickly try different colors without editing config:

```bash
# Edit tailwind.config.ts
code frontend/tailwind.config.ts

# Replace primary colors with Tailwind's built-in:
import { colors } from 'tailwindcss/colors'

colors: {
  primary: colors.blue,    // Try: emerald, violet, cyan, indigo
  secondary: colors.slate,
}
```

## Need Help?

Can't decide on colors? Consider your industry:

- **Tech/Software**: Blue, Purple, Cyan
- **Finance**: Blue, Green, Gray
- **Creative**: Purple, Orange, Rose
- **Healthcare**: Blue, Green, Teal
- **Consulting**: Blue, Gray, Indigo
- **Environment**: Green, Teal, Emerald

The current **sky blue** (#0284c7) is an excellent choice for most professional portfolios!

