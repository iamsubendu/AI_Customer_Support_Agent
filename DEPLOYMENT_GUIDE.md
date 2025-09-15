# Deployment Guide

This guide will help you deploy the AI Customer Support Agent application to Netlify (client) and Vercel (server).

## Prerequisites

- GitHub account
- Netlify account
- Vercel account
- MongoDB Atlas account (for production database)

## 1. Deploy Server to Vercel

### Step 1: Prepare Server for Vercel

1. **Set up MongoDB Atlas**:

   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Create a database user

2. **Update server configuration**:
   - The server is already configured with `vercel.json`
   - Environment variables will be set in Vercel dashboard

### Step 2: Deploy to Vercel

1. **Connect to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Vercel Project**:

   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: Leave empty (Vercel will auto-detect)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

3. **Set Environment Variables**:
   In Vercel dashboard, go to Settings → Environment Variables and add:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-customer-support
   JWT_SECRET=your-super-secret-jwt-key-here
   OPENAI_API_KEY=your-openai-api-key-here
   NODE_ENV=production
   CORS_ORIGIN=https://your-netlify-app.netlify.app
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your Vercel URL (e.g., `https://your-app.vercel.app`)

## 2. Deploy Client to Netlify

### Step 1: Prepare Client for Netlify

1. **Update API URL**:
   - In `client/src/config/environment.js`, update the production URL to your Vercel server URL
   - Or set the `VITE_API_URL` environment variable in Netlify

### Step 2: Deploy to Netlify

1. **Connect to Netlify**:

   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "New site from Git"
   - Choose your repository

2. **Configure Netlify Build**:

   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

3. **Set Environment Variables** (Optional):
   In Netlify dashboard, go to Site settings → Environment variables and add:

   ```
   VITE_API_URL=https://your-server-app.vercel.app
   ```

4. **Deploy**:
   - Click "Deploy site"
   - Wait for deployment to complete
   - Note your Netlify URL (e.g., `https://your-app.netlify.app`)

## 3. Update CORS Configuration

After both deployments are complete:

1. **Update Server CORS**:

   - Go to Vercel dashboard
   - Update the `CORS_ORIGIN` environment variable to your Netlify URL
   - Redeploy the server

2. **Update Client API URL**:
   - Go to Netlify dashboard
   - Update the `VITE_API_URL` environment variable to your Vercel URL
   - Redeploy the client

## 4. Testing the Deployment

1. **Test Server**:

   - Visit `https://your-server-app.vercel.app/health` (if you have a health endpoint)
   - Test API endpoints using Postman or curl

2. **Test Client**:
   - Visit your Netlify URL
   - Try to register/login
   - Test the chat functionality

## 5. Domain Configuration (Optional)

### Custom Domain for Netlify:

1. Go to Site settings → Domain management
2. Add your custom domain
3. Configure DNS settings

### Custom Domain for Vercel:

1. Go to Project settings → Domains
2. Add your custom domain
3. Configure DNS settings

## Environment Variables Reference

### Server (Vercel):

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `OPENAI_API_KEY`: OpenAI API key (if using OpenAI)
- `NODE_ENV`: Set to "production"
- `CORS_ORIGIN`: Your Netlify client URL

### Client (Netlify):

- `VITE_API_URL`: Your Vercel server URL

## Troubleshooting

### Common Issues:

1. **CORS Errors**:

   - Ensure `CORS_ORIGIN` in server matches your Netlify URL
   - Check that the client is using the correct API URL

2. **Database Connection Issues**:

   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has proper permissions

3. **Build Failures**:

   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check build logs for specific errors

4. **Environment Variables**:
   - Ensure all required environment variables are set
   - Check variable names and values
   - Redeploy after changing environment variables

## Security Considerations

1. **JWT Secret**: Use a strong, random secret key
2. **MongoDB**: Use strong passwords and enable IP whitelisting
3. **CORS**: Only allow your specific domains
4. **Environment Variables**: Never commit sensitive data to Git

## Monitoring

1. **Vercel**: Monitor server logs and performance in Vercel dashboard
2. **Netlify**: Monitor build logs and site analytics
3. **MongoDB Atlas**: Monitor database performance and usage

## Updates and Maintenance

1. **Code Updates**: Push to GitHub, and both platforms will auto-deploy
2. **Environment Variables**: Update in respective dashboards
3. **Database**: Monitor and scale as needed in MongoDB Atlas
