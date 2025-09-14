# 🧠 AI Customer Support Agent

A full-stack AI-powered customer support chat application built with React, Node.js, Express, MongoDB, and OpenRouter.ai integration.

## 🚀 Features

### 👤 Authentication

- **JWT-based authentication** with secure token management
- **Password hashing** using bcryptjs
- **Protected routes** for secure access
- **User registration and login** with validation

### 💬 Chat System

- **Real-time chat interface** with modern UI
- **AI-powered responses** using OpenRouter.ai
- **Chat history storage** in MongoDB (user-scoped)
- **Multiple conversation support** with chat management
- **Typing indicators** for better UX
- **Message timestamps** and conversation tracking

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

- **React 18** with modern hooks
- **Responsive design** for mobile and desktop
- **Real-time updates** with optimistic UI
- **Toast notifications** for user feedback
- **Context-based state management**
- **Axios for API communication**

### 🐳 DevOps

- **Docker containerization** for all services
- **Docker Compose** for easy deployment
- **Nginx reverse proxy** for production
- **Health checks** for service monitoring
- **Environment configuration** management

## 🛠️ Tech Stack

| Layer                | Technology                          |
| -------------------- | ----------------------------------- |
| **Frontend**         | React 18, Vite, Axios, React Router |
| **Backend**          | Node.js, Express.js, JWT, bcryptjs  |
| **Database**         | MongoDB with Mongoose ODM           |
| **AI Service**       | OpenRouter.ai API                   |
| **Authentication**   | JWT + bcryptjs                      |
| **Containerization** | Docker, Docker Compose              |
| **Web Server**       | Nginx (production)                  |
| **Styling**          | Custom CSS with modern design       |

## 📦 Installation & Setup

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- MongoDB Atlas account (for production) or local MongoDB
- OpenRouter.ai API key

### Quick Start with Docker

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd AI_Customer_support_agent
   ```

2. **Set up environment variables**

   ```bash
   # Copy environment files
   cp server/env.example server/.env
   cp client/env.example client/.env

   # Edit server/.env and add your OpenRouter API key
   OPENROUTER_API_KEY=your-openrouter-api-key-here
   ```

3. **Start the application**

   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

### Local Development

1. **Backend Setup**

   ```bash
   cd server
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

#### Server (.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-support
JWT_SECRET=your-super-secret-jwt-key-here
OPENROUTER_API_KEY=your-openrouter-api-key-here
NODE_ENV=development
```

#### Client (.env)

```env
VITE_API_URL=http://localhost:5000
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

#### Alternative: Hugging Face

- Update the AI service configuration in `server/services/aiService.js`
- Add your Hugging Face API key to the environment variables

## 📁 Project Structure

```
AI_Customer_support_agent/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── main.jsx
│   ├── Dockerfile
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── services/          # Business logic
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml     # Docker services
├── mongo-init.js         # MongoDB initialization
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

### Production Deployment

1. **Update environment variables** for production
2. **Configure MongoDB Atlas** for production database
3. **Set up domain and SSL** certificates
4. **Deploy using Docker Compose** or container orchestration

### Hosting Options

- **Vercel** (Frontend) + **Railway/Render** (Backend)
- **Docker Compose** on VPS
- **Kubernetes** for scalable deployment
- **AWS/GCP/Azure** with container services

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
   - Check API URL configuration
   - Verify CORS settings in server

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
