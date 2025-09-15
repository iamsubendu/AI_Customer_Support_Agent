# Render Deployment Guide

## Deploy Server to Render

### Step 1: Prepare for Render

1. **Update server configuration**:

   - The server is now configured to use `process.env.PORT` (required by Render)
   - Added `render.yaml` configuration file

2. **Set up MongoDB Atlas**:
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Create a database user

### Step 2: Deploy to Render

1. **Connect to Render**:

   - Go to [render.com](https://render.com)
   - Sign in with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository

2. **Configure Render Service**:

   - **Name**: `ai-customer-support-server`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

3. **Set Environment Variables**:
   In Render dashboard, go to Environment tab and add:

   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-customer-support
   JWT_SECRET=your-super-secret-jwt-key-here
   OPENROUTER_API_KEY=your-openrouter-api-key-here
   CORS_ORIGIN=https://your-netlify-app.netlify.app
   ```

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your Render URL (e.g., `https://your-app.onrender.com`)

### Step 3: Deploy Client to Netlify

1. **Connect to Netlify**:

   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "New site from Git"
   - Choose your repository

2. **Configure Netlify Build**:

   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

3. **Set Environment Variables**:
   In Netlify dashboard, go to Site settings → Environment variables and add:

   ```
   VITE_API_URL=https://your-app.onrender.com
   ```

4. **Deploy**:
   - Click "Deploy site"
   - Wait for deployment to complete
   - Note your Netlify URL (e.g., `https://your-app.netlify.app`)

### Step 4: Update CORS Configuration

After both deployments are complete:

1. **Update Server CORS**:
   - Go to Render dashboard
   - Update the `CORS_ORIGIN` environment variable to your Netlify URL
   - Redeploy the server

## Environment Variables Reference

### Server (Render):

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-customer-support
JWT_SECRET=your-super-secret-jwt-key-here
OPENROUTER_API_KEY=your-openrouter-api-key-here
CORS_ORIGIN=https://your-netlify-app.netlify.app
```

### Client (Netlify):

```
VITE_API_URL=https://your-app.onrender.com
```

## Testing

After deployment, test these endpoints:

- `GET https://your-app.onrender.com/health` - Should return server status
- `POST https://your-app.onrender.com/auth/login` - Test authentication
- `POST https://your-app.onrender.com/chat/send` - Test chat functionality

## Troubleshooting

### Common Issues:

1. **Port Issues**:

   - Render automatically sets PORT environment variable
   - Server now uses `process.env.PORT` correctly

2. **CORS Errors**:

   - Ensure `CORS_ORIGIN` in Render matches your Netlify URL
   - Check that the client is using the correct API URL

3. **Database Connection Issues**:

   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has proper permissions

4. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check build logs for specific errors

## Key Differences from Vercel

- **Render** uses traditional server deployment (not serverless)
- **Render** requires the server to listen on `process.env.PORT`
- **Render** supports persistent connections and WebSockets
- **Render** has a free tier with some limitations

The server should now deploy successfully on Render!
