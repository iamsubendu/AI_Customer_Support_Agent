# 🧠 AI Customer Support Agent

A full-stack AI-powered customer support chat application built with React, Node.js, Express, MongoDB, and OpenRouter.ai integration. Features embedded message storage, modern UI, and deployment-ready configuration for both Vercel and Render.

## 🚀 Features

### 👤 Authentication

- **JWT-based authentication** with secure token management
- **Password hashing** using bcryptjs
- **Protected routes** for secure access
- **User registration and login** with validation

### 💬 Chat System

- **Real-time chat interface** with modern UI
- **AI-powered responses** using OpenRouter.ai
- **Embedded message storage** - messages stored directly in chat documents
- **Multiple conversation support** with chat management
- **Typing indicators** for better UX
- **Message timestamps** and conversation tracking
- **Optimistic UI updates** for smooth user experience

### 🧠 AI Integration

- **OpenRouter.ai integration** for multiple LLM support
- **Fallback responses** when AI service is unavailable
- **Configurable AI models** and parameters
- **Context-aware conversations** with message history

### 📡 Backend Features

- **RESTful API** with Express.js
- **MongoDB integration** with Mongoose ODM
- **Rate limiting** to prevent abuse
- **CORS configuration** for cross-origin requests
- **Health check endpoints** for monitoring
- **Error handling** and logging

### 🌐 Frontend Features

- **React 18** with modern hooks and Vite
- **Redux Toolkit** for state management
- **Responsive design** for mobile and desktop
- **Real-time updates** with optimistic UI
- **Toast notifications** for user feedback
- **Environment-based configuration**
- **Axios for API communication**

### 🐳 DevOps & Deployment

- **Docker containerization** for all services
- **Docker Compose** for easy local deployment
- **Vercel deployment** configuration for serverless
- **Render deployment** configuration for traditional hosting
- **Netlify deployment** for frontend
- **Environment configuration** management
- **Automated build scripts**

## 🛠️ Tech Stack

| Layer                | Technology                           |
| -------------------- | ------------------------------------ |
| **Frontend**         | React 18, Vite, Redux Toolkit, Axios |
| **Backend**          | Node.js, Express.js, JWT, bcryptjs   |
| **Database**         | MongoDB with Mongoose ODM            |
| **AI Service**       | OpenRouter.ai API                    |
| **Authentication**   | JWT + bcryptjs                       |
| **State Management** | Redux Toolkit                        |
| **Deployment**       | Vercel, Render, Netlify              |
| **Containerization** | Docker, Docker Compose               |
| **Styling**          | Custom CSS with modern design        |

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ (for local development)
- MongoDB Atlas account (for production) or local MongoDB
- OpenRouter.ai API key
- Git (for cloning the repository)
- Docker and Docker Compose (optional, for containerized deployment)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/iamsubendu/AI_Customer_Support_Server.git
   cd AI_Customer_Support_Server
   ```

2. **Set up environment variables**

   ```bash
   # Copy environment files
   cp env.example .env
   cp server/env.example server/.env
   cp client/env.example client/.env

   # Edit the .env files and add your configuration:
   # - OpenRouter API key
   # - MongoDB connection string
   # - JWT secret
   # - CORS origin
   ```

3. **Install dependencies and start**

   ```bash
   # Install all dependencies
   npm run install:all

   # Start both client and server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

### Docker Deployment (Optional)

```bash
# Start with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

### Development Scripts

```bash
# Install all dependencies
npm run install:all

# Start both client and server in development mode
npm run dev

# Start only the server
npm run server:dev

# Start only the client
npm run client:dev

# Build the client for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Environment Variables

#### Root (.env)

```env
# Client Configuration
VITE_API_URL=http://localhost:5000

# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-customer-support

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# AI Service Configuration
OPENROUTER_API_KEY=your-openrouter-api-key-here

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

#### Server (server/.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-customer-support

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# AI Service Configuration
OPENROUTER_API_KEY=your-openrouter-api-key-here

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

#### Client (client/.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# For production, change to your server URL:
# VITE_API_URL=https://your-server-app.vercel.app
```

### MongoDB Setup

#### Option 1: MongoDB Atlas (Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

#### Option 2: Local MongoDB

- Use the Docker Compose setup (includes MongoDB)
- Or install MongoDB locally and update the connection string

### AI Service Setup

#### OpenRouter.ai (Recommended)

1. Sign up at [OpenRouter.ai](https://openrouter.ai/)
2. Get your API key from the dashboard
3. Add it to your server `.env` file

## 📁 Project Structure

```
AI_Customer_Support_Server/
├── client/                    # React frontend
│   ├── public/
│   │   └── _redirects         # Netlify SPA routing
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── chat/         # Chat components
│   │   │   └── custom/       # Reusable UI components
│   │   ├── config/           # Configuration files
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API services
│   │   ├── store/            # Redux store and slices
│   │   └── utils/            # Utility functions
│   ├── netlify.toml          # Netlify configuration
│   ├── env.example           # Environment variables template
│   └── package.json
├── server/                    # Node.js backend
│   ├── config/               # Configuration files
│   ├── middleware/           # Custom middleware
│   ├── models/               # MongoDB models (Chat with embedded messages)
│   ├── routes/               # API routes
│   ├── services/             # Business logic (AI service)
│   ├── api/                  # Vercel serverless functions
│   ├── Dockerfile            # Docker configuration
│   ├── vercel.json           # Vercel configuration
│   ├── render.yaml           # Render configuration
│   ├── env.example           # Environment variables template
│   └── package.json
├── docker-compose.yml        # Docker services
├── mongo-init.js            # MongoDB initialization
├── deploy.sh                # Deployment script
├── env.example              # Root environment variables
└── README.md
```

## 🚀 API Endpoints

### Authentication

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Chat

- `POST /chat/send` - Send message and get AI response
- `GET /chat/history` - Get user's chat history
- `GET /chat/:chatId` - Get specific chat messages
- `DELETE /chat/:chatId` - Delete a chat

### Health

- `GET /health` - Health check endpoint

## 🎯 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Start Chatting**: Click "New Chat" to start a conversation
3. **Send Messages**: Type your message and press Enter to send
4. **View History**: Access previous conversations from the sidebar
5. **Manage Chats**: Delete old conversations as needed

## 🔒 Security Features

- **JWT Authentication** with secure token management
- **Password Hashing** using bcryptjs
- **Rate Limiting** to prevent abuse
- **Input Validation** on both client and server
- **CORS Configuration** for secure cross-origin requests
- **Environment Variables** for sensitive configuration
- **Non-root Docker containers** for security

## 🚀 Deployment

### Current Deployment Setup

This project is currently deployed using:

- **Frontend**: Netlify (https://your-app.netlify.app)
- **Backend**: Render (https://your-app.onrender.com)

### Quick Deployment

Use the provided deployment script:

```bash
# Prepare for deployment
./deploy.sh

# Follow the instructions for your chosen platform
```

### Platform-Specific Deployment

#### Option 1: Render + Netlify (Current Setup)

**Server (Render):**

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set root directory to `server`
4. Set build command to `npm install`
5. Set start command to `node server.js`
6. Add environment variables
7. Deploy and get your Render URL (e.g., `https://your-app.onrender.com`)

**Client (Netlify):**

1. Connect your GitHub repository to Netlify
2. Set base directory to `client`
3. Set build command to `npm run build`
4. Set publish directory to `client/dist`
5. Add environment variable: `VITE_API_URL=https://your-app.onrender.com`
6. Deploy and get your Netlify URL (e.g., `https://your-app.netlify.app`)

**Update CORS:**

1. Go back to Render dashboard
2. Update `CORS_ORIGIN` environment variable to your Netlify URL
3. Redeploy the server

#### Option 2: Vercel + Netlify (Alternative)

**Server (Vercel):**

1. Connect your GitHub repository to Vercel
2. Set root directory to `server`
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

**Client (Netlify):**

1. Same as Option 1, but use Vercel URL for `VITE_API_URL`

#### Option 3: Docker Compose

```bash
# Deploy with Docker Compose
docker-compose up --build -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

### Environment Variables for Production

#### Render (Server) - Your Current Setup

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-customer-support
JWT_SECRET=your-super-secret-jwt-key-here
OPENROUTER_API_KEY=your-openrouter-api-key-here
CORS_ORIGIN=https://your-netlify-app.netlify.app
```

#### Netlify (Client) - Your Current Setup

```
VITE_API_URL=https://your-server-app.onrender.com
```

#### Vercel (Server) - Alternative

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-customer-support
JWT_SECRET=your-super-secret-jwt-key-here
OPENROUTER_API_KEY=your-openrouter-api-key-here
NODE_ENV=production
CORS_ORIGIN=https://your-netlify-app.netlify.app
```

## 🧪 Testing

```bash
# Test backend endpoints
curl http://localhost:5000/health

# Test with authentication
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Check your MongoDB URI
   - Ensure MongoDB is running
   - Verify network connectivity

2. **AI Service Not Responding**

   - Verify your OpenRouter API key
   - Check API rate limits
   - Review service logs

3. **Docker Build Issues**

   - Clear Docker cache: `docker system prune -a`
   - Rebuild containers: `docker-compose up --build --force-recreate`

4. **CORS Errors**

   - Check API URL configuration in Netlify
   - Verify CORS settings in Render server
   - Ensure `CORS_ORIGIN` in Render matches your Netlify URL

5. **Render Deployment Issues**

   - Check that `render.yaml` is properly configured
   - Verify environment variables are set in Render dashboard
   - Check build logs for specific errors
   - Ensure `package-lock.json` exists in server directory

6. **Netlify Build Issues**
   - Check that `netlify.toml` is properly configured
   - Verify build command and publish directory settings
   - Check that `VITE_API_URL` environment variable is set
   - Review build logs for specific errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OpenRouter.ai](https://openrouter.ai/) for AI model access
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Docker](https://www.docker.com/) for containerization

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Built with ❤️ for the AI Customer Support Challenge**
