# 🚀 Deployment Guide

## Quick Start (Recommended)

### Option 1: Docker Compose (Easiest)

```bash
# Clone and start
git clone <your-repo-url>
cd AI_Customer_support_agent

# Run the quick start script
./start.sh  # Linux/Mac
# or
start.bat   # Windows

# Or manually:
docker-compose up --build
```

### Option 2: Local Development

```bash
# Install dependencies
npm run install:all

# Start both frontend and backend
npm run dev

# Or start individually:
npm run server:dev  # Backend only
npm run client:dev  # Frontend only
```

## 🔧 Configuration

### 1. Environment Setup

**Server Environment** (`server/.env`):

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-support
JWT_SECRET=your-super-secret-jwt-key-here
OPENROUTER_API_KEY=your-openrouter-api-key-here
NODE_ENV=production
```

**Client Environment** (`client/.env`):

```env
VITE_API_URL=http://localhost:5000
```

### 2. MongoDB Setup

#### Option A: MongoDB Atlas (Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in server/.env

#### Option B: Local MongoDB (Docker)

- Included in docker-compose.yml
- No additional setup required

### 3. AI Service Setup

#### OpenRouter.ai (Recommended)

1. Sign up at [OpenRouter.ai](https://openrouter.ai/)
2. Get your API key
3. Add to `OPENROUTER_API_KEY` in server/.env

## 🌐 Production Deployment

### Vercel + Railway/Render

**Frontend (Vercel)**:

1. Connect your GitHub repo to Vercel
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.com`

**Backend (Railway/Render)**:

1. Connect your GitHub repo
2. Set build command: `cd server && npm install`
3. Set start command: `cd server && npm start`
4. Add environment variables from server/.env

### Docker Deployment

**Single Server**:

```bash
# Build and run
docker-compose up -d

# Scale services
docker-compose up -d --scale server=3
```

**Kubernetes**:

```yaml
# Example deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-support-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ai-support-server
  template:
    metadata:
      labels:
        app: ai-support-server
    spec:
      containers:
        - name: server
          image: your-registry/ai-support-server:latest
          ports:
            - containerPort: 5000
          env:
            - name: MONGODB_URI
              valueFrom:
                secretKeyRef:
                  name: mongodb-secret
                  key: uri
```

## 🔍 Monitoring & Health Checks

### Health Endpoints

- Backend: `GET /health`
- Frontend: `GET /` (served by Nginx)

### Docker Health Checks

```bash
# Check container health
docker-compose ps

# View logs
docker-compose logs -f

# Restart services
docker-compose restart
```

### Application Monitoring

- **Backend**: Built-in health check endpoint
- **Database**: MongoDB connection monitoring
- **AI Service**: Error handling with fallback responses

## 🛠️ Troubleshooting

### Common Issues

1. **Port Already in Use**

   ```bash
   # Find and kill process
   lsof -ti:3000 | xargs kill -9
   lsof -ti:5000 | xargs kill -9
   ```

2. **MongoDB Connection Failed**

   - Check MongoDB URI format
   - Verify network connectivity
   - Check authentication credentials

3. **AI Service Not Responding**

   - Verify API key is correct
   - Check rate limits
   - Review service logs

4. **Docker Build Issues**

   ```bash
   # Clean Docker cache
   docker system prune -a

   # Rebuild without cache
   docker-compose build --no-cache
   ```

### Logs and Debugging

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs server
docker-compose logs client
docker-compose logs mongodb

# Follow logs in real-time
docker-compose logs -f server
```

## 📊 Performance Optimization

### Backend

- Rate limiting enabled (100 requests/15min)
- MongoDB indexing for chat queries
- JWT token expiration (7 days)
- Error handling with fallback responses

### Frontend

- React 18 with modern hooks
- Optimistic UI updates
- Message pagination
- Responsive design

### Database

- Indexed queries for performance
- User-scoped data isolation
- Automatic cleanup of old data

## 🔒 Security Considerations

### Production Checklist

- [ ] Change default JWT secret
- [ ] Use HTTPS in production
- [ ] Set up proper CORS origins
- [ ] Enable MongoDB authentication
- [ ] Use environment variables for secrets
- [ ] Regular security updates
- [ ] Monitor for suspicious activity

### Security Features

- JWT authentication with expiration
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS configuration
- Non-root Docker containers

## 📈 Scaling Considerations

### Horizontal Scaling

- Stateless backend design
- Load balancer for multiple instances
- MongoDB replica sets
- CDN for static assets

### Vertical Scaling

- Increase container resources
- Optimize database queries
- Implement caching (Redis)
- Monitor resource usage

## 🎯 Next Steps

1. **Set up monitoring** (Prometheus, Grafana)
2. **Implement caching** (Redis)
3. **Add more AI models** (GPT-4, Claude)
4. **Enhance UI** (themes, animations)
5. **Add analytics** (user behavior tracking)
6. **Implement file uploads** (images, documents)
7. **Add real-time features** (WebSocket)

---

**Ready to deploy! 🚀**
