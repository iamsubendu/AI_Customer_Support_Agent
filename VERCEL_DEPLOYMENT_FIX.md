# Vercel Deployment Fix

## Problem

You're getting this error when deploying to Vercel:

```
==> Port scan timeout reached, failed to detect open port 5000 from PORT environment variable. Bind your service to port 5000 or update the PORT environment variable to the correct port.
```

## Root Cause

Vercel uses serverless functions that don't need to listen on specific ports. The server was trying to listen on a port even in Vercel environment.

## Solution Applied

### 1. Updated Server Configuration

- Modified `server.js` to only listen on port when NOT in Vercel
- Moved PORT declaration inside the non-Vercel block
- Server now properly exports the app for Vercel

### 2. Updated Vercel Configuration

- Simplified `vercel.json` to remove hardcoded PORT
- Let Vercel handle port configuration automatically
- Removed CORS_ORIGIN from vercel.json (set in Vercel dashboard)

### 3. Fixed NPM Vulnerabilities

- Updated client dependencies
- Vulnerabilities are in development dependencies only (won't affect production)

## How to Deploy

### Step 1: Commit Changes

```bash
git add .
git commit -m "Fix Vercel deployment port issue"
git push
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Set **Root Directory** to `server`
4. Set environment variables in Vercel dashboard:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-customer-support
   JWT_SECRET=your-super-secret-jwt-key-here
   OPENROUTER_API_KEY=your-openrouter-api-key-here
   NODE_ENV=production
   CORS_ORIGIN=https://your-netlify-app.netlify.app
   ```

### Step 3: Verify Deployment

- Check Vercel logs for successful deployment
- Test health endpoint: `https://your-app.vercel.app/health`
- Test API endpoints

## Key Changes Made

1. **server/server.js**:

   ```javascript
   // Only start the server if not in Vercel environment
   if (!process.env.VERCEL) {
     const PORT = process.env.PORT || 5000;
     app.listen(PORT, async () => {
       // Server startup code
     });
   } else {
     // For Vercel, just check AI service without starting server
     console.log("🚀 Server running on Vercel");
     checkAIService();
   }
   ```

2. **server/vercel.json**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "api/index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "api/index.js"
       }
     ],
     "env": {
       "NODE_ENV": "production",
       "VERCEL": "1"
     }
   }
   ```

## Testing

After deployment, test these endpoints:

- `GET /health` - Should return server status
- `POST /auth/login` - Test authentication
- `POST /chat/send` - Test chat functionality

The port issue should now be completely resolved!
