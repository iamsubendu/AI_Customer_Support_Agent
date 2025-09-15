# Vercel Deployment Fix

## Problem

You're getting this error when deploying to Vercel:

```
==> Port scan timeout reached, failed to detect open port 5000 from PORT environment variable. Bind your service to port 5000 or update the PORT environment variable to the correct port.
```

## Solution

The issue has been fixed with the following changes:

### 1. Updated Server Configuration

- Modified `server.js` to detect Vercel environment
- Server only listens on port when NOT in Vercel
- Added proper Vercel environment detection

### 2. Created API Entry Point

- Added `server/api/index.js` as Vercel entry point
- This follows Vercel's serverless function structure

### 3. Updated Vercel Configuration

- Modified `server/vercel.json` to use the API directory
- Set proper environment variables
- Configured function timeout

## Files Changed

1. **server/server.js** - Added Vercel detection
2. **server/api/index.js** - New Vercel entry point
3. **server/vercel.json** - Updated configuration

## How to Deploy

1. **Commit all changes**:

   ```bash
   git add .
   git commit -m "Fix Vercel deployment port issue"
   git push
   ```

2. **Redeploy to Vercel**:

   - Go to your Vercel dashboard
   - Click "Redeploy" on your project
   - Or push to your main branch to trigger auto-deploy

3. **Verify Deployment**:
   - Check Vercel logs for successful deployment
   - Test your API endpoints
   - Verify health check endpoint works

## Environment Variables to Set in Vercel

Make sure these are set in your Vercel project settings:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-customer-support
JWT_SECRET=your-super-secret-jwt-key-here
OPENROUTER_API_KEY=your-openrouter-api-key-here
NODE_ENV=production
CORS_ORIGIN=https://your-netlify-app.netlify.app
```

## Testing

After deployment, test these endpoints:

- `GET /health` - Should return server status
- `POST /auth/login` - Test authentication
- `POST /chat/send` - Test chat functionality

The port issue should now be resolved!
