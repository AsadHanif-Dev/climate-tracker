# Deployment Guide

## Deploy to Vercel (Recommended - Free & Easy)

Vercel is the easiest way to deploy Next.js apps. It's free for personal projects.

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   # Create a new repository on GitHub (github.com/new)
   # Then run:
   git remote add origin https://github.com/YOUR_USERNAME/climate-impact-tracker.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy" (Vercel auto-detects Next.js settings)
   - Done! Your app will be live in ~2 minutes

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd f:\Cimate-impact-tracker
   vercel
   ```

3. **Follow prompts**:
   - Login to Vercel
   - Accept default settings
   - Your app will be deployed!

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

---

## Deploy to Netlify (Alternative)

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy"

---

## Deploy Static Version (GitHub Pages, etc.)

If you want a static export:

1. **Update next.config.js**:
   ```js
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   ```

2. **Build static version**:
   ```bash
   npm run build
   ```
   This creates an `out` folder with static files.

3. **Deploy the `out` folder** to any static host:
   - GitHub Pages
   - Cloudflare Pages
   - AWS S3 + CloudFront
   - Firebase Hosting

---

## Environment Variables

This app doesn't need any environment variables - it runs entirely in the browser with localStorage!

---

## Post-Deployment

After deployment:
- ✅ Test all features (add activities, charts, dark mode)
- ✅ Test on mobile devices
- ✅ Share your live URL!

Your app will be available at:
- Vercel: `https://your-app-name.vercel.app`
- Netlify: `https://your-app-name.netlify.app`
- Custom domain: Configure in platform settings
