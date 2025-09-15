#!/bin/bash

# Deployment script for AI Customer Support Agent
# This script helps prepare the application for deployment

echo "🚀 Preparing AI Customer Support Agent for deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing dependencies..."

# Install root dependencies
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo "🔨 Building client..."
cd client
npm run build
cd ..

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy server to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set root directory to 'server'"
echo "   - Configure environment variables"
echo ""
echo "2. Deploy client to Netlify:"
echo "   - Go to https://netlify.com"
echo "   - Import your GitHub repository"
echo "   - Set base directory to 'client'"
echo "   - Set build command to 'npm run build'"
echo "   - Set publish directory to 'client/dist'"
echo ""
echo "3. Update environment variables:"
echo "   - Set VITE_API_URL in Netlify to your Vercel URL"
echo "   - Set CORS_ORIGIN in Vercel to your Netlify URL"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
